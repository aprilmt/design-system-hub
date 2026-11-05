import { useMemo, useState } from 'react'
import {
  Accessibility,
  Bot,
  Check,
  Layers,
  Scale,
  SwatchBook,
  X,
} from 'lucide-react'

const MAX_COMPARE = 3

export interface DesignEra {
  year: number
  label: string
  description: string
}

export interface DesignSystemEntry {
  id: string
  name: string
  year: number
  representative: boolean
  philosophy: string
  tailwind: string
  agentReady: string
  a11y: string
  license: string
}

export type CompareMetricKey =
  | 'philosophy'
  | 'tailwind'
  | 'agentReady'
  | 'a11y'
  | 'license'

export interface CompareMetric {
  key: CompareMetricKey
  label: string
}

export interface SystemMatrixCompareProps {
  className?: string
}

const ERAS: readonly DesignEra[] = [
  {
    year: 2014,
    label: 'Flat Design',
    description:
      'Interfaces shed skeuomorphic texture for flat color, simple icons, and system type. Material Design and the iOS 7 visual reset set the template most product teams copied.',
  },
  {
    year: 2018,
    label: 'Material 2 / Fluent',
    description:
      'Depth, motion, and elevation came back as systems, not decoration. Material 2 and Fluent treated light, motion, and density as tokens teams could share across platforms.',
  },
  {
    year: 2021,
    label: 'Material 3',
    description:
      'Personal color and large-screen layouts moved into the system itself. Material 3 (Material You) and Fluent 2 pushed dynamic theming and tighter design-to-code tokens.',
  },
  {
    year: 2023,
    label: 'Headless & Tailwind',
    description:
      'Styling and behavior split apart. Radix, Headless UI, and shadcn/ui let teams own the markup, style it with Tailwind, and keep accessibility in the primitive.',
  },
  {
    year: 2026,
    label: 'Meta Astryx',
    description:
      'A forward-looking paradigm in this timeline: tokens, components, and agent tooling share one contract so Cursor-style agents can assemble UI without inventing a second source of truth. Astryx here is illustrative, not a shipped Meta product.',
  },
]

const SYSTEMS: readonly DesignSystemEntry[] = [
  {
    id: 'material-2014',
    name: 'Material Design',
    year: 2014,
    representative: true,
    philosophy: 'Paper, ink, and bold color as a cross-platform visual language.',
    tailwind: 'Low — component CSS, not utilities',
    agentReady: 'Limited — docs-first, no MCP surface',
    a11y: 'AA-oriented guidance',
    license: 'Apache-2.0',
  },
  {
    id: 'ios-7',
    name: 'iOS 7 HIG',
    year: 2014,
    representative: true,
    philosophy: 'Flat chrome, clarity, and deference to content.',
    tailwind: 'Low — platform UIKit styling',
    agentReady: 'Limited',
    a11y: 'AA via UIKit traits',
    license: 'Apple proprietary',
  },
  {
    id: 'material-2',
    name: 'Material 2',
    year: 2018,
    representative: true,
    philosophy: 'Elevation, motion, and a stricter component catalog.',
    tailwind: 'Partial — theming via Sass / CSS vars',
    agentReady: 'Limited',
    a11y: 'AA-oriented components',
    license: 'Apache-2.0',
  },
  {
    id: 'fluent',
    name: 'Fluent',
    year: 2018,
    representative: true,
    philosophy: 'Light, depth, motion, and material as Microsoft’s design language.',
    tailwind: 'Partial — Fluent UI ships its own styles',
    agentReady: 'Limited',
    a11y: 'AA-oriented (Fluent UI)',
    license: 'MIT',
  },
  {
    id: 'carbon',
    name: 'Carbon',
    year: 2018,
    representative: false,
    philosophy: 'Dense, productive IBM enterprise UI with a shared token set.',
    tailwind: 'Adaptable — community Tailwind ports',
    agentReady: 'Emerging — structured tokens',
    a11y: 'AA-oriented',
    license: 'Apache-2.0',
  },
  {
    id: 'material-3',
    name: 'Material 3',
    year: 2021,
    representative: true,
    philosophy: 'Dynamic color, personal theming, and adaptive layout.',
    tailwind: 'Adaptable — token mapping, not native',
    agentReady: 'Emerging',
    a11y: 'AA-oriented',
    license: 'Apache-2.0',
  },
  {
    id: 'fluent-2',
    name: 'Fluent 2',
    year: 2021,
    representative: true,
    philosophy: 'One token pipeline from design files into Fluent UI.',
    tailwind: 'Adaptable',
    agentReady: 'Emerging',
    a11y: 'AA-oriented',
    license: 'MIT',
  },
  {
    id: 'shadcn',
    name: 'shadcn/ui',
    year: 2023,
    representative: true,
    philosophy: 'Copy-owned components on Radix and Tailwind, not a dependency.',
    tailwind: 'Native',
    agentReady: 'High — source in-repo, Cursor-friendly',
    a11y: 'Strong primitives (Radix)',
    license: 'MIT',
  },
  {
    id: 'radix',
    name: 'Radix UI',
    year: 2023,
    representative: true,
    philosophy: 'Headless behavior and accessibility, styling left to the app.',
    tailwind: 'Native pairing',
    agentReady: 'High — composable, predictable APIs',
    a11y: 'Strong primitives',
    license: 'MIT',
  },
  {
    id: 'headlessui',
    name: 'Headless UI',
    year: 2023,
    representative: false,
    philosophy: 'Unstyled Tailwind Labs primitives for menus, dialogs, and lists.',
    tailwind: 'Native',
    agentReady: 'High',
    a11y: 'Strong primitives',
    license: 'MIT',
  },
  {
    id: 'astryx',
    name: 'Astryx',
    year: 2026,
    representative: true,
    philosophy: 'Agent-native tokens: one contract for UI, docs, and tool use.',
    tailwind: 'Native',
    agentReady: 'First-class — MCP / Cursor as a design surface',
    a11y: 'AA+ expected in the contract',
    license: 'Illustrative',
  },
]

const METRICS: readonly CompareMetric[] = [
  { key: 'philosophy', label: 'Design philosophy' },
  { key: 'tailwind', label: 'Tailwind compatibility' },
  { key: 'agentReady', label: 'AI / agent-ready' },
  { key: 'a11y', label: 'Accessibility' },
  { key: 'license', label: 'License' },
]

const METRIC_ICONS: Record<CompareMetricKey, typeof Layers> = {
  philosophy: Layers,
  tailwind: SwatchBook,
  agentReady: Bot,
  a11y: Accessibility,
  license: Scale,
}

function eraByYear(year: number): DesignEra {
  const era = ERAS.find((item) => item.year === year)
  if (!era) {
    throw new Error(`Unknown era year: ${year}`)
  }
  return era
}

export function SystemMatrixCompare({ className }: SystemMatrixCompareProps) {
  const [activeYear, setActiveYear] = useState<number>(2023)
  const [selectedIds, setSelectedIds] = useState<string[]>(['shadcn', 'radix', 'material-3'])
  const [limitNote, setLimitNote] = useState<string>('')

  const era = eraByYear(activeYear)

  const visibleSystems = useMemo(
    () => SYSTEMS.filter((system) => system.year === activeYear),
    [activeYear],
  )

  const selected = useMemo(
    () =>
      selectedIds
        .map((id) => SYSTEMS.find((system) => system.id === id))
        .filter((system): system is DesignSystemEntry => system !== undefined),
    [selectedIds],
  )

  function toggleSystem(id: string) {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        setLimitNote('')
        return current.filter((item) => item !== id)
      }
      if (current.length >= MAX_COMPARE) {
        setLimitNote(`Compare up to ${MAX_COMPARE} systems. Remove one to add another.`)
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
            <h2 className="font-bold text-slate-950 dark:text-slate-50">Paradigm timeline</h2>
            <p className="mt-1 text-sm text-content-secondary">
              2014–2026. Choose a year to read the era and highlight its systems.
            </p>
          </div>
        </div>

        <div
          className="relative"
          role="tablist"
          aria-label="Design paradigm years"
        >
          <div
            aria-hidden
            className="absolute left-4 right-4 top-5 h-px bg-border-default"
          />
          <div className="flex gap-2 overflow-x-auto pb-1">
            {ERAS.map((item) => {
              const selectedYear = item.year === activeYear
              return (
                <button
                  key={item.year}
                  type="button"
                  role="tab"
                  aria-selected={selectedYear}
                  onClick={() => setActiveYear(item.year)}
                  className={`relative z-10 flex min-w-[7.5rem] flex-1 flex-col items-start rounded-2xl px-3 py-3 text-left transition-colors duration-300 ${
                    selectedYear
                      ? 'bg-brand-primary text-content-on-brand'
                      : 'bg-surface-primary text-content-secondary hover:bg-surface-secondary hover:text-content-primary'
                  }`}
                >
                  <span className="text-sm font-bold">{item.year}</span>
                  <span className={`mt-1 text-xs leading-snug ${selectedYear ? 'text-white/85' : 'text-content-muted'}`}>
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <p
          key={era.year}
          className="mt-6 max-w-3xl text-sm leading-relaxed text-content-secondary transition-opacity duration-300"
        >
          <span className="font-bold text-slate-950 dark:text-slate-50">
            {era.year} · {era.label}.{' '}
          </span>
          {era.description}
        </p>
      </section>

      <section className="mt-6 rounded-[2.5rem] border border-border-default bg-surface-elevated p-6 shadow-token-sm sm:p-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-bold text-slate-950 dark:text-slate-50">Systems in {era.year}</h2>
            <p className="mt-1 text-sm text-content-secondary">
              Highlighted cards represent this era. Select up to {MAX_COMPARE} systems to compare — picks persist across years.
            </p>
          </div>
          <p className="text-xs font-medium text-content-muted">
            {selected.length} / {MAX_COMPARE} selected
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
                  className={`flex w-full items-start gap-3 rounded-[1.5rem] border px-4 py-3 text-left transition-colors duration-300 ${
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
                      {system.representative ? 'Representative' : 'Also in this era'} · {system.year}
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
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <caption className="mb-3 text-left font-bold text-slate-950 dark:text-slate-50">
              Comparison
            </caption>
            <thead>
              <tr className="border-b border-border-default">
                <th scope="col" className="py-3 pr-4 text-xs font-medium uppercase tracking-wider text-content-muted">
                  Metric
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
                        aria-label={`Remove ${system.name} from comparison`}
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
                    No systems selected
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {METRICS.map((metric) => {
                const Icon = METRIC_ICONS[metric.key]
                return (
                  <tr key={metric.key} className="border-b border-border-default last:border-b-0">
                    <th scope="row" className="py-4 pr-4 align-top font-medium text-content-primary">
                      <span className="inline-flex items-center gap-2">
                        <Icon size={15} className="text-brand-primary" aria-hidden />
                        {metric.label}
                      </span>
                    </th>
                    {selected.map((system) => (
                      <td key={system.id} className="px-3 py-4 align-top text-content-secondary">
                        {system[metric.key]}
                      </td>
                    ))}
                    {selected.length === 0 ? (
                      <td className="px-3 py-4 text-content-muted">
                        Pick a system above to fill this row.
                      </td>
                    ) : null}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-content-muted">
          Snapshot for this hub, not an official vendor scorecard. Tailwind and agent-ready notes describe how readily a system sits in a Tailwind or Cursor workflow.
        </p>
      </section>
    </div>
  )
}
