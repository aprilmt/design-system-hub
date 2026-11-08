/** Live Sandpack snippets for sandbox sections (not Dashboard / AI). */

export const sandboxPresets = {
  tokens: {
    dependencies: {},
    code: `export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-900">
      <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-slate-50">Semantic tokens</h2>
      <p className="mb-4 text-xs uppercase tracking-wider text-slate-400">Brand</p>
      <div className="mb-6 flex gap-3">
        <div className="h-12 w-12 rounded-lg bg-indigo-500" title="brand-primary" />
        <div className="h-12 w-12 rounded-lg bg-indigo-600" title="brand-primary-hover" />
        <div className="h-12 w-12 rounded-lg border border-slate-200 bg-indigo-50" title="brand-secondary" />
      </div>
      <p className="mb-4 text-xs uppercase tracking-wider text-slate-400">Feedback</p>
      <div className="mb-6 flex gap-3">
        <div className="h-12 w-12 rounded-lg bg-green-500" />
        <div className="h-12 w-12 rounded-lg bg-red-500" />
        <div className="h-12 w-12 rounded-lg bg-amber-500" />
        <div className="h-12 w-12 rounded-lg bg-sky-500" />
      </div>
      <p className="mb-4 text-xs uppercase tracking-wider text-slate-400">Radius</p>
      <div className="flex items-end gap-4">
        <div className="h-12 w-12 rounded border-2 border-indigo-500 bg-indigo-50" />
        <div className="h-12 w-12 rounded-lg border-2 border-indigo-500 bg-indigo-50" />
        <div className="h-12 w-12 rounded-xl border-2 border-indigo-500 bg-indigo-50" />
        <div className="h-12 w-12 rounded-full border-2 border-indigo-500 bg-indigo-50" />
      </div>
    </div>
  );
}`,
  },

  button: {
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
  const sizes = { sm: 'h-8 px-3 text-xs gap-1.5', md: 'h-10 px-4 text-sm gap-2', lg: 'h-12 px-6 text-base gap-2.5' };
  return (
    <button className={\`\${base} \${variants[variant]} \${sizes[size]}\`} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div className="space-y-8 bg-white p-8 min-h-screen">
      <h2 className="text-xl font-bold text-slate-900">Button + groups</h2>
      <div className="flex flex-wrap gap-3">
        <Button><ShoppingCart size={16} /> Add to Cart</Button>
        <Button variant="secondary"><Send size={16} /> Send</Button>
        <Button variant="outline"><Plus size={16} /> New</Button>
        <Button variant="destructive"><Trash2 size={16} /> Delete</Button>
        <Button loading>Loading</Button>
      </div>
      <div className="inline-flex rounded-lg border border-slate-200 p-0.5">
        <Button size="sm" variant="primary">List</Button>
        <Button size="sm" variant="ghost">Grid</Button>
        <Button size="sm" variant="ghost">Board</Button>
      </div>
    </div>
  );
}`,
  },

  input: {
    dependencies: { 'lucide-react': 'latest' },
    code: `import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

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
        className={\`w-full h-10 px-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 \${
          error ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 focus:ring-indigo-400'
        }\`}
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
  const [email, setEmail] = useState('');
  const error = email && !email.includes('@') ? 'Enter a valid email' : '';
  return (
    <div className="max-w-sm space-y-4 bg-white p-8 min-h-screen">
      <h2 className="text-xl font-bold text-slate-900">Input</h2>
      <Input label="Full Name" placeholder="Jane Doe" />
      <Input label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} error={error} hint="We'll never share your email." placeholder="jane@example.com" />
      <Input label="Company" value="Read-only Corp" disabled />
    </div>
  );
}`,
  },

  select: {
    dependencies: {},
    code: `import { useState } from 'react';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular', disabled: true },
];

export default function App() {
  const [value, setValue] = useState('react');
  return (
    <div className="max-w-sm space-y-4 bg-white p-8 min-h-screen">
      <h2 className="text-xl font-bold text-slate-900">Select</h2>
      <label className="block text-sm font-medium text-slate-700" htmlFor="fw">Framework</label>
      <select
        id="fw"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>
        ))}
      </select>
      <p className="text-xs text-slate-400">Selected: {value}</p>
    </div>
  );
}`,
  },

  dialog: {
    dependencies: {},
    code: `import { useState, useEffect, useRef } from 'react';

export default function App() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (!open) triggerRef.current?.focus();
  }, [open]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-8">
      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        className="h-10 rounded-lg bg-indigo-500 px-4 text-sm font-medium text-white hover:bg-indigo-600"
      >
        Open Dialog
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dlg-title"
            className="w-full max-w-sm rounded-xl bg-white p-5 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="dlg-title" className="text-lg font-bold text-slate-900">Confirm action</h2>
            <p className="mt-2 text-sm text-slate-500">Esc or backdrop closes. Focus returns to the trigger.</p>
            <div className="mt-4 flex justify-end gap-2">
              <button ref={closeRef} onClick={() => setOpen(false)} className="h-9 rounded-lg border border-slate-200 px-3 text-sm">Cancel</button>
              <button onClick={() => setOpen(false)} className="h-9 rounded-lg bg-indigo-500 px-3 text-sm text-white">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`,
  },

  toast: {
    dependencies: { 'lucide-react': 'latest' },
    code: `import { useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const styles = {
  success: { icon: CheckCircle2, bar: 'bg-green-500', text: 'text-green-600' },
  error: { icon: XCircle, bar: 'bg-red-500', text: 'text-red-600' },
  warning: { icon: AlertTriangle, bar: 'bg-amber-500', text: 'text-amber-600' },
  info: { icon: Info, bar: 'bg-sky-500', text: 'text-sky-600' },
};

export default function App() {
  const [toasts, setToasts] = useState([]);
  const push = (variant, title, description) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, variant, title, description }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  };

  return (
    <div className="relative min-h-screen bg-white p-8">
      <h2 className="mb-4 text-xl font-bold text-slate-900">Toast</h2>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => push('success', 'Saved', 'Changes stored.')} className="h-9 rounded-lg border border-slate-200 px-3 text-sm">Success</button>
        <button onClick={() => push('error', 'Error', 'Something failed.')} className="h-9 rounded-lg border border-slate-200 px-3 text-sm">Error</button>
        <button onClick={() => push('warning', 'Warning', 'Session expiring.')} className="h-9 rounded-lg border border-slate-200 px-3 text-sm">Warning</button>
        <button onClick={() => push('info', 'Update', 'New version ready.')} className="h-9 rounded-lg border border-slate-200 px-3 text-sm">Info</button>
      </div>
      <div className="fixed bottom-4 right-4 z-50 flex w-80 flex-col gap-2" role="region" aria-label="Notifications">
        {toasts.map((t) => {
          const s = styles[t.variant];
          const Icon = s.icon;
          return (
            <div key={t.id} className="flex overflow-hidden rounded-lg border border-slate-200 bg-white shadow-md" role="status">
              <div className={\`w-1 \${s.bar}\`} />
              <div className="flex flex-1 gap-2 p-3">
                <Icon size={16} className={\`mt-0.5 \${s.text}\`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900">{t.title}</p>
                  <p className="text-xs text-slate-500">{t.description}</p>
                </div>
                <button aria-label="Dismiss" onClick={() => setToasts((list) => list.filter((x) => x.id !== t.id))} className="text-slate-400 hover:text-slate-600">
                  <X size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}`,
  },

  mobile: {
    dependencies: { 'lucide-react': 'latest' },
    code: `import { useState } from 'react';
import { Home, Search, ShoppingBag, User, Menu } from 'lucide-react';

export default function App() {
  const [tab, setTab] = useState('home');
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'bag', label: 'Bag', icon: ShoppingBag },
    { id: 'profile', label: 'Profile', icon: User },
  ];
  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col border-x border-slate-200 bg-white">
      <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <Menu size={18} className="text-slate-500" />
        <span className="text-sm font-bold">Studio Shop</span>
        <span className="h-4 w-4" />
      </header>
      <main className="flex-1 p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {['Canvas tote', 'Studio lamp', 'Notebook'].map((name) => (
            <article key={name} className="overflow-hidden rounded-xl border border-slate-200">
              <div className="h-20 bg-indigo-100" />
              <p className="p-3 text-sm font-medium">{name}</p>
            </article>
          ))}
        </div>
      </main>
      <nav className="grid grid-cols-4 border-t border-slate-200" aria-label="Primary">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setTab(id)} className={\`flex flex-col items-center gap-1 py-2.5 text-[11px] \${tab === id ? 'text-indigo-600' : 'text-slate-400'}\`}>
            <Icon size={16} />{label}
          </button>
        ))}
      </nav>
    </div>
  );
}`,
  },

  a11y: {
    dependencies: {},
    code: `export default function App() {
  return (
    <div className="min-h-screen space-y-6 bg-white p-8">
      <h2 className="text-xl font-bold text-slate-900">Accessibility</h2>
      <p className="text-sm text-slate-500">Tab through — every control shows a visible focus ring.</p>
      <div className="flex flex-wrap gap-3">
        <button className="h-10 rounded-lg bg-indigo-500 px-4 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2">Primary</button>
        <button className="h-10 rounded-lg border border-slate-200 px-4 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2">Outline</button>
        <a href="#a11y" className="inline-flex h-10 items-center rounded-lg px-4 text-sm font-medium text-indigo-600 underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2">Link</a>
      </div>
      <form className="max-w-sm space-y-3" onSubmit={(e) => e.preventDefault()}>
        <label className="block text-sm font-medium text-slate-700" htmlFor="fn">First name</label>
        <input id="fn" className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400" placeholder="Ada" />
        <label className="block text-sm font-medium text-slate-700" htmlFor="ln">Last name</label>
        <input id="ln" className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400" placeholder="Lovelace" />
        <button type="submit" className="h-10 rounded-lg bg-indigo-500 px-4 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2">Submit</button>
      </form>
    </div>
  );
}`,
  },
}
