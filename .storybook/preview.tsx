import type { Preview } from '@storybook/react-vite'
import '../src/layers.css'
import '../src/index.css'
import { LocaleProvider } from '../src/i18n/LocaleContext'
import { ToastProvider } from '../src/components/ui/Toast'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <LocaleProvider>
        <ToastProvider>
          <div className="bg-surface-primary p-6 text-content-primary">
            <Story />
          </div>
        </ToastProvider>
      </LocaleProvider>
    ),
  ],
  async beforeEach() {
    // Keys the app reads in index.html / LocaleContext / ThemeToggle
    if (!('theme' in localStorage)) localStorage.setItem('theme', 'light')
    if (!('locale' in localStorage)) localStorage.setItem('locale', 'en')
    document.documentElement.classList.remove('dark')
    document.documentElement.lang = 'en'
  },
}

export default preview