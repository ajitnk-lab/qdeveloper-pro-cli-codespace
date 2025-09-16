import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#1f2937',
      color: 'white',
      padding: '20px 0',
      marginTop: '20px'
    }}>
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Cloud Nestle</h3>
            <p style={{ fontSize: '16px', color: '#9ca3af' }}>
              Professional AWS cloud consulting and migration services for businesses of all sizes.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Link href="/services/cloud-migration" style={{ color: '#9ca3af', fontSize: '16px' }}>Cloud Migration</Link>
              <Link href="/services/cost-optimization" style={{ color: '#9ca3af', fontSize: '16px' }}>Cost Optimization</Link>
              <Link href="/services/security-compliance" style={{ color: '#9ca3af', fontSize: '16px' }}>Security & Compliance</Link>
            </div>
          </div>
          
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Link href="/company" style={{ color: '#9ca3af', fontSize: '16px' }}>About Us</Link>
              <Link href="/blog" style={{ color: '#9ca3af', fontSize: '16px' }}>Blog</Link>
              <Link href="/contact" style={{ color: '#9ca3af', fontSize: '16px' }}>Contact</Link>
            </div>
          </div>
        </div>
        
        <div style={{ 
          borderTop: '1px solid #374151', 
          marginTop: '16px', 
          paddingTop: '12px', 
          textAlign: 'center' 
        }}>
          <p style={{ fontSize: '16px', color: '#9ca3af' }}>
            © 2025 Cloud Nestle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
