import { SystemMatrixCompare } from '../components/SystemMatrixCompare'

export function Matrix() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 max-w-2xl">
        <h1 className="mb-3 font-display text-3xl font-normal tracking-normal text-slate-950 dark:text-slate-50 sm:text-4xl">
          System matrix
        </h1>
        <p className="leading-relaxed text-content-secondary">
          Walk the paradigm timeline, then compare up to three design systems on philosophy, Tailwind fit, agent readiness, accessibility, and license.
        </p>
      </div>
      <SystemMatrixCompare />
    </div>
  )
}
