/**
 * Article type definitions
 */

export interface Article {
  id: string
  title: string
  slug: string
  description: string
  content: string
  author: string
  tags: string[]
  publishedAt: string
  updatedAt?: string
  draft: boolean
  image?: string
}

export interface CreateArticleInput {
  title: string
  slug: string
  description: string
  content: string
  author: string
  tags: string[]
  draft?: boolean
  image?: string
}

export interface UpdateArticleInput extends Partial<CreateArticleInput> {
  id: string
}
