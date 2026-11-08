import { useState } from 'react'
import { ArrowUp, List, MousePointerClick, Sparkles, User, X } from 'lucide-react'
import { useLocale } from '../../i18n/LocaleContext'
import { cn } from '../../lib/utils'

function Label({ children }) {
  return (
    <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-content-muted">
      {children}
    </span>
  )
}

function Bone({ className, style }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-token bg-slate-200 dark:bg-slate-700',
        className,
      )}
      style={style}
      aria-hidden
    />
  )
}

/** Hatched fill like the AI workspace reference */
function Hatch({ className }) {
  return (
    <div
      className={cn(
        'rounded-token border border-border-default',
        className,
      )}
      style={{
        backgroundImage:
          'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(148,163,184,0.28) 5px, rgba(148,163,184,0.28) 10px)',
      }}
      aria-hidden
    />
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

function FloatingRail({ side, children }) {
  return (
    <div
      className={cn(
        'absolute top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-2 rounded-full border border-border-default bg-surface-elevated px-2 py-3 shadow-token-sm lg:flex',
        side === 'left' ? 'left-3' : 'right-3',
      )}
    >
      {children}
    </div>
  )
}

function MetricPanel({ titleWidth = 'w-24', wide, tall }) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-token-lg border border-border-default bg-surface-elevated p-4',
        wide && 'sm:col-span-2',
        tall && 'min-h-[200px]',
      )}
    >
      <div className="mb-3 flex items-center gap-1.5">
        <Bone className={cn('h-3', titleWidth)} />
        <Bone className="h-3.5 w-3.5 rounded-full" />
      </div>
      <Hatch className={cn('w-full flex-1', tall ? 'min-h-[160px]' : 'min-h-[120px]')} />
    </div>
  )
}

function WorkspaceSkeleton({ copy }) {
  return (
    <BrowserChrome title={copy.browserUrl}>
      <div
        className="relative min-h-[520px] bg-surface-secondary"
        role="img"
        aria-label={copy.workspaceAria}
      >
        {/* Top nav — fully skeleton */}
        <header className="flex items-center gap-4 border-b border-border-default bg-surface-elevated px-4 py-3">
          <Bone className="h-6 w-20 shrink-0" />
          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-5 md:flex"
            aria-hidden
          >
            <Bone className="h-3 w-28" />
            <Bone className="h-3 w-20" />
            <Bone className="h-3 w-16" />
            <Bone className="h-3 w-16" />
            <Bone className="h-4 w-4 rounded-token" />
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Bone className="h-8 w-8 rounded-full" />
            <Bone className="h-8 w-8 rounded-token" />
          </div>
        </header>

        <FloatingRail side="left">
          <Bone className="h-6 w-6 rounded-full" />
          <Bone className="h-6 w-6 rounded-full" />
          <Bone className="h-6 w-6 rounded-full" />
        </FloatingRail>

        <FloatingRail side="right">
          <Bone className="h-6 w-6 rounded-full" />
          <Bone className="h-6 w-6 rounded-full" />
          <Bone className="h-6 w-6 rounded-full" />
        </FloatingRail>

        {/* Main workspace card — only sparkle + title stay live */}
        <div className="px-4 py-5 sm:px-8 lg:px-16">
          <div className="rounded-token-lg border border-border-default bg-surface-elevated p-5 shadow-token-sm sm:p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-brand-primary" aria-hidden />
                <h3 className="text-lg font-bold text-slate-600 dark:text-slate-400">
                  {copy.workspaceTitle}
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-2" aria-hidden>
                <Bone className="h-8 w-24 rounded-token" />
                <Bone className="h-8 w-20 rounded-token" />
              </div>
            </div>

            <div className="mb-4 flex items-center gap-1.5" aria-hidden>
              <Bone className="h-3.5 w-40" />
              <Bone className="h-3.5 w-3.5" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricPanel titleWidth="w-20" />
              <MetricPanel titleWidth="w-28" />
              <MetricPanel titleWidth="w-36" wide />
              <div className="sm:col-span-2 lg:col-span-4">
                <MetricPanel titleWidth="w-44" tall />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserChrome>
  )
}

function ScenarioSkeleton({ copy }) {
  const [promptsOpen, setPromptsOpen] = useState(true)
  const [askOpen, setAskOpen] = useState(false)

  return (
    <BrowserChrome title={copy.scenarioUrl}>
      <div
        className="relative flex min-h-[520px] bg-surface-secondary"
        role="img"
        aria-label={copy.scenarioAria}
      >
        {/* Icon rail */}
        <aside className="flex w-14 shrink-0 flex-col items-center justify-between border-r border-border-default bg-surface-elevated py-4">
          <div className="flex flex-col items-center gap-3">
            {[0, 1, 2, 3].map((i) => (
              <Bone key={i} className="h-9 w-9 rounded-token" />
            ))}
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400">
            <User size={16} aria-hidden />
          </span>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-5 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Bone className="h-7 w-7 rounded-token" />
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                {copy.scenarioDashboard}
              </span>
            </div>
            <Bone className="h-9 w-9 rounded-token" />
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-token-lg border border-border-default bg-surface-elevated p-4"
              >
                <Bone className="h-2.5 w-16" />
                <Bone className="mt-4 h-8 w-28" />
              </div>
            ))}
          </div>

          {/* Context-aware table */}
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

        {/* Floating AI prompts — ask input / collapsing toolbar → sparkle FAB */}
        {askOpen ? (
          <form
            className="absolute bottom-5 right-5 z-10 flex w-[min(100%-2.5rem,22rem)] items-center gap-2 rounded-full border border-slate-300 bg-slate-500 px-2 py-1.5 shadow-token dark:border-slate-400 dark:bg-slate-600"
            aria-label={copy.scenarioAskBarAria}
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <Sparkles size={14} className="ml-1.5 shrink-0 text-white/80" aria-hidden />
            <input
              type="text"
              autoFocus
              placeholder={copy.scenarioAskPlaceholder}
              className="min-w-0 flex-1 bg-transparent py-1.5 text-xs text-white placeholder:text-white/55 outline-none ring-0 ring-offset-0 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              aria-label={copy.scenarioAskPlaceholder}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setAskOpen(false)
              }}
            />
            <button
              type="submit"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
              aria-label={copy.scenarioAskSend}
            >
              <ArrowUp size={14} aria-hidden />
            </button>
            <button
              type="button"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/90 hover:bg-white/10"
              aria-label={copy.scenarioClose}
              onClick={() => setAskOpen(false)}
            >
              <X size={14} aria-hidden />
            </button>
          </form>
        ) : (
          <div
            className="absolute bottom-5 right-5 z-10 flex h-11 items-center overflow-hidden rounded-full border border-border-default bg-slate-500 shadow-token dark:bg-slate-600"
            aria-label={promptsOpen ? copy.scenarioToolbarAria : undefined}
          >
            <div
              className={cn(
                'grid transition-[grid-template-columns] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
                promptsOpen ? 'grid-cols-[1fr]' : 'grid-cols-[0fr]',
              )}
            >
              <div className="min-w-0 overflow-hidden">
                <div
                  className={cn(
                    'flex items-center gap-2 whitespace-nowrap py-2 pl-3 pr-3 transition-opacity duration-200',
                    promptsOpen
                      ? 'opacity-100 delay-75'
                      : 'pointer-events-none opacity-0',
                  )}
                >
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-white hover:bg-white/10"
                    tabIndex={promptsOpen ? 0 : -1}
                    onClick={() => setAskOpen(true)}
                  >
                    <Sparkles size={14} aria-hidden />
                    {copy.scenarioAsk}
                  </button>
                  <button
                    type="button"
                    className="group relative flex h-7 w-7 items-center justify-center rounded-full text-white/90"
                    aria-label={copy.scenarioSummarizeTip}
                    tabIndex={promptsOpen ? 0 : -1}
                  >
                    <List size={14} aria-hidden />
                    <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-token bg-slate-800 px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-token transition-opacity group-hover:opacity-100 dark:bg-slate-900">
                      {copy.scenarioSummarizeTip}
                    </span>
                  </button>
                  <button
                    type="button"
                    className="group relative flex h-7 w-7 items-center justify-center rounded-full text-white/90"
                    aria-label={copy.scenarioSelectTip}
                    tabIndex={promptsOpen ? 0 : -1}
                  >
                    <MousePointerClick size={14} aria-hidden />
                    <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-token bg-slate-800 px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-token transition-opacity group-hover:opacity-100 dark:bg-slate-900">
                      {copy.scenarioSelectTip}
                    </span>
                  </button>
                  <span className="h-4 w-px bg-white/30" aria-hidden />
                  <button
                    type="button"
                    className="flex h-7 w-7 items-center justify-center rounded-full text-white/90 hover:bg-white/10"
                    aria-label={copy.scenarioClose}
                    tabIndex={promptsOpen ? 0 : -1}
                    onClick={() => setPromptsOpen(false)}
                  >
                    <X size={14} aria-hidden />
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              className={cn(
                'flex h-11 shrink-0 items-center justify-center text-white transition-[width,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-slate-600 dark:hover:bg-slate-500',
                promptsOpen
                  ? 'pointer-events-none w-0 opacity-0'
                  : 'w-11 opacity-100',
              )}
              aria-label={copy.scenarioOpen}
              tabIndex={promptsOpen ? -1 : 0}
              onClick={() => setPromptsOpen(true)}
            >
              <Sparkles size={18} aria-hidden className="shrink-0" />
            </button>
          </div>
        )}
      </div>
    </BrowserChrome>
  )
}

function ChatSkeleton({ copy }) {
  return (
    <BrowserChrome title={copy.chatUrl}>
      <div
        className="flex min-h-[520px] bg-surface-secondary"
        role="img"
        aria-label={copy.chatAria}
      >
        {/* History rail */}
        <aside className="hidden w-52 shrink-0 flex-col border-r border-border-default bg-surface-elevated p-3 sm:flex">
          <div className="mb-4 flex h-8 items-center gap-2">
            <Sparkles size={16} className="shrink-0 text-brand-primary" aria-hidden />
            <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
              {copy.chatTitle}
            </span>
          </div>
          <div className="space-y-2">
            {[72, 56, 64, 48, 60].map((w, i) => (
              <Bone
                key={i}
                className="h-8 rounded-token"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
          <div className="mt-auto flex items-center gap-2 border-t border-border-default pt-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700">
              <User size={14} className="text-content-muted" aria-hidden />
            </span>
            <Bone className="h-3 w-20" />
          </div>
        </aside>

        {/* Thread */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between gap-3 border-b border-border-default bg-surface-elevated px-4 py-3">
            <Bone className="h-3.5 w-28" />
            <Bone className="h-8 w-8 rounded-token" />
          </header>

          <div className="flex-1 space-y-5 overflow-hidden p-4 sm:p-6">
            {/* User bubble */}
            <div className="flex justify-end">
              <div className="max-w-[80%] space-y-2 rounded-token-lg bg-brand-secondary px-4 py-3">
                <Bone className="h-2.5 w-40 bg-brand-primary/20 dark:bg-brand-primary/30" />
                <Bone className="h-2.5 w-28 bg-brand-primary/20 dark:bg-brand-primary/30" />
              </div>
            </div>

            {/* Assistant */}
            <div className="flex gap-3">
              <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-secondary text-brand-primary">
                <Sparkles size={14} aria-hidden />
              </span>
              <div className="max-w-[85%] flex-1 space-y-2 rounded-token-lg border border-border-default bg-surface-elevated px-4 py-3">
                <Bone className="h-2.5 w-full" />
                <Bone className="h-2.5 w-[92%]" />
                <Bone className="h-2.5 w-[78%]" />
                <Hatch className="mt-3 h-28 w-full" />
                <Bone className="h-2.5 w-[66%]" />
              </div>
            </div>

            <div className="flex justify-end">
              <div className="max-w-[70%] space-y-2 rounded-token-lg bg-brand-secondary px-4 py-3">
                <Bone className="h-2.5 w-32 bg-brand-primary/20 dark:bg-brand-primary/30" />
              </div>
            </div>

            <div className="flex gap-3">
              <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-secondary text-brand-primary">
                <Sparkles size={14} aria-hidden />
              </span>
              <div className="max-w-[75%] flex-1 space-y-2 rounded-token-lg border border-border-default bg-surface-elevated px-4 py-3">
                <Bone className="h-2.5 w-full" />
                <Bone className="h-2.5 w-[84%]" />
                <Bone className="h-2.5 w-[55%]" />
              </div>
            </div>
          </div>

          {/* Composer */}
          <div className="border-t border-border-default bg-surface-elevated p-4">
            <div className="flex items-end gap-2 rounded-token-lg border border-border-default bg-surface-primary p-3">
              <div className="min-w-0 flex-1 space-y-2">
                <Bone className="h-2.5 w-48" />
                <Bone className="h-2.5 w-32" />
              </div>
              <Bone className="h-9 w-9 shrink-0 rounded-token" />
            </div>
            <p className="mt-2 text-center text-[11px] text-content-muted">
              {copy.composerHint}
            </p>
          </div>
        </div>
      </div>
    </BrowserChrome>
  )
}

export function AIShowcase() {
  const { dict } = useLocale()
  const copy = dict.sandbox.ai
  const [templateId, setTemplateId] = useState('workspace')

  const templates = [
    {
      id: 'workspace',
      label: copy.templateWorkspace,
      node: <WorkspaceSkeleton copy={copy} />,
    },
    {
      id: 'chat',
      label: copy.templateChat,
      node: <ChatSkeleton copy={copy} />,
    },
    {
      id: 'scenario',
      label: copy.templateScenario,
      node: <ScenarioSkeleton copy={copy} />,
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
