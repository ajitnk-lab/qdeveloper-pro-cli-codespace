import Layout from '@/components/layout/Layout';

export default function TermsOfUsePage() {
  return (
    <Layout>
      <div style={{ padding: '40px 0', backgroundColor: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', textAlign: 'center' }}>
            Terms of Use
          </h1>
          
          <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#64748b' }}>
            <p style={{ marginBottom: '24px' }}>
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '16px', marginTop: '32px' }}>
              Acceptance of Terms
            </h2>
            <p style={{ marginBottom: '16px' }}>
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '16px', marginTop: '32px' }}>
              Services
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Cloud Nestle provides AWS cloud consulting, migration, and optimization services. All services are subject 
              to separate service agreements and terms.
            </p>

            <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '16px', marginTop: '32px' }}>
              Intellectual Property
            </h2>
            <p style={{ marginBottom: '16px' }}>
              The content, organization, graphics, design, and other matters related to this website are protected under 
              applicable copyrights and other proprietary laws.
            </p>

            <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '16px', marginTop: '32px' }}>
              Limitation of Liability
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Cloud Nestle shall not be liable for any direct, indirect, incidental, special, or consequential damages 
              resulting from the use or inability to use our services.
            </p>

            <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '16px', marginTop: '32px' }}>
              Contact Information
            </h2>
            <p style={{ marginBottom: '16px' }}>
              For questions regarding these Terms of Use, please contact us at legal@cloudnestle.com
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
