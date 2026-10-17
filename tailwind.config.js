/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./_includes/**/*.html",
    "./_layouts/**/*.html",
    "./_pages/**/*.md",
    "./_posts/**/*.md",
    "./*.html",
    "./*.md"
  ],
  theme: {
    extend: {
      // 1. COLOR SYSTEM (M3 Functional Tokens)
      colors: {
        primary: {
          DEFAULT: 'var(--md-sys-color-primary)',
          on: 'var(--md-sys-color-on-primary)',
          container: 'var(--md-sys-color-primary-container)',
          'on-container': 'var(--md-sys-color-on-primary-container)',
        },
        secondary: {
          DEFAULT: 'var(--md-sys-color-secondary)',
          on: 'var(--md-sys-color-on-secondary)',
          container: 'var(--md-sys-color-secondary-container)',
          'on-container': 'var(--md-sys-color-on-secondary-container)',
        },
        tertiary: {
          DEFAULT: 'var(--md-sys-color-tertiary)',
          on: 'var(--md-sys-color-on-tertiary)',
          container: 'var(--md-sys-color-tertiary-container)',
          'on-container': 'var(--md-sys-color-on-tertiary-container)',
        },
        error: {
          DEFAULT: 'var(--md-sys-color-error)',
          on: 'var(--md-sys-color-on-error)',
          container: 'var(--md-sys-color-error-container)',
          'on-container': 'var(--md-sys-color-on-error-container)',
        },
        background: 'var(--md-sys-color-background)',
        'on-background': 'var(--md-sys-color-on-background)',
        surface: {
          DEFAULT: 'var(--md-sys-color-surface)',
          on: 'var(--md-sys-color-on-surface)',
          variant: 'var(--md-sys-color-surface-variant)',
          'on-variant': 'var(--md-sys-color-on-surface-variant)',
        },
        outline: 'var(--md-sys-color-outline)',
        inverse: {
          surface: 'var(--md-sys-color-inverse-surface)',
          'on-surface': 'var(--md-sys-color-on-inverse-surface)',
          primary: 'var(--md-sys-color-inverse-primary)',
          'on-primary': 'var(--md-sys-color-on-inverse-primary)',
        },
        // Ouroboros Brand Accents (Directly accessible)
        brand: {
          gold: '#ddcba3', 
          indigo: '#0b1426',
          amber: '#ffbf00',
        }
      },

      // 2. TYPOGRAPHY SCALE (M3 Type Scales)
      fontSize: {
        'display-lg': ['var(--md-sys-typescale-display-large-size)', 'var(--md-sys-typescale-display-large-line-height)'],
        'display-md': ['var(--md-sys-typescale-display-medium-size)', 'var(--md-sys-typescale-display-medium-line-height)'],
        'headline-lg': ['var(--md-sys-typescale-headline-large-size)', 'var(--md-sys-typescale-headline-large-line-height)'],
        'headline-md': ['var(--md-sys-typescale-headline-medium-size)', 'var(--md-sys-typescale-headline-medium-line-height)'],
        'title-lg': ['var(--md-sys-typescale-title-large-size)', 'var(--md-sys-typescale-title-large-line-height)'],
        'body-lg': ['var(--md-sys-typescale-body-large-size)', 'var(--md-sys-typescale-body-large-line-height)'],
        'body-md': ['var(--md-sys-typescale-body-medium-size)', 'var(--md-sys-typescale-body-medium-line-height)'],
        'label-sm': ['var(--md-sys-typescale-label-small-size)', 'var(--md-sys-typescale-label-small-line-height)'],
      },

      // 3. SPACING SCALE (M3 Spacing Tokens)
      spacing: {
        'xs': 'var(--md-sys-spacing-xs)',
        'sm': 'var(--md-sys-spacing-sm)',
        'md': 'var(--md-sys-spacing-md)',
        'lg': 'var(--md-sys-spacing-lg)',
        'xl': 'var(--md-sys-spacing-xl)',
      },

      // 4. SHAPE & ELEVATION (M3 Corner/Shadow Tokens)
      borderRadius: {
        'none': 'var(--md-sys-shape-corner-none-default-size)',
        'sm': 'var(--md-sys-shape-corner-small-default-size)',
        'md': 'var(--md-sys-shape-corner-medium-default-size)',
        'lg': 'var(--md-sys-shape-corner-large-default-size)',
        'xl': 'var(--md-sys-shape-corner-extra-large-default-size)',
      },

      // 5. FONT FAMILIES (Brand Mappings)
      fontFamily: {
        sans: ['Syne', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        heading: ['Manufacturing Consent', 'serif'],
      },
    },
  },
  plugins: [],
}
