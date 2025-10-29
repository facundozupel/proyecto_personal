import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

/**
 * Generic utility functions for JSON file storage
 */

const DATA_DIR = join(process.cwd(), 'data')

export async function readJSONFile<T>(filename: string): Promise<T[]> {
  try {
    const filePath = join(DATA_DIR, filename)
    const data = await readFile(filePath, 'utf-8')
    return JSON.parse(data) as T[]
  } catch (error) {
    console.error(`Error reading ${filename}:`, error)
    return []
  }
}

export async function writeJSONFile<T>(filename: string, data: T[]): Promise<void> {
  try {
    const filePath = join(DATA_DIR, filename)
    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
  } catch (error) {
    console.error(`Error writing ${filename}:`, error)
    throw error
  }
}
