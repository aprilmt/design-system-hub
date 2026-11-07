import { useState, useEffect, useRef, Suspense, lazy, useCallback } from 'react'
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
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { Dialog, DialogContent } from '../components/ui/Dialog'
import { useToast } from '../components/ui/Toast'
import { useLocale } from '../i18n/LocaleContext'

const Playground = lazy(() =>
  import('../components/Playground').then((m) => ({ default: m.Playground }))
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

/* ─── helpers ─── */

function Section({ id, title, description, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-20 border-b border-border-default py-10 last:border-b-0"
    >
      <h2 className="mb-1 font-display text-2xl font-normal tracking-normal text-slate-950 dark:text-slate-50">
        {title}
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
]

const selectOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular', disabled: true },
]

const sidebarLinkIds = [
  'playground',
  'mobile',
  'tokens',
  'button',
  'input',
  'select',
  'dialog',
  'toast',
  'dashboard',
  'ai',
  'a11y',
]

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
  const { toast } = useToast()

  const sidebarLinks = sidebarLinkIds.map((id) => ({
    id,
    label: dict.sandbox.sidebar[id],
  }))
  const sectionIds = sidebarLinkIds
  const activeSection = useActiveSection(sectionIds)

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
            {sidebarLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`block w-full text-left px-2 py-1.5 text-sm transition-colors ${
                  activeSection === l.id
                    ? 'font-medium text-content-primary'
                    : 'text-content-muted hover:text-content-primary'
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* main content */}
        <div className="flex-1 min-w-0">

          {/* ── Live Playground ── */}
          <Section
            id="playground"
            title={t('sandbox.playground.title')}
            description={t('sandbox.playground.description')}
          >
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-64 rounded-token-lg border border-border-default bg-surface-secondary">
                  <Loader2
                    size={24}
                    className="animate-spin text-brand-primary"
                  />
                </div>
              }
            >
              <Playground />
            </Suspense>
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
          </Section>

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
          </Section>
        </div>
      </div>
    </div>
  )
}
