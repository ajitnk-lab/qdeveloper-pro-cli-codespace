import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';

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

async function getResources(): Promise<Resource[]> {
  try {
    const indexPath = path.join(process.cwd(), 'content/resources/_index.json');
    const fileContent = await fs.readFile(indexPath, 'utf-8');
    const data = JSON.parse(fileContent);
    return data.resources || [];
  } catch (error) {
    console.error('Error loading resources:', error);
    return [];
  }
}

export default async function ResourcesPage() {
  const resources = await getResources();
  return (
    <Layout>
      <div style={{ padding: '40px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
              Resources
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', maxWidth: '768px', margin: '0 auto' }}>
              Free tools, guides, and resources to help you succeed with AWS cloud computing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {resources.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#64748b' }}>
                <p>No resources available yet. Check back soon!</p>
              </div>
            ) : (
              resources.map((resource) => (
                <div 
                  key={resource.slug} 
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease-in-out',
                    cursor: 'pointer',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    marginBottom: '20px',
                    background: `${resource.color}15`,
                    color: resource.color
                  }}>
                    {resource.icon}
                  </div>
                  <div style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    backgroundColor: `${resource.color}15`,
                    color: resource.color,
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    marginBottom: '16px'
                  }}>
                    {resource.resource_type}
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '12px' }}>
                    {resource.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', marginBottom: '24px', flexGrow: 1 }}>
                    {resource.description}
                  </p>
                  {resource.pdf_url && (
                    <a 
                      href={resource.pdf_url}
                      download
                      style={{
                        background: resource.color,
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        marginTop: 'auto',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'block'
                      }}
                    >
                      Download PDF
                    </a>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
