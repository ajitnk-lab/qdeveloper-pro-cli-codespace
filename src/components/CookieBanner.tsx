'use client';
import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showManage, setShowManage] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookiePreferences', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true
    }));
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem('cookieConsent', 'necessary');
    localStorage.setItem('cookiePreferences', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false
    }));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#1f2937',
      color: 'white',
      padding: '20px',
      zIndex: 1000,
      borderTop: '1px solid #374151',
      boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {!showManage ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <p style={{ fontSize: '14px', margin: '0 0 8px 0', fontWeight: '600' }}>
                🍪 We value your privacy
              </p>
              <p style={{ fontSize: '13px', margin: 0, color: '#d1d5db', lineHeight: '1.4' }}>
                We use cookies to enhance your experience, analyze site traffic, and personalize content. 
                You can manage your preferences or accept all cookies.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowManage(true)}
                style={{
                  backgroundColor: 'transparent',
                  color: '#9ca3af',
                  padding: '8px 16px',
                  border: '1px solid #4b5563',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#374151';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#9ca3af';
                }}
              >
                Manage
              </button>
              <button
                onClick={acceptNecessary}
                style={{
                  backgroundColor: '#4b5563',
                  color: 'white',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#6b7280';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#4b5563';
                }}
              >
                Necessary Only
              </button>
              <button
                onClick={acceptAll}
                style={{
                  backgroundColor: '#2563eb',
                  color: 'white',
                  padding: '8px 20px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1d4ed8';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', margin: '0 0 8px 0', fontWeight: '600' }}>
                Cookie Preferences
              </h3>
              <p style={{ fontSize: '13px', margin: 0, color: '#d1d5db' }}>
                Choose which cookies you want to accept:
              </p>
            </div>
            <div style={{ display: 'grid', gap: '12px', marginBottom: '20px' }}>
              <div style={{ padding: '12px', backgroundColor: '#374151', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '13px' }}>Necessary Cookies</strong>
                    <p style={{ fontSize: '12px', color: '#d1d5db', margin: '4px 0 0 0' }}>
                      Required for basic site functionality
                    </p>
                  </div>
                  <span style={{ color: '#10b981', fontSize: '12px', fontWeight: '600' }}>Always On</span>
                </div>
              </div>
              <div style={{ padding: '12px', backgroundColor: '#374151', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '13px' }}>Analytics Cookies</strong>
                    <p style={{ fontSize: '12px', color: '#d1d5db', margin: '4px 0 0 0' }}>
                      Help us understand how visitors use our site
                    </p>
                  </div>
                  <span style={{ color: '#f59e0b', fontSize: '12px' }}>Optional</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowManage(false)}
                style={{
                  backgroundColor: 'transparent',
                  color: '#9ca3af',
                  padding: '8px 16px',
                  border: '1px solid #4b5563',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                Back
              </button>
              <button
                onClick={acceptNecessary}
                style={{
                  backgroundColor: '#4b5563',
                  color: 'white',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
