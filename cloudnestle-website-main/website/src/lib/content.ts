import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPost, Service } from './types';

const contentDirectory = path.join(process.cwd(), 'content');

// Image mapping utility - maps content slug to image path
export function getImagePath(type: 'blog' | 'services', slug: string, fallback?: string): string {
  const extensions = ['jpg', 'png', 'gif'];
  
  for (const ext of extensions) {
    const imagePath = `/images/${type}/${slug}.${ext}`;
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    
    if (fs.existsSync(fullPath)) {
      return imagePath;
    }
  }
  
  // Return fallback or default placeholder
  return fallback || `/images/${type}/default.jpg`;
}

export async function getMarkdownContent(filePath: string) {
  const fullPath = path.join(contentDirectory, filePath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    data,
    content: contentHtml,
  };
}

export function getAllBlogPosts(): BlogPost[] {
  const blogDirectory = path.join(contentDirectory, 'blog');
  
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        excerpt: data.excerpt || '',
        content: '',
        publishedAt: data.publishedAt || '',
        category: data.category || '',
        tags: data.tags || [],
        author: data.author || '',
        featured: data.featured || false,
        image: data.image || getImagePath('blog', slug),
      } as BlogPost;
    });

  return allPostsData.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const { data, content } = await getMarkdownContent(`blog/${slug}.md`);
    
    return {
      slug,
      title: data.title || '',
      excerpt: data.excerpt || '',
      content,
      publishedAt: data.publishedAt || '',
      category: data.category || '',
      tags: data.tags || [],
      author: data.author || '',
      featured: data.featured || false,
      image: data.image || getImagePath('blog', slug),
    };
  } catch (error) {
    return null;
  }
}

export function getAllServices(): Service[] {
  const servicesDirectory = path.join(contentDirectory, 'services');
  
  if (!fs.existsSync(servicesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(servicesDirectory);
  const allServicesData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(servicesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        overview: data.overview || '',
        content: '',
        icon: data.icon || '',
        color: data.color || '',
        featured: data.featured || false,
        image: data.image || getImagePath('services', slug),
        pricing: data.pricing || undefined,
      } as Service;
    });

  return allServicesData;
}

export async function getService(slug: string): Promise<Service | null> {
  try {
    const { data, content } = await getMarkdownContent(`services/${slug}.md`);
    
    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      overview: data.overview || '',
      content,
      icon: data.icon || '',
      color: data.color || '',
      featured: data.featured || false,
      image: data.image || getImagePath('services', slug),
      pricing: data.pricing || undefined,
    };
  } catch (error) {
    return null;
  }
}
