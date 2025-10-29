import bcrypt from 'bcryptjs'
import type { User } from '@/types/user'
import { readJSONFile, writeJSONFile } from './storage'

const USERS_FILE = 'users.json'

/**
 * Get all users
 */
export async function getAllUsers(): Promise<User[]> {
  return await readJSONFile<User>(USERS_FILE)
}

/**
 * Get user by username
 */
export async function getUserByUsername(username: string): Promise<User | null> {
  const users = await getAllUsers()
  return users.find((user) => user.username === username) || null
}

/**
 * Get user by ID
 */
export async function getUserById(id: string): Promise<User | null> {
  const users = await getAllUsers()
  return users.find((user) => user.id === id) || null
}

/**
 * Verify user password
 */
export async function verifyPassword(user: User, password: string): Promise<boolean> {
  return await bcrypt.compare(password, user.passwordHash)
}

/**
 * Hash password
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10)
}

/**
 * Create a new user (for admin purposes)
 */
export async function createUser(username: string, password: string, email: string): Promise<User> {
  const users = await getAllUsers()

  // Check if user already exists
  const existingUser = users.find((u) => u.username === username || u.email === email)
  if (existingUser) {
    throw new Error('User already exists')
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    username,
    passwordHash: await hashPassword(password),
    email,
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  await writeJSONFile(USERS_FILE, users)

  return newUser
}
