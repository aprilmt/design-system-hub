import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Blocks } from 'lucide-react'
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
          ? 'text-sm font-medium text-brand-primary'
          : 'text-sm font-medium text-content-secondary hover:text-content-primary transition-colors'
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
        <header className="sticky top-0 z-40 border-b border-border-default bg-surface-primary/80 backdrop-blur-md">
          <nav
            className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6"
            aria-label="Main navigation"
          >
            <Link
              to="/"
              className="flex items-center gap-2 text-content-primary"
            >
              <Blocks size={22} className="text-brand-primary" />
              <span className="font-bold text-slate-950 dark:text-slate-50">
                DesignHub
              </span>
            </Link>

            <div className="flex items-center gap-6">
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

        <footer className="border-t border-border-default py-6 text-center text-xs text-content-muted">
          April Ma. All Rights Reserved
        </footer>
      </div>
    </ToastProvider>
  )
}
