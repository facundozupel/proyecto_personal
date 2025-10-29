import type { APIContext } from 'astro'
import type { JWTPayload } from '@/types/user'
import { extractToken, verifyToken } from './jwt'

/**
 * Authentication middleware
 * Verifies JWT token from Authorization header
 * Returns user payload if valid, null otherwise
 */
export function authenticate(request: Request): JWTPayload | null {
  const authHeader = request.headers.get('Authorization')
  const token = extractToken(authHeader)

  if (!token) {
    return null
  }

  return verifyToken(token)
}

/**
 * Require authentication middleware
 * Returns error response if not authenticated
 * Returns user payload if authenticated
 */
export function requireAuth(context: APIContext): JWTPayload | Response {
  const user = authenticate(context.request)

  if (!user) {
    return new Response(
      JSON.stringify({
        error: 'Unauthorized',
        message: 'Valid JWT token required',
      }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }

  return user
}
