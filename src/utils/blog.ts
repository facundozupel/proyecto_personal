/**
 * Blog post management utilities
 * Handles CRUD operations for markdown files in src/content/blog/
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to blog content directory
const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog');

export interface BlogPost {
  title: string;
  description: string;
  author?: string;
  date: string; // ISO 8601 format
  readTime?: string;
  image?: string;
  tags?: string[];
  draft?: boolean;
}

export interface BlogPostWithSlug extends BlogPost {
  slug: string;
}

export interface BlogPostFile {
  slug: string;
  content: string;
  frontmatter: BlogPost;
}

/**
 * Generates a URL-friendly slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD') // Normalize unicode characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Remove consecutive hyphens
}

/**
 * Ensures the blog directory exists
 */
async function ensureBlogDirExists(): Promise<void> {
  try {
    await fs.access(BLOG_DIR);
  } catch {
    await fs.mkdir(BLOG_DIR, { recursive: true });
  }
}

/**
 * Creates markdown frontmatter from blog post data
 */
function createFrontmatter(post: BlogPost): string {
  const frontmatter: string[] = ['---'];

  frontmatter.push(`title: "${post.title}"`);
  frontmatter.push(`description: "${post.description}"`);
  frontmatter.push(`author: "${post.author || 'Facundo Zupel'}"`);
  frontmatter.push(`date: ${post.date}`);

  if (post.readTime) {
    frontmatter.push(`readTime: "${post.readTime}"`);
  }

  if (post.image) {
    frontmatter.push(`image: "${post.image}"`);
  }

  if (post.tags && post.tags.length > 0) {
    frontmatter.push(`tags: ${JSON.stringify(post.tags)}`);
  }

  frontmatter.push(`draft: ${post.draft || false}`);
  frontmatter.push('---');

  return frontmatter.join('\n');
}

/**
 * Parses frontmatter from markdown content
 */
function parseFrontmatter(content: string): { frontmatter: BlogPost; body: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    throw new Error('Invalid markdown format: missing frontmatter');
  }

  const [, frontmatterText, body] = match;
  const frontmatter: Partial<BlogPost> = {};

  // Parse each line of frontmatter
  frontmatterText.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Remove quotes from string values
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    // Parse special types
    if (key === 'tags') {
      frontmatter.tags = JSON.parse(value);
    } else if (key === 'draft') {
      frontmatter.draft = value === 'true';
    } else {
      (frontmatter as any)[key] = value;
    }
  });

  return {
    frontmatter: frontmatter as BlogPost,
    body: body.trim(),
  };
}

/**
 * Creates a new blog post file
 */
export async function createPost(
  slug: string,
  post: BlogPost,
  content: string
): Promise<BlogPostFile> {
  await ensureBlogDirExists();

  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  // Check if file already exists
  try {
    await fs.access(filePath);
    throw new Error(`Post with slug "${slug}" already exists`);
  } catch (error: any) {
    if (error.code !== 'ENOENT') throw error;
  }

  // Create file content
  const frontmatter = createFrontmatter(post);
  const fileContent = `${frontmatter}\n\n${content}`;

  // Write file
  await fs.writeFile(filePath, fileContent, 'utf-8');

  return {
    slug,
    content,
    frontmatter: post,
  };
}

/**
 * Reads a blog post file
 */
export async function getPost(slug: string): Promise<BlogPostFile> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { frontmatter, body } = parseFrontmatter(fileContent);

    return {
      slug,
      content: body,
      frontmatter,
    };
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      throw new Error(`Post with slug "${slug}" not found`);
    }
    throw error;
  }
}

/**
 * Updates an existing blog post file
 */
export async function updatePost(
  slug: string,
  post: Partial<BlogPost>,
  content?: string
): Promise<BlogPostFile> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  // Read existing post
  const existing = await getPost(slug);

  // Merge updates
  const updatedPost: BlogPost = {
    ...existing.frontmatter,
    ...post,
  };

  const updatedContent = content !== undefined ? content : existing.content;

  // Create updated file content
  const frontmatter = createFrontmatter(updatedPost);
  const fileContent = `${frontmatter}\n\n${updatedContent}`;

  // Write file
  await fs.writeFile(filePath, fileContent, 'utf-8');

  return {
    slug,
    content: updatedContent,
    frontmatter: updatedPost,
  };
}

/**
 * Deletes a blog post file
 */
export async function deletePost(slug: string): Promise<void> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  try {
    await fs.unlink(filePath);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      throw new Error(`Post with slug "${slug}" not found`);
    }
    throw error;
  }
}

/**
 * Lists all blog post files
 */
export async function listPosts(): Promise<BlogPostWithSlug[]> {
  await ensureBlogDirExists();

  try {
    const files = await fs.readdir(BLOG_DIR);
    const mdFiles = files.filter((file) => file.endsWith('.md'));

    const posts = await Promise.all(
      mdFiles.map(async (file) => {
        const slug = file.replace('.md', '');
        const post = await getPost(slug);
        return {
          ...post.frontmatter,
          slug,
        };
      })
    );

    // Sort by date (newest first)
    return posts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    return [];
  }
}

/**
 * Checks if a post exists
 */
export async function postExists(slug: string): Promise<boolean> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
