import { Link } from 'react-router-dom'
import {
  Palette,
  Component,
  Accessibility,
  Moon,
  ArrowRight,
} from 'lucide-react'
import { Button } from '../components/ui/Button'

const features = [
  {
    icon: Palette,
    title: 'Design Tokens',
    desc: 'Semantic color, spacing, and radius tokens mapped 1-to-1 to Figma variables. One source of truth for both designers and developers.',
  },
  {
    icon: Component,
    title: '5 Core Components',
    desc: 'Button, Input, Select, Dialog, and Toast — built on Radix primitives with full keyboard and screen-reader support.',
  },
  {
    icon: Accessibility,
    title: 'WCAG 2.2 AA',
    desc: 'Focus rings, Tab key sequencing, Esc to close, and ARIA bindings verified against accessibility guidelines.',
  },
  {
    icon: Moon,
    title: 'Dark Mode',
    desc: 'Elegant theme switching powered by CSS custom properties and Tailwind\'s dark: utility — no flash on load.',
  },
]

export function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <section className="text-center mb-20">
        <p className="mb-3 text-sm font-medium tracking-wide text-brand-primary uppercase">
          Semantic Component Library
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-950 dark:text-slate-50 mb-5 leading-tight">
          Bridge the gap between
          <br />
          design and development
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-content-secondary mb-8">
          A lightweight React &amp; Tailwind CSS component library that brings
          Figma's variable logic into browser-native, keyboard-navigable
          UI&nbsp;states.
        </p>
        <Link to="/ui">
          <Button size="lg">
            Open Sandbox
            <ArrowRight size={18} />
          </Button>
        </Link>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-[2.5rem] border border-border-default bg-surface-elevated p-8 shadow-token-sm transition-shadow hover:shadow-token"
          >
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-token-lg bg-brand-secondary">
              <Icon size={22} className="text-brand-primary" />
            </div>
            <h2 className="mb-2 text-lg font-bold text-slate-950 dark:text-slate-50">
              {title}
            </h2>
            <p className="text-sm leading-relaxed text-content-secondary">
              {desc}
            </p>
          </div>
        ))}
      </section>
    </div>
  )
}
