import { useState, useMemo } from 'react';
import { BlogCard } from './BlogCard';
import type { Article } from '@/types/article';

interface BlogPost extends Article {
  category?: string;
}

interface Props {
  posts: BlogPost[];
}

const CATEGORY_LABELS: Record<string, string> = {
  'ia-en-seo': 'IA en SEO',
  'todo-sobre-seo': 'Todo sobre SEO',
};

export function BlogTagFilter({ posts }: Props) {
  const [activeTag, setActiveTag] = useState<string>('Todos');

  const allTags = useMemo(() => {
    const tagCount = new Map<string, number>();
    for (const post of posts) {
      for (const tag of post.tags || []) {
        tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
      }
    }
    // Sort by frequency descending
    return Array.from(tagCount.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeTag === 'Todos') return posts;
    return posts.filter((post) => post.tags?.includes(activeTag));
  }, [posts, activeTag]);

  return (
    <div>
      {/* Tag pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveTag('Todos')}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
            activeTag === 'Todos'
              ? 'bg-[#BF551A] text-white border-[#BF551A]'
              : 'bg-transparent text-black/50 border-black/[0.15] hover:border-black/30 hover:text-[#1a1a1a]/80'
          }`}
        >
          Todos
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
              activeTag === tag
                ? 'bg-[#BF551A] text-white border-[#BF551A]'
                : 'bg-transparent text-black/50 border-black/[0.15] hover:border-black/30 hover:text-[#1a1a1a]/80'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-black/35">
            No hay articulos con la etiqueta "{activeTag}".
          </p>
        </div>
      )}
    </div>
  );
}
