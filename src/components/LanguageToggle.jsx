import { useLocale } from '../i18n/LocaleContext'

export function LanguageToggle() {
  const { locale, setLocale, t } = useLocale()

  return (
    <div
      className="inline-flex items-center rounded-token border border-border-default bg-surface-secondary p-0.5 text-xs font-medium"
      role="group"
      aria-label={t('nav.language')}
    >
      <button
        type="button"
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        aria-label={t('nav.switchToEn')}
        className={`rounded-[calc(var(--radius-token)-2px)] px-2 py-1 transition-colors duration-200 ${
          locale === 'en'
            ? 'bg-surface-elevated text-content-primary shadow-token-sm'
            : 'text-content-muted hover:text-content-primary'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale('zh')}
        aria-pressed={locale === 'zh'}
        aria-label={t('nav.switchToZh')}
        className={`rounded-[calc(var(--radius-token)-2px)] px-2 py-1 transition-colors duration-200 ${
          locale === 'zh'
            ? 'bg-surface-elevated text-content-primary shadow-token-sm'
            : 'text-content-muted hover:text-content-primary'
        }`}
      >
        中文
      </button>
    </div>
  )
}
