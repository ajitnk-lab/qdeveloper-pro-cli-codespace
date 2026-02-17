/**
 * Client-side filter utilities for blog and resources
 */

export type DateRange = 'recent' | 'thisMonth' | 'archive';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  tags: string[];
  author: string;
  featured: boolean;
  readTime: string;
}

export interface Resource {
  slug: string;
  title: string;
  description: string;
  type: string;
  category: string;
  tags: string[];
  icon: string;
  color: string;
  publishedAt: string;
  pdfUrl: string;
}

/**
 * Filter items by date range (IST timezone)
 */
export function filterByDateRange<T extends { publishedAt: string }>(
  items: T[],
  range: DateRange
): T[] {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istNow = new Date(now.getTime() + istOffset);
  
  return items.filter(item => {
    const itemDate = new Date(item.publishedAt);
    const istItemDate = new Date(itemDate.getTime() + istOffset);
    
    if (range === 'recent') {
      const sevenDaysAgo = new Date(istNow.getTime() - 7 * 24 * 60 * 60 * 1000);
      return istItemDate >= sevenDaysAgo;
    }
    
    if (range === 'thisMonth') {
      return istItemDate.getUTCFullYear() === istNow.getUTCFullYear() &&
             istItemDate.getUTCMonth() === istNow.getUTCMonth();
    }
    
    if (range === 'archive') {
      return istItemDate.getUTCFullYear() < istNow.getUTCFullYear() ||
             (istItemDate.getUTCFullYear() === istNow.getUTCFullYear() &&
              istItemDate.getUTCMonth() < istNow.getUTCMonth());
    }
    
    return true;
  });
}

/**
 * Search items across multiple fields
 */
export function searchItems<T>(
  items: T[],
  query: string,
  fields: (keyof T)[]
): T[] {
  if (!query.trim()) return items;
  
  const lowerQuery = query.toLowerCase();
  
  return items.filter(item => {
    return fields.some(field => {
      const value = item[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lowerQuery);
      }
      if (Array.isArray(value)) {
        return value.some(v => String(v).toLowerCase().includes(lowerQuery));
      }
      return false;
    });
  });
}

/**
 * Filter by category
 */
export function filterByCategory<T extends { category: string }>(
  items: T[],
  category: string
): T[] {
  if (!category || category === 'all') return items;
  return items.filter(item => item.category === category);
}

/**
 * Filter by type (for resources)
 */
export function filterByType<T extends { type: string }>(
  items: T[],
  type: string
): T[] {
  if (!type || type === 'all') return items;
  return items.filter(item => item.type === type);
}

/**
 * Get unique categories from items
 */
export function getUniqueCategories<T extends { category: string }>(
  items: T[]
): string[] {
  const categories = items.map(item => item.category);
  return Array.from(new Set(categories)).sort();
}

/**
 * Get unique types from resources
 */
export function getUniqueTypes<T extends { type: string }>(
  items: T[]
): string[] {
  const types = items.map(item => item.type);
  return Array.from(new Set(types)).sort();
}

/**
 * Get unique tags from items
 */
export function getUniqueTags<T extends { tags: string[] }>(
  items: T[]
): string[] {
  const allTags = items.flatMap(item => item.tags);
  return Array.from(new Set(allTags)).sort();
}
