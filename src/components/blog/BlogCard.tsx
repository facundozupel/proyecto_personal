import type { Article } from '@/types/article';

interface Props {
  post: Article;
}

export function BlogCard({ post }: Props) {
  const { slug, title, description, tags = [] } = post;

  // Soportar tanto publishedAt (Article) como date (Content Collections)
  const postDate = (post as any).date || (post as any).publishedAt;

  // Formatear fecha
  const date = postDate instanceof Date ? postDate : new Date(postDate);
  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);

  return (
    <article className="group glass border border-white/10 rounded-2xl overflow-hidden hover:border-primary-500/50 hover:-translate-y-1 transition-all duration-300">
      {/* Tags */}
      {tags.length > 0 && (
        <div className="px-6 pt-6 flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-block px-3 py-1 text-xs font-medium bg-primary-500/20 text-primary-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Contenido */}
      <div className="p-6">
        {/* Título */}
        <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-primary-400 transition-colors line-clamp-2">
          <a href={`/blog/${slug}`} className="hover:underline">
            {title}
          </a>
        </h3>

        {/* Descripción */}
        <p className="text-neutral-400 mb-4 line-clamp-3 leading-relaxed">
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
        </div>

        {/* Link */}
        <a
          href={`/blog/${slug}`}
          className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-semibold transition-colors"
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
