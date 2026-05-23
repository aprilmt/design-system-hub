# Design System Hub

A semantic, tokenized component library and interactive sandbox that bridges Figma and code — built with React, Tailwind CSS, and Radix UI primitives.

**[Live Demo](https://aprilmt.github.io/design-system-hub/)**

## 🚀 The Core Philosophy
Traditional design-to-development handoffs are plagued by two major friction points: UI Drift (where developers interpret spacing, colors, and layout rules inconsistently) and Inconsistent Accessibility (where focus states, keyboard navigation, and screen reader labels are overlooked or implemented as late-stage bug fixes).

This sandbox addresses these problems by introducing a Single Source of Truth bridging Figma design files and production code through a highly structured, three-layer architectural system: Utility ➔ Component ➔ Pattern.

## Features

### Semantic Design Tokens

CSS custom properties mapped to Tailwind utility classes that mirror Figma variable naming:

- **Brand** — `bg-brand-primary`, `bg-brand-secondary`
- **Surface** — `bg-surface-primary`, `bg-surface-elevated`
- **Content** — `text-content-primary`, `text-content-muted`
- **Feedback** — `text-feedback-error`, `bg-feedback-success-light`
- **Border & Radius** — `border-border-default`, `rounded-token`, `rounded-token-lg`

Light and dark themes swap automatically via `:root` / `.dark` CSS variable scopes.

### 5 Core Components

| Component | Primitive | Highlights |
|-----------|-----------|------------|
| **Button** | Native `<button>` | 5 variants, 3 sizes, loading spinner, `aria-busy` |
| **Input** | Native `<input>` | Auto-generated IDs, `aria-invalid`, `aria-describedby` |
| **Select** | `@radix-ui/react-select` | Keyboard navigation (Arrow/Enter/Esc), `aria-labelledby` |
| **Dialog** | `@radix-ui/react-dialog` | Focus trap, Esc to close, focus return to trigger |
| **Toast** | `@radix-ui/react-toast` | 4 semantic variants, auto-dismiss, swipe to dismiss |

### Live Playground (Sandpack)

An embedded [Sandpack](https://sandpack.codesandbox.io/) editor on the `/ui` sandbox page with:

- **Preview on the left, code editor on the right** — edit JSX and see real-time rendering
- **Iframe isolation** — user code runs in a sandboxed iframe; errors can't crash the host page
- **5 preset demos** — Button + Icons, Form Validation, Modal Dialog, Toast System, Dark Mode
- **Theme-synced editor** — Sandpack theme switches with the site's light/dark mode

### Accessibility (WCAG 2.2 AA)

- Visible focus rings on every interactive element (`:focus-visible`)
- Tab key sequencing follows visual reading order
- Esc key closes Dialog and Select
- ARIA attributes: `aria-invalid`, `aria-describedby`, `aria-busy`, `aria-modal`, `role="alert"`, `role="dialog"`, `role="status"`
- Screen reader compatibility verified across all components

### Dark Mode

One-click theme toggle with `localStorage` persistence and no flash on page load (inline `<script>` in `<head>` checks preference before React hydrates).

## Tech Stack

- **React 19** + **React Router 7** (HashRouter for static hosting)
- **Vite 6** — build tooling
- **Tailwind CSS 3** — utility-first styling with `darkMode: 'class'`
- **Radix UI** — accessible primitives for Select, Dialog, Toast
- **Sandpack** — in-browser code editor with runtime transpilation
- **Lucide React** — icons

## Getting Started

```bash
git clone https://github.com/aprilmt/design-system-hub.git
cd design-system-hub
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — the home page loads at `/` and the component sandbox at `/#/ui`.

## Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.jsx        # 5 variants, 3 sizes, loading/disabled
│   │   ├── Input.jsx         # Label, hint, error, aria bindings
│   │   ├── Select.jsx        # Radix primitive, keyboard nav
│   │   ├── Dialog.jsx        # Focus trap, Esc close, return focus
│   │   └── Toast.jsx         # 4 variants, auto-dismiss, swipe
│   ├── Playground.jsx        # Sandpack live editor with 5 presets
│   └── ThemeToggle.jsx       # Sun/Moon toggle, localStorage
├── pages/
│   ├── Home.jsx              # Landing page
│   └── UISandbox.jsx         # /ui — component sandbox + a11y showcase
├── lib/
│   └── utils.js              # cn() utility (clsx + tailwind-merge)
├── index.css                 # Design tokens (CSS custom properties)
├── App.jsx                   # Layout shell, routing, ToastProvider
└── main.jsx                  # Entry point
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## License

ISC
