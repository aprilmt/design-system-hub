import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils'

const variantStyles = {
  primary:
    'bg-brand-primary text-content-on-brand hover:bg-brand-primary-hover active:bg-brand-primary-active',
  secondary:
    'bg-brand-secondary text-brand-primary hover:bg-brand-secondary-hover',
  outline:
    'border border-border-default bg-transparent text-content-primary hover:bg-surface-secondary',
  ghost:
    'bg-transparent text-content-primary hover:bg-surface-secondary',
  destructive:
    'bg-feedback-error text-white hover:opacity-90 active:opacity-80',
}

const sizeStyles = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2.5',
}

export const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    className,
    children,
    ...props
  },
  ref
) {
  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 16

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-token transition-colors duration-150',
        'disabled:opacity-50 disabled:pointer-events-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-disabled={disabled || loading || undefined}
      {...props}
    >
      {loading && (
        <Loader2
          size={iconSize}
          className="animate-spin"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  )
})
