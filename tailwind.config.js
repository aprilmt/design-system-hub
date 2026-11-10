/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--color-brand-primary)',
          'primary-hover': 'var(--color-brand-primary-hover)',
          'primary-active': 'var(--color-brand-primary-active)',
          secondary: 'var(--color-brand-secondary)',
          'secondary-hover': 'var(--color-brand-secondary-hover)',
        },
        surface: {
          primary: 'var(--color-surface-primary)',
          secondary: 'var(--color-surface-secondary)',
          elevated: 'var(--color-surface-elevated)',
          overlay: 'var(--color-surface-overlay)',
        },
        content: {
          primary: 'var(--color-content-primary)',
          secondary: 'var(--color-content-secondary)',
          muted: 'var(--color-content-muted)',
          inverse: 'var(--color-content-inverse)',
          'on-brand': 'var(--color-content-on-brand)',
        },
        feedback: {
          error: 'var(--color-feedback-error)',
          'error-light': 'var(--color-feedback-error-light)',
          success: 'var(--color-feedback-success)',
          'success-light': 'var(--color-feedback-success-light)',
          warning: 'var(--color-feedback-warning)',
          'warning-light': 'var(--color-feedback-warning-light)',
          info: 'var(--color-feedback-info)',
          'info-light': 'var(--color-feedback-info-light)',
        },
        border: {
          DEFAULT: 'var(--color-border-default)',
          strong: 'var(--color-border-strong)',
          focus: 'var(--color-border-focus)',
        },
      },
      borderRadius: {
        token: 'var(--radius-token)',
        'token-sm': 'var(--radius-token-sm)',
        'token-lg': 'var(--radius-token-lg)',
        'token-full': 'var(--radius-token-full)',
      },
      boxShadow: {
        'token-sm': 'var(--shadow-token-sm)',
        token: 'var(--shadow-token)',
        'token-lg': 'var(--shadow-token-lg)',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: [
          '"Gill Sans Display"',
          '"Gill Sans"',
          '"Gill Sans MT"',
          'sans-serif',
        ],
      },
      keyframes: {
        'overlay-show': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'overlay-hide': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'content-show': {
          from: { opacity: '0', transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
        // Motion Prompt #056 — slide 240px, 350ms easeOutCubic / easeInOutCubic
        'toast-slide-in': {
          from: { transform: 'translateX(240px)' },
          to: { transform: 'translateX(0)' },
        },
        'toast-slide-out': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(240px)' },
        },
        'toast-life': {
          from: { transform: 'scaleX(1)' },
          to: { transform: 'scaleX(0)' },
        },
        'toast-swipe-out': {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: { transform: 'translateX(240px)' },
        },
        // Motion Prompt #072 — empty rise 8px / 350ms linear; fade out 200ms; rows return 60px / 350ms easeOutCubic
        'empty-rise-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'empty-fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'empty-row-in': {
          from: { opacity: '0', transform: 'translateX(-60px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        // Motion Prompt #057 — panel out 200ms linear; panel in 200ms linear + rise 8px
        'tab-panel-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'tab-panel-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'overlay-show': 'overlay-show 150ms ease-out',
        'overlay-hide': 'overlay-hide 150ms ease-in',
        'content-show': 'content-show 150ms ease-out',
        'toast-slide-in': 'toast-slide-in 350ms cubic-bezier(0.33, 1, 0.68, 1)',
        'toast-slide-out': 'toast-slide-out 350ms cubic-bezier(0.65, 0, 0.35, 1)',
        'toast-life': 'toast-life var(--toast-life-ms, 1800ms) linear forwards',
        'toast-swipe-out': 'toast-swipe-out 350ms cubic-bezier(0.65, 0, 0.35, 1)',
        'empty-rise-in': 'empty-rise-in 350ms linear both',
        'empty-fade-out': 'empty-fade-out 200ms linear both',
        'empty-row-in': 'empty-row-in 350ms cubic-bezier(0.33, 1, 0.68, 1) both',
        'tab-panel-out': 'tab-panel-out 200ms linear both',
        'tab-panel-in': 'tab-panel-in 200ms linear both',
      },
    },
  },
  plugins: [],
}
