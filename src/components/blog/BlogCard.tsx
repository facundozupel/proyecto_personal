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
    <article className="group card overflow-hidden">
      {/* Tags */}
      {tags.length > 0 && (
        <div className="px-6 pt-6 flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-block px-3 py-1 text-xs font-medium bg-white/[0.06] text-white/60 rounded-md border border-white/[0.08]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Contenido */}
      <div className="p-6">
        {/* Título */}
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#3291FF] transition-colors duration-200 line-clamp-2">
          <a href={`/blog/${slug}`}>
            {title}
          </a>
        </h3>

        {/* Descripción */}
        <p className="text-white/50 mb-4 line-clamp-3 leading-relaxed text-[15px]">
          {description}
        </p>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-white/30 mb-4">
          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <time dateTime={date.toISOString()}>{formattedDate}</time>
          </div>
        </div>

        {/* Link */}
        <a
          href={`/blog/${slug}`}
          className="inline-flex items-center gap-2 text-[#0070F3] hover:text-[#3291FF] font-medium transition-colors duration-150"
        >
          Leer más
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </article>
  );
}
