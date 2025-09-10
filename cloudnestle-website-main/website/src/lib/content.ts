import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPost, Service, ConsultingService, Resource, CaseStudy, Testimonial, Career, ContactInfo, Solution } from './types';

const contentDirectory = path.join(process.cwd(), 'content');

// Image mapping utility - maps content slug to image path
export function getImagePath(type: string, slug: string, fallback?: string): string {
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

// Blog functions
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

// Service functions
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

// Consulting functions
export function getAllConsultingServices(category?: string): ConsultingService[] {
  const consultingDirectory = path.join(contentDirectory, 'consulting');
  
  if (!fs.existsSync(consultingDirectory)) {
    return [];
  }

  const categories = category ? [category] : ['governance', 'strategy', 'assessment'];
  const allServices: ConsultingService[] = [];

  categories.forEach(cat => {
    const categoryDir = path.join(consultingDirectory, cat);
    if (fs.existsSync(categoryDir)) {
      const fileNames = fs.readdirSync(categoryDir);
      const services = fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
          const slug = fileName.replace(/\.md$/, '');
          const fullPath = path.join(categoryDir, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data } = matter(fileContents);

          return {
            slug,
            title: data.title || '',
            description: data.description || '',
            overview: data.overview || '',
            content: '',
            category: cat as 'governance' | 'strategy' | 'assessment',
            icon: data.icon || '',
            color: data.color || '',
            featured: data.featured || false,
            image: data.image || getImagePath('consulting', slug),
            deliverables: data.deliverables || [],
            duration: data.duration || '',
          } as ConsultingService;
        });
      allServices.push(...services);
    }
  });

  return allServices;
}

// Generic content functions for other types
export function getContentByType<T>(type: string, mapper: (data: Record<string, unknown>, slug: string) => T): T[] {
  const typeDirectory = path.join(contentDirectory, type);
  
  if (!fs.existsSync(typeDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(typeDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(typeDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      return mapper(data, slug);
    });
}

// Resources
export function getAllResources(type?: string): Resource[] {
  return getContentByType('resources', (data, slug) => ({
    slug,
    title: (data.title as string) || '',
    description: (data.description as string) || '',
    content: '',
    type: (data.type as 'event' | 'about' | 'client') || 'about',
    publishedAt: (data.publishedAt as string) || '',
    featured: (data.featured as boolean) || false,
    image: (data.image as string) || getImagePath('resources', slug),
    eventDate: (data.eventDate as string) || '',
    location: (data.location as string) || '',
  })).filter(resource => !type || resource.type === type);
}

// Case Studies
export function getAllCaseStudies(): CaseStudy[] {
  return getContentByType('company/case-studies', (data, slug) => ({
    slug,
    title: (data.title as string) || '',
    client: (data.client as string) || '',
    industry: (data.industry as string) || '',
    challenge: (data.challenge as string) || '',
    solution: (data.solution as string) || '',
    results: (data.results as string[]) || [],
    content: '',
    featured: (data.featured as boolean) || false,
    image: (data.image as string) || getImagePath('company', slug),
    technologies: (data.technologies as string[]) || [],
    duration: (data.duration as string) || '',
  }));
}

// Testimonials
export function getAllTestimonials(): Testimonial[] {
  return getContentByType('company/testimonials', (data, slug) => ({
    slug,
    name: (data.name as string) || '',
    title: (data.title as string) || '',
    company: (data.company as string) || '',
    content: '',
    rating: (data.rating as number) || 5,
    featured: (data.featured as boolean) || false,
    image: (data.image as string) || getImagePath('company', slug),
  }));
}

// Careers
export function getAllCareers(): Career[] {
  return getContentByType('company/careers', (data, slug) => ({
    slug,
    title: (data.title as string) || '',
    department: (data.department as string) || '',
    location: (data.location as string) || '',
    type: (data.type as 'full-time' | 'part-time' | 'contract') || 'full-time',
    description: (data.description as string) || '',
    requirements: (data.requirements as string[]) || [],
    responsibilities: (data.responsibilities as string[]) || [],
    content: '',
    active: (data.active as boolean) !== false,
    postedAt: (data.postedAt as string) || '',
  })).filter(career => career.active);
}

// Contact Info
export function getAllContactInfo(): ContactInfo[] {
  return getContentByType('contact', (data, slug) => ({
    slug,
    title: (data.title as string) || '',
    type: (data.type as 'sales' | 'support' | 'general') || 'general',
    description: (data.description as string) || '',
    content: '',
    email: (data.email as string) || '',
    phone: (data.phone as string) || '',
    address: (data.address as string) || '',
  }));
}

// Solutions
export function getAllSolutions(): Solution[] {
  return getContentByType('solutions', (data, slug) => ({
    slug,
    title: (data.title as string) || '',
    description: (data.description as string) || '',
    overview: (data.overview as string) || '',
    content: '',
    category: (data.category as string) || '',
    icon: (data.icon as string) || '',
    color: (data.color as string) || '',
    featured: (data.featured as boolean) || false,
    image: (data.image as string) || getImagePath('solutions', slug),
    benefits: (data.benefits as string[]) || [],
    technologies: (data.technologies as string[]) || [],
  }));
}

export async function getSolution(slug: string): Promise<Solution | null> {
  try {
    const { data, content } = await getMarkdownContent(`solutions/${slug}.md`);
    
    return {
      slug,
      title: (data.title as string) || '',
      description: (data.description as string) || '',
      overview: (data.overview as string) || '',
      content,
      category: (data.category as string) || '',
      icon: (data.icon as string) || '',
      color: (data.color as string) || '',
      featured: (data.featured as boolean) || false,
      image: (data.image as string) || getImagePath('solutions', slug),
      benefits: (data.benefits as string[]) || [],
      technologies: (data.technologies as string[]) || [],
    };
  } catch (error) {
    return null;
  }
}
