import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/content';

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <Layout>
      <div style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
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
                <article style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '32px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  height: '100%'
                }}>
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
                    fontSize: '24px', 
                    fontWeight: '600', 
                    color: '#1e293b', 
                    marginBottom: '12px',
                    lineHeight: '1.3'
                  }}>
                    {post.title}
                  </h2>
                  <p style={{ 
                    fontSize: '16px', 
                    color: '#64748b', 
                    lineHeight: '1.6',
                    marginBottom: '20px'
                  }}>
                    {post.excerpt}
                  </p>
                  <div style={{ 
                    color: '#2563eb', 
                    fontWeight: '600', 
                    fontSize: '16px' 
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
