import Layout from '@/components/layout/Layout';
import Link from 'next/link';

const sections = [
  {
    title: 'About Us',
    description: 'Learn about our mission, values, and commitment to helping businesses succeed in the cloud.',
    href: '/company/about',
    icon: '🏢'
  },
  {
    title: 'Case Studies',
    description: 'Real-world examples of how we\'ve helped businesses transform with AWS cloud solutions.',
    href: '/company/case-studies/fintech-migration',
    icon: '📈'
  },
  {
    title: 'Testimonials',
    description: 'Hear what our clients say about their experience working with Cloud Nestle.',
    href: '/company/testimonials/sarah-johnson',
    icon: '💬'
  },
  {
    title: 'Careers',
    description: 'Join our team of cloud experts and help shape the future of cloud computing.',
    href: '/company/careers/senior-cloud-architect',
    icon: '👥'
  }
];

export default function CompanyPage() {
  return (
    <Layout>
      <div style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
              Company
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', maxWidth: '768px', margin: '0 auto' }}>
              Get to know Cloud Nestle - your trusted partner for AWS cloud transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((section) => (
              <Link key={section.href} href={section.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '32px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  height: '100%'
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
                    color: '#2563eb'
                  }}>
                    {section.icon}
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                    {section.title}
                  </h3>
                  <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6', marginBottom: '24px' }}>
                    {section.description}
                  </p>
                  <div style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>
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
