import { SystemMatrixCompare } from '../components/SystemMatrixCompare'
import { useLocale } from '../i18n/LocaleContext'

export function Matrix() {
  const { t } = useLocale()

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 max-w-2xl">
        <h1 className="mb-3 font-display text-3xl font-normal tracking-normal text-slate-950 dark:text-slate-50 sm:text-4xl">
          {t('matrix.title')}
        </h1>
        <p className="leading-relaxed text-content-secondary">
          {t('matrix.intro')}
        </p>
      </div>
      <SystemMatrixCompare />
    </div>
  )
}
