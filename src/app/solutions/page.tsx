"use client";

import Layout from '@/components/layout/Layout';
import Link from 'next/link';

const solutions = [
  {
    slug: 'serverless-architecture',
    title: 'Serverless Architecture',
    description: 'Build scalable applications with AWS Lambda, API Gateway, and other serverless technologies.',
    icon: '⚡',
    color: '#8b5cf6'
  },
  {
    slug: 'data-analytics-platform',
    title: 'Data Analytics Platform',
    description: 'Transform your data into actionable insights with AWS analytics and machine learning services.',
    icon: '📊',
    color: '#06b6d4'
  },
  {
    slug: 'multi-cloud-management',
    title: 'Multi-Cloud Management',
    description: 'Manage and optimize workloads across multiple cloud providers with unified governance.',
    icon: '🌐',
    color: '#f59e0b'
  }
];

export default function SolutionsPage() {
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
            {solutions.map((solution) => (
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
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                  }}
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
                    background: `${solution.color}15`,
                    color: solution.color
                  }}>
                    {solution.icon}
                  </div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                    {solution.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', marginBottom: '24px' }}>
                    {solution.description}
                  </p>
                  <div style={{ color: solution.color, fontWeight: '600', fontSize: '14px' }}>
                    Learn More →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
