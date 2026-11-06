import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { formatMessage, messages } from './messages'

const STORAGE_KEY = 'locale'

/** @type {import('react').Context<{ locale: 'en' | 'zh', setLocale: (locale: 'en' | 'zh') => void, t: (path: string, vars?: Record<string, string | number>) => string, dict: typeof messages.en } | null>} */
const LocaleContext = createContext(null)

function readStoredLocale() {
  if (typeof window === 'undefined') return 'en'
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'zh' || stored === 'en' ? stored : 'en'
}

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => {
    if (acc == null) return undefined
    return acc[key]
  }, obj)
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(readStoredLocale)

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
    localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  const setLocale = useCallback((next) => {
    if (next === 'en' || next === 'zh') setLocaleState(next)
  }, [])

  const dict = messages[locale]

  const t = useCallback(
    (path, vars) => {
      const value = getByPath(dict, path)
      if (typeof value !== 'string') {
        if (import.meta.env.DEV) {
          console.warn(`[i18n] missing string: ${locale}.${path}`)
        }
        return path
      }
      return vars ? formatMessage(value, vars) : value
    },
    [dict, locale],
  )

  const value = useMemo(
    () => ({ locale, setLocale, t, dict }),
    [locale, setLocale, t, dict],
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    throw new Error('useLocale must be used within LocaleProvider')
  }
  return ctx
}
