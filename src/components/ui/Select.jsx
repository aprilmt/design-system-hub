import { useId } from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '../../lib/utils'

export function Select({
  label,
  placeholder = 'Select an option\u2026',
  options = [],
  value,
  onValueChange,
  error,
  required,
  disabled,
}) {
  const id = useId()

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          id={`${id}-label`}
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

      <SelectPrimitive.Root
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectPrimitive.Trigger
          className={cn(
            'inline-flex items-center justify-between w-full h-10 px-3 rounded-token border text-sm',
            'bg-surface-primary text-content-primary',
            'transition-colors duration-150',
            'disabled:opacity-50 disabled:pointer-events-none',
            'data-[placeholder]:text-content-muted',
            error ? 'border-feedback-error' : 'border-border-default'
          )}
          aria-labelledby={label ? `${id}-label` : undefined}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon className="ml-2">
            <ChevronDown size={16} className="text-content-muted" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={cn(
              'overflow-hidden bg-surface-elevated rounded-token-lg border border-border-default shadow-token-lg z-50',
              'data-[state=open]:animate-overlay-show',
              'data-[state=closed]:animate-overlay-hide'
            )}
            position="popper"
            sideOffset={4}
          >
            <SelectPrimitive.Viewport className="p-1">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={cn(
                    'relative flex items-center h-9 pl-8 pr-3 rounded-token-sm text-sm select-none outline-none',
                    'text-content-primary cursor-pointer',
                    'data-[highlighted]:bg-brand-secondary data-[highlighted]:text-brand-primary',
                    'data-[disabled]:opacity-50 data-[disabled]:pointer-events-none'
                  )}
                >
                  <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                    <Check size={14} />
                  </SelectPrimitive.ItemIndicator>
                  <SelectPrimitive.ItemText>
                    {option.label}
                  </SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {error && (
        <p className="text-xs text-feedback-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
