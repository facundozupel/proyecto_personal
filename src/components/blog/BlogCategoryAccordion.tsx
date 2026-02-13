import { useState } from 'react';
import { BlogCard } from './BlogCard';
import type { Article } from '@/types/article';

interface Props {
  title: string;
  posts: Article[];
  defaultOpen?: boolean;
}

export function BlogCategoryAccordion({ title, posts, defaultOpen = true }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-12">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 px-1 group cursor-pointer"
        aria-expanded={isOpen}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#3291FF] transition-colors duration-200">
          {title}
          <span className="ml-3 text-base font-normal text-white/30">
            ({posts.length})
          </span>
        </h2>
        <svg
          className={`w-6 h-6 text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="h-px bg-white/[0.08] mb-6" />
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden transition-all duration-500 ${
          isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
