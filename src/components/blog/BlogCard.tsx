import type { CollectionEntry } from 'astro:content';

interface Props {
  post: CollectionEntry<'blog'>;
}

export function BlogCard({ post }: Props) {
  const { slug, data } = post;
  const { title, description, date, readTime, tags = [] } = data;

  // Formatear fecha
  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);

  return (
    <article className="group bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* Tags */}
      {tags.length > 0 && (
        <div className="px-6 pt-6 flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-block px-3 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Contenido */}
      <div className="p-6">
        {/* Título */}
        <h3 className="text-2xl font-display font-bold text-neutral-900 mb-3 group-hover:text-primary-700 transition-colors line-clamp-2">
          <a href={`/blog/${slug}`} className="hover:underline">
            {title}
          </a>
        </h3>

        {/* Descripción */}
        <p className="text-neutral-600 mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <time dateTime={date.toISOString()}>{formattedDate}</time>
          </div>

          {readTime && (
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{readTime}</span>
            </div>
          )}
        </div>

        {/* Link */}
        <a
          href={`/blog/${slug}`}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
        >
          Leer más
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </article>
  );
}
