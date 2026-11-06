import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { ToastProvider } from './components/ui/Toast'
import { ThemeToggle } from './components/ThemeToggle'
import { LanguageToggle } from './components/LanguageToggle'
import { useLocale } from './i18n/LocaleContext'
import { Home } from './pages/Home'
import { UISandbox } from './pages/UISandbox'
import { Matrix } from './pages/Matrix'

function NavLink({ to, children }) {
  const { pathname } = useLocation()
  const active = pathname === to
  return (
    <Link
      to={to}
      className={
        active
          ? 'text-sm font-medium text-content-primary'
          : 'text-sm text-content-muted transition-colors hover:text-content-primary'
      }
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </Link>
  )
}

export function App() {
  const { t } = useLocale()

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-40 bg-surface-primary/75 backdrop-blur-md">
          <nav
            className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6"
            aria-label={t('nav.aria')}
          >
            <Link
              to="/"
              className="font-display text-lg font-normal tracking-normal text-slate-950 dark:text-slate-50"
            >
              DesignHub
            </Link>

            <div className="flex items-center gap-4 sm:gap-6">
              <NavLink to="/">{t('nav.home')}</NavLink>
              <NavLink to="/ui">{t('nav.sandbox')}</NavLink>
              <NavLink to="/matrix">{t('nav.matrix')}</NavLink>
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </nav>
        </header>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ui" element={<UISandbox />} />
            <Route path="/matrix" element={<Matrix />} />
          </Routes>
        </main>

        <footer className="py-8 text-center text-xs text-content-muted">
          {t('footer')}
        </footer>
      </div>
    </ToastProvider>
  )
}
