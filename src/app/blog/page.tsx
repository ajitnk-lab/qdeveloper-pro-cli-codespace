"use client";

import Layout from '@/components/layout/Layout';
import Link from 'next/link';

const posts = [
  {
    slug: 'data-solutions-framework',
    title: 'Data Solutions Framework',
    excerpt: 'Introducing the Finch Container Development Tool for Windows: A Comprehensive Guide',
    publishedAt: '2026-02-16',
    category: 'AWS',
    tags: [],
    author: 'CloudNestle Team',
    featured: false,
  },
  {
    slug: 'data-solutions-framework',
    title: 'Data Solutions Framework',
    excerpt: 'Accelerating Data Solutions with AWS Data Solutions Framework',
    publishedAt: '2026-02-16',
    category: 'AWS',
    tags: [],
    author: 'CloudNestle Team',
    featured: false,
  },
  {
    slug: 'data-solutions-framework',
    title: 'Data Solutions Framework',
    excerpt: 'Revolutionizing Data Solutions with AWS Data Solutions Framework',
    publishedAt: '2026-02-16',
    category: 'AWS',
    tags: [],
    author: 'CloudNestle Team',
    featured: false,
  },
  {
    slug: 'kube-resource-orchestrator',
    title: 'Kube Resource Orchestrator',
    excerpt: 'Simplifying Kubernetes Resource Management with Kube Resource Orchestrator (kro)',
    publishedAt: '2026-02-16',
    category: 'AWS',
    tags: [],
    author: 'CloudNestle Team',
    featured: false,
  },
  {
    slug: 'aws-cloud-credits-for-open-source-projects',
    title: 'AWS Cloud Credits for Open Source Projects:',
    excerpt: 'AWS Cloud Credits for Open Source Projects: Affirming Our Commitment',
    publishedAt: '2026-02-16',
    category: 'AWS',
    tags: [],
    author: 'CloudNestle Team',
    featured: false,
  },
  {
    slug: 'cedar',
    title: 'cedar',
    excerpt: 'Secure your Express application APIs in 5 minutes with Cedar',
    publishedAt: '2026-02-16',
    category: 'AWS',
    tags: [],
    author: 'CloudNestle Team',
    featured: false,
  },
  {
    slug: 'cdk-cloud-community-meetings',
    title: 'CDK Cloud Community Meetings',
    excerpt: 'CDK Cloud Community Meetings',
    publishedAt: '2026-02-16',
    category: 'AWS',
    tags: [],
    author: 'CloudNestle Team',
    featured: false,
  },
  {
    slug: 'strands-agents-10',
    title: 'Strands Agents 1.0',
    excerpt: 'Introducing Strands Agents 1.0: Production-Ready Multi-Agent Orchestration Made Simple',
    publishedAt: '2026-02-16',
    category: 'AWS',
    tags: [],
    author: 'CloudNestle Team',
    featured: false,
  },
  {
    slug: 'your-own-jupyterlab-application',
    title: 'Your own JupyterLab application',
    excerpt: 'Your Own JupyterLab Application: Deploying with Real-Time Collaboration in Minutes',
    publishedAt: '2026-02-16',
    category: 'AWS',
    tags: ["jupyter","aws","cloud"],
    author: 'CloudNestle Team',
    featured: false,
  },
  {
    slug: 'cli-agent-orchestrator',
    title: 'CLI Agent Orchestrator',
    excerpt: 'CLI Agent Orchestrator: Transforming Developer CLI Tools into a Multi-Agent Powerhouse',
    publishedAt: '2026-02-16',
    category: 'AWS',
    tags: [],
    author: 'CloudNestle Team',
    featured: false,
  },
  {
    slug: 'testing-blog-automation-system',
    title: 'Testing Blog Automation System',
    excerpt: 'Testing Blog Automation System',
    publishedAt: '2026-02-16',
    category: 'AWS',
    tags: ["Testing", "Automation"],
    author: 'CloudNestle Team',
    featured: false,
  },
  {
    slug: 'test-automation-blog',
    title: 'Test: Automated Blog Publishing System',
    excerpt: 'Testing automated blog generation and publishing workflow from social media automation system.',
    publishedAt: '2026-02-16',
    category: 'Testing',
    tags: ["Automation", "Testing", "CI/CD"],
    author: 'CloudNestle Team',
    featured: false,
  },
  {
    slug: '2025-09-09-automated-deployment-live',
    title: '🚀 Automated Deployment is Now Live!',
    excerpt: 'Our website now features professional CI/CD automation with GitHub Actions, enabling instant deployments with every code push.',
    publishedAt: '2025-09-09',
    category: 'Announcements',
    tags: ["Automation", "GitHub Actions", "DevOps", "CI/CD"],
    author: 'CloudNestle Team',
    featured: false,
  },
  {
    slug: 'aws-cost-optimization-guide',
    title: 'Complete Guide to AWS Cost Optimization in 2024',
    excerpt: 'Learn proven strategies to reduce your AWS costs by up to 40% without compromising performance or reliability.',
    publishedAt: '2024-01-15',
    category: 'Cost Optimization',
    tags: ["AWS", "Cost Optimization", "Cloud Computing", "FinOps"],
    author: 'CloudNestle Team',
    featured: false,
  },
  {
    slug: 'cloud-migration-checklist',
    title: 'Essential Cloud Migration Checklist for 2024',
    excerpt: 'A comprehensive checklist to ensure your cloud migration project succeeds without unexpected surprises.',
    publishedAt: '2024-01-10',
    category: 'Cloud Migration',
    tags: ["AWS", "Cloud Migration", "Infrastructure", "Planning"],
    author: 'CloudNestle Team',
    featured: false,
  },
];

export default function BlogPage() {
  return (
    <Layout>
      <div style={{ padding: '40px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
              Blog
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', maxWidth: '768px', margin: '0 auto' }}>
              Latest insights, tutorials, and best practices for AWS cloud computing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <article 
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease-in-out',
                    cursor: 'pointer',
                    height: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ 
                      fontSize: '14px', 
                      color: '#6b7280', 
                      fontWeight: '500' 
                    }}>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <h2 style={{ 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: '#1e293b', 
                    marginBottom: '12px',
                    lineHeight: '1.3'
                  }}>
                    {post.title}
                  </h2>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#64748b', 
                    lineHeight: '1.6',
                    marginBottom: '20px'
                  }}>
                    {post.excerpt}
                  </p>
                  <div style={{ 
                    color: '#2563eb', 
                    fontWeight: '600', 
                    fontSize: '14px' 
                  }}>
                    Read More →
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
