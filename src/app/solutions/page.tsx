import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { getAllSolutions } from '@/lib/content';

const colorMap: Record<string, string> = {
  orange: '#f59e0b',
  green: '#10b981',
  blue: '#06b6d4',
  purple: '#8b5cf6',
  red: '#ef4444',
  yellow: '#f59e0b'
};

export default async function SolutionsPage() {
  const solutions = getAllSolutions();

  return (
    <Layout>
      <div style={{ padding: '40px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
              Cloud Solutions
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', maxWidth: '768px', margin: '0 auto' }}>
              Innovative cloud solutions tailored to your business needs and industry requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution) => {
              const hexColor = colorMap[solution.color] || solution.color;
              return (
              <Link key={solution.slug} href={`/solutions/${solution.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div 
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
                  className="hover:transform hover:scale-105 hover:shadow-xl"
                >
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    marginBottom: '24px',
                    background: `${hexColor}15`,
                    color: hexColor
                  }}>
                    {solution.icon}
                  </div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                    {solution.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', marginBottom: '24px' }}>
                    {solution.description}
                  </p>
                  <div style={{ color: hexColor, fontWeight: '600', fontSize: '14px' }}>
                    Learn More →
                  </div>
                </div>
              </Link>
            )})}
          </div>

          {/* Marketplace CTA */}
          <div style={{
            marginTop: '64px',
            background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
            borderRadius: '20px',
            padding: '48px',
            textAlign: 'center',
            color: 'white'
          }}>
            <div style={{ display: 'inline-block', background: 'rgba(255, 255, 255, 0.2)', padding: '6px 16px', borderRadius: '20px', marginBottom: '16px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700' }}>🛒 MARKETPLACE</span>
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px' }}>
              Need Ready-to-Deploy Solutions?
            </h2>
            <p style={{ fontSize: '18px', marginBottom: '32px', maxWidth: '700px', margin: '0 auto 32px', opacity: 0.95 }}>
              Browse our marketplace for pre-built cloud solutions, tools, and services from verified providers. Deploy in minutes, not months.
            </p>
            <a href="https://marketplace.cloudnestle.com/catalog" target="_blank" rel="noopener noreferrer">
              <button style={{
                background: 'white',
                color: '#7c3aed',
                padding: '16px 40px',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '18px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
              }}>
                Browse Marketplace Solutions →
              </button>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
