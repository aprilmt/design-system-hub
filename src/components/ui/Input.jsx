import { forwardRef, useId } from 'react'
import { cn } from '../../lib/utils'

export const Input = forwardRef(function Input(
  {
    label,
    error,
    hint,
    className,
    id: propId,
    required,
    disabled,
    ...props
  },
  ref
) {
  const autoId = useId()
  const id = propId || autoId
  const errorId = `${id}-error`
  const hintId = `${id}-hint`

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-content-primary"
        >
          {label}
          {required && (
            <span className="text-feedback-error ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <input
        ref={ref}
        id={id}
        className={cn(
          'flex w-full h-10 px-3 rounded-token border bg-surface-primary text-content-primary',
          'text-sm placeholder:text-content-muted',
          'transition-colors duration-150',
          'disabled:opacity-50 disabled:pointer-events-none',
          error
            ? 'border-feedback-error focus-visible:ring-feedback-error'
            : 'border-border-default',
          className
        )}
        required={required}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [error && errorId, hint && !error && hintId]
            .filter(Boolean)
            .join(' ') || undefined
        }
        {...props}
      />

      {hint && !error && (
        <p id={hintId} className="text-xs text-content-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs text-feedback-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
})
