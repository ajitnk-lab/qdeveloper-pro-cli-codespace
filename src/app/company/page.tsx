import Layout from '@/components/layout/Layout';
import Link from 'next/link';

const sections = [
  {
    title: 'About Us',
    description: 'Learn about our mission, values, and commitment to helping businesses succeed in the cloud.',
    href: '/company/about',
    icon: '🏢'
  }
];

export default function CompanyPage() {
  return (
    <Layout>
      <div style={{ padding: '40px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
              Company
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', maxWidth: '768px', margin: '0 auto' }}>
              Get to know Cloud Nestle - your trusted partner for AWS cloud transformation.
            </p>
          </div>

          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            {sections.map((section) => (
              <Link key={section.href} href={section.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    marginBottom: '20px',
                    background: 'rgba(37, 99, 235, 0.1)',
                    color: '#2563eb',
                    margin: '0 auto 20px'
                  }}>
                    {section.icon}
                  </div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                    {section.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', marginBottom: '24px' }}>
                    {section.description}
                  </p>
                  <div style={{ color: '#2563eb', fontWeight: '600', fontSize: '14px' }}>
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
