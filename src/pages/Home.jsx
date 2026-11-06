import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { DesignHubHero } from '../stageshow/DesignHubHero'
import { useLocale } from '../i18n/LocaleContext'

export function Home() {
  const { t, dict } = useLocale()
  const pillars = dict.home.pillars

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,color-mix(in_srgb,var(--color-brand-primary)_18%,transparent),transparent_70%),radial-gradient(ellipse_50%_40%_at_10%_20%,color-mix(in_srgb,var(--color-brand-secondary)_80%,transparent),transparent_65%)]"
      />

      <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 pb-8 pt-14 xl:grid-cols-[minmax(280px,0.78fr)_minmax(520px,1.22fr)] xl:gap-6 xl:pb-6 xl:pt-16">
        <div className="relative z-10 max-w-xl">
          <p className="font-display text-[2.75rem] font-normal leading-[1.05] tracking-normal text-slate-950 dark:text-slate-50 sm:text-5xl lg:text-[3.35rem]">
            DesignHub
          </p>
          <h1 className="mt-5 text-xl font-medium leading-snug text-content-primary sm:text-2xl">
            {t('home.headline')}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-content-secondary">
            {t('home.intro')}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/ui">
              <Button size="lg">
                {t('home.openSandbox')}
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/matrix">
              <Button size="lg" variant="outline">
                {t('home.matrix')}
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative min-h-[280px] w-full xl:min-h-[360px] xl:-mr-6 xl:translate-x-2">
          <DesignHubHero />
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl border-t border-border-default px-6 py-16">
        <p className="mb-10 max-w-lg text-sm text-content-muted">
          {t('home.pillarsLead')}
        </p>
        <div className="grid gap-10 sm:grid-cols-3">
          {pillars.map(({ title, desc }) => (
            <div key={title}>
              <h2 className="mb-2 text-base font-bold text-slate-950 dark:text-slate-50">
                {title}
              </h2>
              <p className="text-sm leading-relaxed text-content-secondary">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
