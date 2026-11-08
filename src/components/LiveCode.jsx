import { useState } from 'react'
import { Check, Clipboard, Code2 } from 'lucide-react'
import { cn } from '../lib/utils'

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function highlightHtml(source) {
  let out = escapeHtml(source)
  out = out.replace(
    /(&lt;!--[\s\S]*?--&gt;)/g,
    '<span class="text-slate-500">$1</span>',
  )
  out = out.replace(
    /(&lt;\/?)([\w-]+)([^&]*?)(\/?&gt;)/g,
    (_, open, tag, rest, close) => {
      const attrs = rest.replace(
        /([\w-:]+)(=)(&quot;[^&]*&quot;|&#39;[^&]*&#39;)/g,
        '<span class="text-slate-300">$1</span><span class="text-slate-500">$2</span><span class="text-violet-300">$3</span>',
      )
      return `<span class="text-sky-300">${open}${tag}</span>${attrs}<span class="text-sky-300">${close}</span>`
    },
  )
  return out
}

function highlightJavascript(source) {
  let out = escapeHtml(source)
  out = out.replace(
    /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
    '<span class="text-slate-500">$1</span>',
  )
  out = out.replace(
    /(&quot;[^&]*&quot;|&#39;[^&]*&#39;|`[^`]*`)/g,
    '<span class="text-emerald-300">$1</span>',
  )
  out = out.replace(
    /\b(import|from|export|default|function|const|let|var|return|if|else|true|false|null|undefined|new|class|extends|async|await)\b/g,
    '<span class="text-violet-300">$1</span>',
  )
  return out
}

const TABS = [
  { id: 'html', label: 'HTML' },
  { id: 'javascript', label: 'JavaScript' },
]

export function LiveCode({
  html = '',
  javascript = '',
  code,
  description,
  height = 360,
}) {
  const jsSource = javascript || code || ''
  const [tab, setTab] = useState(html ? 'html' : 'javascript')
  const [copied, setCopied] = useState(false)

  const source = tab === 'html' ? html : jsSource
  const highlighted =
    tab === 'html' ? highlightHtml(source) : highlightJavascript(source)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(source)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="mt-8">
      {description && (
        <div className="mb-3 flex items-start gap-2 text-sm text-content-secondary">
          <Code2 size={15} className="mt-0.5 shrink-0 text-brand-primary" />
          <p>{description}</p>
        </div>
      )}

      <div className="overflow-hidden rounded-token-lg border border-border-default shadow-token">
        <div className="flex items-center justify-between gap-3 border-b border-border-default bg-surface-secondary px-1">
          <div className="flex items-center" role="tablist" aria-label="Code language">
            {TABS.filter((t) => (t.id === 'html' ? Boolean(html) : Boolean(jsSource))).map(
              (t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    'px-3 py-2.5 text-sm font-medium transition-colors outline-none',
                    'focus-visible:!ring-2 focus-visible:!ring-[#DEE0E3] focus-visible:!ring-offset-0 focus-visible:!ring-offset-transparent',
                    tab === t.id
                      ? 'bg-[#DEE0E3] text-content-primary'
                      : 'text-content-muted hover:text-content-primary',
                  )}
                >
                  {t.label}
                </button>
              ),
            )}
          </div>
          <button
            type="button"
            onClick={copy}
            className="mr-2 inline-flex items-center gap-1.5 rounded-token-sm px-2.5 py-1.5 text-xs font-medium text-content-secondary transition-colors outline-none hover:bg-[#DEE0E3] hover:text-content-primary focus-visible:!ring-2 focus-visible:!ring-[#DEE0E3] focus-visible:!ring-offset-0 focus-visible:!ring-offset-transparent"
          >
            {copied ? <Check size={14} aria-hidden /> : <Clipboard size={14} aria-hidden />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <pre
          className="overflow-auto bg-slate-900 p-4 text-[13px] leading-5 text-slate-100"
          style={{ maxHeight: height }}
          tabIndex={0}
        >
          <code
            className="font-mono whitespace-pre"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </pre>
      </div>
    </div>
  )
}
