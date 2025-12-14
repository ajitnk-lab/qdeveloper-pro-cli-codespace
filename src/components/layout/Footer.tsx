'use client';

import { useState } from 'react';
import Link from 'next/link';
import { validateName, validateEmail } from '@/lib/validation';

export default function Footer() {
  const [newsletterData, setNewsletterData] = useState({ name: '', email: '' });
  const [newsletterErrors, setNewsletterErrors] = useState<Record<string, string>>({});
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterChange = (field: string, value: string) => {
    setNewsletterData(prev => ({ ...prev, [field]: value }));
    if (newsletterErrors[field]) {
      setNewsletterErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNewsletterSubmit = async () => {
    const newErrors: Record<string, string> = {};
    
    const nameValidation = validateName(newsletterData.name);
    if (!nameValidation.isValid) newErrors.name = nameValidation.error!;
    
    const emailValidation = validateEmail(newsletterData.email);
    if (!emailValidation.isValid) newErrors.email = emailValidation.error!;
    
    setNewsletterErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('https://formspree.io/f/xeolbraj', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: newsletterData.name,
            email: newsletterData.email,
            _subject: 'Newsletter Subscription',
            formType: 'Newsletter Subscription'
          }),
        });

        if (response.ok) {
          setIsSubscribed(true);
          setNewsletterData({ name: '', email: '' });
        }
      } catch (error) {
        console.error('Newsletter subscription error:', error);
      }
    }
  };

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      color: 'white',
      padding: '8px 0',
      marginTop: '8px',
      borderTop: '3px solid #f59e0b'
    }}>
      <div className="container">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <Link href="/company/about" style={{ color: '#9ca3af', fontSize: '12px' }}>About Us</Link>
              <Link href="/blog" style={{ color: '#9ca3af', fontSize: '12px' }}>Blog</Link>
              <Link href="/services" style={{ color: '#9ca3af', fontSize: '12px' }}>Services</Link>
              <Link href="/solutions" style={{ color: '#9ca3af', fontSize: '12px' }}>Solutions</Link>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Contact Forms</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <Link href="/contact" style={{ color: '#9ca3af', fontSize: '12px' }}>Request Consultation</Link>
              <Link href="/general-inquiry" style={{ color: '#9ca3af', fontSize: '12px' }}>General Inquiry</Link>
              <Link href="/partner" style={{ color: '#9ca3af', fontSize: '12px' }}>Partner with Us</Link>
              <Link href="/affiliate" style={{ color: '#9ca3af', fontSize: '12px' }}>Affiliate Program</Link>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Newsletter</h4>
            {isSubscribed ? (
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid #10b981',
                borderRadius: '6px',
                padding: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '12px', marginBottom: '2px' }}>✅</div>
                <p style={{ fontSize: '10px', color: '#10b981', margin: '0', fontWeight: '600' }}>
                  Subscribed!
                </p>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '6px' }}>
                  Stay updated.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <input
                    type="text"
                    placeholder="Name"
                    value={newsletterData.name}
                    onChange={(e) => handleNewsletterChange('name', e.target.value)}
                    style={{
                      padding: '4px 6px',
                      borderRadius: '3px',
                      border: `1px solid ${newsletterErrors.name ? '#ef4444' : '#374151'}`,
                      fontSize: '10px',
                      background: '#374151',
                      color: 'white'
                    }}
                  />
                  {newsletterErrors.name && <p style={{ color: '#ef4444', fontSize: '8px', margin: '0' }}>{newsletterErrors.name}</p>}
                  
                  <input
                    type="email"
                    placeholder="Email"
                    value={newsletterData.email}
                    onChange={(e) => handleNewsletterChange('email', e.target.value)}
                    style={{
                      padding: '4px 6px',
                      borderRadius: '3px',
                      border: `1px solid ${newsletterErrors.email ? '#ef4444' : '#374151'}`,
                      fontSize: '10px',
                      background: '#374151',
                      color: 'white'
                    }}
                  />
                  {newsletterErrors.email && <p style={{ color: '#ef4444', fontSize: '8px', margin: '0' }}>{newsletterErrors.email}</p>}
                  
                  <button
                    onClick={handleNewsletterSubmit}
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '3px',
                      border: 'none',
                      fontSize: '10px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Company Info - rightmost column */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
              Company Info
            </h4>
            <div style={{ fontSize: '10px', color: '#9ca3af', lineHeight: '1.3' }}>
              <div style={{ marginBottom: '4px' }}>
                <p style={{ fontWeight: '700', marginBottom: '1px', fontSize: '10px' }}>📍 Registered Office:</p>
                <p style={{ margin: 0, fontSize: '10px' }}>
                  Ground floor, #85,<br />
                  2nd Cross Road,<br />
                  Central Excise Layout,<br />
                  Vijay Nagar,<br />
                  Bangalore 560040, India
                </p>
              </div>
              
              <div style={{ marginBottom: '4px' }}>
                <p style={{ fontWeight: '700', marginBottom: '1px', fontSize: '10px' }}>📧 Contact:</p>
                <p style={{ margin: 0, fontSize: '10px' }}>
                  <a href="mailto:sales@cloudnestle.com" style={{ color: '#60a5fa', textDecoration: 'none', display: 'block', fontSize: '10px' }}>
                    sales@cloudnestle.com
                  </a>
                  <a href="mailto:support@cloudnestle.com" style={{ color: '#60a5fa', textDecoration: 'none', display: 'block', fontSize: '10px' }}>
                    support@cloudnestle.com
                  </a>
                </p>
              </div>
              
              <div>
                <p style={{ fontWeight: '700', margin: 0, fontSize: '10px' }}>🏢 GSTIN:</p>
                <p style={{ margin: 0, fontSize: '10px' }}>29ADWPA6289Q1ZB</p>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ 
          borderTop: '1px solid #374151', 
          marginTop: '8px', 
          paddingTop: '6px', 
          textAlign: 'center' 
        }}>
          <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '0' }}>
            © 2025 CloudNestle Consulting & Services. All rights reserved. | 
            <Link href="/privacy-policy" style={{ color: '#9ca3af', textDecoration: 'none', marginLeft: '8px', marginRight: '8px' }}>
              Privacy Policy
            </Link>
            |
            <Link href="/terms-of-use" style={{ color: '#9ca3af', textDecoration: 'none', marginLeft: '8px' }}>
              Terms of Use
            </Link>
          </p>
          <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px', lineHeight: '1.4' }}>
            All trademarks, logos, and brand names are the property of their respective owners. All company, product, and service names used in this website are for identification purposes only. Use of these names, trademarks, and brands does not imply endorsement.
          </p>
        </div>
      </div>
    </footer>
  );
}
