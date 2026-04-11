import { useState, useMemo } from 'react';
import { BlogCard } from './BlogCard';
import type { Article } from '@/types/article';

interface BlogPost extends Article {
  category?: string;
}

interface Props {
  posts: BlogPost[];
}

const CATEGORIES = [
  { key: 'all', label: 'Todos' },
  { key: 'ia-en-seo', label: 'IA en SEO' },
  { key: 'todo-sobre-seo', label: 'Todo sobre SEO' },
];

export function BlogTagFilter({ posts }: Props) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() => {
    let result = posts;

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    return result;
  }, [posts, search, activeCategory]);

  return (
    <div>
      {/* Search + Category Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
        {/* Category tabs */}
        <div className="flex gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-[#BF551A] text-white'
                  : 'bg-black/[0.04] text-black/45 hover:bg-black/[0.08] hover:text-black/65'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-auto sm:ml-auto">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/25"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Buscar artículos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2 text-sm border border-black/[0.1] rounded-lg bg-white/50 text-[#1a1a1a] placeholder:text-black/25 focus:outline-none focus:border-[#BF551A]/40 focus:ring-1 focus:ring-[#BF551A]/20 transition-all"
          />
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-black/30 mb-6">
        {filtered.length} {filtered.length === 1 ? 'artículo' : 'artículos'}
        {activeCategory !== 'all' && (
          <> en <span className="text-black/45 font-medium">{CATEGORIES.find((c) => c.key === activeCategory)?.label}</span></>
        )}
        {search.trim() && (
          <> para "<span className="text-black/45">{search.trim()}</span>"</>
        )}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-black/35 mb-2">No se encontraron artículos</p>
          <button
            onClick={() => { setSearch(''); setActiveCategory('all'); }}
            className="text-sm text-[#BF551A] hover:text-[#D4763E] font-medium cursor-pointer"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
