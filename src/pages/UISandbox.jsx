import { useState, useEffect, useRef, useId, Suspense, lazy, useCallback } from 'react'
import {
  Keyboard,
  MousePointerClick,
  Monitor,
  Eye,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Loader2,
  ChevronDown,
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { Dialog, DialogContent } from '../components/ui/Dialog'
import { useToast } from '../components/ui/Toast'
import { DataList } from '../components/ui/DataList'
import { Table } from '../components/ui/Table'
import { DateTime } from '../components/ui/DateTime'
import { useLocale } from '../i18n/LocaleContext'
import { sandboxPresets } from '../components/sandboxPresets'

const LiveCode = lazy(() =>
  import('../components/LiveCode').then((m) => ({ default: m.LiveCode }))
)
const MobileResponsiveShowcase = lazy(() =>
  import('../components/mobile/MobileResponsiveShowcase').then((m) => ({
    default: m.MobileResponsiveShowcase,
  }))
)
const DashboardShowcase = lazy(() =>
  import('../components/dashboard/DashboardShowcase').then((m) => ({
    default: m.DashboardShowcase,
  }))
)
const AIShowcase = lazy(() =>
  import('../components/ai/AIShowcase').then((m) => ({
    default: m.AIShowcase,
  }))
)

function SectionLiveCode({ presetKey, description }) {
  const preset = sandboxPresets[presetKey]
  if (!preset) return null
  return (
    <Suspense
      fallback={
        <div className="mt-8 flex h-48 items-center justify-center rounded-token-lg border border-border-default bg-surface-secondary">
          <Loader2 size={24} className="animate-spin text-brand-primary" />
        </div>
      }
    >
      <LiveCode
        html={preset.html}
        javascript={preset.javascript}
        description={description}
      />
    </Suspense>
  )
}

/* ─── helpers ─── */

function BetaBadge({ label, tip, className = '' }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const tipId = useId()
  const pillClass =
    'inline-flex h-5 items-center rounded-full bg-brand-secondary px-2 font-sans text-[10px] font-medium leading-none tracking-wide text-brand-primary'

  useEffect(() => {
    if (!open || !tip) return
    const onPointer = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, tip])

  if (!tip) {
    return (
      <span className={`shrink-0 self-center ${pillClass} ${className}`}>
        {label}
      </span>
    )
  }

  return (
    <span ref={rootRef} className={`relative inline-flex shrink-0 self-center ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-describedby={open ? tipId : undefined}
        onClick={(e) => {
          e.stopPropagation()
          setOpen((v) => !v)
        }}
        className={`${pillClass} outline-none ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0`}
      >
        {label}
      </button>
      {open ? (
        <span
          id={tipId}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 w-[min(16.5rem,calc(100vw-2rem))] -translate-x-1/2 rounded-md bg-slate-900 px-3 py-2 text-center font-sans text-xs font-normal leading-relaxed text-white shadow-token"
        >
          {tip}
          <span
            className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-900"
            aria-hidden
          />
        </span>
      ) : null}
    </span>
  )
}

function Section({ id, title, description, badge, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-20 border-b border-border-default pb-10 pt-10 first:pt-0 last:border-b-0"
    >
      <h2 className="mb-1 flex items-center gap-2.5 font-display text-2xl font-normal tracking-normal text-slate-950 dark:text-slate-50">
        {title}
        {badge}
      </h2>
      {description && (
        <p className="mb-7 max-w-2xl text-sm leading-relaxed text-content-secondary">
          {description}
        </p>
      )}
      {children}
    </section>
  )
}

function Label({ children }) {
  return (
    <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-content-muted">
      {children}
    </span>
  )
}

/* ─── token data ─── */

const colorTokens = [
  { group: 'Brand', tokens: [
    { name: 'brand-primary', tw: 'bg-brand-primary' },
    { name: 'brand-primary-hover', tw: 'bg-brand-primary-hover' },
    { name: 'brand-primary-active', tw: 'bg-brand-primary-active' },
    { name: 'brand-secondary', tw: 'bg-brand-secondary border border-border-default' },
  ]},
  { group: 'Feedback', tokens: [
    { name: 'feedback-success', tw: 'bg-feedback-success' },
    { name: 'feedback-error', tw: 'bg-feedback-error' },
    { name: 'feedback-warning', tw: 'bg-feedback-warning' },
    { name: 'feedback-info', tw: 'bg-feedback-info' },
  ]},
  { group: 'Surface', tokens: [
    { name: 'surface-primary', tw: 'bg-surface-primary border border-border-default' },
    { name: 'surface-secondary', tw: 'bg-surface-secondary border border-border-default' },
    { name: 'surface-elevated', tw: 'bg-surface-elevated border border-border-default' },
  ]},
  { group: 'Content', tokens: [
    { name: 'content-primary', tw: 'bg-content-primary' },
    { name: 'content-secondary', tw: 'bg-content-secondary' },
    { name: 'content-muted', tw: 'bg-content-muted' },
    { name: 'content-on-brand', tw: 'bg-content-on-brand border border-border-default' },
  ]},
  { group: 'Border', tokens: [
    { name: 'border-default', tw: 'bg-border-default' },
    { name: 'border-strong', tw: 'bg-border-strong' },
    { name: 'border-focus', tw: 'bg-border-focus' },
  ]},
]

const shadowTokens = [
  { name: 'shadow-token-sm', tw: 'shadow-token-sm' },
  { name: 'shadow-token', tw: 'shadow-token' },
  { name: 'shadow-token-lg', tw: 'shadow-token-lg' },
]

const selectOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular', disabled: true },
]

const componentSectionIds = [
  'button',
  'input',
  'select',
  'dialog',
  'toast',
  'dataList',
  'table',
  'dateTime',
]

const dataListDemoItems = [
  { label: 'Name', value: 'Jane Doe' },
  { label: 'Role', value: 'Product Designer' },
  { label: 'Team', value: 'Design Systems' },
  { label: 'Status', value: 'Active' },
]

const tableDemoColumns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
]

const tableDemoRows = [
  { id: 1, name: 'Ada Lovelace', role: 'Designer', status: 'Active' },
  { id: 2, name: 'Grace Hopper', role: 'Engineer', status: 'Active' },
  { id: 3, name: 'Alan Turing', role: 'Research', status: 'Away' },
  { id: 4, name: 'Katherine Johnson', role: 'Analyst', status: 'Active' },
]

const sidebarItems = [
  { type: 'link', id: 'tokens' },
  { type: 'group', id: 'components', children: componentSectionIds },
  { type: 'link', id: 'mobile' },
  { type: 'link', id: 'dashboard' },
  { type: 'link', id: 'ai', badge: 'beta' },
  { type: 'link', id: 'a11y' },
]

const sidebarLinkIds = sidebarItems.flatMap((item) =>
  item.type === 'group' ? item.children : [item.id],
)

/* ─── page ─── */

function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return activeId
}

export function UISandbox() {
  const { t, dict } = useLocale()
  const [selectValue, setSelectValue] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState('list')
  const [density, setDensity] = useState('comfortable')
  const [componentsOpen, setComponentsOpen] = useState(true)
  const { toast } = useToast()

  const sectionIds = sidebarLinkIds
  const activeSection = useActiveSection(sectionIds)
  const componentActive = componentSectionIds.includes(activeSection)

  useEffect(() => {
    if (componentActive) setComponentsOpen(true)
  }, [componentActive])

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-12 max-w-2xl">
        <h1 className="mb-3 font-display text-3xl font-normal tracking-normal text-slate-950 dark:text-slate-50 sm:text-4xl">
          {t('sandbox.title')}
        </h1>
        <p className="text-content-secondary leading-relaxed">
          {t('sandbox.intro')}
        </p>
      </div>

      <div className="flex gap-12">
        {/* sidebar */}
        <aside className="hidden lg:block w-40 shrink-0">
          <nav
            className="sticky top-20 space-y-0.5"
            aria-label={t('sandbox.sectionsAria')}
          >
            {sidebarItems.map((item) => {
              if (item.type === 'group') {
                const open = componentsOpen
                return (
                  <div key={item.id}>
                    <button
                      type="button"
                      onClick={() => setComponentsOpen((v) => !v)}
                      aria-expanded={open}
                      className={`flex w-full items-center justify-between gap-1 px-2 py-1.5 text-left text-sm transition-colors ${
                        componentActive
                          ? 'font-medium text-content-primary'
                          : 'text-content-muted hover:text-content-primary'
                      }`}
                    >
                      <span>{dict.sandbox.sidebar[item.id]}</span>
                      <ChevronDown
                        size={14}
                        className={`shrink-0 transition-transform duration-200 ${
                          open ? 'rotate-0' : '-rotate-90'
                        }`}
                        aria-hidden
                      />
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="space-y-0.5 pb-0.5 pl-2">
                          {item.children.map((id) => (
                            <button
                              key={id}
                              type="button"
                              onClick={() => scrollTo(id)}
                              className={`block w-full text-left px-2 py-1.5 text-sm transition-colors ${
                                activeSection === id
                                  ? 'font-medium text-content-primary'
                                  : 'text-content-muted hover:text-content-primary'
                              }`}
                            >
                              {dict.sandbox.sidebar[id]}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

              if (item.badge === 'beta') {
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollTo(item.id)}
                    className={`flex w-full items-center gap-1.5 px-2 py-1.5 text-left text-sm transition-colors ${
                      activeSection === item.id
                        ? 'font-medium text-content-primary'
                        : 'text-content-muted hover:text-content-primary'
                    }`}
                  >
                    <span>{dict.sandbox.sidebar[item.id]}</span>
                    <BetaBadge label={dict.sandbox.sidebar.beta} />
                  </button>
                )
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className={`block w-full px-2 py-1.5 text-left text-sm transition-colors ${
                    activeSection === item.id
                      ? 'font-medium text-content-primary'
                      : 'text-content-muted hover:text-content-primary'
                  }`}
                >
                  {dict.sandbox.sidebar[item.id]}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* main content */}
        <div className="flex-1 min-w-0">

          {/* ── Design Tokens ── */}
          <Section
            id="tokens"
            title={t('sandbox.tokens.title')}
            description={t('sandbox.tokens.description')}
          >
            {colorTokens.map(({ group, tokens }) => (
              <div key={group} className="mb-6 last:mb-0">
                <Label>{dict.sandbox.tokens.groups[group] ?? group}</Label>
                <div className="flex flex-wrap gap-3">
                  {tokens.map((t) => (
                    <div key={t.name} className="text-center">
                      <div
                        className={`h-12 w-12 rounded-token-lg ${t.tw}`}
                        title={t.name}
                      />
                      <span className="mt-1.5 block text-[10px] text-content-muted leading-tight">
                        {t.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-6">
              <Label>{t('sandbox.tokens.borderRadius')}</Label>
              <div className="flex items-end gap-4">
                {[
                  ['token-sm', 'rounded-token-sm', 'sm'],
                  ['token', 'rounded-token', 'base'],
                  ['token-lg', 'rounded-token-lg', 'lg'],
                  ['token-full', 'rounded-token-full', 'full'],
                ].map(([name, cls, label]) => (
                  <div key={name} className="text-center">
                    <div
                      className={`h-12 w-12 border-2 border-brand-primary bg-brand-secondary ${cls}`}
                    />
                    <span className="mt-1.5 block text-[10px] text-content-muted">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Label>{t('sandbox.tokens.shadow')}</Label>
              <div className="flex flex-wrap gap-4">
                {shadowTokens.map(({ name, tw }) => (
                  <div key={name} className="text-center">
                    <div
                      className={`h-12 w-12 rounded-token-lg border border-border-default bg-surface-elevated ${tw}`}
                      title={name}
                    />
                    <span className="mt-1.5 block text-[10px] leading-tight text-content-muted">
                      {name.replace('shadow-', '')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <SectionLiveCode
              presetKey="tokens"
              description={t('sandbox.liveCode.tokens')}
            />
          </Section>

          {/* ── Button ── */}
          <Section
            id="button"
            title={t('sandbox.button.title')}
            description={t('sandbox.button.description')}
          >
            <Label>{t('sandbox.button.variants')}</Label>
            <div className="flex flex-wrap gap-3 mb-6">
              {['primary', 'secondary', 'outline', 'ghost', 'destructive'].map(
                (v) => (
                  <Button key={v} variant={v}>
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </Button>
                )
              )}
            </div>

            <Label>{t('sandbox.button.sizes')}</Label>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>

            <Label>{t('sandbox.button.states')}</Label>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button variant="destructive" disabled>
                Destructive Disabled
              </Button>
            </div>

            <Label>{t('sandbox.button.groups')}</Label>
            <div className="flex flex-col gap-4">
              <div
                className="inline-flex rounded-token border border-border-default p-0.5"
                role="group"
                aria-label={t('sandbox.button.groupViewAria')}
              >
                {[
                  ['list', t('sandbox.button.groupList')],
                  ['grid', t('sandbox.button.groupGrid')],
                  ['board', t('sandbox.button.groupBoard')],
                ].map(([id, label]) => (
                  <Button
                    key={id}
                    size="sm"
                    variant={viewMode === id ? 'primary' : 'ghost'}
                    className="rounded-[calc(var(--radius-token)-2px)]"
                    aria-pressed={viewMode === id}
                    onClick={() => setViewMode(id)}
                  >
                    {label}
                  </Button>
                ))}
              </div>

              <div
                className="inline-flex overflow-hidden rounded-token border border-border-default"
                role="group"
                aria-label={t('sandbox.button.groupDensityAria')}
              >
                {[
                  ['compact', t('sandbox.button.groupCompact')],
                  ['comfortable', t('sandbox.button.groupComfortable')],
                  ['spacious', t('sandbox.button.groupSpacious')],
                ].map(([id, label], i, arr) => (
                  <Button
                    key={id}
                    size="sm"
                    variant={density === id ? 'secondary' : 'ghost'}
                    className={`rounded-none ${i < arr.length - 1 ? 'border-r border-border-default' : ''}`}
                    aria-pressed={density === id}
                    onClick={() => setDensity(id)}
                  >
                    {label}
                  </Button>
                ))}
              </div>

              <div className="inline-flex gap-2" role="group" aria-label={t('sandbox.button.groupActionsAria')}>
                <Button size="sm" variant="outline">
                  {t('sandbox.button.groupCancel')}
                </Button>
                <Button size="sm" variant="primary">
                  {t('sandbox.button.groupSave')}
                </Button>
              </div>
            </div>
            <SectionLiveCode
              presetKey="button"
              description={t('sandbox.liveCode.button')}
            />
          </Section>

          {/* ── Input ── */}
          <Section
            id="input"
            title={t('sandbox.input.title')}
            description={t('sandbox.input.description')}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input label="Full Name" placeholder="Jane Doe" />
              <Input
                label="Email"
                type="email"
                placeholder="jane@example.com"
                hint="We'll never share your email."
                required
              />
              <Input
                label="Username"
                placeholder="janedoe"
                error="Username is already taken."
              />
              <Input
                label="Company"
                placeholder="Acme Inc."
                disabled
                value="Read-only Corp"
              />
            </div>
            <SectionLiveCode
              presetKey="input"
              description={t('sandbox.liveCode.input')}
            />
          </Section>

          {/* ── Select ── */}
          <Section
            id="select"
            title={t('sandbox.select.title')}
            description={t('sandbox.select.description')}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Select
                label="Framework"
                options={selectOptions}
                value={selectValue}
                onValueChange={setSelectValue}
              />
              <Select
                label="Disabled Select"
                options={selectOptions}
                disabled
              />
            </div>
            <SectionLiveCode
              presetKey="select"
              description={t('sandbox.liveCode.select')}
            />
          </Section>

          {/* ── Dialog ── */}
          <Section
            id="dialog"
            title={t('sandbox.dialog.title')}
            description={t('sandbox.dialog.description')}
          >
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <Button onClick={() => setDialogOpen(true)}>
                Open Dialog
              </Button>
              <DialogContent
                title="Confirm Action"
                description="This dialog traps focus and can be closed with the Esc key or the close button. Try tabbing through the elements inside."
              >
                <div className="space-y-4">
                  <Input label="Confirmation" placeholder="Type 'confirm'" />
                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => setDialogOpen(false)}>
                      Confirm
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <div className="mt-4 flex items-start gap-2 rounded-token bg-surface-secondary p-3 text-xs text-content-secondary">
              <Keyboard size={14} className="mt-0.5 shrink-0 text-content-muted" />
              <span>
                Press <kbd className="rounded bg-surface-primary px-1.5 py-0.5 font-mono text-[11px] border border-border-default">Esc</kbd> to
                close &middot; Focus is trapped inside &middot; Focus returns
                to trigger on close
              </span>
            </div>
            <SectionLiveCode
              presetKey="dialog"
              description={t('sandbox.liveCode.dialog')}
            />
          </Section>

          {/* ── Toast ── */}
          <Section
            id="toast"
            title={t('sandbox.toast.title')}
            description={t('sandbox.toast.description')}
          >
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  toast({
                    variant: 'success',
                    title: 'Saved',
                    description: 'Your changes have been saved.',
                  })
                }
              >
                <CheckCircle2 size={14} /> Success
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  toast({
                    variant: 'error',
                    title: 'Error',
                    description: 'Something went wrong. Please try again.',
                  })
                }
              >
                <XCircle size={14} /> Error
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  toast({
                    variant: 'warning',
                    title: 'Warning',
                    description: 'Your session will expire in 5 minutes.',
                  })
                }
              >
                <AlertTriangle size={14} /> Warning
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  toast({
                    variant: 'info',
                    title: 'Update Available',
                    description: 'A new version is ready to install.',
                  })
                }
              >
                <Info size={14} /> Info
              </Button>
            </div>
            <SectionLiveCode
              presetKey="toast"
              description={t('sandbox.liveCode.toast')}
            />
          </Section>

          {/* ── Data List ── */}
          <Section
            id="dataList"
            title={t('sandbox.dataList.title')}
            description={t('sandbox.dataList.description')}
          >
            <DataList items={dataListDemoItems} />
            <SectionLiveCode
              presetKey="dataList"
              description={t('sandbox.liveCode.dataList')}
            />
          </Section>

          {/* ── Table ── */}
          <Section
            id="table"
            title={t('sandbox.table.title')}
            description={t('sandbox.table.description')}
          >
            <Table
              caption={t('sandbox.table.caption')}
              columns={tableDemoColumns}
              rows={tableDemoRows}
            />
            <SectionLiveCode
              presetKey="table"
              description={t('sandbox.liveCode.table')}
            />
          </Section>

          {/* ── Date and Time ── */}
          <Section
            id="dateTime"
            title={t('sandbox.dateTime.title')}
            description={t('sandbox.dateTime.description')}
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <DateTime
                type="date"
                label={t('sandbox.dateTime.dateLabel')}
                hint={t('sandbox.dateTime.dateHint')}
                defaultValue="2026-11-08"
              />
              <DateTime
                type="time"
                label={t('sandbox.dateTime.timeLabel')}
                hint={t('sandbox.dateTime.timeHint')}
                defaultValue="14:30"
              />
            </div>
            <div className="mt-6 max-w-sm">
              <DateTime
                type="date"
                label={t('sandbox.dateTime.errorLabel')}
                error={t('sandbox.dateTime.errorMessage')}
                defaultValue=""
              />
            </div>
            <SectionLiveCode
              presetKey="dateTime"
              description={t('sandbox.liveCode.dateTime')}
            />
          </Section>

          {/* ── Mobile Responsive ── */}
          <Section
            id="mobile"
            title={t('sandbox.mobile.title')}
            description={t('sandbox.mobile.description')}
          >
            <Suspense
              fallback={
                <div className="flex h-48 items-center justify-center rounded-token-lg border border-border-default bg-surface-secondary">
                  <Loader2
                    size={24}
                    className="animate-spin text-brand-primary"
                  />
                </div>
              }
            >
              <MobileResponsiveShowcase />
            </Suspense>
            <SectionLiveCode
              presetKey="mobile"
              description={t('sandbox.liveCode.mobile')}
            />
          </Section>

          {/* ── Dashboard ── */}
          <Section
            id="dashboard"
            title={t('sandbox.dashboard.title')}
            description={t('sandbox.dashboard.description')}
          >
            <Suspense
              fallback={
                <div className="flex h-48 items-center justify-center rounded-token-lg border border-border-default bg-surface-secondary">
                  <Loader2
                    size={24}
                    className="animate-spin text-brand-primary"
                  />
                </div>
              }
            >
              <DashboardShowcase />
            </Suspense>
          </Section>

          {/* ── AI ── */}
          <Section
            id="ai"
            title={t('sandbox.ai.title')}
            description={t('sandbox.ai.description')}
            badge={
              <BetaBadge
                label={dict.sandbox.sidebar.beta}
                tip={dict.sandbox.sidebar.betaTip}
              />
            }
          >
            <Suspense
              fallback={
                <div className="flex h-48 items-center justify-center rounded-token-lg border border-border-default bg-surface-secondary">
                  <Loader2
                    size={24}
                    className="animate-spin text-brand-primary"
                  />
                </div>
              }
            >
              <AIShowcase />
            </Suspense>
          </Section>

          {/* ── Accessibility Showcase ── */}
          <Section
            id="a11y"
            title={t('sandbox.a11y.title')}
            description={t('sandbox.a11y.description')}
          >
            {/* Focus Ring */}
            <div className="mb-8">
              <Label>Focus Ring</Label>
              <p className="text-sm text-content-secondary mb-3">
                Every interactive element renders a visible
                2px focus ring on <code className="rounded bg-surface-secondary px-1 py-0.5 text-xs font-mono">:focus-visible</code>,
                meeting WCAG 2.4.7. Click an element then use Tab to see the ring.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Focusable</Button>
                <Button variant="outline">Outline</Button>
                <button className="rounded-token border border-border-default bg-surface-primary px-4 py-2 text-sm text-content-primary transition-colors hover:bg-surface-secondary">
                  Native Button
                </button>
                <a
                  href="#a11y"
                  className="inline-flex items-center rounded-token px-4 py-2 text-sm font-medium text-brand-primary underline-offset-2 hover:underline"
                >
                  Link Element
                </a>
              </div>
            </div>

            {/* Tab Order */}
            <div className="mb-8">
              <Label>Tab Key Sequence</Label>
              <p className="text-sm text-content-secondary mb-3">
                Use <kbd className="rounded bg-surface-secondary px-1.5 py-0.5 font-mono text-xs border border-border-default">Tab</kbd> to
                walk through this mini-form. The focus order follows the visual
                reading order (top-to-bottom, left-to-right).
              </p>
              <div className="rounded-token-lg border border-border-default bg-surface-secondary p-6 space-y-4 max-w-md">
                <div className="flex items-center gap-2 text-xs text-content-muted">
                  <MousePointerClick size={14} />
                  Click here first, then press Tab repeatedly
                </div>
                <Input label="1 — First Name" placeholder="Tab stop 1" />
                <Input label="2 — Last Name" placeholder="Tab stop 2" />
                <Select
                  label="3 — Role"
                  options={[
                    { value: 'dev', label: 'Developer' },
                    { value: 'design', label: 'Designer' },
                    { value: 'pm', label: 'Product Manager' },
                  ]}
                />
                <div className="flex gap-3">
                  <Button variant="outline">4 — Cancel</Button>
                  <Button>5 — Submit</Button>
                </div>
              </div>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="mb-8">
              <Label>Keyboard Navigation</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: Keyboard,
                    keys: 'Esc',
                    desc: 'Closes Dialog and Select dropdown',
                  },
                  {
                    icon: Keyboard,
                    keys: 'Enter / Space',
                    desc: 'Activates buttons, opens Select, confirms Dialog',
                  },
                  {
                    icon: Keyboard,
                    keys: '↑ ↓ Arrow Keys',
                    desc: 'Navigates Select options',
                  },
                  {
                    icon: Keyboard,
                    keys: 'Tab / Shift+Tab',
                    desc: 'Moves focus forward/backward through interactive elements',
                  },
                ].map(({ icon: Icon, keys, desc }) => (
                  <div
                    key={keys}
                    className="flex gap-3 rounded-token bg-surface-secondary p-3"
                  >
                    <Icon
                      size={16}
                      className="mt-0.5 shrink-0 text-brand-primary"
                    />
                    <div>
                      <kbd className="rounded bg-surface-primary px-1.5 py-0.5 font-mono text-xs font-medium border border-border-default">
                        {keys}
                      </kbd>
                      <p className="mt-1 text-xs text-content-secondary">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ARIA & Screen Reader */}
            <div>
              <span className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-content-muted">
                ARIA & Screen Reader Bindings
                <span className="group relative">
                  <Info size={13} className="cursor-help text-content-muted transition-colors group-hover:text-brand-primary" />
                  <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-token bg-slate-900 px-3 py-1.5 text-[11px] normal-case tracking-normal text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-slate-100 dark:text-slate-900">
                    ARIA attributes and roles that enable assistive technologies to announce component states, labels, and live updates.
                  </span>
                </span>
              </span>
              <div className="space-y-3">
                {[
                  {
                    icon: Eye,
                    component: 'Button',
                    attrs: 'aria-busy (loading), aria-disabled',
                  },
                  {
                    icon: Eye,
                    component: 'Input',
                    attrs: 'aria-invalid (error), aria-describedby → hint/error, htmlFor → label',
                  },
                  {
                    icon: Eye,
                    component: 'Select',
                    attrs: 'aria-labelledby → label, role="listbox" via Radix',
                  },
                  {
                    icon: Monitor,
                    component: 'Dialog',
                    attrs: 'role="dialog", aria-label="Close dialog", focus trap, return focus',
                  },
                  {
                    icon: Monitor,
                    component: 'Toast',
                    attrs: 'role="status", aria-label="Dismiss notification", auto-dismiss',
                  },
                ].map(({ icon: Icon, component, attrs }) => (
                  <div
                    key={component}
                    className="flex items-start gap-3 rounded-token bg-surface-secondary p-3"
                  >
                    <Icon
                      size={16}
                      className="mt-0.5 shrink-0 text-brand-primary"
                    />
                    <div>
                      <span className="text-sm font-medium text-content-primary">
                        {component}
                      </span>
                      <p className="text-xs text-content-secondary">{attrs}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <SectionLiveCode
              presetKey="a11y"
              description={t('sandbox.liveCode.a11y')}
            />
          </Section>
        </div>
      </div>
    </div>
  )
}
