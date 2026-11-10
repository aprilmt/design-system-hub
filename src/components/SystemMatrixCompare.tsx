import { useEffect, useMemo, useState } from 'react'
import {
  Accessibility,
  Bot,
  Check,
  Layers,
  Scale,
  SwatchBook,
  X,
} from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'

const MAX_COMPARE = 3

export interface DesignSystemBase {
  id: string
  name: string
  year: number
  representative: boolean
}

export type CompareMetricKey =
  | 'philosophy'
  | 'tailwind'
  | 'agentReady'
  | 'a11y'
  | 'license'

export interface SystemMatrixCompareProps {
  className?: string
}

const SYSTEMS: readonly DesignSystemBase[] = [
  { id: 'material-2014', name: 'Material Design', year: 2014, representative: true },
  { id: 'ios-7', name: 'iOS 7 HIG', year: 2014, representative: true },
  { id: 'material-2', name: 'Material 2', year: 2018, representative: true },
  { id: 'fluent', name: 'Fluent', year: 2018, representative: true },
  { id: 'carbon', name: 'Carbon', year: 2018, representative: false },
  { id: 'material-3', name: 'Material 3', year: 2021, representative: true },
  { id: 'fluent-2', name: 'Fluent 2', year: 2021, representative: true },
  { id: 'shadcn', name: 'shadcn/ui', year: 2023, representative: true },
  { id: 'radix', name: 'Radix UI', year: 2023, representative: true },
  { id: 'headlessui', name: 'Headless UI', year: 2023, representative: false },
  { id: 'astryx', name: 'Astryx', year: 2026, representative: true },
]

const ERA_YEARS = [2014, 2018, 2021, 2023, 2026] as const

const METRIC_KEYS: readonly CompareMetricKey[] = [
  'philosophy',
  'tailwind',
  'agentReady',
  'a11y',
  'license',
]

const METRIC_ICONS: Record<CompareMetricKey, typeof Layers> = {
  philosophy: Layers,
  tailwind: SwatchBook,
  agentReady: Bot,
  a11y: Accessibility,
  license: Scale,
}

export function SystemMatrixCompare({ className }: SystemMatrixCompareProps) {
  const { t, dict, locale } = useLocale()
  const [activeYear, setActiveYear] = useState<number>(2023)
  const [selectedIds, setSelectedIds] = useState<string[]>(['shadcn', 'radix', 'material-3'])
  const [limitNote, setLimitNote] = useState<string>('')

  useEffect(() => {
    setLimitNote('')
  }, [locale])

  const eraCopy = dict.matrix.eras[String(activeYear) as keyof typeof dict.matrix.eras]

  const visibleSystems = useMemo(
    () => SYSTEMS.filter((system) => system.year === activeYear),
    [activeYear],
  )

  const selected = useMemo(
    () =>
      selectedIds
        .map((id) => SYSTEMS.find((system) => system.id === id))
        .filter((system): system is DesignSystemBase => system !== undefined),
    [selectedIds],
  )

  function systemCopy(id: string) {
    return dict.matrix.systems[id as keyof typeof dict.matrix.systems]
  }

  function toggleSystem(id: string) {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        setLimitNote('')
        return current.filter((item) => item !== id)
      }
      if (current.length >= MAX_COMPARE) {
        setLimitNote(t('matrix.limitNote', { max: MAX_COMPARE }))
        return current
      }
      setLimitNote('')
      return [...current, id]
    })
  }

  return (
    <div className={className}>
      <section className="rounded-[2.5rem] border border-border-default bg-surface-elevated p-6 shadow-token-sm sm:p-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-bold text-slate-950 dark:text-slate-50">
              {t('matrix.timelineTitle')}
            </h2>
            <p className="mt-1 text-sm text-content-secondary">
              {t('matrix.timelineLead')}
            </p>
          </div>
        </div>

        <div
          className="relative"
          role="tablist"
          aria-label={t('matrix.yearsAria')}
        >
          <div
            aria-hidden
            className="absolute left-4 right-4 top-5 h-px bg-border-default"
          />
          <div className="flex gap-2 overflow-x-auto pb-1">
            {ERA_YEARS.map((year) => {
              const selectedYear = year === activeYear
              const label = dict.matrix.eras[String(year) as keyof typeof dict.matrix.eras].label
              return (
                <button
                  key={year}
                  type="button"
                  role="tab"
                  aria-selected={selectedYear}
                  onClick={() => setActiveYear(year)}
                  className={`relative z-10 flex min-w-30 flex-1 flex-col items-start rounded-2xl px-3 py-3 text-left transition-colors duration-300 ${
                    selectedYear
                      ? 'bg-brand-primary text-content-on-brand'
                      : 'bg-surface-primary text-content-secondary hover:bg-surface-secondary hover:text-content-primary'
                  }`}
                >
                  <span className="text-sm font-bold">{year}</span>
                  <span className={`mt-1 text-xs leading-snug ${selectedYear ? 'text-white/85' : 'text-content-muted'}`}>
                    {label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <p
          key={`${activeYear}-${eraCopy.label}`}
          className="mt-6 max-w-3xl text-sm leading-relaxed text-content-secondary transition-opacity duration-300"
        >
          <span className="font-bold text-slate-950 dark:text-slate-50">
            {activeYear} · {eraCopy.label}.{' '}
          </span>
          {eraCopy.description}
        </p>
      </section>

      <section className="mt-6 rounded-[2.5rem] border border-border-default bg-surface-elevated p-6 shadow-token-sm sm:p-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-bold text-slate-950 dark:text-slate-50">
              {t('matrix.systemsTitle', { year: activeYear })}
            </h2>
            <p className="mt-1 text-sm text-content-secondary">
              {t('matrix.systemsLead', { max: MAX_COMPARE })}
            </p>
          </div>
          <p className="text-xs font-medium text-content-muted">
            {t('matrix.selectedCount', { count: selected.length, max: MAX_COMPARE })}
          </p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {visibleSystems.map((system) => {
            const on = selectedIds.includes(system.id)
            return (
              <li key={system.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleSystem(system.id)}
                  className={`flex w-full items-start gap-3 rounded-3xl border px-4 py-3 text-left transition-colors duration-300 ${
                    on
                      ? 'border-brand-primary bg-brand-secondary'
                      : 'border-border-default bg-surface-primary hover:bg-surface-secondary'
                  } ${system.representative ? 'ring-1 ring-brand-primary/40' : ''}`}
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                      on
                        ? 'border-brand-primary bg-brand-primary text-content-on-brand'
                        : 'border-border-strong text-transparent'
                    }`}
                    aria-hidden
                  >
                    <Check size={12} />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-slate-950 dark:text-slate-50">
                      {system.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-content-muted">
                      {system.representative
                        ? t('matrix.representative')
                        : t('matrix.alsoInEra')}{' '}
                      · {system.year}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        {limitNote ? (
          <p role="status" className="mt-4 text-sm text-feedback-warning">
            {limitNote}
          </p>
        ) : null}

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-160 border-collapse text-left text-sm">
            <caption className="mb-3 text-left font-bold text-slate-950 dark:text-slate-50">
              {t('matrix.comparison')}
            </caption>
            <thead>
              <tr className="border-b border-border-default">
                <th scope="col" className="py-3 pr-4 text-xs font-medium uppercase tracking-wider text-content-muted">
                  {t('matrix.metric')}
                </th>
                {selected.map((system) => (
                  <th
                    key={system.id}
                    scope="col"
                    className="px-3 py-3 font-bold text-slate-950 dark:text-slate-50"
                  >
                    <span className="flex items-start justify-between gap-2">
                      <span>
                        {system.name}
                        <span className="mt-0.5 block text-xs font-medium text-content-muted">
                          {system.year}
                        </span>
                      </span>
                      <button
                        type="button"
                        aria-label={t('matrix.remove', { name: system.name })}
                        onClick={() => toggleSystem(system.id)}
                        className="rounded-full p-1 text-content-muted transition-colors duration-300 hover:bg-surface-secondary hover:text-content-primary"
                      >
                        <X size={14} aria-hidden />
                      </button>
                    </span>
                  </th>
                ))}
                {selected.length === 0 ? (
                  <th scope="col" className="px-3 py-3 font-medium text-content-muted">
                    {t('matrix.noneSelected')}
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {METRIC_KEYS.map((key) => {
                const Icon = METRIC_ICONS[key]
                return (
                  <tr key={key} className="border-b border-border-default last:border-b-0">
                    <th scope="row" className="py-4 pr-4 align-top font-medium text-content-primary">
                      <span className="inline-flex items-center gap-2">
                        <Icon size={15} className="text-brand-primary" aria-hidden />
                        {t(`matrix.metrics.${key}`)}
                      </span>
                    </th>
                    {selected.map((system) => (
                      <td key={system.id} className="px-3 py-4 align-top text-content-secondary">
                        {systemCopy(system.id)[key]}
                      </td>
                    ))}
                    {selected.length === 0 ? (
                      <td className="px-3 py-4 text-content-muted">
                        {t('matrix.pickAbove')}
                      </td>
                    ) : null}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-content-muted">
          {t('matrix.footnote')}
        </p>
      </section>
    </div>
  )
}
