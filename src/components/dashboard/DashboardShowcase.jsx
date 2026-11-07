import { useState } from 'react'
import {
  Home,
  LayoutGrid,
  BarChart3,
  Settings,
  User,
} from 'lucide-react'
import { useLocale } from '../../i18n/LocaleContext'
import { cn } from '../../lib/utils'

function Label({ children }) {
  return (
    <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-content-muted">
      {children}
    </span>
  )
}

function Bone({ className }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-token bg-slate-200 dark:bg-slate-700',
        className,
      )}
      aria-hidden
    />
  )
}

function IconRail() {
  const icons = [Home, LayoutGrid, BarChart3, Settings]
  return (
    <aside className="flex w-14 shrink-0 flex-col items-center justify-between border-r border-border-default bg-surface-elevated py-4">
      <div className="flex flex-col items-center gap-3">
        {icons.map((Icon, i) => (
          <span
            key={i}
            className="flex h-9 w-9 items-center justify-center rounded-token bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
          >
            <Icon size={16} aria-hidden />
          </span>
        ))}
      </div>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400">
        <User size={16} aria-hidden />
      </span>
    </aside>
  )
}

function BrowserChrome({ children, title }) {
  return (
    <div className="overflow-hidden rounded-token-lg border border-border-default bg-surface-secondary shadow-token">
      <div className="flex items-center gap-3 border-b border-border-default bg-surface-elevated px-3 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
        </div>
        <div className="flex h-7 flex-1 items-center rounded-token bg-surface-secondary px-3">
          <span className="truncate font-mono text-[11px] text-content-muted">
            {title}
          </span>
        </div>
      </div>
      {children}
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="rounded-token-lg border border-border-default bg-surface-elevated p-4">
      <Bone className="h-2.5 w-16" />
      <Bone className="mt-4 h-8 w-28" />
    </div>
  )
}

function OverviewSkeleton({ copy }) {
  return (
    <BrowserChrome title={copy.browserUrl}>
      <div
        className="flex min-h-[420px] bg-surface-secondary"
        role="img"
        aria-label={copy.overviewAria}
      >
        <IconRail />
        <div className="flex min-w-0 flex-1 flex-col gap-5 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Bone className="h-7 w-7 rounded-token" />
              <Bone className="h-4 w-36 sm:w-44" />
            </div>
            <Bone className="h-9 w-24 rounded-token" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>

          <div className="flex-1 rounded-token-lg border border-border-default bg-surface-elevated p-4">
            <div className="mb-4 flex gap-6 border-b border-border-default pb-3">
              <Bone className="h-2.5 w-14" />
              <Bone className="h-2.5 w-16" />
              <Bone className="h-2.5 w-12" />
              <Bone className="hidden h-2.5 w-14 sm:block" />
            </div>
            <div className="space-y-4">
              {[0, 1, 2].map((row) => (
                <div key={row} className="flex items-center gap-4">
                  <Bone className="h-3 w-24 flex-1 sm:max-w-[140px]" />
                  <Bone className="hidden h-3 w-20 sm:block" />
                  <Bone className="hidden h-3 w-16 md:block" />
                  <Bone className="ml-auto h-6 w-16 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BrowserChrome>
  )
}

function AnalyticsSkeleton({ copy }) {
  return (
    <BrowserChrome title={copy.browserUrl}>
      <div
        className="flex min-h-[420px] bg-surface-secondary"
        role="img"
        aria-label={copy.analyticsAria}
      >
        <IconRail />
        <div className="flex min-w-0 flex-1 flex-col gap-5 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-2">
              <Bone className="h-3 w-20" />
              <Bone className="h-5 w-40" />
            </div>
            <div className="flex gap-2">
              <Bone className="h-9 w-20 rounded-token" />
              <Bone className="h-9 w-16 rounded-token" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-token-lg border border-border-default bg-surface-elevated p-4"
              >
                <Bone className="h-2.5 w-14" />
                <Bone className="mt-3 h-7 w-20" />
                <Bone className="mt-3 h-2 w-16" />
              </div>
            ))}
          </div>

          <div className="grid flex-1 grid-cols-1 gap-3 lg:grid-cols-5">
            <div className="rounded-token-lg border border-border-default bg-surface-elevated p-4 lg:col-span-3">
              <Bone className="mb-4 h-3 w-24" />
              <div className="flex h-36 items-end gap-2" aria-hidden>
                {[40, 62, 48, 78, 55, 88, 70, 92].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 animate-pulse rounded-t-sm bg-slate-200 dark:bg-slate-700"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-token-lg border border-border-default bg-surface-elevated p-4 lg:col-span-2">
              <Bone className="mb-4 h-3 w-20" />
              <div className="space-y-4">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <Bone className="h-3 w-full" />
                    <Bone className="h-2 w-2/3" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserChrome>
  )
}

function OpsSkeleton({ copy }) {
  return (
    <BrowserChrome title={copy.browserUrl}>
      <div
        className="flex min-h-[420px] bg-surface-secondary"
        role="img"
        aria-label={copy.opsAria}
      >
        <IconRail />
        <div className="flex min-w-0 flex-1 flex-col gap-5 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Bone className="h-7 w-7 rounded-token" />
              <Bone className="h-4 w-40" />
            </div>
            <Bone className="h-9 w-28 rounded-token" />
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-token-lg border border-border-default bg-surface-elevated p-4"
              >
                <div className="flex items-center justify-between">
                  <Bone className="h-3 w-16" />
                  <Bone className="h-4 w-4 rounded-full" />
                </div>
                <Bone className="mt-4 h-2 w-12" />
                <Bone className="mt-2 h-6 w-14" />
              </div>
            ))}
          </div>

          <div className="flex-1 rounded-token-lg border border-border-default bg-surface-elevated">
            <div className="flex items-center justify-between border-b border-border-default px-4 py-3">
              <Bone className="h-3 w-28" />
              <Bone className="h-2.5 w-12" />
            </div>
            <div className="divide-y divide-border-default">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between gap-3 px-4 py-3.5">
                  <div className="min-w-0 flex-1 space-y-2">
                    <Bone className="h-3 w-3/4 max-w-xs" />
                    <Bone className="h-2 w-24" />
                  </div>
                  <Bone className="h-2.5 w-10 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BrowserChrome>
  )
}

export function DashboardShowcase() {
  const { dict } = useLocale()
  const copy = dict.sandbox.dashboard
  const [templateId, setTemplateId] = useState('overview')

  const templates = [
    {
      id: 'overview',
      label: copy.templateOverview,
      node: <OverviewSkeleton copy={copy} />,
    },
    {
      id: 'analytics',
      label: copy.templateAnalytics,
      node: <AnalyticsSkeleton copy={copy} />,
    },
    {
      id: 'ops',
      label: copy.templateOps,
      node: <OpsSkeleton copy={copy} />,
    },
  ]
  const active = templates.find((item) => item.id === templateId) ?? templates[0]

  return (
    <div className="space-y-6">
      <div>
        <Label>{copy.templatesLabel}</Label>
        <p className="mb-4 text-sm text-content-secondary">{copy.templatesDesc}</p>
        <div
          className="mb-4 flex flex-wrap gap-2"
          role="tablist"
          aria-label={copy.templateTabsAria}
        >
          {templates.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={templateId === item.id}
              onClick={() => setTemplateId(item.id)}
              className={cn(
                'rounded-token-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                templateId === item.id
                  ? 'bg-brand-primary text-content-on-brand shadow-token-sm'
                  : 'border border-border-default bg-surface-secondary text-content-secondary hover:text-content-primary',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      {active.node}
    </div>
  )
}
