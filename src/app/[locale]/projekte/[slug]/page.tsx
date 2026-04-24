import Link from 'next/link';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getProjectBySlug, projectCategories, projectTemplates, t } from '@/lib/projectTemplates';

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    projectTemplates.map((project) => ({ locale, slug: project.slug })),
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const currentLocale = locale as Locale;

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <Link
            href={`/${currentLocale}/projekte`}
            className="inline-flex items-center rounded-lg border border-white/15 bg-primary-dark/40 px-4 py-2 text-sm text-text-muted hover:text-accent-blue hover:border-accent-blue/40 transition-colors"
          >
            {currentLocale === 'de' ? 'Zur Projektübersicht' : 'Back to projects'}
          </Link>
          <span className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent-blue/10 text-accent-blue border border-accent-blue/30">
            {currentLocale === 'de' ? 'Projektbeschreibung' : 'Project description'}
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight text-white">{t(project.title, currentLocale)}</h1>
          <p className="mt-5 text-lg text-text-muted">{t(project.subtitle, currentLocale)}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.categories.map((categoryId) => {
              const categoryItem = projectCategories.find((item) => item.id === categoryId);
              if (!categoryItem) return null;
              return (
                <span
                  key={`${project.slug}-${categoryId}`}
                  className="inline-flex items-center rounded-full px-2.5 py-1 text-xs bg-white/5 border border-white/10 text-text-muted"
                >
                  {categoryItem.label[currentLocale]}
                </span>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-6">
          <article className="rounded-2xl border border-white/10 bg-surface/40 p-6">
            <h2 className="text-xl font-semibold text-white">
              {currentLocale === 'de' ? 'Zielkunde' : 'Target client'}
            </h2>
            <p className="mt-3 text-text-muted">{t(project.clientProfile, currentLocale)}</p>
          </article>

          <article className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-6">
            <h2 className="text-xl font-semibold text-white">
              {currentLocale === 'de' ? 'Projektziel' : 'Project objective'}
            </h2>
            <p className="mt-3 text-text-muted">{t(project.objective, currentLocale)}</p>
            <ul className="mt-5 grid gap-2 text-text-muted list-disc pl-5">
              {project.highlights.map((item, index) => (
                <li key={index}>{t(item, currentLocale)}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-white/10 bg-surface/40 p-6">
            <h2 className="text-xl font-semibold text-white">
              {currentLocale === 'de' ? 'Architekturmodell' : 'Architecture model'}
            </h2>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              {project.architecture.map((section, index) => (
                <div key={index} className="rounded-xl border border-white/10 bg-primary-dark/40 p-4">
                  <h3 className="font-semibold text-white">{t(section.title, currentLocale)}</h3>
                  <ul className="mt-2 grid gap-2 text-sm text-text-muted list-disc pl-5">
                    {section.points.map((point, pointIndex) => (
                      <li key={pointIndex}>{t(point, currentLocale)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-white/10 bg-surface/40 p-6">
            <h2 className="text-xl font-semibold text-white">
              {currentLocale === 'de' ? 'Kernprozesse' : 'Core workflows'}
            </h2>
            <div className="mt-4 grid gap-4">
              {project.workflows.map((workflow, index) => (
                <div key={index} className="rounded-xl border border-white/10 bg-primary-dark/40 p-4">
                  <h3 className="font-semibold text-white">{t(workflow.title, currentLocale)}</h3>
                  <p className="mt-1 text-sm text-text-muted">{t(workflow.summary, currentLocale)}</p>
                  <ul className="mt-3 grid gap-2 text-sm text-text-muted list-disc pl-5">
                    {workflow.steps.map((step, stepIndex) => (
                      <li key={stepIndex}>{t(step, currentLocale)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-white/10 bg-surface/40 p-6">
            <h2 className="text-xl font-semibold text-white">{currentLocale === 'de' ? 'Roadmap' : 'Roadmap'}</h2>
            <div className="mt-4 grid md:grid-cols-3 gap-4">
              {project.roadmap.map((phase, index) => (
                <div key={index} className="rounded-xl border border-white/10 bg-primary-dark/40 p-4">
                  <h3 className="font-semibold text-white">{t(phase.title, currentLocale)}</h3>
                  <ul className="mt-2 grid gap-2 text-sm text-text-muted list-disc pl-5">
                    {phase.points.map((point, pointIndex) => (
                      <li key={pointIndex}>{t(point, currentLocale)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-white/10 bg-surface/40 p-6">
            <h2 className="text-xl font-semibold text-white">
              {currentLocale === 'de' ? 'Angebotsstruktur' : 'Offer structure'}
            </h2>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              {project.offer.map((part, index) => (
                <div key={index} className="rounded-xl border border-white/10 bg-primary-dark/40 p-4">
                  <h3 className="font-semibold text-white">{t(part.title, currentLocale)}</h3>
                  <ul className="mt-2 grid gap-2 text-sm text-text-muted list-disc pl-5">
                    {part.points.map((point, pointIndex) => (
                      <li key={pointIndex}>{t(point, currentLocale)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
