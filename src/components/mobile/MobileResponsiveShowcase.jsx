import { useState } from 'react'
import {
  Home,
  Search,
  ShoppingBag,
  User,
  Menu,
  Bell,
  ChevronRight,
  Smartphone,
  Tablet,
  Monitor,
} from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { useLocale } from '../../i18n/LocaleContext'
import { cn } from '../../lib/utils'

const VIEWPORTS = [
  { id: 'phone', width: 360, icon: Smartphone, labelKey: 'viewportPhone' },
  { id: 'tablet', width: 768, icon: Tablet, labelKey: 'viewportTablet' },
  { id: 'desktop', width: 1024, icon: Monitor, labelKey: 'viewportDesktop' },
]

const PRODUCTS = [
  { id: 1, nameKey: 'productAlpha', price: '$48', tone: 'bg-brand-secondary' },
  { id: 2, nameKey: 'productBeta', price: '$72', tone: 'bg-feedback-info-light' },
  { id: 3, nameKey: 'productGamma', price: '$36', tone: 'bg-feedback-success-light' },
  { id: 4, nameKey: 'productDelta', price: '$94', tone: 'bg-feedback-warning-light' },
]

function Label({ children }) {
  return (
    <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-content-muted">
      {children}
    </span>
  )
}

function ViewportFrame({ viewport, children, label }) {
  return (
    <div className="overflow-x-auto rounded-token-lg border border-border-default bg-surface-secondary p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-medium text-content-muted">{label}</p>
        <p className="text-xs text-content-muted">{viewport.width}px</p>
      </div>
      <div
        className="mx-auto overflow-hidden rounded-[1.25rem] border border-border-strong bg-surface-primary shadow-token transition-[width] duration-300"
        style={{ width: `min(100%, ${viewport.width}px)` }}
      >
        {children}
      </div>
    </div>
  )
}

function ResponsiveStackDemo({ copy }) {
  return (
    <div>
      <Label>{copy.stackLabel}</Label>
      <p className="mb-3 text-sm text-content-secondary">{copy.stackDesc}</p>
      <div className="flex flex-col gap-3 md:flex-row">
        {['A', 'B', 'C'].map((item) => (
          <div
            key={item}
            className="flex flex-1 items-center justify-center rounded-token-lg border border-border-default bg-surface-secondary px-4 py-6 text-sm font-medium text-content-primary"
          >
            {copy.stackItem} {item}
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-content-muted">
        <code className="rounded bg-surface-secondary px-1.5 py-0.5 font-mono text-[11px]">
          flex-col md:flex-row
        </code>
      </p>
    </div>
  )
}

function ResponsiveToolbarDemo({ copy }) {
  return (
    <div>
      <Label>{copy.toolbarLabel}</Label>
      <p className="mb-3 text-sm text-content-secondary">{copy.toolbarDesc}</p>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1">
          <Input label={copy.searchLabel} placeholder={copy.searchPlaceholder} />
        </div>
        <div className="flex flex-wrap gap-2 sm:shrink-0">
          <Button variant="outline">{copy.filter}</Button>
          <Button>{copy.newItem}</Button>
        </div>
      </div>
    </div>
  )
}

function BottomNavDemo({ copy }) {
  const [active, setActive] = useState('home')
  const items = [
    { id: 'home', label: copy.navHome, icon: Home },
    { id: 'search', label: copy.navSearch, icon: Search },
    { id: 'bag', label: copy.navBag, icon: ShoppingBag },
    { id: 'profile', label: copy.navProfile, icon: User },
  ]

  return (
    <div>
      <Label>{copy.bottomNavLabel}</Label>
      <p className="mb-3 text-sm text-content-secondary">{copy.bottomNavDesc}</p>
      <div className="mx-auto max-w-sm overflow-hidden rounded-[1.25rem] border border-border-default bg-surface-primary shadow-token-sm">
        <div className="flex h-36 items-center justify-center bg-surface-secondary text-sm text-content-muted">
          {items.find((item) => item.id === active)?.label}
        </div>
        <nav
          className="grid grid-cols-4 border-t border-border-default bg-surface-elevated"
          aria-label={copy.bottomNavAria}
        >
          {items.map(({ id, label, icon: Icon }) => {
            const on = active === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                className={cn(
                  'flex flex-col items-center gap-1 px-2 py-3 text-[11px] transition-colors duration-200',
                  on
                    ? 'text-brand-primary'
                    : 'text-content-muted hover:text-content-primary',
                )}
                aria-current={on ? 'page' : undefined}
              >
                <Icon size={18} aria-hidden />
                {label}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

function ShopTemplate({ copy, viewportId }) {
  const cols =
    viewportId === 'desktop'
      ? 'grid-cols-3'
      : viewportId === 'tablet'
        ? 'grid-cols-2'
        : 'grid-cols-1'

  return (
    <div className="bg-surface-primary text-content-primary">
      <header className="flex items-center justify-between border-b border-border-default px-4 py-3">
        <button
          type="button"
          className="rounded-token p-2 text-content-secondary hover:bg-surface-secondary"
          aria-label={copy.menu}
        >
          <Menu size={18} />
        </button>
        <span className="text-sm font-bold">{copy.shopTitle}</span>
        <button
          type="button"
          className="rounded-token p-2 text-content-secondary hover:bg-surface-secondary"
          aria-label={copy.alerts}
        >
          <Bell size={18} />
        </button>
      </header>

      <div className="space-y-4 p-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-content-muted">
            {copy.featured}
          </p>
          <h3 className="mt-1 text-lg font-bold text-slate-950 dark:text-slate-50">
            {copy.shopHeadline}
          </h3>
        </div>

        <div className={cn('grid gap-3', cols)}>
          {PRODUCTS.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-token-lg border border-border-default bg-surface-elevated"
            >
              <div className={cn('h-24', product.tone)} />
              <div className="space-y-2 p-3">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-medium text-content-primary">
                    {copy[product.nameKey]}
                  </h4>
                  <span className="text-sm font-bold text-brand-primary">
                    {product.price}
                  </span>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-medium text-content-secondary hover:text-brand-primary"
                >
                  {copy.viewItem}
                  <ChevronRight size={14} aria-hidden />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

function CheckoutTemplate({ copy, viewportId }) {
  const twoCol = viewportId !== 'phone'
  const rowActions = viewportId !== 'phone'

  return (
    <div className="bg-surface-primary p-4 text-content-primary">
      <h3 className="mb-4 text-base font-bold text-slate-950 dark:text-slate-50">
        {copy.checkoutTitle}
      </h3>
      <div className={cn('grid gap-4', twoCol ? 'grid-cols-2' : 'grid-cols-1')}>
        <Input label={copy.firstName} placeholder={copy.firstNamePh} />
        <Input label={copy.lastName} placeholder={copy.lastNamePh} />
        <div className={twoCol ? 'col-span-2' : undefined}>
          <Input label={copy.email} type="email" placeholder={copy.emailPh} />
        </div>
        <div className={twoCol ? 'col-span-2' : undefined}>
          <Input label={copy.address} placeholder={copy.addressPh} />
        </div>
      </div>
      <div
        className={cn(
          'mt-4 flex gap-2',
          rowActions ? 'flex-row justify-end' : 'flex-col-reverse',
        )}
      >
        <Button
          variant="outline"
          className={rowActions ? 'w-auto' : 'w-full'}
        >
          {copy.cancel}
        </Button>
        <Button className={rowActions ? 'w-auto' : 'w-full'}>
          {copy.continue}
        </Button>
      </div>
    </div>
  )
}

function AppShellTemplate({ copy, viewportId }) {
  const [tab, setTab] = useState('home')
  const showSidebar = viewportId !== 'phone'
  const tabs = [
    { id: 'home', label: copy.navHome, icon: Home },
    { id: 'search', label: copy.navSearch, icon: Search },
    { id: 'bag', label: copy.navBag, icon: ShoppingBag },
    { id: 'profile', label: copy.navProfile, icon: User },
  ]

  return (
    <div className="flex min-h-[320px] flex-col bg-surface-primary text-content-primary">
      <header className="flex items-center justify-between border-b border-border-default px-4 py-3">
        <span className="text-sm font-bold">{copy.appTitle}</span>
        <span className="rounded-token bg-brand-secondary px-2 py-0.5 text-[11px] font-medium text-brand-primary">
          {copy.online}
        </span>
      </header>

      <div
        className={cn(
          'flex flex-1',
          showSidebar ? 'flex-row' : 'flex-col',
        )}
      >
        {showSidebar && (
          <aside className="w-44 shrink-0 border-r border-border-default p-3">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-content-muted">
              {copy.sidebar}
            </p>
            <ul className="space-y-1">
              {tabs.map(({ id, label }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => setTab(id)}
                    className={cn(
                      'w-full rounded-token px-2 py-1.5 text-left text-sm transition-colors',
                      tab === id
                        ? 'bg-brand-secondary font-medium text-brand-primary'
                        : 'text-content-secondary hover:bg-surface-secondary',
                    )}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <main className="flex-1 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-content-muted">
            {copy.content}
          </p>
          <h3 className="mt-1 text-lg font-bold text-slate-950 dark:text-slate-50">
            {tabs.find((item) => item.id === tab)?.label}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-content-secondary">
            {copy.appBody}
          </p>
          <div
            className={cn(
              'mt-4 grid gap-2',
              viewportId === 'desktop' ? 'grid-cols-3' : 'grid-cols-2',
            )}
          >
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-16 rounded-token-lg border border-dashed border-border-default bg-surface-secondary"
              />
            ))}
          </div>
        </main>
      </div>

      {!showSidebar && (
        <nav
          className="grid grid-cols-4 border-t border-border-default"
          aria-label={copy.bottomNavAria}
        >
          {tabs.map(({ id, label, icon: Icon }) => {
            const on = tab === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={cn(
                  'flex flex-col items-center gap-1 px-2 py-2.5 text-[11px] transition-colors',
                  on ? 'text-brand-primary' : 'text-content-muted',
                )}
              >
                <Icon size={16} aria-hidden />
                {label}
              </button>
            )
          })}
        </nav>
      )}
    </div>
  )
}

export function MobileResponsiveShowcase() {
  const { dict } = useLocale()
  const copy = dict.sandbox.mobile
  const [viewportId, setViewportId] = useState('phone')
  const [templateId, setTemplateId] = useState('shop')
  const viewport = VIEWPORTS.find((item) => item.id === viewportId) ?? VIEWPORTS[0]

  const templates = [
    {
      id: 'shop',
      label: copy.templateShop,
      node: <ShopTemplate copy={copy} viewportId={viewportId} />,
    },
    {
      id: 'checkout',
      label: copy.templateCheckout,
      node: <CheckoutTemplate copy={copy} viewportId={viewportId} />,
    },
    {
      id: 'shell',
      label: copy.templateShell,
      node: <AppShellTemplate copy={copy} viewportId={viewportId} />,
    },
  ]
  const activeTemplate = templates.find((item) => item.id === templateId) ?? templates[0]

  return (
    <div className="space-y-10">
      <div>
        <Label>{copy.breakpointsLabel}</Label>
        <p className="mb-3 text-sm text-content-secondary">{copy.breakpointsDesc}</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ['Default', '< 640'],
            ['sm', '≥ 640'],
            ['md', '≥ 768'],
            ['lg', '≥ 1024'],
          ].map(([name, range]) => (
            <div
              key={name}
              className="rounded-token-lg border border-border-default bg-surface-secondary px-3 py-3"
            >
              <p className="text-sm font-bold text-slate-950 dark:text-slate-50">{name}</p>
              <p className="mt-1 font-mono text-xs text-content-muted">{range}px</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <ResponsiveStackDemo copy={copy} />
        <ResponsiveToolbarDemo copy={copy} />
        <BottomNavDemo copy={copy} />
      </div>

      <div>
        <Label>{copy.templatesLabel}</Label>
        <p className="mb-4 text-sm text-content-secondary">{copy.templatesDesc}</p>

        <div className="mb-3 flex flex-wrap gap-2" role="tablist" aria-label={copy.templateTabsAria}>
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

        <div
          className="mb-4 flex flex-wrap gap-2"
          role="group"
          aria-label={copy.viewportAria}
        >
          {VIEWPORTS.map(({ id, icon: Icon, width, labelKey }) => (
            <button
              key={id}
              type="button"
              aria-pressed={viewportId === id}
              onClick={() => setViewportId(id)}
              className={cn(
                'inline-flex items-center gap-2 rounded-token px-3 py-1.5 text-sm transition-colors',
                viewportId === id
                  ? 'bg-brand-secondary font-medium text-brand-primary'
                  : 'text-content-muted hover:bg-surface-secondary hover:text-content-primary',
              )}
            >
              <Icon size={16} aria-hidden />
              {copy[labelKey]}
              <span className="font-mono text-[11px] opacity-70">{width}</span>
            </button>
          ))}
        </div>

        <ViewportFrame
          viewport={viewport}
          label={`${activeTemplate.label} · ${copy[viewport.labelKey]}`}
        >
          {activeTemplate.node}
        </ViewportFrame>
      </div>
    </div>
  )
}
