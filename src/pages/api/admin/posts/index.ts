/**
 * API Endpoint: /api/admin/posts
 *
 * GET - List all blog posts (requires auth)
 * POST - Create a new blog post (requires auth)
 */

import type { APIRoute } from 'astro';
import { requireAuth } from '@/utils/auth';
import { createPost, listPosts, generateSlug, postExists } from '@/utils/blog';

/**
 * GET /api/admin/posts
 * Lists all blog posts
 */
export const GET: APIRoute = async ({ request }) => {
  return requireAuth(request, async () => {
    try {
      const posts = await listPosts();

      return new Response(
        JSON.stringify({
          success: true,
          count: posts.length,
          posts,
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error: any) {
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message || 'Failed to list posts',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  });
};

/**
 * POST /api/admin/posts
 * Creates a new blog post
 *
 * Request body:
 * {
 *   title: string (required)
 *   description: string (required)
 *   content: string (required)
 *   slug?: string (optional, auto-generated from title if not provided)
 *   author?: string (optional, defaults to "Facundo Zupel")
 *   date?: string (optional, defaults to current date)
 *   readTime?: string (optional)
 *   image?: string (optional)
 *   tags?: string[] (optional)
 *   draft?: boolean (optional, defaults to false)
 * }
 */
export const POST: APIRoute = async ({ request }) => {
  return requireAuth(request, async () => {
    try {
      // Parse request body
      const body = await request.json();

      // Validate required fields
      const requiredFields = ['title', 'description', 'content'];
      const missingFields = requiredFields.filter((field) => !body[field]);

      if (missingFields.length > 0) {
        return new Response(
          JSON.stringify({
            success: false,
            error: `Missing required fields: ${missingFields.join(', ')}`,
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }

      // Generate slug if not provided
      const slug = body.slug || generateSlug(body.title);

      // Check if post with slug already exists
      const exists = await postExists(slug);
      if (exists) {
        return new Response(
          JSON.stringify({
            success: false,
            error: `Post with slug "${slug}" already exists`,
          }),
          {
            status: 409,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }

      // Prepare post data
      const postData = {
        title: body.title,
        description: body.description,
        author: body.author || 'Facundo Zupel',
        date: body.date || new Date().toISOString().split('T')[0], // YYYY-MM-DD
        readTime: body.readTime,
        image: body.image,
        tags: body.tags || [],
        draft: body.draft !== undefined ? body.draft : false,
      };

      // Create post
      const post = await createPost(slug, postData, body.content);

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Post created successfully',
          post: {
            ...post.frontmatter,
            slug: post.slug,
          },
        }),
        {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
            'Location': `/api/admin/posts/${slug}`,
          },
        }
      );
    } catch (error: any) {
      console.error('Error creating post:', error);

      return new Response(
        JSON.stringify({
          success: false,
          error: error.message || 'Failed to create post',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  });
};
