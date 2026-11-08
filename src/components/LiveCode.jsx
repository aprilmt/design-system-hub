import { useState, useEffect } from 'react'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from '@codesandbox/sandpack-react'
import { Code2 } from 'lucide-react'

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

export function LiveCode({
  code,
  dependencies = {},
  description,
  height = 360,
}) {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark'),
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

  return (
    <div className="mt-8">
      {description && (
        <div className="mb-3 flex items-start gap-2 text-sm text-content-secondary">
          <Code2 size={15} className="mt-0.5 shrink-0 text-brand-primary" />
          <p>{description}</p>
        </div>
      )}
      <div className="overflow-hidden rounded-token-lg border border-border-default shadow-token">
        <SandpackProvider
          key={isDark ? 'dark' : 'light'}
          template="react"
          theme={isDark ? darkTheme : lightTheme}
          files={{ '/App.js': code }}
          customSetup={{ dependencies }}
          options={{
            externalResources: ['https://cdn.tailwindcss.com'],
          }}
        >
          <SandpackLayout>
            <SandpackPreview
              style={{ height }}
              showOpenInCodeSandbox={false}
              showRefreshButton
            />
            <SandpackCodeEditor
              style={{ height }}
              showLineNumbers
              showInlineErrors
              wrapContent
            />
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  )
}
