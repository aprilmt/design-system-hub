import { useState, useEffect } from 'react'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from '@codesandbox/sandpack-react'
import { Code2 } from 'lucide-react'
import { cn } from '../lib/utils'

/* ────────────────────────────────────────────
   Sandpack themes — synced to our design tokens
   ──────────────────────────────────────────── */

const lightTheme = {
  colors: {
    surface1: '#ffffff',
    surface2: '#f8fafc',
    surface3: '#f1f5f9',
    clickable: '#64748b',
    base: '#0f172a',
    disabled: '#94a3b8',
    hover: '#1e293b',
    accent: '#6366f1',
    error: '#ef4444',
    errorSurface: '#fef2f2',
  },
  syntax: {
    plain: '#334155',
    comment: { color: '#94a3b8', fontStyle: 'italic' },
    keyword: '#6366f1',
    tag: '#0ea5e9',
    punctuation: '#64748b',
    definition: '#0f172a',
    property: '#6366f1',
    static: '#059669',
    string: '#059669',
  },
  font: {
    body: 'Inter, system-ui, sans-serif',
    mono: '"Fira Code", "JetBrains Mono", "SF Mono", monospace',
    size: '13px',
    lineHeight: '20px',
  },
}

const darkTheme = {
  colors: {
    surface1: '#1e293b',
    surface2: '#0f172a',
    surface3: '#334155',
    clickable: '#94a3b8',
    base: '#e2e8f0',
    disabled: '#64748b',
    hover: '#f1f5f9',
    accent: '#818cf8',
    error: '#f87171',
    errorSurface: '#450a0a',
  },
  syntax: {
    plain: '#e2e8f0',
    comment: { color: '#64748b', fontStyle: 'italic' },
    keyword: '#818cf8',
    tag: '#38bdf8',
    punctuation: '#94a3b8',
    definition: '#f1f5f9',
    property: '#818cf8',
    static: '#34d399',
    string: '#34d399',
  },
  font: {
    body: 'Inter, system-ui, sans-serif',
    mono: '"Fira Code", "JetBrains Mono", "SF Mono", monospace',
    size: '13px',
    lineHeight: '20px',
  },
}

/* ────────────────────────────────────────────
   Preset code snippets
   ──────────────────────────────────────────── */

const presets = [
  /* ── 1. Button + Icons ── */
  {
    name: 'Button + Icons',
    description:
      'Composing a Button with icon slots, loading spinner, disabled state, and all five semantic variants.',
    dependencies: { 'lucide-react': 'latest' },
    code: `import { Loader2, ShoppingCart, Send, Trash2, Plus } from 'lucide-react';

function Button({ variant = 'primary', size = 'md', loading, disabled, children, ...props }) {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    primary: 'bg-indigo-500 text-white hover:bg-indigo-600',
    secondary: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100',
    outline: 'border border-slate-200 text-slate-800 hover:bg-slate-50',
    ghost: 'text-slate-800 hover:bg-slate-100',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
  };
  const sizes = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-12 px-6 text-base gap-2.5',
  };
  return (
    <button
      className={\`\${base} \${variants[variant]} \${sizes[size]}\`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div className="p-8 space-y-8 bg-white min-h-screen">
      <h2 className="text-xl font-bold text-slate-900">Button + Icon Composition</h2>

      <section className="space-y-2">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">With Icons</p>
        <div className="flex flex-wrap gap-3">
          <Button><ShoppingCart size={16} /> Add to Cart</Button>
          <Button variant="secondary"><Send size={16} /> Send</Button>
          <Button variant="destructive"><Trash2 size={16} /> Delete</Button>
          <Button variant="outline"><Plus size={16} /> New Item</Button>
        </div>
      </section>

      <section className="space-y-2">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Loading State</p>
        <div className="flex gap-3">
          <Button loading>Processing\u2026</Button>
          <Button variant="outline" loading>Saving</Button>
        </div>
      </section>

      <section className="space-y-2">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Disabled</p>
        <div className="flex gap-3">
          <Button disabled>Unavailable</Button>
          <Button variant="destructive" disabled>No Delete</Button>
        </div>
      </section>

      <section className="space-y-2">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">All Sizes</p>
        <div className="flex items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>
    </div>
  );
}`,
  },

  /* ── 2. Form Validation ── */
  {
    name: 'Form Validation',
    description:
      'Input with aria-invalid, aria-describedby, live error messages (role="alert"), and a working submit flow.',
    dependencies: { 'lucide-react': 'latest' },
    code: `import { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

function Input({ label, error, hint, required, id, ...props }) {
  const inputId = id || label?.toLowerCase().replace(/\\s/g, '-');
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700">
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={\`w-full h-10 px-3 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 placeholder:text-slate-400 \${
          error ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 focus:ring-indigo-400'
        } disabled:opacity-50\`}
        aria-invalid={!!error}
        aria-describedby={error ? inputId + '-err' : hint ? inputId + '-hint' : undefined}
        required={required}
        {...props}
      />
      {hint && !error && <p id={inputId + '-hint'} className="text-xs text-slate-400">{hint}</p>}
      {error && (
        <p id={inputId + '-err'} className="flex items-center gap-1 text-xs text-red-500" role="alert">
          <AlertCircle size={12} />{error}
        </p>
      )}
    </div>
  );
}

export default function App() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.includes('@')) e.email = 'Enter a valid email';
    if (form.password.length < 6) e.password = 'At least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
        <CheckCircle2 size={48} className="text-green-500 mb-3" />
        <h2 className="text-xl font-bold text-slate-900">Success!</h2>
        <p className="text-slate-500 mt-1">Account created for {form.name}</p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: '', email: '', password: '' }); setErrors({}); }}
          className="mt-4 text-sm text-indigo-500 hover:underline"
        >
          Reset form
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (validate()) setSubmitted(true); }}
      className="max-w-sm mx-auto p-8 bg-white min-h-screen"
    >
      <h2 className="text-xl font-bold text-slate-900 mb-6">Sign Up</h2>
      <div className="space-y-4">
        <Input label="Full Name" required value={form.name} error={errors.name}
          onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" />
        <Input label="Email" type="email" required value={form.email} error={errors.email}
          onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane@example.com"
          hint="We'll never share your email." />
        <Input label="Password" type="password" required value={form.password} error={errors.password}
          onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Min 6 characters" />
        <button type="submit"
          className="w-full h-10 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">
          Create Account
        </button>
      </div>
    </form>
  );
}`,
  },

  /* ── 3. Modal Dialog ── */
  {
    name: 'Modal Dialog',
    description:
      'Focus management, Esc key to close, backdrop click dismissal, and focus-return to the trigger element.',
    dependencies: { 'lucide-react': 'latest' },
    code: `import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

function Dialog({ open, onClose, title, children }) {
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    panelRef.current?.querySelector('input, button, [tabindex]')?.focus();
    return () => {
      document.removeEventListener('keydown', handleKey);
      prev?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-label={title}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div ref={panelRef} className="relative z-10 w-full max-w-md bg-white rounded-xl p-6 shadow-xl mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <button onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Close">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-8">
      <div className="text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Dialog Demo</h2>
        <p className="text-sm text-slate-500 mb-6">Focus trap \u00b7 Esc to close \u00b7 Backdrop click \u00b7 Focus return</p>
        <button onClick={() => setOpen(true)}
          className="h-10 px-6 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">
          Open Dialog
        </button>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)} title="Confirm Action">
        <p className="text-sm text-slate-500 mb-4">Try pressing Esc, clicking the backdrop, or tabbing between the elements below.</p>
        <input className="w-full h-10 px-3 mb-4 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2" placeholder="Type something\u2026" />
        <div className="flex justify-end gap-3">
          <button onClick={() => setOpen(false)}
            className="h-9 px-4 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">
            Cancel
          </button>
          <button onClick={() => setOpen(false)}
            className="h-9 px-4 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">
            Confirm
          </button>
        </div>
      </Dialog>
    </div>
  );
}`,
  },

  /* ── 4. Toast System ── */
  {
    name: 'Toast System',
    description:
      'Notification pattern with 4 semantic variants, auto-dismiss timer, manual dismiss, and slide-in animation.',
    dependencies: { 'lucide-react': 'latest' },
    code: `import { useState, useEffect, useCallback } from 'react';
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const META = {
  success: { Icon: CheckCircle2, border: 'border-l-green-500', bg: 'bg-green-50', color: 'text-green-600' },
  error:   { Icon: AlertCircle,  border: 'border-l-red-500',   bg: 'bg-red-50',   color: 'text-red-600' },
  warning: { Icon: AlertTriangle,border: 'border-l-amber-500', bg: 'bg-amber-50', color: 'text-amber-600' },
  info:    { Icon: Info,         border: 'border-l-blue-500',  bg: 'bg-blue-50',  color: 'text-blue-600' },
};

function Toast({ id, title, message, variant, onDismiss }) {
  const { Icon, border, bg, color } = META[variant];
  useEffect(() => {
    const t = setTimeout(() => onDismiss(id), 4000);
    return () => clearTimeout(t);
  }, [id, onDismiss]);
  return (
    <div className={\`flex items-start gap-3 p-4 rounded-lg border-l-4 shadow-lg \${border} \${bg} animate-[slideIn_200ms_ease-out]\`} role="status">
      <Icon size={18} className={\`mt-0.5 \${color}\`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900">{title}</p>
        <p className="text-xs text-slate-500 mt-0.5">{message}</p>
      </div>
      <button onClick={() => onDismiss(id)} className="text-slate-400 hover:text-slate-600 p-0.5" aria-label="Dismiss"><X size={14} /></button>
    </div>
  );
}

let counter = 0;
export default function App() {
  const [toasts, setToasts] = useState([]);
  const dismiss = useCallback((id) => setToasts(t => t.filter(x => x.id !== id)), []);
  const add = (variant, title, message) => setToasts(t => [...t, { id: ++counter, variant, title, message }]);

  return (
    <div className="p-8 bg-white min-h-screen">
      <style>{\`@keyframes slideIn { from { transform: translateX(100%); opacity: 0 } to { transform: translateX(0); opacity: 1 } }\`}</style>
      <h2 className="text-xl font-bold text-slate-900 mb-2">Toast Notifications</h2>
      <p className="text-sm text-slate-500 mb-6">Auto-dismiss after 4 s. Swipe or click \u00d7 to dismiss early.</p>
      <div className="flex flex-wrap gap-3">
        <button onClick={() => add('success','Saved!','Your changes have been saved.')}
          className="h-9 px-4 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">Success</button>
        <button onClick={() => add('error','Error','Something went wrong.')}
          className="h-9 px-4 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2">Error</button>
        <button onClick={() => add('warning','Warning','Session expires in 5 min.')}
          className="h-9 px-4 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2">Warning</button>
        <button onClick={() => add('info','Update','A new version is available.')}
          className="h-9 px-4 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">Info</button>
      </div>
      <div className="fixed bottom-4 right-4 w-80 space-y-2 z-50">
        {toasts.map(t => <Toast key={t.id} {...t} onDismiss={dismiss} />)}
      </div>
    </div>
  );
}`,
  },

  /* ── 5. Dark Mode Tokens ── */
  {
    name: 'Dark Mode',
    description:
      'CSS-variable theme switching via Tailwind dark: utilities — no flash on load, instant toggle.',
    dependencies: { 'lucide-react': 'latest' },
    code: `import { useState } from 'react';
import { Sun, Moon, Palette } from 'lucide-react';

export default function App() {
  const [dark, setDark] = useState(false);
  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen p-8 bg-white dark:bg-slate-900 transition-colors duration-200">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Palette size={20} className="text-indigo-500 dark:text-indigo-400" /> Theme Tokens
            </h2>
            <button onClick={() => setDark(!dark)}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="Toggle theme">
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 transition-colors">
              <p className="text-sm font-medium text-slate-900 dark:text-white">Surface Card</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Adapts via surface + content tokens</p>
            </div>

            <input className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Input follows the active theme" />

            <div className="flex gap-3">
              <button className="flex-1 h-10 bg-indigo-500 dark:bg-indigo-400 text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">Primary</button>
              <button className="flex-1 h-10 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">Secondary</button>
            </div>

            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-2">Token Palette</p>
            <div className="grid grid-cols-4 gap-2">
              {[
                'bg-indigo-500','bg-green-500','bg-red-500','bg-amber-500',
                'bg-slate-900 dark:bg-white','bg-slate-600 dark:bg-slate-300','bg-slate-300 dark:bg-slate-600','bg-slate-100 dark:bg-slate-800',
              ].map((c, i) => (
                <div key={i} className={\`h-10 rounded-lg transition-colors duration-200 \${c}\`} />
              ))}
            </div>
            <p className="text-xs text-center text-slate-400 dark:text-slate-500">CSS variables swap via dark: utility</p>
          </div>
        </div>
      </div>
    </div>
  );
}`,
  },
]

/* ────────────────────────────────────────────
   Playground component
   ──────────────────────────────────────────── */

export function Playground() {
  const [activePreset, setActivePreset] = useState(0)
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  )

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [])

  const preset = presets[activePreset]

  return (
    <div>
      {/* Preset selector */}
      <div className="flex flex-wrap gap-2 mb-3" role="tablist" aria-label="Code presets">
        {presets.map((p, i) => (
          <button
            key={p.name}
            role="tab"
            aria-selected={i === activePreset}
            onClick={() => setActivePreset(i)}
            className={cn(
              'px-3.5 py-1.5 text-sm font-medium rounded-token-full transition-colors',
              i === activePreset
                ? 'bg-brand-primary text-content-on-brand shadow-token-sm'
                : 'bg-surface-secondary text-content-secondary hover:text-content-primary hover:bg-surface-primary border border-border-default'
            )}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="flex items-start gap-2 mb-4 text-sm text-content-secondary">
        <Code2 size={15} className="mt-0.5 shrink-0 text-brand-primary" />
        <p>{preset.description}</p>
      </div>

      {/* Sandpack editor — preview LEFT, code RIGHT */}
      <div className="rounded-token-lg overflow-hidden border border-border-default shadow-token">
        <SandpackProvider
          key={`${activePreset}-${isDark}`}
          template="react"
          theme={isDark ? darkTheme : lightTheme}
          files={{ '/App.js': preset.code }}
          customSetup={{
            dependencies: preset.dependencies || {},
          }}
          options={{
            externalResources: ['https://cdn.tailwindcss.com'],
          }}
        >
          <SandpackLayout>
            <SandpackPreview
              style={{ height: '480px' }}
              showOpenInCodeSandbox={false}
              showRefreshButton
            />
            <SandpackCodeEditor
              style={{ height: '480px' }}
              showLineNumbers
              showInlineErrors
              wrapContent
            />
          </SandpackLayout>
        </SandpackProvider>
      </div>

      <p className="mt-3 text-xs text-content-muted text-center">
        Code runs in an isolated iframe — edit freely, errors won't crash the
        host page.
      </p>
    </div>
  )
}
