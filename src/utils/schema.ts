/**
 * Schema Markup Generation Utilities
 * Generates structured data (JSON-LD) for SEO optimization
 *
 * Based on Google's best practices for Article/BlogPosting schema
 * @see https://developers.google.com/search/docs/appearance/structured-data/article
 */

export interface Author {
  name: string;
  url?: string;
}

export interface BlogPostSchemaData {
  headline: string;
  description: string;
  author: string | Author | Author[];
  datePublished: string; // ISO 8601 format
  dateModified?: string; // ISO 8601 format
  image?: string | string[];
  url: string; // Canonical URL
  slug: string;
  tags?: string[];
}

export interface OrganizationSchemaData {
  name: string;
  url: string;
  logo: string;
  sameAs?: string[]; // Social media profiles
}

/**
 * Default organization data (Facundo Zupel's brand)
 */
export const DEFAULT_ORGANIZATION: OrganizationSchemaData = {
  name: 'Facundo Zupel - Consultor de Organic Growth',
  url: 'https://facundogrowth.com', // TODO: Update with actual domain
  logo: 'https://facundogrowth.com/logo.png', // TODO: Update with actual logo
  sameAs: [
    'https://www.linkedin.com/in/facundozupel', // TODO: Update with actual LinkedIn
    'https://twitter.com/facundozupel', // TODO: Update with actual Twitter
  ],
};

/**
 * Converts author data to schema.org Person format
 */
function formatAuthor(author: string | Author | Author[]): any {
  if (Array.isArray(author)) {
    return author.map((a) => formatAuthor(a));
  }

  if (typeof author === 'string') {
    return {
      '@type': 'Person',
      name: author,
    };
  }

  const authorSchema: any = {
    '@type': 'Person',
    name: author.name,
  };

  if (author.url) {
    authorSchema.url = author.url;
  }

  return authorSchema;
}

/**
 * Formats date to ISO 8601 with timezone
 * If date is already in ISO format, returns as-is
 * If date is YYYY-MM-DD, adds T00:00:00Z
 */
function formatDate(date: string): string {
  // If already has time component, return as-is
  if (date.includes('T')) {
    return date;
  }

  // If just YYYY-MM-DD, add midnight UTC
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return `${date}T00:00:00Z`;
  }

  // Try to parse and format
  try {
    const dateObj = new Date(date);
    return dateObj.toISOString();
  } catch {
    return date;
  }
}

/**
 * Formats image(s) to schema.org ImageObject format
 */
function formatImage(image: string | string[] | undefined): string | string[] | undefined {
  if (!image) {
    return undefined;
  }

  if (Array.isArray(image)) {
    return image;
  }

  return image;
}

/**
 * Generates BlogPosting schema markup (JSON-LD)
 *
 * Includes all Google-recommended properties for optimal SEO:
 * - headline, description, author, dates, image
 * - publisher (Organization with logo)
 * - mainEntityOfPage, url
 *
 * @param data Blog post data
 * @param organization Publisher organization data (defaults to Facundo Zupel)
 * @returns JSON-LD script tag content
 */
export function generateBlogPostingSchema(
  data: BlogPostSchemaData,
  organization: OrganizationSchemaData = DEFAULT_ORGANIZATION
): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',

    // Core content properties (recommended by Google)
    headline: data.headline,
    description: data.description,
    author: formatAuthor(data.author),
    datePublished: formatDate(data.datePublished),
    dateModified: data.dateModified ? formatDate(data.dateModified) : formatDate(data.datePublished),

    // URL properties
    url: data.url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url,
    },

    // Image (if provided)
    ...(data.image && { image: formatImage(data.image) }),

    // Publisher (Organization)
    publisher: {
      '@type': 'Organization',
      name: organization.name,
      url: organization.url,
      logo: {
        '@type': 'ImageObject',
        url: organization.logo,
      },
      ...(organization.sameAs && { sameAs: organization.sameAs }),
    },

    // Keywords from tags (if provided)
    ...(data.tags && data.tags.length > 0 && { keywords: data.tags.join(', ') }),
  };

  return JSON.stringify(schema, null, 2);
}

/**
 * Generates Organization schema markup (JSON-LD)
 * Use this for the homepage or about page
 *
 * @param organization Organization data
 * @returns JSON-LD script tag content
 */
export function generateOrganizationSchema(organization: OrganizationSchemaData): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organization.name,
    url: organization.url,
    logo: {
      '@type': 'ImageObject',
      url: organization.logo,
    },
    ...(organization.sameAs && { sameAs: organization.sameAs }),
  };

  return JSON.stringify(schema, null, 2);
}

/**
 * Generates Person schema markup (JSON-LD)
 * Use this for author pages or personal brand pages
 *
 * @param person Person data
 * @returns JSON-LD script tag content
 */
export function generatePersonSchema(person: {
  name: string;
  url: string;
  image?: string;
  jobTitle?: string;
  description?: string;
  sameAs?: string[];
}): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    url: person.url,
    ...(person.image && { image: person.image }),
    ...(person.jobTitle && { jobTitle: person.jobTitle }),
    ...(person.description && { description: person.description }),
    ...(person.sameAs && { sameAs: person.sameAs }),
  };

  return JSON.stringify(schema, null, 2);
}

/**
 * Generates BreadcrumbList schema markup (JSON-LD)
 * Use this for navigation breadcrumbs
 *
 * @param breadcrumbs Array of breadcrumb items
 * @returns JSON-LD script tag content
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };

  return JSON.stringify(schema, null, 2);
}

/**
 * Wraps JSON-LD schema in script tag for HTML injection
 *
 * @param jsonLd JSON-LD string from any generate*Schema function
 * @returns HTML script tag with type="application/ld+json"
 */
export function wrapSchemaInScriptTag(jsonLd: string): string {
  return `<script type="application/ld+json">\n${jsonLd}\n</script>`;
}

/**
 * Helper: Generate complete schema script tag for blog post
 *
 * @param data Blog post data
 * @param organization Organization data (optional)
 * @returns Complete HTML script tag ready for injection
 */
export function generateBlogPostSchemaTag(
  data: BlogPostSchemaData,
  organization?: OrganizationSchemaData
): string {
  const jsonLd = generateBlogPostingSchema(data, organization);
  return wrapSchemaInScriptTag(jsonLd);
}
