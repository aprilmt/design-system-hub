import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronUp,
  Clock,
} from 'lucide-react'
import { cn } from '../../lib/utils'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function pad(n) {
  return String(n).padStart(2, '0')
}

function parseDateValue(value) {
  if (!value || typeof value !== 'string') return null
  const datePart = value.slice(0, 10)
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(datePart)
  if (!match) return null
  const year = Number(match[1])
  const month = Number(match[2]) - 1
  const day = Number(match[3])
  const date = new Date(year, month, day)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null
  }
  return date
}

function toDateString(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function formatDisplayDate(date) {
  if (!date) return ''
  return `${MONTHS[date.getMonth()].slice(0, 3)} ${date.getDate()}, ${date.getFullYear()}`
}

function buildMonthCells(viewYear, viewMonth) {
  const first = new Date(viewYear, viewMonth, 1)
  const startOffset = first.getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const daysInPrev = new Date(viewYear, viewMonth, 0).getDate()
  const cells = []

  for (let i = 0; i < 42; i += 1) {
    const dayNum = i - startOffset + 1
    if (dayNum < 1) {
      cells.push({
        day: daysInPrev + dayNum,
        inMonth: false,
        date: new Date(viewYear, viewMonth - 1, daysInPrev + dayNum),
      })
    } else if (dayNum > daysInMonth) {
      cells.push({
        day: dayNum - daysInMonth,
        inMonth: false,
        date: new Date(viewYear, viewMonth + 1, dayNum - daysInMonth),
      })
    } else {
      cells.push({
        day: dayNum,
        inMonth: true,
        date: new Date(viewYear, viewMonth, dayNum),
      })
    }
  }
  return cells
}

function sameDay(a, b) {
  return (
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function CalendarPanel({
  selected,
  onSelect,
  onClear,
  onToday,
}) {
  const initial = selected ?? new Date()
  const [viewYear, setViewYear] = useState(initial.getFullYear())
  const [viewMonth, setViewMonth] = useState(initial.getMonth())

  useEffect(() => {
    if (!selected) return
    setViewYear(selected.getFullYear())
    setViewMonth(selected.getMonth())
  }, [selected])

  const cells = useMemo(
    () => buildMonthCells(viewYear, viewMonth),
    [viewYear, viewMonth],
  )

  const shiftMonth = (delta) => {
    const next = new Date(viewYear, viewMonth + delta, 1)
    setViewYear(next.getFullYear())
    setViewMonth(next.getMonth())
  }

  return (
    <div className="w-70 rounded-token border border-border-default bg-surface-elevated p-3 shadow-token font-sans">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-content-primary">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-token-sm text-content-primary hover:bg-surface-secondary"
            aria-label="Previous month"
            onClick={() => shiftMonth(-1)}
          >
            <ChevronUp size={14} aria-hidden />
          </button>
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-token-sm text-content-primary hover:bg-surface-secondary"
            aria-label="Next month"
            onClick={() => shiftMonth(1)}
          >
            <ChevronDown size={14} aria-hidden />
          </button>
        </div>
      </div>

      <div className="mb-1 grid grid-cols-7 text-center">
        {WEEKDAYS.map((d, i) => (
          <span
            key={`${d}-${i}`}
            className="py-1 text-sm font-medium text-content-primary"
          >
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center">
        {cells.map((cell) => {
          const isSelected = sameDay(cell.date, selected)
          return (
            <button
              key={cell.date.toISOString()}
              type="button"
              onClick={() => onSelect(cell.date)}
              className={cn(
                'mx-auto flex h-8 w-8 items-center justify-center rounded-token-sm text-sm font-medium transition-colors',
                !cell.inMonth && 'text-content-muted',
                cell.inMonth && !isSelected && 'text-content-primary hover:bg-surface-secondary',
                isSelected &&
                  'bg-brand-primary text-content-on-brand hover:bg-brand-primary-hover',
              )}
            >
              {cell.day}
            </button>
          )
        })}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-border-default pt-2">
        <button
          type="button"
          className="text-sm font-medium text-brand-primary hover:text-brand-primary-hover"
          onClick={onClear}
        >
          Clear
        </button>
        <button
          type="button"
          className="text-sm font-medium text-brand-primary hover:text-brand-primary-hover"
          onClick={onToday}
        >
          Today
        </button>
      </div>
    </div>
  )
}

function DateField({
  id,
  value,
  onChange,
  disabled,
  error,
  className,
  required,
  describedBy,
  inputRef,
  name,
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const selected = parseDateValue(value)

  useEffect(() => {
    if (!open) return
    const onPointer = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={inputRef}
        type="button"
        id={id}
        name={name}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        aria-expanded={open}
        aria-haspopup="dialog"
        required={required}
        onClick={() => !disabled && setOpen((v) => !v)}
        className={cn(
          'relative flex h-10 w-full items-center rounded-token border bg-surface-primary py-2 pl-3 pr-10 text-left text-sm font-medium text-content-primary',
          'transition-colors duration-150',
          'disabled:pointer-events-none disabled:opacity-50',
          'outline-hidden focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-0',
          error ? 'border-feedback-error' : 'border-border-default',
          className,
        )}
      >
        <span className={selected ? 'text-content-primary' : 'text-content-muted'}>
          {selected ? formatDisplayDate(selected) : 'Select date'}
        </span>
        <CalendarIcon
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-content-muted"
          aria-hidden
        />
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-50 mt-2" role="dialog">
          <CalendarPanel
            selected={selected}
            onSelect={(date) => {
              onChange(toDateString(date))
              setOpen(false)
            }}
            onClear={() => {
              onChange('')
              setOpen(false)
            }}
            onToday={() => {
              onChange(toDateString(new Date()))
              setOpen(false)
            }}
          />
        </div>
      ) : null}
    </div>
  )
}

function parseTimeValue(value) {
  if (!value || typeof value !== 'string') return { hour: null, minute: null }
  const match = /^(\d{1,2}):(\d{2})$/.exec(value)
  if (!match) return { hour: null, minute: null }
  const hour = Number(match[1])
  const minute = Number(match[2])
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    return { hour: null, minute: null }
  }
  return { hour, minute }
}

function toTimeString(hour, minute) {
  return `${pad(hour)}:${pad(minute)}`
}

function formatDisplayTime(hour, minute) {
  if (hour == null || minute == null) return ''
  const period = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 === 0 ? 12 : hour % 12
  return `${hour12}:${pad(minute)} ${period}`
}

const HOURS = Array.from({ length: 24 }, (_, i) => i)
const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5)

function TimePanel({ hour, minute, onChange }) {
  const hourRef = useRef(null)
  const minuteRef = useRef(null)

  useEffect(() => {
    const scrollSelected = (el, selected) => {
      if (!el || selected == null) return
      const node = el.querySelector(`[data-value="${selected}"]`)
      node?.scrollIntoView({ block: 'center' })
    }
    scrollSelected(hourRef.current, hour)
    scrollSelected(minuteRef.current, minute)
  }, [hour, minute])

  const setHour = (nextHour) => {
    onChange(toTimeString(nextHour, minute ?? 0))
  }
  const setMinute = (nextMinute) => {
    onChange(toTimeString(hour ?? 0, nextMinute))
  }

  return (
    <div className="w-56 rounded-token border border-border-default bg-surface-elevated p-3 shadow-token font-sans">
      <div className="mb-2 grid grid-cols-2 gap-2 text-center">
        <span className="text-sm font-medium text-content-primary">Hour</span>
        <span className="text-sm font-medium text-content-primary">Minute</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div
          ref={hourRef}
          className="h-48 overflow-y-auto rounded-token-sm border border-border-default"
        >
          {HOURS.map((h) => {
            const selected = h === hour
            return (
              <button
                key={h}
                type="button"
                data-value={h}
                onClick={() => setHour(h)}
                className={cn(
                  'flex h-9 w-full items-center justify-center text-sm font-medium transition-colors',
                  selected
                    ? 'bg-brand-primary text-content-on-brand'
                    : 'text-content-primary hover:bg-surface-secondary',
                )}
              >
                {pad(h)}
              </button>
            )
          })}
        </div>
        <div
          ref={minuteRef}
          className="h-48 overflow-y-auto rounded-token-sm border border-border-default"
        >
          {MINUTES.map((m) => {
            const selected = m === minute
            return (
              <button
                key={m}
                type="button"
                data-value={m}
                onClick={() => setMinute(m)}
                className={cn(
                  'flex h-9 w-full items-center justify-center text-sm font-medium transition-colors',
                  selected
                    ? 'bg-brand-primary text-content-on-brand'
                    : 'text-content-primary hover:bg-surface-secondary',
                )}
              >
                {pad(m)}
              </button>
            )
          })}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-border-default pt-2">
        <button
          type="button"
          className="text-sm font-medium text-brand-primary hover:text-brand-primary-hover"
          onClick={() => onChange('')}
        >
          Clear
        </button>
        <button
          type="button"
          className="text-sm font-medium text-brand-primary hover:text-brand-primary-hover"
          onClick={() => {
            const now = new Date()
            onChange(toTimeString(now.getHours(), Math.floor(now.getMinutes() / 5) * 5))
          }}
        >
          Now
        </button>
      </div>
    </div>
  )
}

function TimeField({
  id,
  value,
  onChange,
  disabled,
  error,
  className,
  required,
  describedBy,
  inputRef,
  name,
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const { hour, minute } = parseTimeValue(value)
  const display = formatDisplayTime(hour, minute)

  useEffect(() => {
    if (!open) return
    const onPointer = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={inputRef}
        type="button"
        id={id}
        name={name}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        aria-expanded={open}
        aria-haspopup="dialog"
        required={required}
        onClick={() => !disabled && setOpen((v) => !v)}
        className={cn(
          'relative flex h-10 w-full items-center rounded-token border bg-surface-primary py-2 pl-3 pr-10 text-left text-sm font-medium text-content-primary',
          'transition-colors duration-150',
          'disabled:pointer-events-none disabled:opacity-50',
          'outline-hidden focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-0',
          error ? 'border-feedback-error' : 'border-border-default',
          className,
        )}
      >
        <span className={display ? 'text-content-primary' : 'text-content-muted'}>
          {display || 'Select time'}
        </span>
        <Clock
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-content-muted"
          aria-hidden
        />
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-50 mt-2" role="dialog">
          <TimePanel
            hour={hour}
            minute={minute}
            onChange={(next) => {
              onChange(next)
              if (next === '') setOpen(false)
            }}
          />
        </div>
      ) : null}
    </div>
  )
}

export const DateTime = forwardRef(function DateTime(
  {
    label,
    error,
    hint,
    type = 'date',
    className,
    id: propId,
    required,
    disabled,
    value: valueProp,
    defaultValue,
    onChange,
    name,
  },
  ref,
) {
  const autoId = useId()
  const id = propId || autoId
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy =
    [error && errorId, hint && !error && hintId].filter(Boolean).join(' ') ||
    undefined

  const isControlled = valueProp !== undefined
  const [internal, setInternal] = useState(defaultValue ?? '')
  const value = isControlled ? valueProp : internal

  const setValue = (next) => {
    if (!isControlled) setInternal(next)
    onChange?.({ target: { value: next, name } })
  }

  const datePart = typeof value === 'string' && value.includes('T')
    ? value.slice(0, 10)
    : type === 'date'
      ? value ?? ''
      : type === 'datetime'
        ? (value || '').slice(0, 10)
        : ''
  const timePart =
    type === 'time'
      ? value ?? ''
      : type === 'datetime'
        ? (value || '').includes('T')
          ? (value || '').slice(11, 16)
          : ''
        : ''

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-content-primary"
        >
          {label}
          {required && (
            <span className="ml-0.5 text-feedback-error" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {type === 'date' ? (
        <DateField
          id={id}
          name={name}
          value={datePart}
          onChange={setValue}
          disabled={disabled}
          error={error}
          className={className}
          required={required}
          describedBy={describedBy}
          inputRef={ref}
        />
      ) : null}

      {type === 'time' ? (
        <TimeField
          id={id}
          name={name}
          value={timePart}
          onChange={setValue}
          disabled={disabled}
          error={error}
          className={className}
          required={required}
          describedBy={describedBy}
          inputRef={ref}
        />
      ) : null}

      {type === 'datetime' ? (
        <div className="space-y-2">
          <DateField
            id={id}
            name={name}
            value={datePart}
            onChange={(nextDate) => {
              setValue(nextDate ? `${nextDate}T${timePart || '00:00'}` : '')
            }}
            disabled={disabled}
            error={error}
            className={className}
            required={required}
            describedBy={describedBy}
            inputRef={ref}
          />
          <TimeField
            id={`${id}-time`}
            value={timePart}
            onChange={(nextTime) => {
              if (!datePart && !nextTime) {
                setValue('')
                return
              }
              setValue(
                `${datePart || toDateString(new Date())}T${nextTime || '00:00'}`,
              )
            }}
            disabled={disabled}
            error={error}
            className={className}
            required={required}
          />
        </div>
      ) : null}

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
