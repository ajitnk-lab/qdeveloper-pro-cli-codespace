import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { getAllConsultingServices } from '@/lib/content';

export default async function ConsultingPage() {
  const services = await getAllConsultingServices();

  return (
    <Layout>
      <div style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
              Consulting Services
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', maxWidth: '768px', margin: '0 auto' }}>
              Expert AWS consulting to help you make informed decisions and optimize your cloud strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Link key={service.slug} href={`/consulting/${service.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                  <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6', marginBottom: '24px' }}>
                    {service.description}
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
