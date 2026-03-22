import { BlogCard } from './BlogCard';
import type { Article } from '@/types/article';

interface BlogPost extends Article {
  category?: string;
}

interface Props {
  posts: BlogPost[];
}

export function BlogTagFilter({ posts }: Props) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
