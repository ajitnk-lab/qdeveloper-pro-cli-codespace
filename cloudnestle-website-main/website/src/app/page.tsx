import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section - Enhanced with gradients and animations */}
      <section style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: 'white',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)',
          pointerEvents: 'none'
        }}></div>
        <div className="w-full px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 style={{
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '24px'
            }}>
              Cloud Nestle Consulting & Services
            </h1>
            <p style={{
              fontSize: '1.25rem',
              lineHeight: 1.7,
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
              padding: '14px 28px',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '0.95rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none'
            }}>
              Get Free Consultation ✨
            </button>
          </div>
        </div>
      </section>

      {/* Services Overview - Enhanced Cards */}
      <section style={{
        padding: '80px 0',
        background: '#f8fafc'
      }}>
        <div className="w-full px-4">
          <div className="text-center mb-16">
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#1e293b',
              marginBottom: '16px'
            }}>Our Services</h2>
            <p style={{
              fontSize: '1.25rem',
              lineHeight: 1.7,
              color: '#64748b',
              maxWidth: '512px',
              margin: '0 auto'
            }}>
              Comprehensive AWS solutions designed to accelerate your digital transformation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-none">
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: 'hidden',
              position: 'relative'
            }} className="hover:shadow-xl hover:-translate-y-2">
              <div className="p-8">
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
                <h3 style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 600,
                  lineHeight: 1.25,
                  color: '#1e293b',
                  marginBottom: '16px'
                }}>Cloud Migration</h3>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: '#64748b',
                  marginBottom: '24px'
                }}>
                  Seamless migration of your infrastructure to AWS with minimal downtime and maximum efficiency.
                </p>
                <Link href="/services/cloud-migration" className="btn-secondary">
                  Learn More →
                </Link>
              </div>
            </div>
            
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: 'hidden',
              position: 'relative'
            }} className="hover:shadow-xl hover:-translate-y-2">
              <div className="p-8">
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
                <h3 style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 600,
                  lineHeight: 1.25,
                  color: '#1e293b',
                  marginBottom: '16px'
                }}>Cost Optimization</h3>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: '#64748b',
                  marginBottom: '24px'
                }}>
                  Reduce your AWS costs by up to 40% with our proven optimization strategies and best practices.
                </p>
                <Link href="/services/cost-optimization" className="btn-secondary">
                  Learn More →
                </Link>
              </div>
            </div>
            
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: 'hidden',
              position: 'relative'
            }} className="hover:shadow-xl hover:-translate-y-2">
              <div className="p-8">
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
                <h3 style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 600,
                  lineHeight: 1.25,
                  color: '#1e293b',
                  marginBottom: '16px'
                }}>Security & Compliance</h3>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: '#64748b',
                  marginBottom: '24px'
                }}>
                  Ensure your cloud infrastructure meets industry standards and regulatory requirements.
                </p>
                <Link href="/services/security-compliance" className="btn-secondary">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators - Enhanced */}
      <section style={{
        padding: '60px 0',
        background: '#ffffff',
        borderTop: '1px solid #e2e8f0'
      }}>
        <div className="w-full px-4 text-center">
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            color: '#1e293b',
            marginBottom: '32px'
          }}>Trusted by Businesses Worldwide</h2>
          <div className="flex justify-center items-center space-x-8 mb-8 flex-wrap gap-4">
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '16px 24px',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{ fontWeight: 600, color: '#1e293b' }}>🏆 AWS Partner</span>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '16px 24px',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{ fontWeight: 600, color: '#1e293b' }}>🛡️ ISO 27001 Certified</span>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '16px 24px',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{ fontWeight: 600, color: '#1e293b' }}>✅ SOC 2 Compliant</span>
            </div>
          </div>
          <button style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            color: 'white',
            padding: '14px 28px',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '0.95rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.25)'
          }}>
            Schedule Free Consultation 🚀
          </button>
        </div>
      </section>
    </Layout>
  );
}
