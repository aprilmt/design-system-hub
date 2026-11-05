# Design System Hub

A semantic, tokenized component library and interactive sandbox that bridges Figma and code — built with React, Tailwind CSS, and Radix UI primitives.

👉 I built this site to familiarize myself with the latest front-end frameworks as a Product Designer—not just to experiment, but as a step toward becoming a builder who leverages AI tools(could also be benefitial for everyone else like me). Strong semantics also allow AI to read and reason about the system’s structure, tokens, and intent.

**[Live Demo](https://aprilmt.github.io/design-system-hub/)**

<img width="946" height="593" alt="dh" src="https://github.com/user-attachments/assets/b1ce9134-2c33-4364-b2f9-9c2bdca66a2a" />


## 🚀 The Core Philosophy
Traditional design-to-development handoffs are plagued by two major friction points: UI Drift (where developers interpret spacing, colors, and layout rules inconsistently) and Inconsistent Accessibility (where focus states, keyboard navigation, and screen reader labels are overlooked or implemented as late-stage bug fixes).

This sandbox addresses these problems by introducing a Single Source of Truth bridging Figma design files and production code through a highly structured, three-layer architectural system: Utility → Component → Pattern.

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

An embedded [Sandpack](https://sandpack.codesandbox.io/) editor on the `/#/ui` sandbox page with:

- **Preview on the left, code editor on the right** — edit JSX and see real-time rendering
- **Iframe isolation** — user code runs in a sandboxed iframe; errors can't crash the host page
- **5 preset demos** — Button + Icons, Form Validation, Modal Dialog, Toast System, Dark Mode
- **Theme-synced editor** — Sandpack theme switches with the site's light/dark mode

### System Matrix

A typed comparison surface at `/#/matrix` (`SystemMatrixCompare`) for walking design-system history and picking systems side by side:

- **Interactive timeline (2014–2026)** — Flat Design → Material 2 / Fluent → Material 3 → Headless & Tailwind/shadcn → Meta Astryx (illustrative). Selecting a year updates the era copy and highlights representative systems.
- **Comparison table** — select up to 3 systems; compare Design Philosophy, Tailwind Compatibility, AI/Agent-Ready (MCP/Cursor), Accessibility, and License.
- **Persistent picks** — selections stay when you change years; remove from the table or toggle cards in the era list.
- Dark-mode friendly layout with Lucide icons and smooth transitions.

### Stageshow home hero

The landing page includes a looping Stageshow demo (`DesignHubHero`) that walks a Tokens → components story: pick `brand-primary`, link a Button, open a Dialog, confirm with a Toast. Product tokens map onto the Stageshow kit look so the faux UI matches DesignHub.

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
- **TypeScript** — used for Stageshow kit and `SystemMatrixCompare`
- **Radix UI** — accessible primitives for Select, Dialog, Toast
- **Sandpack** — in-browser code editor with runtime transpilation
- **Lucide React** — icons
- **Stageshow kit** — faux product UI for the home hero

## Getting Started

```bash
git clone https://github.com/aprilmt/design-system-hub.git
cd design-system-hub
npm install
npm run dev
```

Open [http://localhost:5173/design-system-hub/](http://localhost:5173/design-system-hub/) —

| Route | Page |
|-------|------|
| `/` | Home — brand intro, Stageshow hero, CTAs |
| `/#/ui` | Sandbox — tokens, components, a11y, Sandpack |
| `/#/matrix` | System Matrix — timeline + comparison |

## Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   ├── Dialog.jsx
│   │   └── Toast.jsx
│   ├── Playground.jsx           # Sandpack live editor with 5 presets
│   ├── SystemMatrixCompare.tsx  # Timeline + compare matrix
│   └── ThemeToggle.jsx
├── pages/
│   ├── Home.jsx                 # Landing + Stageshow hero
│   ├── UISandbox.jsx            # /ui sandbox
│   └── Matrix.jsx               # /matrix page shell
├── stageshow/
│   ├── DesignHubHero.tsx        # Tokens → components looping demo
│   ├── designhub-look.css       # Token map onto kit --ss-* vars
│   └── kit/                     # Stageshow React kit
├── lib/
│   └── utils.js
├── index.css
├── App.jsx
└── main.jsx
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## License

ISC
