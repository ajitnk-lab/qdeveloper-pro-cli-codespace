'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';

export default function ContactPage() {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);

  const formTypes = [
    {
      id: 'consultation',
      title: 'Request a Consultation',
      tagline: 'Need AWS cloud consulting for your business?',
      description: 'Comprehensive form for detailed business requirements and technical consultation.',
      icon: '🚀',
      features: ['Multi-step process', 'Technical assessment', 'Business requirements', 'Timeline & budget planning'],
      url: '/contact-consultation'
    },
    {
      id: 'general',
      title: 'General Inquiry',
      tagline: 'Have a quick question or need basic information?',
      description: 'Simple form for basic questions and general information requests.',
      icon: '💬',
      features: ['Quick & simple', 'General questions', 'Basic information', 'Fast response'],
      url: '/general-inquiry'
    },
    {
      id: 'partner',
      title: 'Partner with Us',
      tagline: 'Interested in becoming a business partner with CloudNestle?',
      description: 'Partnership opportunities and collaboration inquiries for businesses.',
      icon: '🤝',
      features: ['Partnership types', 'Collaboration details', 'Business opportunities', 'Joint ventures'],
      url: '/partner'
    },
    {
      id: 'affiliate',
      title: 'Join Our Affiliate Program',
      tagline: 'Want to earn commissions by referring clients to CloudNestle?',
      description: 'Earn recurring commissions by referring clients to our AWS consulting services.',
      icon: '💰',
      features: ['15-20% recurring commissions', '180-day cookie window', 'Marketing materials provided', 'Monthly payments'],
      url: '/affiliate'
    }
  ];

  return (
    <Layout>
      <div style={{ padding: '40px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
              Contact CloudNestle
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', maxWidth: '768px', margin: '0 auto' }}>
              Choose the form that best fits your needs. We&apos;re here to help with all your cloud transformation requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {formTypes.map((form) => (
                <div
                  key={form.id}
                  onClick={() => window.location.href = form.url}
                  style={{
                    background: '#ffffff',
                    border: '2px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#2563eb';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>{form.icon}</div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                    {form.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#2563eb', marginBottom: '12px', fontWeight: '500', fontStyle: 'italic' }}>
                    {form.tagline}
                  </p>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px', lineHeight: '1.5' }}>
                    {form.description}
                  </p>
                  <ul style={{ textAlign: 'left', marginBottom: '24px' }}>
                    {form.features.map((feature, index) => (
                      <li key={index} style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#10b981' }}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button style={{
                    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    width: '100%'
                  }}>
                    Select This Form
                  </button>
                </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
