"use client";

import Layout from '@/components/layout/Layout';
import Link from 'next/link';

const posts = [
  {
    slug: 'test-automation-blog',
    title: 'Test: Automated Blog Publishing System',
    excerpt: 'Testing automated blog generation and publishing workflow from social media automation system.',
    publishedAt: '2026-02-16'
  },
  {
    slug: '2025-09-09-automated-deployment-live',
    title: 'Automated Deployment Live',
    excerpt: 'Learn about automated deployment strategies for AWS.',
    publishedAt: '2025-09-09'
  },
  {
    slug: '2025-09-09-ajits-news-article',
    title: 'Ajits News Article',
    excerpt: 'Latest news and updates from the cloud industry.',
    publishedAt: '2025-09-09'
  },
  {
    slug: 'aws-cost-optimization-guide',
    title: 'AWS Cost Optimization Best Practices',
    excerpt: 'Comprehensive guide to reducing AWS costs without compromising performance.',
    publishedAt: '2024-01-15'
  },
  {
    slug: 'cloud-migration-checklist',
    title: 'Essential Cloud Migration Checklist for 2024',
    excerpt: 'A comprehensive checklist to ensure your cloud migration project succeeds without unexpected surprises.',
    publishedAt: '2024-01-10'
  }
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
