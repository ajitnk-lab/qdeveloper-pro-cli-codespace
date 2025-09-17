import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: 'white',
        padding: '20px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{
            fontSize: '48px',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '12px'
          }}>
            Cloud Nestle
          </h1>
          <p style={{
            fontSize: '24px',
            lineHeight: '1.3',
            color: '#f1f5f9',
            marginBottom: '8px',
            fontWeight: '600',
            background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '2px solid rgba(245, 158, 11, 0.3)',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            display: 'inline-block'
          }}>
            &ldquo;Where Your Business Finds Its Cloud Home&rdquo;
          </p>
          <p style={{
            fontSize: '20px',
            lineHeight: '1.5',
            color: '#e2e8f0',
            marginBottom: '16px',
            maxWidth: '768px',
            margin: '0 auto 16px'
          }}>
            Just as birds carefully choose the perfect branch to build their nest, your business deserves the ideal cloud environment to thrive. We help companies nestle into secure, scalable cloud solutions that feel just right.
          </p>
          <p style={{
            fontSize: '18px',
            lineHeight: '1.5',
            color: '#cbd5e1',
            marginBottom: '24px',
            maxWidth: '600px',
            margin: '0 auto 24px'
          }}>
            Professional AWS expertise for businesses of all sizes. 
            Cost-effective cloud migration and optimization services that scale with your business.
          </p>
          <Link href="/contact">
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
          </Link>
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

      {/* Why Cloud Nestle - Expertise & Credibility */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
              Why Choose Cloud Nestle?
            </h2>
            <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
              Proven expertise and credentials you can trust for your cloud transformation journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* AWS Certified */}
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '2px solid #f59e0b'
            }}>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
                AWS Certified Expert
              </h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6', marginBottom: '24px' }}>
                Certified AWS professional with validated expertise across multiple domains and specializations
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <img 
                  src="/solution architect associate.png" 
                  alt="AWS Solutions Architect Associate" 
                  style={{ width: '80px', height: 'auto', borderRadius: '6px', border: '2px solid #f59e0b' }}
                />
                <img 
                  src="/aws reg partnet.png" 
                  alt="AWS Registered Partner" 
                  style={{ width: '80px', height: 'auto', borderRadius: '6px', border: '2px solid #f59e0b' }}
                />
                <img 
                  src="/cloud economics.png" 
                  alt="AWS Cloud Economics" 
                  style={{ width: '80px', height: 'auto', borderRadius: '6px', border: '2px solid #f59e0b' }}
                />
                <img 
                  src="/well archited prof.png" 
                  alt="AWS Well-Architected Proficient" 
                  style={{ width: '80px', height: 'auto', borderRadius: '6px', border: '2px solid #f59e0b' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                  Solution Architecture
                </span>
                <span style={{ background: '#dbeafe', color: '#1e40af', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                  Cloud Economics
                </span>
                <span style={{ background: '#d1fae5', color: '#065f46', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                  Well-Architected Frameworks
                </span>
              </div>
            </div>

            {/* 20+ Years Experience */}
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '2px solid #2563eb'
            }}>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
                20+ Years Experience
              </h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6', marginBottom: '24px' }}>
                Two decades of enterprise IT experience across industries, from startups to Fortune 500 companies
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
                <img 
                  src="/questglobal.jfif" 
                  alt="Quest Global" 
                  style={{ height: '40px', width: 'auto', border: '2px solid #2563eb', borderRadius: '6px', padding: '4px' }}
                />
                <img 
                  src="/oracle.png" 
                  alt="Oracle" 
                  style={{ height: '40px', width: 'auto', border: '2px solid #2563eb', borderRadius: '6px', padding: '4px' }}
                />
                <img 
                  src="/sap.jfif" 
                  alt="SAP" 
                  style={{ height: '40px', width: 'auto', border: '2px solid #2563eb', borderRadius: '6px', padding: '4px' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ background: '#dbeafe', color: '#1e40af', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                  Enterprise IT
                </span>
                <span style={{ background: '#dbeafe', color: '#1e40af', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                  IT Modernization
                </span>
                <span style={{ background: '#dbeafe', color: '#1e40af', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                  DevSecOps
                </span>
              </div>
            </div>

            {/* Proven Results */}
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '2px solid #10b981'
            }}>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
                Proven Methodology
              </h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6', marginBottom: '24px' }}>
                Battle-tested frameworks for secure, cost-effective cloud transformations with minimal downtime
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
                <img 
                  src="/wellarchitecedframework.jfif" 
                  alt="AWS Well-Architected Framework" 
                  style={{ height: '50px', width: 'auto', borderRadius: '8px', border: '2px solid #10b981' }}
                />
                <img 
                  src="/cloudadoptionframework.png" 
                  alt="Cloud Adoption Framework" 
                  style={{ height: '50px', width: 'auto', borderRadius: '8px', border: '2px solid #10b981' }}
                />
                <img 
                  src="/secuitymodel.jfif" 
                  alt="Security Maturity Model" 
                  style={{ height: '50px', width: 'auto', borderRadius: '8px', border: '2px solid #10b981' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                  Well-Architected Framework
                </span>
                <span style={{ background: '#dbeafe', color: '#1e40af', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                  Cloud Adoption Framework
                </span>
                <span style={{ background: '#d1fae5', color: '#065f46', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                  Security Maturity Model Framework
                </span>
              </div>
            </div>
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
              <span style={{ fontWeight: '600', color: '#1e293b', fontSize: '16px' }}>🏆 AWS Registered Partner</span>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '16px 24px'
            }}>
              <span style={{ fontWeight: '600', color: '#1e293b', fontSize: '16px' }}>📊 20+ Years Enterprise Experience</span>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '16px 24px'
            }}>
              <span style={{ fontWeight: '600', color: '#1e293b', fontSize: '16px' }}>🎯 100% Client Success Rate</span>
            </div>
          </div>
          <Link href="/contact">
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
          </Link>
        </div>
      </section>
    </Layout>
  );
}
