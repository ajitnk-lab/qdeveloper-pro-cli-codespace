import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: 'white',
        padding: '80px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{
            fontSize: '48px',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '24px'
          }}>
            Cloud Nestle Consulting & Services
          </h1>
          <p style={{
            fontSize: '20px',
            lineHeight: '1.6',
            color: '#e2e8f0',
            marginBottom: '32px',
            maxWidth: '768px',
            margin: '0 auto 32px'
          }}>
            Professional AWS expertise for businesses of all sizes. 
            Cost-effective cloud migration and optimization services that scale with your business.
          </p>
          <button style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
            color: 'white',
            padding: '16px 32px',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '18px',
            border: 'none',
            cursor: 'pointer'
          }}>
            Get Free Consultation ✨
          </button>
        </div>
      </section>

      {/* Services Overview */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
              Our Services
            </h2>
            <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '512px', margin: '0 auto' }}>
              Comprehensive AWS solutions designed to accelerate your digital transformation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/services/cloud-migration" style={{ textDecoration: 'none', color: 'inherit' }}>
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
                  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
                  color: '#2563eb'
                }}>
                  ☁️
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                  Cloud Migration
                </h3>
                <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                  Seamless migration of your infrastructure to AWS with minimal downtime and maximum efficiency.
                </p>
              </div>
            </Link>
            
            <Link href="/services/cost-optimization" style={{ textDecoration: 'none', color: 'inherit' }}>
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
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%)',
                  color: '#f59e0b'
                }}>
                  💰
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                  Cost Optimization
                </h3>
                <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                  Reduce your AWS costs by up to 40% with our proven optimization strategies and best practices.
                </p>
              </div>
            </Link>
            
            <Link href="/services/security-compliance" style={{ textDecoration: 'none', color: 'inherit' }}>
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
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)',
                  color: '#10b981'
                }}>
                  🔒
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                  Security & Compliance
                </h3>
                <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                  Ensure your cloud infrastructure meets industry standards and regulatory requirements.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section style={{ padding: '60px 0', backgroundColor: '#ffffff' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#1e293b', marginBottom: '32px' }}>
            Trusted by Businesses Worldwide
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '32px', flexWrap: 'wrap' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '16px 24px'
            }}>
              <span style={{ fontWeight: '600', color: '#1e293b', fontSize: '16px' }}>🏆 AWS Partner</span>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '16px 24px'
            }}>
              <span style={{ fontWeight: '600', color: '#1e293b', fontSize: '16px' }}>🛡️ ISO 27001 Certified</span>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '16px 24px'
            }}>
              <span style={{ fontWeight: '600', color: '#1e293b', fontSize: '16px' }}>✅ SOC 2 Compliant</span>
            </div>
          </div>
          <button style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            color: 'white',
            padding: '16px 32px',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '18px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(37, 99, 235, 0.25)'
          }}>
            Schedule Free Consultation 🚀
          </button>
        </div>
      </section>
    </Layout>
  );
}
