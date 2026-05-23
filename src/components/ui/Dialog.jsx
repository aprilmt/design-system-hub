import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

export function Dialog({ open, onOpenChange, trigger, children }) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      )}
      {children}
    </DialogPrimitive.Root>
  )
}

export function DialogContent({
  title,
  description,
  children,
  className,
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={cn(
          'fixed inset-0 z-50 bg-surface-overlay backdrop-blur-sm',
          'data-[state=open]:animate-overlay-show data-[state=closed]:animate-overlay-hide'
        )}
      />
      <DialogPrimitive.Content
        className={cn(
          'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
          'rounded-token-lg border border-border-default bg-surface-elevated p-6 shadow-token-lg',
          'data-[state=open]:animate-content-show',
          'focus:outline-none',
          className
        )}
      >
        {title && (
          <DialogPrimitive.Title className="text-lg font-bold text-slate-950 dark:text-slate-50">
            {title}
          </DialogPrimitive.Title>
        )}
        {description && (
          <DialogPrimitive.Description className="mt-1 text-sm text-content-secondary">
            {description}
          </DialogPrimitive.Description>
        )}

        <div className="mt-4">{children}</div>

        <DialogPrimitive.Close
          className={cn(
            'absolute right-4 top-4 rounded-token-sm p-1.5',
            'text-content-muted hover:text-content-primary hover:bg-surface-secondary',
            'transition-colors'
          )}
          aria-label="Close dialog"
        >
          <X size={16} aria-hidden="true" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
