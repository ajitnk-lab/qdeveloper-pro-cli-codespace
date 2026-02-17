import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

interface Resource {
  slug: string;
  title: string;
  description: string;
  resource_type: string;
  icon: string;
  color: string;
  category?: string;
  tags?: string[];
  publishedAt?: string;
  pdf_url?: string;
}

async function getResource(slug: string): Promise<{ resource: Resource; content: string } | null> {
  try {
    const indexPath = path.join(process.cwd(), 'content/resources/_index.json');
    const indexContent = await fs.readFile(indexPath, 'utf-8');
    const data = JSON.parse(indexContent);
    const resource = data.resources?.find((r: Resource) => r.slug === slug);
    
    if (!resource) return null;

    const mdPath = path.join(process.cwd(), 'content/resources', `${slug}.md`);
    const content = await fs.readFile(mdPath, 'utf-8');
    
    return { resource, content };
  } catch (error) {
    return null;
  }
}

export default async function ResourcePage({ params }: { params: { slug: string } }) {
  const data = await getResource(params.slug);
  
  if (!data) {
    notFound();
  }

  const { resource, content } = data;

  return (
    <Layout>
      <div style={{ padding: '40px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <nav style={{ marginBottom: '24px', fontSize: '14px', color: '#64748b' }}>
            <Link href="/" style={{ color: '#64748b', textDecoration: 'none' }}>Home</Link>
            {' / '}
            <Link href="/resources" style={{ color: '#64748b', textDecoration: 'none' }}>Resources</Link>
            {' / '}
            <span style={{ color: '#1e293b' }}>{resource.title}</span>
          </nav>

          <div style={{
            display: 'inline-block',
            padding: '6px 16px',
            backgroundColor: `${resource.color}15`,
            color: resource.color,
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '16px'
          }}>
            {resource.icon} {resource.resource_type}
          </div>

          <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
            {resource.title}
          </h1>

          <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '24px' }}>
            {resource.description}
          </p>

          {resource.tags && resource.tags.length > 0 && (
            <div style={{ marginBottom: '24px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {resource.tags.map((tag) => (
                <span 
                  key={tag}
                  style={{
                    padding: '4px 12px',
                    backgroundColor: '#f1f5f9',
                    color: '#64748b',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {resource.pdf_url && (
            <a 
              href={resource.pdf_url}
              download
              style={{
                display: 'inline-block',
                background: resource.color,
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                marginBottom: '32px'
              }}
            >
              📥 Download PDF
            </a>
          )}

          <div 
            style={{
              marginTop: '32px',
              padding: '32px',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              lineHeight: '1.8',
              color: '#334155'
            }}
          >
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>
              {content}
            </pre>
          </div>

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <Link 
              href="/resources"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                color: '#64748b',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              ← Back to Resources
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
