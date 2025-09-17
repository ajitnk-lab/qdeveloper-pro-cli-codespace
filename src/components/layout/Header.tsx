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
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header style={{
      background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
      color: 'white',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '4px 0'
    }}>
      <nav className="container">
        <div className="flex justify-between items-center">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <img 
              src="/cloudnestle-logo.jpg" 
              alt="Cloud Nestle Logo" 
              style={{ 
                height: '32px', 
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
                fontSize: '24px', 
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
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: 'white', 
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/contact">
              <button style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                color: 'white',
                padding: '3px 8px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '18px',
                border: 'none',
                cursor: 'pointer'
              }}>
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            style={{ color: 'white', background: 'none', border: 'none', fontSize: '24px' }}
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
                  padding: '3px 0', 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: 'white', 
                  textDecoration: 'none' 
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
