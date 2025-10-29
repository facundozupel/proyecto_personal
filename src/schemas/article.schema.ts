import { z } from 'zod'

/**
 * Zod schema for article validation
 */

export const createArticleSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200, 'Title too long'),
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters')
    .max(200, 'Slug too long')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers and hyphens'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description too long'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  author: z.string().min(2, 'Author name required'),
  tags: z.array(z.string()).min(1, 'At least one tag required').max(10, 'Too many tags'),
  draft: z.boolean().optional().default(false),
  image: z.string().url('Invalid image URL').optional(),
})

export const updateArticleSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(200).optional(),
  slug: z
    .string()
    .min(3)
    .max(200)
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  description: z.string().min(10).max(500).optional(),
  content: z.string().min(50).optional(),
  author: z.string().min(2).optional(),
  tags: z.array(z.string()).min(1).max(10).optional(),
  draft: z.boolean().optional(),
  image: z.string().url().optional(),
})

export const articleIdSchema = z.object({
  id: z.string(),
})

export type CreateArticleInput = z.infer<typeof createArticleSchema>
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>
