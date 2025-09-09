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
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  content: string;
  features: string[];
  pricing?: {
    basic: number;
    premium: number;
    enterprise: string;
  };
}

export interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}
