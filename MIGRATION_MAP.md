# Design System Migration Map (Final Draft)

**Strategy:** 
1. **Primitives (`--p-`)**: Agnostic values stored in `_sass/_primitives.scss`.
2. **Semantic Layer (`--md-`)**: Functional roles in `_variables.scss` using primitives.
3. **Replacement**: Components move from `--ourob-` $\rightarrow$ `--md-`.

---

## 1. Spacing Scale (Primitives $\rightarrow$ Semantic)

| Legacy Token (`--ourob-`) | Primitive (`--p-`) | Semantic (`--md-`) | Value / Note |
| :--- | :--- | :--- | :--- |
| `--ourob-space-1` | `--p-spacing-xs` | `--md-sys-spacing-xs` | 0.25rem (4px) |
| `--ourob-space-2` | `--p-spacing-sm-tight` | - | 0.375rem |
| `--ourob-space-3` | `--p-spacing-sm` | `--md-sys-spacing-sm` | 0.5rem (8px) |
| `--ourob-space-4` | `--p-spacing-md-tight` | - | 0.75rem |
| `--ourob-space-5` | `--p-spacing-md` | `--md-sys-spacing-md` | 1rem (16px) |
| `--ourob-space-6` | `--p-spacing-lg-tight` | - | 1.25rem |
| `--ourob-space-7` | `--p-spacing-lg` | `--md-sys-spacing-lg` | 1.5rem (24px) |
| `--ourob-space-8` | `--p-spacing-xl` | `--md-sys-spacing-xl` | 2rem (32px) |
| `--ourob-space-9` | `--p-spacing-xxl` | - | 2.5rem |
| `--ourob-space-10` | `--p-spacing-xxx-l` | - | 3rem |
| `--ourob-space-11` | `--p-spacing-xxx-xl` | - | 4rem |

---

## 2. Shape / Radius Scale (Primitives $\rightarrow$ Semantic)

| Legacy Token (`--ourob-`) | Primitive (`--p-`) | Semantic (`--md-`) | Value / Note |
| :--- | :--- | :--- | :--- |
| `--ourob-radius-1` | `--p-radius-xs` | - | 2px |
| `--ourob-radius-3` | `--p-radius-sm` | `--md-sys-shape-sm` | 4px |
| `--ourob-radius-4` | `--p-radius-md` | `--md-sys-shape-md` | 8px |
| `--ourob-radius-5` | `--p-radius-lg` | `--md-sys-shape-lg` | 20px |
| `--ourob-radius-round` | `--p-radius-full` | `--md-sys-shape-full` | 50% |

---

## 3. Typography Scale (Primitives $\rightarrow$ Semantic)

| Legacy Token (`--ourob-`) | Primitive (`--p-`) | Semantic (`--md-`) | Value / Note |
| :--- | :--- | :--- | :--- |
| `--ourob-type-size-3` | `--p-font-base` | `--md-sys-typescale-body-large` | 1rem (16px) |
| `--ourob-type-h6` | `--p-font-h6` | `--md-sys-typescale-headline-medium` | 20px |
| `--ourob-type-weight-bold` | `--p-weight-bold` | - | 700 |

---

## 4. Color Mapping (The Hardest Part)
*Note: These will map to semantic roles in the Light/Dark theme switch.*

| Legacy Token Group (`--ourob-`) | Role/Intent | Proposed Semantic (`--md-`) |
| :--- | :--- | :--- |
| `--ourob-color-surface-\*` | Background / Elevation | `--md-sys-color-surface` |
| `--ourob-color-mark` | Primary Brand Color | `--md-sys-color-primary` |
| `--ourob-color-ink-4` | Text on Primary | `--md-sys-color-on-primary` |
| `--ourob-color-accent-\*` | Secondary/Tertiary | `--md-sys-color-secondary / tertiary` |
| `--ourob-color-line-\*` | Dividers/Outlines | `--md-sys-color-outline` |

---

## 5. Elevation (Primitives $\rightarrow$ Semantic)

| Legacy Token (`--ourob-`) | Primitive (`--p-`) | Semantic (`--md-`) |
| :--- | :--- | :--- |
| `--ourob-elev-1` | `--p-shadow-sm` | `--md-sys-elevation-level-1` |
| `--ourob-elev-3` | `--p-shadow-lg` | `--md-sys-elevation-level-3` |

