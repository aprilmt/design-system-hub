import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { ToastProvider } from './components/ui/Toast'
import { ThemeToggle } from './components/ThemeToggle'
import { Home } from './pages/Home'
import { UISandbox } from './pages/UISandbox'

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
  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-40 bg-surface-primary/75 backdrop-blur-md">
          <nav
            className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6"
            aria-label="Main navigation"
          >
            <Link
              to="/"
              className="font-display text-lg font-normal tracking-normal text-slate-950 dark:text-slate-50"
            >
              DesignHub
            </Link>

            <div className="flex items-center gap-7">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/ui">Sandbox</NavLink>
              <ThemeToggle />
            </div>
          </nav>
        </header>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ui" element={<UISandbox />} />
          </Routes>
        </main>

        <footer className="py-8 text-center text-xs text-content-muted">
          April Ma. All Rights Reserved
        </footer>
      </div>
    </ToastProvider>
  )
}
