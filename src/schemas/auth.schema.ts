import { z } from 'zod'

/**
 * Zod schema for authentication validation
 */

export const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(50, 'Username too long'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password too long'),
})

export type LoginInput = z.infer<typeof loginSchema>
