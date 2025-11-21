/**
 * API Endpoint: /api/admin/posts/[slug]
 *
 * GET - Get a specific blog post (requires auth)
 * PUT - Update an existing blog post (requires auth)
 * DELETE - Delete a blog post (requires auth)
 */

import type { APIRoute } from 'astro';
import { requireAuth } from '@/utils/auth';
import { getPost, updatePost, deletePost } from '@/utils/blog';

/**
 * GET /api/admin/posts/{slug}
 * Gets a specific blog post
 */
export const GET: APIRoute = async ({ params, request }) => {
  return requireAuth(request, async () => {
    const { slug } = params;

    if (!slug) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing slug parameter',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    try {
      const post = await getPost(slug);

      return new Response(
        JSON.stringify({
          success: true,
          post: {
            ...post.frontmatter,
            slug: post.slug,
            content: post.content,
          },
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error: any) {
      const status = error.message.includes('not found') ? 404 : 500;

      return new Response(
        JSON.stringify({
          success: false,
          error: error.message || 'Failed to get post',
        }),
        {
          status,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  });
};

/**
 * PUT /api/admin/posts/{slug}
 * Updates an existing blog post
 *
 * Request body (all fields optional):
 * {
 *   title?: string
 *   description?: string
 *   content?: string
 *   author?: string
 *   date?: string
 *   readTime?: string
 *   image?: string
 *   tags?: string[]
 *   draft?: boolean
 * }
 */
export const PUT: APIRoute = async ({ params, request }) => {
  return requireAuth(request, async () => {
    const { slug } = params;

    if (!slug) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing slug parameter',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    try {
      // Parse request body
      const body = await request.json();

      // Extract content separately
      const { content, ...postData } = body;

      // Update post
      const updatedPost = await updatePost(slug, postData, content);

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Post updated successfully',
          post: {
            ...updatedPost.frontmatter,
            slug: updatedPost.slug,
          },
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error: any) {
      console.error('Error updating post:', error);

      const status = error.message.includes('not found') ? 404 : 500;

      return new Response(
        JSON.stringify({
          success: false,
          error: error.message || 'Failed to update post',
        }),
        {
          status,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  });
};

/**
 * DELETE /api/admin/posts/{slug}
 * Deletes a blog post
 */
export const DELETE: APIRoute = async ({ params, request }) => {
  return requireAuth(request, async () => {
    const { slug } = params;

    if (!slug) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing slug parameter',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    try {
      await deletePost(slug);

      return new Response(
        JSON.stringify({
          success: true,
          message: `Post "${slug}" deleted successfully`,
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error: any) {
      console.error('Error deleting post:', error);

      const status = error.message.includes('not found') ? 404 : 500;

      return new Response(
        JSON.stringify({
          success: false,
          error: error.message || 'Failed to delete post',
        }),
        {
          status,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  });
};
