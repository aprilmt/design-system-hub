import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'

export function ThemeToggle() {
  const { t } = useLocale()
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return document.documentElement.classList.contains('dark')
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="rounded-token p-2 text-content-secondary hover:text-content-primary hover:bg-surface-secondary transition-colors"
      aria-label={dark ? t('theme.toLight') : t('theme.toDark')}
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}
