import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cloudnestle.com';
  
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/consulting`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/company`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/company/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/partner`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/affiliate`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // Add blog posts
  const blogDir = path.join(process.cwd(), 'content/blog');
  if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
    blogFiles.forEach(file => {
      const slug = file.replace('.md', '');
      if (slug !== 'None') {
        const filePath = path.join(blogDir, file);
        const stats = fs.statSync(filePath);
        routes.push({
          url: `${baseUrl}/blog/${slug}`,
          lastModified: stats.mtime,
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    });
  }

  // Add services
  const servicesDir = path.join(process.cwd(), 'content/services');
  if (fs.existsSync(servicesDir)) {
    const serviceFiles = fs.readdirSync(servicesDir).filter(f => f.endsWith('.md'));
    serviceFiles.forEach(file => {
      const slug = file.replace('.md', '');
      const filePath = path.join(servicesDir, file);
      const stats = fs.statSync(filePath);
      routes.push({
        url: `${baseUrl}/services/${slug}`,
        lastModified: stats.mtime,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  }

  // Add solutions
  const solutionsDir = path.join(process.cwd(), 'content/solutions');
  if (fs.existsSync(solutionsDir)) {
    const solutionFiles = fs.readdirSync(solutionsDir).filter(f => f.endsWith('.md'));
    solutionFiles.forEach(file => {
      const slug = file.replace('.md', '');
      const filePath = path.join(solutionsDir, file);
      const stats = fs.statSync(filePath);
      routes.push({
        url: `${baseUrl}/solutions/${slug}`,
        lastModified: stats.mtime,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  }

  // Add consulting pages
  const consultingDir = path.join(process.cwd(), 'content/consulting');
  if (fs.existsSync(consultingDir)) {
    const walkDir = (dir: string, baseSlug = '') => {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          walkDir(filePath, `${baseSlug}/${file}`);
        } else if (file.endsWith('.md')) {
          const slug = `${baseSlug}/${file.replace('.md', '')}`.replace(/^\//, '');
          const stats = fs.statSync(filePath);
          routes.push({
            url: `${baseUrl}/consulting/${slug}`,
            lastModified: stats.mtime,
            changeFrequency: 'monthly',
            priority: 0.7,
          });
        }
      });
    };
    walkDir(consultingDir);
  }

  return routes;
}
