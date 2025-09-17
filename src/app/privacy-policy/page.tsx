import Layout from '@/components/layout/Layout';

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <div style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', textAlign: 'center' }}>
            Privacy Policy
          </h1>
          
          <div style={{ fontSize: '16px', lineHeight: '1.6', color: '#64748b' }}>
            <p style={{ marginBottom: '24px' }}>
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b', marginBottom: '16px', marginTop: '32px' }}>
              Information We Collect
            </h2>
            <p style={{ marginBottom: '16px' }}>
              We collect information you provide directly to us, such as when you contact us for consulting services, 
              subscribe to our newsletter, or fill out a form on our website.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b', marginBottom: '16px', marginTop: '32px' }}>
              How We Use Your Information
            </h2>
            <p style={{ marginBottom: '16px' }}>
              We use the information we collect to provide, maintain, and improve our cloud consulting services, 
              communicate with you, and comply with legal obligations.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b', marginBottom: '16px', marginTop: '32px' }}>
              Information Sharing
            </h2>
            <p style={{ marginBottom: '16px' }}>
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
              except as described in this privacy policy.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b', marginBottom: '16px', marginTop: '32px' }}>
              Data Security
            </h2>
            <p style={{ marginBottom: '16px' }}>
              We implement appropriate security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b', marginBottom: '16px', marginTop: '32px' }}>
              Contact Us
            </h2>
            <p style={{ marginBottom: '16px' }}>
              If you have any questions about this Privacy Policy, please contact us at privacy@cloudnestle.com
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
