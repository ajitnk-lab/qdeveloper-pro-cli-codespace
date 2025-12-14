'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { validateName, validateEmail, validateMessage } from '@/lib/validation';

export default function GeneralInquiryPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    const nameValidation = validateName(formData.name);
    if (!nameValidation.isValid) newErrors.name = nameValidation.error!;
    
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) newErrors.email = emailValidation.error!;
    
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    
    const messageValidation = validateMessage(formData.message);
    if (!messageValidation.isValid) newErrors.message = messageValidation.error!;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    try {
      const response = await fetch('https://formspree.io/f/xeolbraj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `General Inquiry: ${formData.subject}`,
          formType: 'General Inquiry'
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert('There was an error sending your message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error sending your message. Please try again.');
    }
  };

  return (
    <Layout>
      <div style={{ padding: '40px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
              General Inquiry
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', maxWidth: '768px', margin: '0 auto' }}>
              Have a question or need more information? We&apos;re here to help.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {isSubmitted ? (
              <div style={{
                background: '#ffffff',
                border: '2px solid #10b981',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                  Thank You!
                </h2>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
                  Your inquiry has been submitted successfully.
                </p>
                <div style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '8px',
                  padding: '16px',
                  color: '#166534'
                }}>
                  <strong>We&apos;ll get back to you within one business day</strong>
                </div>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginTop: '24px'
                  }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                  Send us a message
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                      Name *
                    </label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: `1px solid ${errors.name ? '#ef4444' : '#d1d5db'}`,
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                    {errors.name && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.name}</p>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: `1px solid ${errors.email ? '#ef4444' : '#d1d5db'}`,
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                    {errors.email && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.email}</p>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                      Subject *
                    </label>
                    <input 
                      type="text" 
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="What&apos;s your inquiry about?"
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: `1px solid ${errors.subject ? '#ef4444' : '#d1d5db'}`,
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                    {errors.subject && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.subject}</p>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                      Message *
                    </label>
                    <textarea 
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us more about your question or inquiry..."
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: `1px solid ${errors.message ? '#ef4444' : '#d1d5db'}`,
                        borderRadius: '6px',
                        fontSize: '14px',
                        resize: 'vertical'
                      }}
                    />
                    {errors.message && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.message}</p>}
                  </div>

                  <button
                    onClick={handleSubmit}
                    style={{
                      background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                      color: 'white',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      marginTop: '8px'
                    }}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            )}

            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                Get in touch
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(37, 99, 235, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: '#2563eb'
                  }}>
                    📍
                  </div>
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '2px' }}>
                      Registered Office
                    </h3>
                    <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>
                      <strong>📍 Registered Office:</strong><br />
                      Ground floor, #85, 2nd Cross Road,<br />
                      Central Excise Layout, Vijay Nagar,<br />
                      Bangalore 560040, India
                    </p>
                    <p style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
                      <strong>📧 Contact:</strong><br />
                      <strong>Sales:</strong> <a href="mailto:sales@cloudnestle.com" style={{ color: '#2563eb', textDecoration: 'none' }}>sales@cloudnestle.com</a><br />
                      <strong>Support:</strong> <a href="mailto:support@cloudnestle.com" style={{ color: '#2563eb', textDecoration: 'none' }}>support@cloudnestle.com</a>
                    </p>
                  </div>
                </div>

                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '16px',
                  marginTop: '16px'
                }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                    Need immediate assistance?
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
                    For urgent technical support or sales inquiries, use our detailed consultation form.
                  </p>
                  <a 
                    href="/contact"
                    style={{
                      color: '#2563eb',
                      textDecoration: 'none',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    Request Consultation →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
