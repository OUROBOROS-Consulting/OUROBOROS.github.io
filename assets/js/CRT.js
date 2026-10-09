import { defineProperties } from "figma:shaders"

export default function Effect() { }

export function setup(device, frame) {
  // Idempotent: if setup runs again (device loss, hot reload), release the
  // previous allocations instead of leaking them.
  cleanup(device, frame)

  frame.state.shaderModule = device.createShaderModule({
    code: `
diagnostic(off,derivative_uniformity);

struct Uniforms {
  params0: vec4f, // curvature, scanline, mask amount, aberration pixels
  params1: vec4f, // reserved, brightness gain, scanlineSize, time
  params2: vec4f, // flicker, noise, rollSpeed, jitter
  params3: vec4f, // reserved, noiseSize, clipToCurve, maskPitch
  dims: vec4f,    // output width, output height, maskType, vignette amount
  params4: vec4f, // aberrationScheme, padding
}
@group(0) @binding(0) var<uniform> u: Uniforms;
@group(0) @binding(1) var samp: sampler;
@group(0) @binding(2) var inputTex: texture_2d<f32>;

struct VsIn { @location(0) pos: vec2f, @location(1) uv: vec2f };
struct VsOut { @builtin(position) position: vec4f, @location(0) uv: vec2f };

const TAU = 6.28318530718;
const PI = 3.14159265359;
const PHASE120 = 2.09439510239;

@vertex fn vs_main(in: VsIn) -> VsOut {
  var out: VsOut;
  out.position = vec4f(in.pos, 0.0, 1.0);
  out.uv = in.uv;
  return out;
}

// Sub-texel coverage of the input rect, for an antialiased tube edge.
// Split out from the sample so all three aberration taps can share one
// coverage value instead of each carrying its own (which fringes the rim).
fn coverage(p: vec2f, texel: vec2f) -> f32 {
  let fx = smoothstep(0.0, texel.x, p.x) * (1.0 - smoothstep(1.0 - texel.x, 1.0, p.x));
  let fy = smoothstep(0.0, texel.y, p.y) * (1.0 - smoothstep(1.0 - texel.y, 1.0, p.y));
  return fx * fy;
}

fn sampleRaw(p: vec2f) -> vec4f {
  return textureSampleLevel(inputTex, samp, clamp(p, vec2f(0.0), vec2f(1.0)), 0.0);
}

// Hoskins hash12. Keeps intermediates near 1e4 so fract() still has mantissa
// bits to work with.
fn hash21(p: vec2f) -> f32 {
  var h = fract(vec3f(p.x, p.y, p.x) * 0.1031);
  h = h + dot(h, h.yzx + 33.33);
  return fract((h.x + h.y) * h.z);
}

fn hash31(p: vec3f) -> f32 {
  var h = fract(p * vec3f(0.1031, 0.1030, 0.0973));
  h = h + vec3f(dot(h, h.yzx + 33.33));
  return fract((h.x + h.y) * h.z);
}

// Barrel warp in aspect-corrected coordinates. Scale is independent per axis:
// clipped mode fits the curved silhouette to each edge midpoint, while
// rectangular mode uses a shared corner-fitting overscan.
fn barrel(
  uv: vec2f,
  aspect: vec2f,
  curvature: f32,
  scale: vec2f,
) -> vec2f {
  var c = (uv * 2.0 - 1.0) * aspect;
  let r2 = dot(c, c);
  c = c * (1.0 + curvature * 0.35 * r2) * scale;
  return (c / aspect) * 0.5 + 0.5;
}

// Lateral chromatic aberration / beam misconvergence.
fn aberrationOffset(
  screenUv: vec2f,
  aspect: vec2f,
  amount: f32,
  scheme: f32,
  texel: vec2f,
) -> vec2f {
  let p = screenUv * 2.0 - 1.0;
  let c = p * aspect;
  let radius = length(c);
  let normalizedRadial = c / max(radius, 0.000001);
  let radialDirection = select(
    vec2f(1.0, 0.0),
    normalizedRadial,
    radius > 0.0001,
  );
  let radialLevel = clamp(radius / sqrt(2.0), 0.0, 1.0);

  let radialPixels = radialDirection *
    (amount * (0.72 + 0.48 * radialLevel));
  let horizontalPixels = vec2f(amount * 1.15, 0.0);
  let convergenceBase = vec2f(0.95, -0.55);
  let convergenceField = vec2f(p.x * 0.18, p.y * 0.22);
  let convergencePixels = (convergenceBase + convergenceField) * amount;

  var offsetPixels = radialPixels;
  if (scheme > 0.5 && scheme < 1.5) {
    offsetPixels = horizontalPixels;
  } else if (scheme >= 1.5) {
    offsetPixels = convergencePixels;
  }

  return offsetPixels * texel;
}

// Squared raised cosine with exact cycle mean 3/8.
fn grilleProfile(theta: vec3f, pitch: f32) -> vec3f {
  let fundamentalAA = smoothstep(2.0, 3.0, pitch);
  let secondAA = smoothstep(2.0, 3.0, pitch * 0.5);
  return vec3f(0.375)
    + 0.5 * fundamentalAA * cos(theta)
    + 0.125 * secondAA * cos(theta * 2.0);
}

fn softProfile(theta: f32, period: f32) -> f32 {
  return 0.5 + 0.5 * smoothstep(2.0, 3.0, period) * cos(theta);
}

fn softProfile3(theta: vec3f, period: f32) -> vec3f {
  return vec3f(0.5) + 0.5 * smoothstep(2.0, 3.0, period) * cos(theta);
}

@fragment fn fs_main(in: VsOut) -> @location(0) vec4f {
  let curvature = u.params0.x;
  let scanAmtRaw = u.params0.y;
  let maskAmt = clamp(u.params0.z, 0.0, 1.0);
  let aberr = u.params0.w;
  let bright = u.params1.y;
  let scanSize = max(u.params1.z, 1.0);
  let t = u.params1.w;
  let flickerAmt = u.params2.x;
  let noiseAmt = u.params2.y;
  let rollSpeed = u.params2.z;
  let jitterAmt = u.params2.w;
  let noiseSize = max(u.params3.y, 1.0);
  let clipCurve = u.params3.z > 0.5;
  let maskPitch = clamp(u.params3.w, 2.0, 12.0);
  let maskType = u.dims.z;
  let vigAmt = clamp(u.dims.w, 0.0, 1.0);
  let aberrationScheme = u.params4.x;

  let inDims = max(vec2f(textureDimensions(inputTex, 0)), vec2f(1.0));
  let inTexel = 1.0 / inDims;
  let outDims = max(u.dims.xy, vec2f(1.0));

  let aspectRaw = vec2f(outDims.x / outDims.y, 1.0);
  let aspect = aspectRaw / (length(aspectRaw) / sqrt(2.0));

  // At an edge midpoint, r2 is aspect.x^2 or aspect.y^2. Compensating each
  // axis by its own midpoint distortion makes the unclipped fit touch all
  // four edge midpoints regardless of aspect ratio.
  let edgeFit = vec2f(
    1.0 / (1.0 + curvature * 0.35 * aspect.x * aspect.x),
    1.0 / (1.0 + curvature * 0.35 * aspect.y * aspect.y),
  );

  // The jitter equation can move a line by at most 3.9 input texels. Reserve
  // that distance on each horizontal side, then add a half-texel edge
  // allowance for coverage filtering. Dividing by the remaining centered
  // width increases the inverse warp scale, moving the clipped silhouette
  // inward rather than expanding it beyond the frame.
  let edgeAllowancePixels = 0.5;
  let jitterReserveUv = clamp(jitterAmt, 0.0, 1.0) * 3.9 * inTexel.x;
  let reserveUv = vec2f(
    jitterReserveUv + edgeAllowancePixels * inTexel.x,
    edgeAllowancePixels * inTexel.y,
  );
  let availableSpan = max(
    vec2f(1.0) - 2.0 * reserveUv,
    vec2f(0.05),
  );
  let clipFit = edgeFit / availableSpan;

  // With clipping disabled, preserve the shared corner-fitting overscan.
  // Aspect normalization gives r2 = 2 at every corner.
  let cornerFitValue = 1.0 / (1.0 + 0.7 * curvature);
  let rectangularFit = vec2f(cornerFitValue);
  let barrelScale = select(rectangularFit, clipFit, clipCurve);

  // Scanline attenuation and mean-level normalization.
  let scanAmt = scanAmtRaw * mix(0.6, 1.0, smoothstep(1.0, 2.5, scanSize));
  let scanNorm = 1.0 / (1.0 - scanAmt * 0.5);

  var warped = barrel(in.uv, aspect, curvature, barrelScale);

  // Animated horizontal jitter and line tearing.
  let lineId = floor(warped.y * outDims.y / scanSize);
  let lineNoise = hash21(vec2f(lineId, floor(t * 24.0))) - 0.5;
  let drift = sin(t * 1.7 + warped.y * 9.0) * 0.5;
  let jitterX = jitterAmt * (lineNoise * 0.9 + drift * 0.4) * inTexel.x * 6.0;
  warped = vec2f(warped.x + jitterX, warped.y);

  let cov = select(1.0, coverage(warped, inTexel), clipCurve);

  let dir = aberrationOffset(
    in.uv,
    aspect,
    aberr,
    aberrationScheme,
    inTexel,
  );
  let sr = sampleRaw(warped + dir);
  let sg = sampleRaw(warped);
  let sb = sampleRaw(warped - dir);

  let sharedAlpha = max(sr.a, max(sg.a, sb.a));
  let separatedRgb = min(
    vec3f(sr.r, sg.g, sb.b),
    vec3f(sharedAlpha),
  );
  var colorSample = vec4f(separatedRgb, sharedAlpha) * cov;

  // Scanlines in output pixel space, slowly drifting.
  let py = warped.y * outDims.y + t * 6.0;
  let scan = (1.0 - scanAmt * 0.5 * (1.0 - cos(TAU * py / scanSize))) * scanNorm;
  colorSample = vec4f(colorSample.rgb * scan, colorSample.a);

  // Rolling refresh bar.
  let rollPos = fract(warped.y + t * rollSpeed * 0.12);
  let band = smoothstep(0.0, 0.06, rollPos) *
    (1.0 - smoothstep(0.06, 0.22, rollPos));
  colorSample = vec4f(
    colorSample.rgb *
      (1.0 + band * 0.35 * step(0.001, rollSpeed)),
    colorSample.a,
  );

  var col = colorSample.rgb;
  let alpha = colorSample.a;

  // Unjittered center warp for effects attached to the glass. It uses the
  // same inset two-axis fit as the signal so every layer remains registered.
  let baseWarp = barrel(in.uv, aspect, curvature, barrelScale);

  // Phosphor mask remains pixel-locked to the glass.
  let px = in.uv.x * outDims.x;
  let pyMask = in.uv.y * outDims.y;

  var profile = vec3f(1.0);
  var profileMean = 1.0;

  if (maskType < 0.5) {
    let th = px * (TAU / maskPitch);
    profile = grilleProfile(
      vec3f(th, th - PHASE120, th + PHASE120),
      maskPitch,
    );
    profileMean = 0.375;
  } else if (maskType < 1.5) {
    let th = px * (TAU / maskPitch);
    let hp = grilleProfile(
      vec3f(th, th - PHASE120, th + PHASE120),
      maskPitch,
    );
    let slotPeriod = maskPitch * 2.0;
    let tie = softProfile(pyMask * (TAU / slotPeriod), slotPeriod);
    let vTrans = 1.0 - 0.75 * tie;
    profile = hp * vTrans;
    profileMean = 0.234375;
  } else {
    let rowPeriod = maskPitch * 0.8660254;
    let rowPos = pyMask / rowPeriod;
    let rowIdx = floor(rowPos);
    let odd = rowIdx - 2.0 * floor(rowIdx * 0.5);
    let th = (px + odd * maskPitch * 0.5) * (TAU / maskPitch);
    let hp = softProfile3(
      vec3f(th, th - PHASE120, th + PHASE120),
      maskPitch,
    );
    let vp = softProfile((rowPos - rowIdx) * TAU - PI, rowPeriod);
    profile = hp * vp;
    profileMean = 0.25;
  }

  let maskFloor = 0.03;
  let maskSpan = 1.8;
  let maskRaw = vec3f(maskFloor) + maskSpan * profile;
  let maskGain = maskRaw / (maskFloor + maskSpan * profileMean);
  col = col * mix(vec3f(1.0), maskGain, maskAmt);

  // Mains-hum flicker.
  let flick = 1.0 + flickerAmt *
    (sin(t * 37.0) * 0.5 + sin(t * 11.3) * 0.3) * 0.06;
  col = col * flick;

  // Analog static rides in the same fitted signal space.
  let field = floor(t * 24.0);
  let gp = floor(baseWarp * outDims / noiseSize);
  let white = hash31(vec3f(gp, field));
  let hiss = hash21(vec2f(
    floor(baseWarp.y * outDims.y / noiseSize),
    field * 1.7,
  )) - 0.5;
  let staticLvl = clamp(white + hiss * 0.35, 0.0, 1.0);
  let nMix = clamp(noiseAmt, 0.0, 1.0) * 0.55 * alpha;
  col = mix(col, vec3f(staticLvl) * alpha, nMix);
  col = col * (1.0 + (white - 0.5) * noiseAmt * 0.25);

  // Vignette follows the same fitted glass warp. One slider drives both
  // darkness and radial reach, and the reach widens with curvature so the
  // falloff tracks the shape of the glass.
  let cc = (baseWarp * 2.0 - 1.0) * aspect;
  let r2 = dot(cc, cc);
  let vigStrength = 3.0 * vigAmt * vigAmt * (0.35 + 0.65 * vigAmt);
  let vigSpread = clamp(
    vigAmt * vigAmt * (0.6 + 0.4 * clamp(curvature, 0.0, 1.0)),
    0.0,
    1.0,
  );
  let vigInner = mix(1.4, 0.0, vigSpread);
  let v = 1.0 - vigStrength * smoothstep(vigInner, 2.0, r2);
  col = col * max(v, 0.0) * bright;

  // Soft highlight knee.
  let kneeStart = 0.8;
  let knee = alpha * kneeStart;
  let kneeRoom = max(alpha - knee, 0.000001);
  let excess = max(col - vec3f(knee), vec3f(0.0));
  let compressed = vec3f(knee) + vec3f(kneeRoom) *
    (vec3f(1.0) - exp(-excess / vec3f(kneeRoom)));
  col = select(col, compressed, col > vec3f(knee));

  // Premultiplied-alpha output.
  return vec4f(clamp(col, vec3f(0.0), vec3f(alpha)), alpha);
}
`,
  })

  frame.state.quad = device.createBuffer({
    size: 6 * 4 * 4,
    usage: GPUBufferUsage.VERTEX,
    mappedAtCreation: true,
  })
  new Float32Array(frame.state.quad.getMappedRange()).set([
    -1, -1, 0, 1, 1, -1, 1, 1, -1, 1, 0, 0,
    -1, 1, 0, 0, 1, -1, 1, 1, 1, 1, 1, 0,
  ])
  frame.state.quad.unmap()

  frame.state.uniformBuf = device.createBuffer({
    size: 96,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  frame.state.sampler = device.createSampler({
    magFilter: "linear",
    minFilter: "linear",
  })
}

// Called by setup on re-entry. Harmless as a no-op if the host never invokes it.
export function cleanup(device, frame) {
  var state = frame.state
  if (state == null) return

  if (state.quad != null) {
    state.quad.destroy()
    state.quad = null
  }
  if (state.uniformBuf != null) {
    state.uniformBuf.destroy()
    state.uniformBuf = null
  }

  state.pipeline = null
  state.pipelineFormat = null
}

export function render(device, frame) {
  var state = frame.state

  // No input: clear the target rather than retaining a previous frame.
  if (frame.input == null) {
    var clearEncoder = device.createCommandEncoder()
    var clearPass = clearEncoder.beginRenderPass({
      colorAttachments: [{
        view: frame.output.createView(),
        loadOp: "clear",
        clearValue: { r: 0, g: 0, b: 0, a: 0 },
        storeOp: "store",
      }],
    })
    clearPass.end()
    device.queue.submit([clearEncoder.finish()])
    return
  }

  if (state.pipelineFormat !== frame.output.format) {
    state.pipeline = device.createRenderPipeline({
      layout: "auto",
      vertex: {
        module: state.shaderModule,
        entryPoint: "vs_main",
        buffers: [{
          arrayStride: 16,
          attributes: [
            { shaderLocation: 0, format: "float32x2", offset: 0 },
            { shaderLocation: 1, format: "float32x2", offset: 8 },
          ],
        }],
      },
      fragment: {
        module: state.shaderModule,
        entryPoint: "fs_main",
        targets: [{ format: frame.output.format }],
      },
      primitive: { topology: "triangle-list" },
    })
    state.pipelineFormat = frame.output.format
  }

  var params = frame.params

  // Wrap time so float32 retains its lower bits during long playback.
  var time = (frame.time * 0.001 * params.speed) % 1024
  var noise01 = params.noise / 100
  var scanlines01 = params.scanlines / 100
  var curvature01 = params.curvature / 100
  var jitter01 = params.jitter / 100
  var vignette01 = params.vignette / 100
  var mask01 = params.mask / 100
  var aberrationPixels = params.aberration / 100 * 12
  var brightnessGain = Math.pow(2, params.brightness)
  var flicker01 = params.flicker / 100
  var clipToCurve = params.clipToCurve ? 1 : 0

  device.queue.writeBuffer(
    state.uniformBuf,
    0,
    new Float32Array([
      curvature01,
      scanlines01,
      mask01,
      aberrationPixels,
      0,
      brightnessGain,
      params.scanlineSize,
      time,
      flicker01,
      noise01,
      params.rollSpeed,
      jitter01,
      0,
      params.noiseSize,
      clipToCurve,
      params.maskPitch,
      frame.output.width,
      frame.output.height,
      params.maskType,
      vignette01,
      params.aberrationScheme,
      0,
      0,
      0,
    ]),
  )

  var bindGroup = device.createBindGroup({
    layout: state.pipeline.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: { buffer: state.uniformBuf } },
      { binding: 1, resource: state.sampler },
      { binding: 2, resource: frame.input.createView() },
    ],
  })

  var encoder = device.createCommandEncoder()
  var pass = encoder.beginRenderPass({
    colorAttachments: [{
      view: frame.output.createView(),
      loadOp: "clear",
      clearValue: { r: 0, g: 0, b: 0, a: 0 },
      storeOp: "store",
    }],
  })
  pass.setPipeline(state.pipeline)
  pass.setBindGroup(0, bindGroup)
  pass.setVertexBuffer(0, state.quad)
  pass.draw(6)
  pass.end()
  device.queue.submit([encoder.finish()])
}

defineProperties(Effect, {
  mask: {
    type: "number",
    label: "Mask",
    defaultValue: 30,
    control: "slider",
    min: 0,
    max: 100,
    step: 1,
    unit: "%",
  },
  maskType: {
    type: "number",
    label: "Mask type",
    defaultValue: 0,
    control: "select",
    options: [
      { value: 0, label: "Aperture grille" },
      { value: 1, label: "Slot" },
      { value: 2, label: "Shadow" },
    ],
  },

  maskPitch: {
    type: "number",
    label: "Mask size",
    defaultValue: 12,
    control: "slider",
    min: 2,
    max: 12,
    step: 0.5,
    unit: "px",
  },
  curvature: {
    type: "number",
    label: "Curvature",
    defaultValue: 0,
    control: "slider",
    min: 0,
    max: 100,
    step: 1,
    unit: "%",
  },
  clipToCurve: {
    type: "boolean",
    label: "Clip to curve",
    defaultValue: true,
  },
  scanlines: {
    type: "number",
    label: "Scanlines",
    defaultValue: 20,
    control: "slider",
    min: 0,
    max: 100,
    step: 1,
    unit: "%",
  },
  scanlineSize: {
    type: "number",
    label: "Scanline size",
    defaultValue: 8,
    control: "slider",
    min: 1,
    max: 32,
    step: 0.5,
  },
  aberration: {
    type: "number",
    label: "Dispersion",
    defaultValue: 47,
    control: "slider",
    min: 0,
    max: 100,
    step: 1,
    unit: "%",
  },
  aberrationScheme: {
    type: "number",
    label: "Dispersion type",
    defaultValue: 0,
    control: "select",
    options: [
      { value: 0, label: "Radial" },
      { value: 1, label: "Horizontal" },
      { value: 2, label: "Convergence" },
    ],
  },
  flicker: {
    type: "number",
    label: "Flicker",
    defaultValue: 62,
    control: "slider",
    min: 0,
    max: 100,
    step: 1,
    unit: "%",
  },
  noise: {
    type: "number",
    label: "Static",
    defaultValue: 20,
    control: "slider",
    min: 0,
    max: 100,
    step: 1,
    unit: "%",
  },
  noiseSize: {
    type: "number",
    label: "Static size",
    defaultValue: 1,
    control: "slider",
    min: 1,
    max: 8,
    step: 0.5,
  },
  rollSpeed: {
    type: "number",
    label: "Roll speed",
    defaultValue: 5,
    control: "slider",
    min: 0,
    max: 5,
    step: 0.01,
  },
  jitter: {
    type: "number",
    label: "Jitter",
    defaultValue: 3,
    control: "slider",
    min: 0,
    max: 100,
    step: 1,
    unit: "%",
  },
  vignette: {
    type: "number",
    label: "Vignette",
    defaultValue: 80,
    control: "slider",
    min: 0,
    max: 100,
    step: 1,
    unit: "%",
  },
  brightness: {
    type: "number",
    label: "Brightness",
    defaultValue: 0,
    control: "slider",
    min: -1,
    max: 1,
    step: 0.01,
  },
  speed: {
    type: "number",
    label: "Speed",
    defaultValue: 0.78,
    control: "slider",
    min: 0,
    max: 3,
    step: 0.01,
  },
})
