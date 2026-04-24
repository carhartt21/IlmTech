import Link from 'next/link';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getProjectTemplates, projectCategories } from '@/lib/projectTemplates';

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const { category } = await searchParams;

  const currentLocale = locale as Locale;
  const projects = getProjectTemplates(currentLocale);
  const selectedCategory = category ?? 'all';
  const availableCategoryIds = projectCategories.map((item) => item.id);
  const normalizedCategory = availableCategoryIds.includes(selectedCategory as (typeof availableCategoryIds)[number])
    ? selectedCategory
    : 'all';
  const filteredProjects = normalizedCategory === 'all'
    ? projects
    : projects.filter((project) => project.categories.includes(normalizedCategory));
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const aRealEstate = a.categories.includes('real-estate') ? 0 : 1;
    const bRealEstate = b.categories.includes('real-estate') ? 0 : 1;
    if (aRealEstate !== bRealEstate) return aRealEstate - bRealEstate;
    return a.title.localeCompare(b.title);
  });

  return (
    <section className="py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent-blue/10 text-accent-blue border border-accent-blue/30">
            {currentLocale === 'de' ? 'Projektvorlagen' : 'Project templates'}
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight text-white">
            {currentLocale === 'de' ? 'Projektbibliothek fuer Kundenprojekte' : 'Project library for client engagements'}
          </h1>
          <p className="mt-5 text-lg text-text-muted">
            {currentLocale === 'de'
              ? 'Hier sind integrierte Projektbeschreibungen als wiederverwendbare Vorlage fuer zukuenftige Angebote und Umsetzungen.'
              : 'Integrated project descriptions are stored here as reusable templates for future proposals and implementations.'}
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2 flex flex-wrap gap-2">
            <Link
              href={`/${currentLocale}/projekte`}
              className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${
                normalizedCategory === 'all'
                  ? 'bg-accent-blue/15 text-accent-blue border-accent-blue/40'
                  : 'bg-surface/40 text-text-muted border-white/10 hover:border-accent-blue/30 hover:text-accent-blue'
              }`}
            >
              {currentLocale === 'de' ? 'Alle' : 'All'}
            </Link>
            {projectCategories.map((categoryItem) => (
              <Link
                key={categoryItem.id}
                href={`/${currentLocale}/projekte?category=${categoryItem.id}`}
                className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${
                  normalizedCategory === categoryItem.id
                    ? 'bg-accent-blue/15 text-accent-blue border-accent-blue/40'
                    : 'bg-surface/40 text-text-muted border-white/10 hover:border-accent-blue/30 hover:text-accent-blue'
                }`}
              >
                {categoryItem.label[currentLocale]}
              </Link>
            ))}
          </div>

          {sortedProjects.map((project) => (
            <article key={project.slug} className="rounded-2xl border border-white/10 bg-surface/40 p-6">
              {project.categories.includes('real-estate') && (
                <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-accent-blue/15 border border-accent-blue/40 text-accent-blue">
                  {currentLocale === 'de' ? 'Empfohlen' : 'Recommended'}
                </span>
              )}
              <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
              <p className="mt-3 text-text-muted">{project.subtitle}</p>
              <p className="mt-4 text-sm text-text-muted">{project.clientProfile}</p>
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
              <div className="mt-6">
                <Link
                  href={`/${currentLocale}/projekte/${project.slug}`}
                  className="inline-flex items-center rounded-lg bg-accent-blue/10 border border-accent-blue/40 px-4 py-2 text-sm font-medium text-accent-blue hover:bg-accent-blue/20 transition-colors"
                >
                  {currentLocale === 'de' ? 'Projekt ansehen' : 'Open project'}
                </Link>
              </div>
            </article>
          ))}

          {sortedProjects.length === 0 && (
            <div className="md:col-span-2 rounded-2xl border border-white/10 bg-surface/40 p-6 text-text-muted">
              {currentLocale === 'de'
                ? 'Keine Projekte in dieser Kategorie gefunden.'
                : 'No projects found in this category.'}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
