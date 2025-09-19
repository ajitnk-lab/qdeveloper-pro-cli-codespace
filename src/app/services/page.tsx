"use client";

import Layout from '@/components/layout/Layout';
import Link from 'next/link';

const services = [
  {
    slug: 'cloud-migration',
    title: 'Cloud Migration',
    description: 'Seamless migration of your infrastructure to AWS with minimal downtime and maximum efficiency.',
    icon: '☁️',
    color: '#2563eb'
  },
  {
    slug: 'cost-optimization',
    title: 'Cost Optimization',
    description: 'Reduce your AWS costs by up to 40% with our proven optimization strategies and best practices.',
    icon: '💰',
    color: '#f59e0b'
  },
  {
    slug: 'security-compliance',
    title: 'Security & Compliance',
    description: 'Ensure your cloud infrastructure meets industry standards and regulatory requirements.',
    icon: '🔒',
    color: '#10b981'
  }
];

export default function ServicesPage() {
  return (
    <Layout>
      <div style={{ padding: '40px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
              Our Services
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', maxWidth: '768px', margin: '0 auto' }}>
              Comprehensive AWS cloud solutions designed to accelerate your digital transformation journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                    background: `${service.color}15`,
                    color: service.color
                  }}>
                    {service.icon}
                  </div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', marginBottom: '24px' }}>
                    {service.description}
                  </p>
                  <div style={{ color: service.color, fontWeight: '600', fontSize: '14px' }}>
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
