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

export interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}
