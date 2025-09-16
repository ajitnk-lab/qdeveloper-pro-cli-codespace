// Content types for the CMS
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  category: string;
  tags: string[];
  author: string;
  featured: boolean;
  image?: string;
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  overview: string;
  content: string;
  icon: string;
  color: string;
  featured: boolean;
  image?: string;
  pricing?: {
    basic?: {
      price: number | string;
      name: string;
      features: string[];
    };
    premium?: {
      price: number | string;
      name: string;
      features: string[];
    };
    enterprise?: {
      price: number | string;
      name: string;
      features: string[];
    };
  };
}

export interface ConsultingService {
  slug: string;
  title: string;
  description: string;
  overview: string;
  content: string;
  category: 'governance' | 'strategy' | 'assessment';
  icon: string;
  color: string;
  featured: boolean;
  image?: string;
  deliverables?: string[];
  duration?: string;
}

export interface Resource {
  slug: string;
  title: string;
  description: string;
  content: string;
  type: 'event' | 'about' | 'client';
  publishedAt?: string;
  featured: boolean;
  image?: string;
  eventDate?: string;
  location?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  content: string;
  featured: boolean;
  image?: string;
  technologies?: string[];
  duration?: string;
}

export interface Testimonial {
  slug: string;
  name: string;
  title: string;
  company: string;
  content: string;
  rating: number;
  featured: boolean;
  image?: string;
}

export interface Career {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  description: string;
  requirements: string[];
  responsibilities: string[];
  content: string;
  active: boolean;
  postedAt: string;
}

export interface ContactInfo {
  slug: string;
  title: string;
  type: 'sales' | 'support' | 'general';
  description: string;
  content: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface Solution {
  slug: string;
  title: string;
  description: string;
  overview: string;
  content: string;
  category: string;
  icon: string;
  color: string;
  featured: boolean;
  image?: string;
  benefits?: string[];
  technologies?: string[];
}

export interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}
