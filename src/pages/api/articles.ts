import type { APIRoute } from 'astro'
import { createArticleSchema, updateArticleSchema, articleIdSchema } from '@/schemas/article.schema'
import { createArticle, getAllArticles, getPublishedArticles, updateArticle, deleteArticle, getArticleById } from '@/utils/articles'
import { requireAuth } from '@/utils/auth'

/**
 * GET /api/articles
 * Get all articles (public endpoint)
 * Query params:
 * - published=true: only return published articles
 */
export const GET: APIRoute = async ({ url }) => {
  try {
    const publishedOnly = url.searchParams.get('published') === 'true'

    const articles = publishedOnly ? await getPublishedArticles() : await getAllArticles()

    return new Response(JSON.stringify({ articles }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
      }),
      { status: 500 }
    )
  }
}

/**
 * POST /api/articles
 * Create a new article (protected endpoint - requires JWT)
 */
export const POST: APIRoute = async (context) => {
  try {
    // Authenticate user
    const authResult = requireAuth(context)
    if (authResult instanceof Response) {
      return authResult // Return error response if not authenticated
    }

    // Parse request body
    const body = await context.request.json()

    // Validate input
    const result = createArticleSchema.safeParse(body)
    if (!result.success) {
      return new Response(
        JSON.stringify({
          error: 'Validation failed',
          details: result.error.errors,
        }),
        { status: 400 }
      )
    }

    // Create article
    const article = await createArticle(result.data)

    return new Response(
      JSON.stringify({
        message: 'Article created successfully',
        article,
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Error creating article:', error)

    // Check if error is about duplicate slug
    if (error instanceof Error && error.message.includes('already exists')) {
      return new Response(
        JSON.stringify({
          error: error.message,
        }),
        { status: 409 }
      )
    }

    return new Response(
      JSON.stringify({
        error: 'Internal server error',
      }),
      { status: 500 }
    )
  }
}

/**
 * PUT /api/articles
 * Update an existing article (protected endpoint - requires JWT)
 */
export const PUT: APIRoute = async (context) => {
  try {
    // Authenticate user
    const authResult = requireAuth(context)
    if (authResult instanceof Response) {
      return authResult
    }

    // Parse request body
    const body = await context.request.json()

    // Validate input
    const result = updateArticleSchema.safeParse(body)
    if (!result.success) {
      return new Response(
        JSON.stringify({
          error: 'Validation failed',
          details: result.error.errors,
        }),
        { status: 400 }
      )
    }

    const { id, ...updates } = result.data

    // Update article
    const article = await updateArticle(id, updates)

    if (!article) {
      return new Response(
        JSON.stringify({
          error: 'Article not found',
        }),
        { status: 404 }
      )
    }

    return new Response(
      JSON.stringify({
        message: 'Article updated successfully',
        article,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Error updating article:', error)

    return new Response(
      JSON.stringify({
        error: 'Internal server error',
      }),
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/articles
 * Delete an article (protected endpoint - requires JWT)
 */
export const DELETE: APIRoute = async (context) => {
  try {
    // Authenticate user
    const authResult = requireAuth(context)
    if (authResult instanceof Response) {
      return authResult
    }

    // Parse request body
    const body = await context.request.json()

    // Validate input
    const result = articleIdSchema.safeParse(body)
    if (!result.success) {
      return new Response(
        JSON.stringify({
          error: 'Validation failed',
          details: result.error.errors,
        }),
        { status: 400 }
      )
    }

    const { id } = result.data

    // Delete article
    const deleted = await deleteArticle(id)

    if (!deleted) {
      return new Response(
        JSON.stringify({
          error: 'Article not found',
        }),
        { status: 404 }
      )
    }

    return new Response(
      JSON.stringify({
        message: 'Article deleted successfully',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Error deleting article:', error)

    return new Response(
      JSON.stringify({
        error: 'Internal server error',
      }),
      { status: 500 }
    )
  }
}
