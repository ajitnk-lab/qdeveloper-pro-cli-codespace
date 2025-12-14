'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { validateName, validateEmail, validatePhone, validateCompany, validateMessage } from '@/lib/validation';

export default function PartnerPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    partnerType: '',
    projectDetails: ''
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
    
    const companyValidation = validateCompany(formData.company);
    if (!companyValidation.isValid) newErrors.company = companyValidation.error!;
    
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) newErrors.email = emailValidation.error!;
    
    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.isValid) newErrors.phone = phoneValidation.error!;
    
    if (!formData.partnerType) newErrors.partnerType = 'Partner type is required';
    
    const projectValidation = validateMessage(formData.projectDetails);
    if (!projectValidation.isValid) newErrors.projectDetails = projectValidation.error!;
    
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
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          partnerType: formData.partnerType,
          projectDetails: formData.projectDetails,
          _subject: `Partnership Inquiry from ${formData.company}`,
          formType: 'Partnership Inquiry'
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', company: '', email: '', phone: '', partnerType: '', projectDetails: '' });
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
              Partner with Us
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', maxWidth: '768px', margin: '0 auto' }}>
              Interested in partnering with Cloud Nestle? Let&apos;s explore opportunities to work together.
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
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤝</div>
                <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                  Thank You!
                </h2>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
                  Your partnership inquiry has been submitted successfully.
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
                  Partnership Information
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
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
                        Company *
                      </label>
                      <input 
                        type="text" 
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: `1px solid ${errors.company ? '#ef4444' : '#d1d5db'}`,
                          borderRadius: '6px',
                          fontSize: '14px'
                        }}
                      />
                      {errors.company && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.company}</p>}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
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
                        Phone Number *
                      </label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1234567890"
                        required
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: `1px solid ${errors.phone ? '#ef4444' : '#d1d5db'}`,
                          borderRadius: '6px',
                          fontSize: '14px'
                        }}
                      />
                      {errors.phone && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                      Partner Type *
                    </label>
                    <select 
                      value={formData.partnerType}
                      onChange={(e) => handleInputChange('partnerType', e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: `1px solid ${errors.partnerType ? '#ef4444' : '#d1d5db'}`,
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: 'white'
                      }}
                    >
                      <option value="">Select partner type *</option>
                      <option value="Technology Partner">Technology Partner</option>
                      <option value="Consulting Firm">Consulting Firm</option>
                      <option value="System Integrator">System Integrator</option>
                      <option value="Reseller Partner">Reseller Partner</option>
                      <option value="Training Partner">Training Partner</option>
                      <option value="Referral Partner">Referral Partner</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.partnerType && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.partnerType}</p>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                      Project Details *
                    </label>
                    <textarea 
                      rows={5}
                      value={formData.projectDetails}
                      onChange={(e) => handleInputChange('projectDetails', e.target.value)}
                      placeholder="Please describe the potential partnership opportunity, project scope, or collaboration you have in mind..."
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: `1px solid ${errors.projectDetails ? '#ef4444' : '#d1d5db'}`,
                        borderRadius: '6px',
                        fontSize: '14px',
                        resize: 'vertical'
                      }}
                    />
                    {errors.projectDetails && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.projectDetails}</p>}
                  </div>

                  <button
                    onClick={handleSubmit}
                    style={{
                      background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
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
                    Submit Partnership Inquiry
                  </button>
                </div>
              </div>
            )}

            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                Partnership Opportunities
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '16px'
                }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                    🤝 Technology Partners
                  </h3>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>
                    Integrate your solutions with our AWS expertise to deliver comprehensive cloud solutions.
                  </p>
                </div>

                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '16px'
                }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                    💼 Consulting Firms
                  </h3>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>
                    Collaborate on large-scale cloud transformation projects and share expertise.
                  </p>
                </div>

                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '16px'
                }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                    🔄 Referral Partners
                  </h3>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>
                    Join our referral network and earn commissions for successful client referrals.
                  </p>
                </div>

                <div style={{
                  background: '#f0f9ff',
                  border: '1px solid #bae6fd',
                  borderRadius: '8px',
                  padding: '16px',
                  marginTop: '16px'
                }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                    Why Partner with Cloud Nestle?
                  </h3>
                  <ul style={{ fontSize: '12px', color: '#64748b', margin: '0', paddingLeft: '16px' }}>
                    <li>AWS certified expertise and proven track record</li>
                    <li>Flexible partnership models to suit your business</li>
                    <li>Joint go-to-market opportunities</li>
                    <li>Technical support and collaboration</li>
                  </ul>
                </div>

                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '16px',
                  marginTop: '16px',
                  display: 'flex',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: '#dbeafe',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: '#2563eb',
                    flexShrink: 0
                  }}>
                    📍
                  </div>
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>
                      Registered Office
                    </h3>
                    <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.4', margin: 0 }}>
                      Ground floor, #85, 2nd Cross Road,<br />
                      Central Excise Layout, Vijay Nagar,<br />
                      Bangalore 560040, India
                    </p>
                    <p style={{ fontSize: '12px', color: '#64748b', marginTop: '8px', margin: 0 }}>
                      <strong>Sales:</strong> <a href="mailto:sales@cloudnestle.com" style={{ color: '#2563eb', textDecoration: 'none' }}>sales@cloudnestle.com</a><br />
                      <strong>Support:</strong> <a href="mailto:support@cloudnestle.com" style={{ color: '#2563eb', textDecoration: 'none' }}>support@cloudnestle.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
