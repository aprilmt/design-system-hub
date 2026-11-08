import { useEffect, useRef, useState } from 'react'
import { ArrowUp, List, MousePointerClick, Sparkles, User, X } from 'lucide-react'
import { useLocale } from '../../i18n/LocaleContext'
import { cn } from '../../lib/utils'

/** Looping demo beats for the Scenario toolbar only (page chrome stays still). */
const TOOLBAR_WALKTHROUGH = [
  { id: 'ask', duration: 1200 },
  { id: 'ask-open', duration: 4800 },
  { id: 'summarize', duration: 1600 },
  { id: 'select', duration: 1600 },
  { id: 'rest', duration: 1100 },
]

const TYPE_MS = 42
const PILL_EASE = 'duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]'

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
  const [typedText, setTypedText] = useState('')
  const [tourStep, setTourStep] = useState('ask')
  const [tourPaused, setTourPaused] = useState(false)
  const stepIndexRef = useRef(0)
  const questionIndexRef = useRef(0)

  const pauseTour = () => setTourPaused(true)
  const sampleQuestions = copy.scenarioAskSamples ?? ['Type your questions…']
  const toolbarExpanded = promptsOpen && !askOpen

  useEffect(() => {
    if (tourPaused) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let timer
    const run = () => {
      const beat = TOOLBAR_WALKTHROUGH[stepIndexRef.current]
      setTourStep(beat.id)
      setAskOpen(beat.id === 'ask-open')
      setPromptsOpen(true)
      timer = window.setTimeout(() => {
        stepIndexRef.current =
          (stepIndexRef.current + 1) % TOOLBAR_WALKTHROUGH.length
        run()
      }, beat.duration)
    }
    run()
    return () => window.clearTimeout(timer)
  }, [tourPaused])

  useEffect(() => {
    if (!askOpen) {
      setTypedText('')
      return
    }
    if (tourPaused || tourStep !== 'ask-open') return

    const questions = sampleQuestions.length
      ? sampleQuestions
      : ['Type your questions…']
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const question = questions[questionIndexRef.current % questions.length]
    questionIndexRef.current += 1

    if (reduced) {
      setTypedText(question)
      return
    }

    setTypedText('')
    let i = 0
    const timer = window.setInterval(() => {
      i += 1
      setTypedText(question.slice(0, i))
      if (i >= question.length) window.clearInterval(timer)
    }, TYPE_MS)
    return () => window.clearInterval(timer)
  }, [askOpen, tourPaused, tourStep, sampleQuestions])

  const highlightAsk = !tourPaused && tourStep === 'ask'
  const highlightSummarize = !tourPaused && tourStep === 'summarize'
  const highlightSelect = !tourPaused && tourStep === 'select'

  return (
    <BrowserChrome title={copy.scenarioUrl}>
      <div
        className="relative flex min-h-[520px] bg-surface-secondary"
        role="img"
        aria-label={copy.scenarioAria}
      >
        {/* Icon rail — static */}
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

        {/* Dashboard shell — static (no pulse on bones during tour) */}
        <div className="flex min-w-0 flex-1 flex-col gap-5 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-token bg-slate-200 dark:bg-slate-700" aria-hidden />
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                {copy.scenarioDashboard}
              </span>
            </div>
            <div className="h-9 w-9 rounded-token bg-slate-200 dark:bg-slate-700" aria-hidden />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-token-lg border border-border-default bg-surface-elevated p-4"
              >
                <div className="h-2.5 w-16 rounded-token bg-slate-200 dark:bg-slate-700" aria-hidden />
                <div className="mt-4 h-8 w-28 rounded-token bg-slate-200 dark:bg-slate-700" aria-hidden />
              </div>
            ))}
          </div>

          <div className="flex-1 rounded-token-lg border border-border-default bg-surface-elevated p-4">
            <div className="mb-4 flex gap-6 border-b border-border-default pb-3">
              <div className="h-2.5 w-14 rounded-token bg-slate-200 dark:bg-slate-700" aria-hidden />
              <div className="h-2.5 w-16 rounded-token bg-slate-200 dark:bg-slate-700" aria-hidden />
              <div className="h-2.5 w-12 rounded-token bg-slate-200 dark:bg-slate-700" aria-hidden />
              <div className="hidden h-2.5 w-14 rounded-token bg-slate-200 dark:bg-slate-700 sm:block" aria-hidden />
            </div>
            <div className="space-y-4">
              {[0, 1, 2].map((row) => (
                <div key={row} className="flex items-center gap-4">
                  <div className="h-3 w-24 flex-1 rounded-token bg-slate-200 dark:bg-slate-700 sm:max-w-[140px]" aria-hidden />
                  <div className="hidden h-3 w-20 rounded-token bg-slate-200 dark:bg-slate-700 sm:block" aria-hidden />
                  <div className="hidden h-3 w-16 rounded-token bg-slate-200 dark:bg-slate-700 md:block" aria-hidden />
                  <div className="ml-auto h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-700" aria-hidden />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* One pill: ask / toolbar / FAB all share the same width-collapse motion */}
        <div
          className={cn(
            'absolute bottom-5 right-5 z-10 flex h-11 items-center overflow-hidden rounded-full border border-border-default bg-slate-500 shadow-token dark:bg-slate-600',
            (toolbarExpanded || askOpen) && 'overflow-visible',
            askOpen && 'border-slate-300 dark:border-slate-400',
          )}
          aria-label={
            askOpen
              ? copy.scenarioAskBarAria
              : promptsOpen
                ? copy.scenarioToolbarAria
                : undefined
          }
          onPointerDown={pauseTour}
        >
          {/* Ask input — collapses with the same grid motion as the toolbar */}
          <div
            className={cn(
              'grid transition-[grid-template-columns]',
              PILL_EASE,
              askOpen ? 'grid-cols-[1fr]' : 'grid-cols-[0fr]',
            )}
          >
            <div className="min-w-0 overflow-hidden">
              <form
                className={cn(
                  'flex w-[min(100vw-5rem,20rem)] items-center gap-2 whitespace-nowrap px-2 py-1.5 transition-opacity duration-200',
                  askOpen ? 'opacity-100 delay-75' : 'pointer-events-none opacity-0',
                )}
                onSubmit={(e) => e.preventDefault()}
              >
                <Sparkles size={14} className="ml-1 shrink-0 text-white/80" aria-hidden />
                {tourPaused ? (
                  <input
                    type="text"
                    autoFocus
                    placeholder={copy.scenarioAskPlaceholder}
                    className="min-w-0 flex-1 bg-transparent py-1.5 text-xs text-white caret-white placeholder:text-white/55 outline-none ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    aria-label={copy.scenarioAskPlaceholder}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') setAskOpen(false)
                    }}
                  />
                ) : (
                  <p className="min-w-0 flex-1 truncate py-1.5 text-xs text-white">
                    {typedText}
                    <span
                      className="ml-0.5 inline-block h-3 w-px translate-y-px bg-white align-middle"
                      style={{ animation: 'scenario-caret 1s steps(1) infinite' }}
                      aria-hidden
                    />
                  </p>
                )}
                <button
                  type="submit"
                  className={cn(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white transition-colors',
                    typedText ? 'bg-white/25' : 'bg-white/15',
                  )}
                  tabIndex={askOpen ? 0 : -1}
                  aria-label={copy.scenarioAskSend}
                >
                  <ArrowUp size={14} aria-hidden />
                </button>
                <button
                  type="button"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/90 hover:bg-white/10"
                  tabIndex={askOpen ? 0 : -1}
                  aria-label={copy.scenarioClose}
                  onClick={() => {
                    pauseTour()
                    setAskOpen(false)
                  }}
                >
                  <X size={14} aria-hidden />
                </button>
              </form>
            </div>
          </div>

          {/* Toolbar actions */}
          <div
            className={cn(
              'grid transition-[grid-template-columns]',
              PILL_EASE,
              toolbarExpanded ? 'grid-cols-[1fr]' : 'grid-cols-[0fr]',
            )}
          >
            <div
              className={cn(
                'min-w-0',
                toolbarExpanded ? 'overflow-visible' : 'overflow-hidden',
              )}
            >
              <div
                className={cn(
                  'flex items-center gap-2 whitespace-nowrap py-2 pl-3 pr-3 transition-opacity duration-200',
                  toolbarExpanded
                    ? 'opacity-100 delay-75'
                    : 'pointer-events-none opacity-0',
                )}
              >
                <button
                  type="button"
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-white transition-all duration-300',
                    highlightAsk
                      ? 'scale-105 bg-white/20 ring-2 ring-white/50'
                      : 'hover:bg-white/10',
                  )}
                  tabIndex={toolbarExpanded ? 0 : -1}
                  onClick={() => {
                    pauseTour()
                    setAskOpen(true)
                  }}
                >
                  <Sparkles size={14} aria-hidden />
                  {copy.scenarioAsk}
                </button>
                <button
                  type="button"
                  className={cn(
                    'relative flex h-7 w-7 items-center justify-center rounded-full text-white/90 transition-all duration-300',
                    highlightSummarize
                      ? 'scale-110 bg-white/20 ring-2 ring-white/50'
                      : 'hover:bg-white/10',
                  )}
                  aria-label={copy.scenarioSummarizeTip}
                  tabIndex={toolbarExpanded ? 0 : -1}
                >
                  <List size={14} aria-hidden />
                  <span
                    className={cn(
                      'pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-token bg-slate-800 px-2 py-1 text-[11px] font-medium text-white shadow-token transition-opacity duration-300 dark:bg-slate-900',
                      highlightSummarize ? 'opacity-100' : 'opacity-0',
                    )}
                  >
                    {copy.scenarioSummarizeTip}
                  </span>
                </button>
                <button
                  type="button"
                  className={cn(
                    'relative flex h-7 w-7 items-center justify-center rounded-full text-white/90 transition-all duration-300',
                    highlightSelect
                      ? 'scale-110 bg-white/20 ring-2 ring-white/50'
                      : 'hover:bg-white/10',
                  )}
                  aria-label={copy.scenarioSelectTip}
                  tabIndex={toolbarExpanded ? 0 : -1}
                >
                  <MousePointerClick size={14} aria-hidden />
                  <span
                    className={cn(
                      'pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-token bg-slate-800 px-2 py-1 text-[11px] font-medium text-white shadow-token transition-opacity duration-300 dark:bg-slate-900',
                      highlightSelect ? 'opacity-100' : 'opacity-0',
                    )}
                  >
                    {copy.scenarioSelectTip}
                  </span>
                </button>
                <span className="h-4 w-px bg-white/30" aria-hidden />
                <button
                  type="button"
                  className="flex h-7 w-7 items-center justify-center rounded-full text-white/90 hover:bg-white/10"
                  aria-label={copy.scenarioClose}
                  tabIndex={toolbarExpanded ? 0 : -1}
                  onClick={() => {
                    pauseTour()
                    setPromptsOpen(false)
                  }}
                >
                  <X size={14} aria-hidden />
                </button>
              </div>
            </div>
          </div>

          {/* FAB sparkle when fully collapsed */}
          <button
            type="button"
            className={cn(
              'flex h-11 shrink-0 items-center justify-center text-white transition-[width,opacity]',
              PILL_EASE,
              'hover:bg-slate-600 dark:hover:bg-slate-500',
              promptsOpen || askOpen
                ? 'pointer-events-none w-0 opacity-0'
                : 'w-11 opacity-100',
            )}
            aria-label={copy.scenarioOpen}
            tabIndex={promptsOpen || askOpen ? -1 : 0}
            onClick={() => {
              pauseTour()
              setPromptsOpen(true)
            }}
          >
            <Sparkles size={18} aria-hidden className="shrink-0" />
          </button>
        </div>
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
