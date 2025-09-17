import Layout from '@/components/layout/Layout';

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: 'white',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{
            fontSize: '48px',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '16px'
          }}>
            About Cloud Nestle
          </h1>
          <p style={{
            fontSize: '24px',
            lineHeight: '1.3',
            color: '#f1f5f9',
            marginBottom: '8px',
            fontWeight: '600'
          }}>
            Where Your Business Finds Its Cloud Home
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#1e293b', marginBottom: '32px' }}>
              Our Story
            </h2>
            <p style={{ fontSize: '18px', color: '#64748b', lineHeight: '1.8', marginBottom: '24px' }}>
              Just as birds carefully choose the perfect branch to build their nest, we believe every business deserves the ideal cloud environment to thrive. The name &ldquo;Cloud Nestle&rdquo; reflects our core philosophy - helping companies settle comfortably and securely into the cloud.
            </p>
            <p style={{ fontSize: '18px', color: '#64748b', lineHeight: '1.8' }}>
              We don&rsquo;t just migrate systems; we create cloud homes where businesses can grow, innovate, and succeed with confidence. Our approach combines technical expertise with genuine care for your business success.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission */}
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '40px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px',
                margin: '0 auto 24px'
              }}>
                🎯
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
                Our Mission
              </h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                To help businesses nestle into the cloud with confidence, providing secure, scalable, and cost-effective AWS solutions that enable growth and innovation.
              </p>
            </div>

            {/* Vision */}
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '40px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px',
                margin: '0 auto 24px'
              }}>
                🌟
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
                Our Vision
              </h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                To be the most trusted cloud consulting partner, known for creating comfortable, secure cloud homes where every business can thrive and reach its full potential.
              </p>
            </div>

            {/* Values */}
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '40px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px',
                margin: '0 auto 24px'
              }}>
                💎
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
                Our Values
              </h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                Trust, Excellence, Innovation, and Care. We build lasting relationships by delivering exceptional results while genuinely caring about your business success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Detail */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
              What Drives Us
            </h2>
            <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
              Our core values shape every interaction and guide our approach to cloud consulting
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(37, 99, 235, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  marginRight: '16px'
                }}>
                  🤝
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b' }}>Trust & Transparency</h3>
              </div>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                We build relationships on honesty and open communication. No hidden costs, no surprises - just clear, transparent guidance every step of the way.
              </p>
            </div>

            <div style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(245, 158, 11, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  marginRight: '16px'
                }}>
                  🏆
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b' }}>Excellence in Delivery</h3>
              </div>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                We&rsquo;re committed to delivering exceptional results. Every project is an opportunity to exceed expectations and create lasting value for your business.
              </p>
            </div>

            <div style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  marginRight: '16px'
                }}>
                  🚀
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b' }}>Innovation & Growth</h3>
              </div>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                We stay ahead of cloud trends and technologies, ensuring your business benefits from the latest innovations and best practices in cloud computing.
              </p>
            </div>

            <div style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(139, 92, 246, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  marginRight: '16px'
                }}>
                  ❤️
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b' }}>Genuine Care</h3>
              </div>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                Your success is our success. We genuinely care about your business outcomes and work as an extension of your team to achieve your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
              Why Businesses Choose Cloud Nestle
            </h2>
            <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
              We&rsquo;re more than consultants - we&rsquo;re your partners in cloud success
            </p>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gap: '24px' }}>
              <div style={{
                background: '#ffffff',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{ fontSize: '32px', marginRight: '20px' }}>🏠</div>
                <div>
                  <h4 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                    We Help You Find Your Cloud Home
                  </h4>
                  <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                    Not just migration - we create the perfect cloud environment where your business feels secure and can thrive.
                  </p>
                </div>
              </div>

              <div style={{
                background: '#ffffff',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{ fontSize: '32px', marginRight: '20px' }}>🛡️</div>
                <div>
                  <h4 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                    Security & Compliance First
                  </h4>
                  <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                    Your data and applications are protected with enterprise-grade security and compliance standards.
                  </p>
                </div>
              </div>

              <div style={{
                background: '#ffffff',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{ fontSize: '32px', marginRight: '20px' }}>💰</div>
                <div>
                  <h4 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                    Cost-Effective Solutions
                  </h4>
                  <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                    We optimize your cloud spend while maximizing performance, typically reducing costs by 30-40%.
                  </p>
                </div>
              </div>

              <div style={{
                background: '#ffffff',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{ fontSize: '32px', marginRight: '20px' }}>🎯</div>
                <div>
                  <h4 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                    Tailored to Your Business
                  </h4>
                  <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                    Every solution is customized to your specific needs, industry requirements, and growth objectives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#1e293b', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '16px' }}>
            Ready to Find Your Cloud Home?
          </h2>
          <p style={{ fontSize: '18px', color: '#cbd5e1', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Let&rsquo;s discuss how Cloud Nestle can help your business settle into the perfect cloud environment.
          </p>
          <button style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
            color: 'white',
            padding: '16px 32px',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '18px',
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
