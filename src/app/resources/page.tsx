"use client";

import Layout from '@/components/layout/Layout';
import Link from 'next/link';

const resources = [
  {
    title: 'AWS Best Practices Guide',
    description: 'Comprehensive guide covering AWS security, cost optimization, and performance best practices.',
    type: 'Guide',
    icon: '📚',
    color: '#2563eb'
  },
  {
    title: 'Cloud Migration Checklist',
    description: 'Step-by-step checklist to ensure a smooth and successful migration to AWS cloud.',
    type: 'Checklist',
    icon: '✅',
    color: '#10b981'
  },
  {
    title: 'Cost Calculator Tool',
    description: 'Interactive tool to estimate your AWS costs and identify potential savings opportunities.',
    type: 'Tool',
    icon: '🧮',
    color: '#f59e0b'
  },
  {
    title: 'Security Assessment Template',
    description: 'Template for conducting comprehensive security assessments of your AWS infrastructure.',
    type: 'Template',
    icon: '🔒',
    color: '#ef4444'
  },
  {
    title: 'Webinar Series',
    description: 'Monthly webinars covering the latest AWS services, features, and industry trends.',
    type: 'Webinar',
    icon: '🎥',
    color: '#8b5cf6'
  },
  {
    title: 'White Papers',
    description: 'In-depth technical papers on cloud architecture, DevOps, and digital transformation.',
    type: 'White Paper',
    icon: '📄',
    color: '#06b6d4'
  }
];

export default function ResourcesPage() {
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
            {resources.map((resource, index) => (
              <div 
                key={index} 
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
                  {resource.type}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '12px' }}>
                  {resource.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', marginBottom: '24px', flexGrow: 1 }}>
                  {resource.description}
                </p>
                <button style={{
                  background: resource.color,
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: 'auto'
                }}>
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
