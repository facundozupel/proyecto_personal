import type { APIRoute } from 'astro'
import { loginSchema } from '@/schemas/auth.schema'
import { getUserByUsername, verifyPassword } from '@/utils/users'
import { generateToken } from '@/utils/jwt'

/**
 * POST /api/auth/login
 * Authenticate user and return JWT token
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse request body
    const body = await request.json()

    // Validate input
    const result = loginSchema.safeParse(body)
    if (!result.success) {
      return new Response(
        JSON.stringify({
          error: 'Validation failed',
          details: result.error.errors,
        }),
        { status: 400 }
      )
    }

    const { username, password } = result.data

    // Find user
    const user = await getUserByUsername(username)
    if (!user) {
      return new Response(
        JSON.stringify({
          error: 'Invalid credentials',
        }),
        { status: 401 }
      )
    }

    // Verify password
    const isValid = await verifyPassword(user, password)
    if (!isValid) {
      return new Response(
        JSON.stringify({
          error: 'Invalid credentials',
        }),
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      username: user.username,
      email: user.email,
    })

    return new Response(
      JSON.stringify({
        token,
        expiresIn: '7d',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Login error:', error)
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
      }),
      { status: 500 }
    )
  }
}
