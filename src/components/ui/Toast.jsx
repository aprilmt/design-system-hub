import {
  createContext,
  useContext,
  useCallback,
  useState,
  useRef,
} from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { cn } from '../../lib/utils'

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const variantStyles = {
  success: 'border-l-4 border-l-feedback-success bg-feedback-success-light',
  error: 'border-l-4 border-l-feedback-error bg-feedback-error-light',
  warning: 'border-l-4 border-l-feedback-warning bg-feedback-warning-light',
  info: 'border-l-4 border-l-feedback-info bg-feedback-info-light',
}

const iconColors = {
  success: 'text-feedback-success',
  error: 'text-feedback-error',
  warning: 'text-feedback-warning',
  info: 'text-feedback-info',
}

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const counterRef = useRef(0)

  const toast = useCallback(
    ({ title, description, variant = 'info', duration = 5000 }) => {
      const id = ++counterRef.current
      setToasts((prev) => [...prev, { id, title, description, variant, duration, open: true }])
    },
    []
  )

  const handleOpenChange = useCallback((id, open) => {
    if (!open) {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}

        {toasts.map((t) => {
          const Icon = icons[t.variant]
          return (
            <ToastPrimitive.Root
              key={t.id}
              open={t.open}
              duration={t.duration}
              onOpenChange={(open) => handleOpenChange(t.id, open)}
              className={cn(
                'flex items-start gap-3 rounded-token-lg border border-border-default p-4 shadow-token-lg',
                'data-[state=open]:animate-toast-slide-in',
                'data-[state=closed]:animate-toast-hide',
                'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
                'data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform',
                'data-[swipe=end]:animate-toast-swipe-out',
                variantStyles[t.variant]
              )}
            >
              <Icon
                size={20}
                className={cn('mt-0.5 shrink-0', iconColors[t.variant])}
                aria-hidden="true"
              />
              <div className="flex-1 min-w-0">
                {t.title && (
                  <ToastPrimitive.Title className="text-sm font-bold text-content-primary">
                    {t.title}
                  </ToastPrimitive.Title>
                )}
                {t.description && (
                  <ToastPrimitive.Description className="mt-0.5 text-sm text-content-secondary">
                    {t.description}
                  </ToastPrimitive.Description>
                )}
              </div>
              <ToastPrimitive.Close
                className="shrink-0 rounded-token-sm p-1 text-content-muted hover:text-content-primary transition-colors"
                aria-label="Dismiss notification"
              >
                <X size={14} aria-hidden="true" />
              </ToastPrimitive.Close>
            </ToastPrimitive.Root>
          )
        })}

        <ToastPrimitive.Viewport
          className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-96 max-w-[calc(100vw-2rem)] outline-none"
        />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}
