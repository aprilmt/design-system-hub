/** Code samples for sandbox sections (HTML + JavaScript tabs, not Dashboard / AI). */

export const sandboxPresets = {
  tokens: {
    html: `<!-- Prefer semantic utilities mapped to CSS variables -->
<div class="space-y-6 bg-surface-secondary p-6">
  <p class="text-xs font-medium uppercase tracking-wider text-content-muted">Brand</p>
  <div class="flex gap-3">
    <div class="h-12 w-12 rounded-token-lg bg-brand-primary" title="brand-primary"></div>
    <div class="h-12 w-12 rounded-token-lg bg-brand-primary-hover" title="brand-primary-hover"></div>
    <div class="h-12 w-12 rounded-token-lg bg-brand-primary-active" title="brand-primary-active"></div>
    <div class="h-12 w-12 rounded-token-lg border border-border-default bg-brand-secondary" title="brand-secondary"></div>
  </div>

  <p class="text-xs font-medium uppercase tracking-wider text-content-muted">Feedback</p>
  <div class="flex gap-3">
    <div class="h-12 w-12 rounded-token-lg bg-feedback-success"></div>
    <div class="h-12 w-12 rounded-token-lg bg-feedback-error"></div>
    <div class="h-12 w-12 rounded-token-lg bg-feedback-warning"></div>
    <div class="h-12 w-12 rounded-token-lg bg-feedback-info"></div>
  </div>

  <p class="text-xs font-medium uppercase tracking-wider text-content-muted">Surface / Content / Border</p>
  <div class="flex flex-wrap gap-3">
    <div class="h-12 w-12 rounded-token-lg border border-border-default bg-surface-primary"></div>
    <div class="h-12 w-12 rounded-token-lg bg-content-primary"></div>
    <div class="h-12 w-12 rounded-token-lg bg-border-focus"></div>
  </div>

  <p class="text-xs font-medium uppercase tracking-wider text-content-muted">Radius + Shadow</p>
  <div class="flex items-end gap-4">
    <div class="h-12 w-12 rounded-token-sm border-2 border-brand-primary bg-brand-secondary"></div>
    <div class="h-12 w-12 rounded-token border-2 border-brand-primary bg-brand-secondary"></div>
    <div class="h-12 w-12 rounded-token-lg border-2 border-brand-primary bg-brand-secondary shadow-token"></div>
    <div class="h-12 w-12 rounded-token-full border-2 border-brand-primary bg-brand-secondary shadow-token-lg"></div>
  </div>
</div>`,
    javascript: `export default function App() {
  return (
    <div className="space-y-6 bg-surface-secondary p-6">
      <p className="text-xs font-medium uppercase tracking-wider text-content-muted">Brand</p>
      <div className="flex gap-3">
        <div className="h-12 w-12 rounded-token-lg bg-brand-primary" title="brand-primary" />
        <div className="h-12 w-12 rounded-token-lg bg-brand-primary-hover" title="brand-primary-hover" />
        <div className="h-12 w-12 rounded-token-lg bg-brand-primary-active" title="brand-primary-active" />
        <div className="h-12 w-12 rounded-token-lg border border-border-default bg-brand-secondary" title="brand-secondary" />
      </div>

      <p className="text-xs font-medium uppercase tracking-wider text-content-muted">Feedback</p>
      <div className="flex gap-3">
        <div className="h-12 w-12 rounded-token-lg bg-feedback-success" />
        <div className="h-12 w-12 rounded-token-lg bg-feedback-error" />
        <div className="h-12 w-12 rounded-token-lg bg-feedback-warning" />
        <div className="h-12 w-12 rounded-token-lg bg-feedback-info" />
      </div>

      <p className="text-xs font-medium uppercase tracking-wider text-content-muted">Radius + Shadow</p>
      <div className="flex items-end gap-4">
        <div className="h-12 w-12 rounded-token-sm border-2 border-brand-primary bg-brand-secondary" />
        <div className="h-12 w-12 rounded-token border-2 border-brand-primary bg-brand-secondary" />
        <div className="h-12 w-12 rounded-token-lg border-2 border-brand-primary bg-brand-secondary shadow-token" />
        <div className="h-12 w-12 rounded-token-full border-2 border-brand-primary bg-brand-secondary shadow-token-lg" />
      </div>
    </div>
  );
}`,
  },

  button: {
    html: `<div class="space-y-8 bg-white p-8">
  <h2 class="text-xl font-bold text-slate-900">Button + groups</h2>
  <div class="flex flex-wrap gap-3">
    <button type="button" class="inline-flex h-10 items-center gap-2 rounded-lg bg-indigo-500 px-4 text-sm font-medium text-white hover:bg-indigo-600">
      Add to Cart
    </button>
    <button type="button" class="inline-flex h-10 items-center gap-2 rounded-lg bg-indigo-50 px-4 text-sm font-medium text-indigo-600 hover:bg-indigo-100">
      Send
    </button>
    <button type="button" class="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-800 hover:bg-slate-50">
      New
    </button>
    <button type="button" class="inline-flex h-10 items-center gap-2 rounded-lg bg-red-500 px-4 text-sm font-medium text-white hover:bg-red-600">
      Delete
    </button>
    <button type="button" class="inline-flex h-10 items-center gap-2 rounded-lg bg-indigo-500 px-4 text-sm font-medium text-white" aria-busy="true" disabled>
      Loading
    </button>
  </div>
  <div class="inline-flex rounded-lg border border-slate-200 p-0.5" role="group" aria-label="View mode">
    <button type="button" class="h-8 rounded-md bg-indigo-500 px-3 text-xs font-medium text-white">List</button>
    <button type="button" class="h-8 rounded-md px-3 text-xs font-medium text-slate-800 hover:bg-slate-100">Grid</button>
    <button type="button" class="h-8 rounded-md px-3 text-xs font-medium text-slate-800 hover:bg-slate-100">Board</button>
  </div>
</div>`,
    javascript: `import { Loader2, ShoppingCart, Send, Trash2, Plus } from 'lucide-react';

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
    html: `<div class="max-w-sm space-y-4 bg-white p-8">
  <h2 class="text-xl font-bold text-slate-900">Input</h2>
  <div class="space-y-1">
    <label for="full-name" class="block text-sm font-medium text-slate-700">Full Name</label>
    <input id="full-name" type="text" placeholder="Jane Doe" class="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm" />
  </div>
  <div class="space-y-1">
    <label for="email" class="block text-sm font-medium text-slate-700">Email <span class="text-red-500">*</span></label>
    <input id="email" type="email" required placeholder="jane@example.com" aria-describedby="email-hint" class="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm" />
    <p id="email-hint" class="text-xs text-slate-400">We'll never share your email.</p>
  </div>
  <div class="space-y-1">
    <label for="company" class="block text-sm font-medium text-slate-700">Company</label>
    <input id="company" type="text" value="Read-only Corp" disabled class="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm opacity-50" />
  </div>
</div>`,
    javascript: `import { useState } from 'react';
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
    html: `<div class="max-w-sm space-y-4 bg-white p-8">
  <h2 class="text-xl font-bold text-slate-900">Select</h2>
  <label class="block text-sm font-medium text-slate-700" for="fw">Framework</label>
  <select id="fw" class="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm">
    <option value="react" selected>React</option>
    <option value="vue">Vue</option>
    <option value="svelte">Svelte</option>
    <option value="angular" disabled>Angular</option>
  </select>
</div>`,
    javascript: `import { useState } from 'react';

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

  tabs: {
    html: `<div class="space-y-8 bg-white p-8">
  <div class="mb-4 border-b border-slate-200">
    <ul class="flex flex-wrap -mb-px text-center text-sm font-medium" role="tablist">
      <li class="me-2" role="presentation">
        <button type="button" role="tab" aria-selected="true" class="inline-flex items-center justify-center rounded-t-lg border-b-2 border-indigo-500 p-4 text-indigo-500">Overview</button>
      </li>
      <li class="me-2" role="presentation">
        <button type="button" role="tab" aria-selected="false" class="inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-4 text-slate-400 hover:border-indigo-500 hover:text-indigo-500">Pricing</button>
      </li>
      <li role="presentation">
        <button type="button" role="tab" aria-selected="false" class="inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-4 text-slate-400 hover:border-indigo-500 hover:text-indigo-500">Reviews</button>
      </li>
    </ul>
  </div>
  <div role="tabpanel" class="rounded-lg bg-slate-50 p-4">
    <p class="text-sm text-slate-500">This is some placeholder content the <strong class="font-medium text-slate-900">Overview tab's associated content</strong>.</p>
  </div>
</div>`,
    javascript: `import { useState } from 'react';
import { User, LayoutDashboard, Settings, MessageSquare } from 'lucide-react';

const items = [
  { value: 'profile', label: 'Profile', icon: User, body: "This is some placeholder content the Profile tab's associated content." },
  { value: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, body: "This is some placeholder content the Dashboard tab's associated content." },
  { value: 'settings', label: 'Settings', icon: Settings, body: "This is some placeholder content the Settings tab's associated content." },
  { value: 'contacts', label: 'Contacts', icon: MessageSquare, body: "This is some placeholder content the Contacts tab's associated content." },
];

export default function App() {
  const [value, setValue] = useState('profile');
  const active = items.find((item) => item.value === value);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="mb-4 border-b border-slate-200">
        <ul className="flex flex-wrap -mb-px text-center text-sm font-medium" role="tablist">
          {items.map((item, i) => {
            const selected = item.value === value;
            const Icon = item.icon;
            return (
              <li key={item.value} className={i < items.length - 1 ? 'me-2' : undefined} role="presentation">
                <button
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setValue(item.value)}
                  className={\`group inline-flex items-center justify-center rounded-t-lg border-b-2 p-4 \${selected ? 'border-indigo-500 text-indigo-500' : 'border-transparent text-slate-400 hover:border-indigo-500 hover:text-indigo-500'}\`}
                >
                  <Icon size={16} className={\`me-2 \${selected ? 'text-indigo-500' : 'text-slate-400 group-hover:text-indigo-500'}\`} />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div role="tabpanel" className="rounded-lg bg-slate-50 p-4">
        <p className="text-sm text-slate-500">{active.body}</p>
      </div>
    </div>
  );
}`,
  },

  dialog: {
    html: `<!-- Trigger -->
<button type="button" class="h-10 rounded-lg bg-indigo-500 px-4 text-sm font-medium text-white hover:bg-indigo-600">
  Open Dialog
</button>

<!-- Dialog -->
<div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4" role="presentation">
  <div role="dialog" aria-modal="true" aria-labelledby="dlg-title" class="w-full max-w-sm rounded-xl bg-white p-5 shadow-lg">
    <h2 id="dlg-title" class="text-lg font-bold text-slate-900">Confirm action</h2>
    <p class="mt-2 text-sm text-slate-500">Esc or backdrop closes. Focus returns to the trigger.</p>
    <div class="mt-4 flex justify-end gap-2">
      <button type="button" class="h-9 rounded-lg border border-slate-200 px-3 text-sm">Cancel</button>
      <button type="button" class="h-9 rounded-lg bg-indigo-500 px-3 text-sm text-white">Confirm</button>
    </div>
  </div>
</div>`,
    javascript: `import { useState, useEffect, useRef } from 'react';

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

  emptyState: {
    html: `<div class="flex min-h-[240px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-10 text-center">
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.75" aria-hidden="true">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
  </svg>
  <p class="mt-4 text-base font-semibold text-slate-900">Nothing here yet</p>
  <p class="mt-1 max-w-xs text-sm text-slate-500">Add a file to get started.</p>
  <button type="button" class="mt-5 inline-flex h-[34px] min-w-[112px] items-center justify-center rounded-lg bg-indigo-500 px-4 text-sm font-medium text-white">Add</button>
</div>`,
    javascript: `import { useState } from 'react';
import { Inbox, Trash2 } from 'lucide-react';

const seed = [
  { id: 'a', title: 'Brand guidelines.pdf', meta: 'Shared · 2 days ago' },
  { id: 'b', title: 'Q4 research notes', meta: 'Private · Yesterday' },
];

export default function App() {
  const [items, setItems] = useState(seed);

  if (items.length === 0) {
    return (
      <div className="flex min-h-[240px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-10 text-center">
        <Inbox size={40} strokeWidth={1.75} className="text-indigo-500" />
        <p className="mt-4 text-base font-semibold text-slate-900">Nothing here yet</p>
        <p className="mt-1 max-w-xs text-sm text-slate-500">Add a file to get started.</p>
        <button
          type="button"
          onClick={() => setItems(seed)}
          className="mt-5 inline-flex h-[34px] min-w-[112px] items-center justify-center rounded-lg bg-indigo-500 px-4 text-sm font-medium text-white"
        >
          Add
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2.5 rounded-xl border border-slate-200 bg-white p-4">
      {items.map((row) => (
        <div key={row.id} className="flex h-12 items-center gap-3 rounded-lg border border-slate-200 px-3">
          <span className="size-4 rounded-full border-2 border-slate-300" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-900">{row.title}</p>
            <p className="truncate text-xs text-slate-500">{row.meta}</p>
          </div>
          <button type="button" aria-label={\`Delete \${row.title}\`} onClick={() => setItems((list) => list.filter((x) => x.id !== row.id))} className="rounded p-1.5 text-slate-400 hover:text-red-500">
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}`,
  },

  toast: {
    html: `<div class="space-y-4 bg-white p-8">
  <h2 class="text-xl font-bold text-slate-900">Toast</h2>
  <div class="flex flex-wrap gap-2">
    <button type="button" class="h-9 rounded-lg border border-slate-200 px-3 text-sm">Success</button>
    <button type="button" class="h-9 rounded-lg border border-slate-200 px-3 text-sm">Error</button>
    <button type="button" class="h-9 rounded-lg border border-slate-200 px-3 text-sm">Warning</button>
    <button type="button" class="h-9 rounded-lg border border-slate-200 px-3 text-sm">Info</button>
  </div>

  <!-- Example toast -->
  <div class="flex w-80 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-md" role="status">
    <div class="w-1 bg-green-500"></div>
    <div class="flex flex-1 gap-2 p-3">
      <div class="min-w-0 flex-1">
        <p class="text-sm font-medium text-slate-900">Saved</p>
        <p class="text-xs text-slate-500">Changes stored.</p>
      </div>
      <button type="button" aria-label="Dismiss" class="text-slate-400 hover:text-slate-600">×</button>
    </div>
  </div>
</div>`,
    javascript: `import { useState } from 'react';
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

  dataList: {
    html: `<dl class="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
  <div class="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-4">
    <dt class="text-xs font-medium uppercase tracking-wider text-slate-400">Name</dt>
    <dd class="text-sm text-slate-900">Jane Doe</dd>
  </div>
  <div class="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-4">
    <dt class="text-xs font-medium uppercase tracking-wider text-slate-400">Role</dt>
    <dd class="text-sm text-slate-900">Product Designer</dd>
  </div>
  <div class="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-4">
    <dt class="text-xs font-medium uppercase tracking-wider text-slate-400">Team</dt>
    <dd class="text-sm text-slate-900">Design Systems</dd>
  </div>
  <div class="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-4">
    <dt class="text-xs font-medium uppercase tracking-wider text-slate-400">Status</dt>
    <dd class="text-sm text-slate-900">Active</dd>
  </div>
</dl>`,
    javascript: `const items = [
  { label: 'Name', value: 'Jane Doe' },
  { label: 'Role', value: 'Product Designer' },
  { label: 'Team', value: 'Design Systems' },
  { label: 'Status', value: 'Active' },
];

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h2 className="mb-4 text-lg font-bold text-slate-900">Data List</h2>
      <dl className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {items.map((item) => (
          <div key={item.label} className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-4">
            <dt className="text-xs font-medium uppercase tracking-wider text-slate-400">{item.label}</dt>
            <dd className="text-sm text-slate-900">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}`,
  },

  table: {
    html: `<div class="overflow-x-auto rounded-xl border border-slate-200 bg-white">
  <table class="w-full min-w-[28rem] border-collapse text-left text-sm">
    <caption class="sr-only">Team members</caption>
    <thead>
      <tr class="border-b border-slate-200 bg-slate-50">
        <th scope="col" class="px-4 py-3 text-xs font-medium uppercase tracking-wider text-slate-400">Name</th>
        <th scope="col" class="px-4 py-3 text-xs font-medium uppercase tracking-wider text-slate-400">Role</th>
        <th scope="col" class="px-4 py-3 text-xs font-medium uppercase tracking-wider text-slate-400">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-slate-200 hover:bg-slate-50">
        <td class="px-4 py-3 text-slate-900">Ada Lovelace</td>
        <td class="px-4 py-3 text-slate-900">Designer</td>
        <td class="px-4 py-3 text-slate-900">Active</td>
      </tr>
      <tr class="border-b border-slate-200 hover:bg-slate-50">
        <td class="px-4 py-3 text-slate-900">Grace Hopper</td>
        <td class="px-4 py-3 text-slate-900">Engineer</td>
        <td class="px-4 py-3 text-slate-900">Active</td>
      </tr>
      <tr class="hover:bg-slate-50">
        <td class="px-4 py-3 text-slate-900">Alan Turing</td>
        <td class="px-4 py-3 text-slate-900">Research</td>
        <td class="px-4 py-3 text-slate-900">Away</td>
      </tr>
    </tbody>
  </table>
</div>`,
    javascript: `const columns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
];

const rows = [
  { name: 'Ada Lovelace', role: 'Designer', status: 'Active' },
  { name: 'Grace Hopper', role: 'Engineer', status: 'Active' },
  { name: 'Alan Turing', role: 'Research', status: 'Away' },
];

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h2 className="mb-4 text-lg font-bold text-slate-900">Table</h2>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
          <caption className="sr-only">Team members</caption>
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {columns.map((col) => (
                <th key={col.key} scope="col" className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-slate-400">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-slate-900">{row[col.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}`,
  },

  dateTime: {
    html: `<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
  <div class="space-y-1.5">
    <label class="block text-sm font-medium text-slate-900" for="date">Date</label>
    <button id="date" type="button" class="relative flex h-10 w-full items-center rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-10 text-left text-sm font-medium text-slate-900">
      Nov 8, 2026
    </button>
    <p class="text-xs text-slate-400">Custom calendar with brand selection</p>
  </div>
  <div class="space-y-1.5">
    <label class="block text-sm font-medium text-slate-900" for="time">Time</label>
    <button id="time" type="button" class="relative flex h-10 w-full items-center rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-10 text-left text-sm font-medium text-slate-900">
      2:30 PM
    </button>
    <p class="text-xs text-slate-400">Custom time picker with brand selection</p>
  </div>
</div>`,
    javascript: `import { useState } from 'react';

export default function App() {
  const [date, setDate] = useState('2026-11-08');
  const [time, setTime] = useState('14:30');

  return (
    <div className="grid grid-cols-1 gap-4 bg-slate-50 p-6 sm:grid-cols-2">
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-900">Date</label>
        <button
          type="button"
          onClick={() => setDate('2026-11-08')}
          className="flex h-10 w-full items-center rounded-lg border border-slate-200 bg-white px-3 text-left text-sm font-medium text-slate-900"
        >
          {date}
        </button>
      </div>
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-900">Time</label>
        <button
          type="button"
          onClick={() => setTime('14:30')}
          className="flex h-10 w-full items-center rounded-lg border border-slate-200 bg-white px-3 text-left text-sm font-medium text-slate-900"
        >
          {time}
        </button>
      </div>
    </div>
  );
}`,
  },

  mobile: {
    html: `<div class="mx-auto flex min-h-[28rem] max-w-sm flex-col border border-slate-200 bg-white">
  <header class="flex items-center justify-between border-b border-slate-200 px-4 py-3">
    <span class="text-slate-500">Menu</span>
    <span class="text-sm font-bold">Studio Shop</span>
    <span class="h-4 w-4"></span>
  </header>
  <main class="flex-1 p-4">
    <div class="grid grid-cols-1 gap-3">
      <article class="overflow-hidden rounded-xl border border-slate-200">
        <div class="h-20 bg-indigo-100"></div>
        <p class="p-3 text-sm font-medium">Canvas tote</p>
      </article>
      <article class="overflow-hidden rounded-xl border border-slate-200">
        <div class="h-20 bg-indigo-100"></div>
        <p class="p-3 text-sm font-medium">Studio lamp</p>
      </article>
    </div>
  </main>
  <nav class="grid grid-cols-4 border-t border-slate-200" aria-label="Primary">
    <button type="button" class="py-2.5 text-[11px] text-indigo-600">Home</button>
    <button type="button" class="py-2.5 text-[11px] text-slate-400">Search</button>
    <button type="button" class="py-2.5 text-[11px] text-slate-400">Bag</button>
    <button type="button" class="py-2.5 text-[11px] text-slate-400">Profile</button>
  </nav>
</div>`,
    javascript: `import { useState } from 'react';
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
    html: `<div class="space-y-6 bg-white p-8">
  <h2 class="text-xl font-bold text-slate-900">Accessibility</h2>
  <p class="text-sm text-slate-500">Tab through — every control shows a visible focus ring.</p>
  <div class="flex flex-wrap gap-3">
    <button type="button" class="h-10 rounded-lg bg-indigo-500 px-4 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2">Primary</button>
    <button type="button" class="h-10 rounded-lg border border-slate-200 px-4 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2">Outline</button>
    <a href="#a11y" class="inline-flex h-10 items-center rounded-lg px-4 text-sm font-medium text-indigo-600 underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2">Link</a>
  </div>
  <form class="max-w-sm space-y-3">
    <label class="block text-sm font-medium text-slate-700" for="fn">First name</label>
    <input id="fn" class="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400" placeholder="Ada" />
    <label class="block text-sm font-medium text-slate-700" for="ln">Last name</label>
    <input id="ln" class="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400" placeholder="Lovelace" />
    <button type="submit" class="h-10 rounded-lg bg-indigo-500 px-4 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2">Submit</button>
  </form>
</div>`,
    javascript: `export default function App() {
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
