import type { Article, CreateArticleInput } from '@/types/article'
import { readJSONFile, writeJSONFile } from './storage'

const ARTICLES_FILE = 'articles.json'

/**
 * Get all articles
 */
export async function getAllArticles(): Promise<Article[]> {
  return await readJSONFile<Article>(ARTICLES_FILE)
}

/**
 * Get article by ID
 */
export async function getArticleById(id: string): Promise<Article | null> {
  const articles = await getAllArticles()
  return articles.find((article) => article.id === id) || null
}

/**
 * Get article by slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getAllArticles()
  return articles.find((article) => article.slug === slug) || null
}

/**
 * Get published articles only
 */
export async function getPublishedArticles(): Promise<Article[]> {
  const articles = await getAllArticles()
  return articles.filter((article) => !article.draft).sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })
}

/**
 * Create a new article
 */
export async function createArticle(input: CreateArticleInput): Promise<Article> {
  const articles = await getAllArticles()

  // Check if slug already exists
  const existingArticle = articles.find((article) => article.slug === input.slug)
  if (existingArticle) {
    throw new Error('Article with this slug already exists')
  }

  const newArticle: Article = {
    ...input,
    id: crypto.randomUUID(),
    publishedAt: new Date().toISOString(),
    draft: input.draft ?? false,
  }

  articles.push(newArticle)
  await writeJSONFile(ARTICLES_FILE, articles)

  return newArticle
}

/**
 * Update an article
 */
export async function updateArticle(id: string, updates: Partial<Article>): Promise<Article | null> {
  const articles = await getAllArticles()
  const index = articles.findIndex((article) => article.id === id)

  if (index === -1) {
    return null
  }

  const updatedArticle: Article = {
    ...articles[index],
    ...updates,
    id: articles[index].id, // Ensure ID doesn't change
    publishedAt: articles[index].publishedAt, // Ensure publishedAt doesn't change
    updatedAt: new Date().toISOString(),
  }

  articles[index] = updatedArticle
  await writeJSONFile(ARTICLES_FILE, articles)

  return updatedArticle
}

/**
 * Delete an article
 */
export async function deleteArticle(id: string): Promise<boolean> {
  const articles = await getAllArticles()
  const filteredArticles = articles.filter((article) => article.id !== id)

  if (filteredArticles.length === articles.length) {
    return false // Article not found
  }

  await writeJSONFile(ARTICLES_FILE, filteredArticles)
  return true
}
