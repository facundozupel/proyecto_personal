import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().default('Facundo Zupel'),
    date: z.coerce.date(),
    readTime: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    category: z.enum(['ia-en-seo', 'todo-sobre-seo']).default('todo-sobre-seo'),
  }),
});

export const collections = { blog };
