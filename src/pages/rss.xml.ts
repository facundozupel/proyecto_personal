import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export const prerender = true;

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  const sortedPosts = posts.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: 'Blog | Facundo Zupel - Organic Growth y Automatizaciones',
    description:
      'Artículos sobre crecimiento orgánico, automatizaciones, SEO, IA y estrategias de marketing digital.',
    site: context.site!.toString(),
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id.replace(/\.md$/, '')}/`,
      categories: post.data.tags,
    })),
    customData: '<language>es</language>',
  });
}
