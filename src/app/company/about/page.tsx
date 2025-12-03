import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: 'white',
        padding: '30px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{
            fontSize: '14px',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '16px'
          }}>
            About CloudNestle Consulting & Services
          </h1>
          <p style={{
            fontSize: '14px',
            lineHeight: '1.3',
            background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '2px solid rgba(245, 158, 11, 0.3)',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            display: 'inline-block',
            marginBottom: '8px',
            fontWeight: '600'
          }}>
            Where Your Business Finds Its Cloud Home
          </p>
        </div>
      </section>

      {/* Meet the Founder */}
      <section style={{ padding: '40px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#1e293b', marginBottom: '32px' }}>
              Meet the Founder
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
              <img 
                src="/ajit-prof-pic.png" 
                alt="Ajit NK - Founder of Cloud Nestle" 
                style={{ 
                  width: '200px', 
                  height: '200px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <h3 style={{ fontSize: '28px', fontWeight: '600', color: '#1e293b' }}>
                  Ajit NK
                </h3>
                <a 
                  href="https://linkedin.com/in/ajitnk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    color: '#0077b5', 
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '2px solid #0077b5',
                    transition: 'all 0.2s'
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Cloud Nestle Story */}
      <section style={{ padding: '40px 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#1e293b', marginBottom: '32px' }}>
              The Cloud Nestle Story
            </h2>
            <p style={{ fontSize: '20px', color: '#64748b', lineHeight: '1.8', fontStyle: 'italic' }}>
              &ldquo;After years of seeing businesses struggle with their AWS architecture, I founded Cloud Nestle Conslting & Services to provide expert, personalized guidance that helps companies of all sizes succeed in the cloud&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Awards and Achievements */}
      <section style={{ padding: '40px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
              Awards and Achievements
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b' }}>
              AWS Certified Expert with proven expertise across multiple domains
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '2px solid #f1f5f9'
            }}>
              <img 
                src="/solution architect associate.png" 
                alt="AWS Solution Architect Associate" 
                style={{ 
                  height: '120px', 
                  width: 'auto',
                  margin: '0 auto 16px'
                }}
              />
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                <a href="https://www.credly.com/badges/f3871c14-0ab6-41be-9902-9eaf5dfaee5c/public_url" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   style={{ 
                     color: '#2563eb', 
                     textDecoration: 'underline',
                     cursor: 'pointer'
                   }}>
                  AWS Solutions Architect Associate
                </a>
              </h3>
            </div>

            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '2px solid #f1f5f9'
            }}>
              <img 
                src="/well archited prof.png" 
                alt="AWS Well-Architected Professional" 
                style={{ 
                  height: '120px', 
                  width: 'auto',
                  margin: '0 auto 16px'
                }}
              />
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                <a href="https://www.credly.com/badges/5ab1b408-5ba5-4f43-9c49-92d5312a42c8/public_url" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   style={{ 
                     color: '#2563eb', 
                     textDecoration: 'underline',
                     cursor: 'pointer'
                   }}>
                  AWS Well-Architected Professional
                </a>
              </h3>
            </div>

            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '2px solid #f1f5f9'
            }}>
              <img 
                src="/cloud economics.png" 
                alt="AWS Cloud Economics" 
                style={{ 
                  height: '120px', 
                  width: 'auto',
                  margin: '0 auto 16px'
                }}
              />
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                <a href="https://www.credly.com/badges/495ecbd2-9638-49d5-b858-222f87d56c7e/public_url" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   style={{ 
                     color: '#2563eb', 
                     textDecoration: 'underline',
                     cursor: 'pointer'
                   }}>
                  AWS Cloud Economics
                </a>
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Endorsements */}
      <section style={{ padding: '40px 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
              Professional Endorsements
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b' }}>
              What industry professionals say about our expertise
            </p>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '40px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '2px solid #f1f5f9'
            }}>
              <img 
                src="/linkedrecommendatins.jpg" 
                alt="LinkedIn Professional Recommendations" 
                style={{ 
                  width: '100%',
                  maxWidth: '600px',
                  height: 'auto',
                  borderRadius: '12px',
                  marginBottom: '24px'
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#0077b5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <a 
                  href="https://www.linkedin.com/in/ajitnk/details/recommendations/?detailScreenTabIndex=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    fontSize: '14px', 
                    color: '#0077b5', 
                    margin: '0',
                    textDecoration: 'none'
                  }}
                >
                  Source: LinkedIn Professional Recommendations
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Follow Us Section */}
      <section style={{ padding: '30px 0', backgroundColor: '#ffffff', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px' }}>
              <a href="https://www.linkedin.com/company/105924213" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 style={{ 
                   color: '#2563eb', 
                   textDecoration: 'underline',
                   cursor: 'pointer'
                 }}>
                Stay Connected
              </a>
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '32px' }}>
              Follow our company on LinkedIn for expert insights on AWS consulting and services:
            </p>
            <div dangerouslySetInnerHTML={{
              __html: `
                <script src="https://platform.linkedin.com/in.js" type="text/javascript">lang: en_US</script>
                <script type="IN/FollowCompany" data-id="105924213" data-counter="bottom"></script>
              `
            }} />
            <div dangerouslySetInnerHTML={{
              __html: `
                <script src="https://platform.linkedin.com/in.js" type="text/javascript">lang: en_US</script>
                <script type="IN/FollowCompany" data-id="105924213" data-counter="bottom"></script>
              `
            }} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '40px 0', backgroundColor: '#1e293b', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '16px' }}>
            Ready to Find Your Cloud Home?
          </h2>
          <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Let&rsquo;s discuss how CloudNestle Consulting & Services can help your business settle into the perfect cloud environment.
          </p>
          <button style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
            color: 'white',
            padding: '16px 32px',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(245, 158, 11, 0.25)'
          }}>
            Schedule Your Free Consultation 🚀
          </button>
        </div>
      </section>
    </Layout>
  );
}
