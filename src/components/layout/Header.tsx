'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Consulting', href: '/consulting' },
    { name: 'Resources', href: '/resources' },
    { name: 'Company', href: '/company' },
    { name: 'Blog', href: '/blog' },
    { 
      name: 'Contact', 
      href: '/contact',
      submenu: [
        { name: 'Request Consultation', href: '/contact' },
        { name: 'General Inquiry', href: '/general-inquiry' },
        { name: 'Partner with Us', href: '/partner' }
      ]
    }
  ];

  return (
    <header style={{
      background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
      color: 'white',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '2px 0'
    }}>
      <nav style={{ paddingLeft: '0', paddingRight: '16px', maxWidth: '100%', margin: '0' }}>
        <div className="flex justify-between items-center">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', marginLeft: '0' }}>
            <img 
              src="/cloudnestle-logo.jpg" 
              alt="Cloud Nestle Logo" 
              style={{ 
                height: '64px', 
                width: 'auto',
                borderRadius: '4px'
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                if (nextElement) {
                  nextElement.style.display = 'block';
                }
              }}
            />
            <span 
              style={{ 
                fontSize: '14px', 
                fontWeight: 'bold', 
                color: 'white',
                display: 'none'
              }}
            >
              Cloud Nestle
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: 'white', 
                  textDecoration: 'none',
                  transition: 'all 0.3s ease-in-out',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.color = '#fbbf24';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.color = 'white';
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/contact">
              <button 
                style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #fbbf24 0%, #f87171 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)';
                }}
              >
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            style={{ color: 'white', background: 'none', border: 'none', fontSize: '14px' }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden" style={{ marginTop: '4px', paddingTop: '4px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                style={{ 
                  display: 'block', 
                  padding: '8px 12px', 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: 'white', 
                  textDecoration: 'none',
                  transition: 'all 0.3s ease-in-out',
                  borderRadius: '8px',
                  margin: '2px 0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.color = '#fbbf24';
                  e.currentTarget.style.paddingLeft = '16px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.paddingLeft = '12px';
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
