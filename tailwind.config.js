/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
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
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
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
        'toast-slide-in': {
          from: { transform: 'translateX(calc(100% + 1rem))' },
          to: { transform: 'translateX(0)' },
        },
        'toast-hide': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'toast-swipe-out': {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: { transform: 'translateX(calc(100% + 1rem))' },
        },
      },
      animation: {
        'overlay-show': 'overlay-show 150ms ease-out',
        'overlay-hide': 'overlay-hide 150ms ease-in',
        'content-show': 'content-show 150ms ease-out',
        'toast-slide-in': 'toast-slide-in 200ms ease-out',
        'toast-hide': 'toast-hide 100ms ease-in',
        'toast-swipe-out': 'toast-swipe-out 100ms ease-out',
      },
    },
  },
  plugins: [],
}
