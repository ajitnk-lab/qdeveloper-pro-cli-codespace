'use client';

import { useState } from 'react';
import Link from 'next/link';
import { validateName, validateNewsletterEmail } from '@/lib/validation';

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
    
    const emailValidation = validateNewsletterEmail(newsletterData.email);
    if (!emailValidation.isValid) newErrors.email = emailValidation.error!;
    
    setNewsletterErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('https://vapoy8mxs6.execute-api.us-east-1.amazonaws.com/prod/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: newsletterData.name,
            email: newsletterData.email,
          }),
        });

        if (response.ok) {
          setIsSubscribed(true);
          setNewsletterData({ name: '', email: '' });
        } else {
          alert('Subscription failed. Please try again.');
        }
      } catch (error) {
        console.error('Newsletter subscription error:', error);
        alert('An error occurred. Please try again.');
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
              <div style={{ marginBottom: '6px' }}>
                <p style={{ fontWeight: '700', marginBottom: '2px', fontSize: '10px' }}>🇺🇸 US Sales & Support</p>
                <p style={{ margin: 0, fontSize: '10px' }}>
                  <a href="tel:+13465765655" style={{ color: '#60a5fa', textDecoration: 'none', display: 'block', fontSize: '10px' }}>
                    +1 (346) 576-5655
                  </a>
                  <a href="mailto:sales@cloudnestle.com" style={{ color: '#60a5fa', textDecoration: 'none', display: 'block', fontSize: '10px' }}>
                    sales@cloudnestle.com
                  </a>
                </p>
              </div>
              
              <div style={{ marginBottom: '6px' }}>
                <p style={{ fontWeight: '700', marginBottom: '2px', fontSize: '10px' }}>📍 Global Headquarters</p>
                <p style={{ margin: 0, fontSize: '10px' }}>
                  <a href="https://wa.me/919591040061" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#25D366"/>
                    </svg>
                    +91 95910 40061
                  </a>
                </p>
                <p style={{ margin: 0, fontSize: '10px', marginTop: '2px' }}>
                  Ground floor, #85, 2nd Cross Road,<br />
                  Central Excise Layout, Vijay Nagar,<br />
                  Bangalore 560040, India
                </p>
                <p style={{ margin: 0, fontSize: '10px', marginTop: '2px' }}>
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
        
        {/* Social Media - Horizontal Row */}
        <div style={{ 
          borderTop: '1px solid #374151',
          borderBottom: '1px solid #374151',
          marginTop: '12px',
          paddingTop: '12px',
          paddingBottom: '12px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '24px',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>Follow Us:</span>
          
          <a 
            href="https://linkedin.com/company/cloudnestle" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="4" fill="#0077B5"/>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" fill="white"/>
            </svg>
          </a>

          <a 
            href="https://www.facebook.com/cloudnestleconsultingandservices" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="4" fill="#1877F2"/>
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="white"/>
            </svg>
          </a>

          <a 
            href="https://www.instagram.com/cloudnestle/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="6" fill="url(#instagram-gradient)"/>
              <defs>
                <radialGradient id="instagram-gradient" cx="30%" cy="107%" r="150%">
                  <stop offset="0%" stopColor="#FDF497"/>
                  <stop offset="5%" stopColor="#FDF497"/>
                  <stop offset="45%" stopColor="#FD5949"/>
                  <stop offset="60%" stopColor="#D6249F"/>
                  <stop offset="90%" stopColor="#285AEB"/>
                </radialGradient>
              </defs>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="white"/>
            </svg>
          </a>

          <a 
            href="https://www.youtube.com/@cloudnestle" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="4" fill="#FF0000"/>
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="white"/>
            </svg>
          </a>
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
