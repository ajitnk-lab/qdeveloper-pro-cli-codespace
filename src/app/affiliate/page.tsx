'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { validateName, validateEmail, validatePhone, validateCompany, validateMessage } from '@/lib/validation';

export default function AffiliatePage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    businessNiche: '',
    promotionMethods: '',
    platformLinks: '',
    experience: '',
    additionalInfo: '',
    agreeToTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
    
    if (!formData.businessNiche.trim()) newErrors.businessNiche = 'Business niche is required';
    if (!formData.promotionMethods.trim()) newErrors.promotionMethods = 'Promotion methods are required';
    if (!formData.experience.trim()) newErrors.experience = 'Experience level is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _subject: `Affiliate Application from ${formData.name}`,
          formType: 'Affiliate Application'
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '', company: '', email: '', phone: '', businessNiche: '',
          promotionMethods: '', platformLinks: '', experience: '', additionalInfo: '', agreeToTerms: false
        });
      } else {
        alert('There was an error sending your application. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error sending your application. Please try again.');
    }
  };

  return (
    <Layout>
      <div style={{ padding: '40px 0' }}>
        <div className="container">
          {/* Hero Section */}
          <section style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
              Join Our Affiliate Program
            </h1>
            <p style={{ fontSize: '14px', color: '#64748b', maxWidth: '800px', margin: '0 auto 32px' }}>
              Partner with Cloud Nestle and earn recurring commissions by referring clients to our AWS consulting services.
            </p>
            <div style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '20px',
              fontWeight: '600',
              display: 'inline-block',
              marginBottom: '40px'
            }}>
              🚀 Earn up to 20% recurring commissions with 180-day cookie window
            </div>
          </section>

          {/* Program Overview */}
          <section style={{ marginBottom: '60px' }}>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>
                  Why Join Our Program?
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ color: '#10b981', fontSize: '20px' }}>💰</span>
                    <div>
                      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>
                        High Commission Rates
                      </h3>
                      <p style={{ color: '#64748b', fontSize: '14px' }}>
                        Earn 15-20% recurring commissions on all referred clients for the lifetime of their engagement.
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ color: '#10b981', fontSize: '20px' }}>⏰</span>
                    <div>
                      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>
                        180-Day Cookie Window
                      </h3>
                      <p style={{ color: '#64748b', fontSize: '14px' }}>
                        Extended tracking period to account for long B2B sales cycles and decision-making processes.
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ color: '#10b981', fontSize: '20px' }}>🎯</span>
                    <div>
                      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>
                        Premium Service Portfolio
                      </h3>
                      <p style={{ color: '#64748b', fontSize: '14px' }}>
                        Promote high-value AWS consulting services with average project values of $50K-$500K+.
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ color: '#10b981', fontSize: '20px' }}>📊</span>
                    <div>
                      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>
                        Real-Time Tracking
                      </h3>
                      <p style={{ color: '#64748b', fontSize: '14px' }}>
                        Access to dedicated partner portal with real-time analytics and commission tracking.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>
                  How It Works
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '20px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <div style={{
                        background: '#2563eb',
                        color: 'white',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>1</div>
                      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>Apply & Get Approved</h3>
                    </div>
                    <p style={{ color: '#64748b', fontSize: '14px' }}>
                      Submit your application and get approved within 48 hours.
                    </p>
                  </div>
                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '20px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <div style={{
                        background: '#2563eb',
                        color: 'white',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>2</div>
                      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>Promote Our Services</h3>
                    </div>
                    <p style={{ color: '#64748b', fontSize: '14px' }}>
                      Use your unique referral links and marketing materials to promote our AWS consulting services.
                    </p>
                  </div>
                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '20px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <div style={{
                        background: '#2563eb',
                        color: 'white',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>3</div>
                      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>Earn Commissions</h3>
                    </div>
                    <p style={{ color: '#64748b', fontSize: '14px' }}>
                      Receive monthly payments for all successful referrals with lifetime recurring commissions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Application Form */}
          <section style={{ marginBottom: '60px' }}>
            <div className="grid md:grid-cols-2 gap-8">
              {isSubmitted ? (
                <div style={{
                  background: '#ffffff',
                  border: '2px solid #10b981',
                  borderRadius: '16px',
                  padding: '40px',
                  textAlign: 'center',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  gridColumn: 'span 2'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
                  <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                    Application Submitted!
                  </h2>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
                    Thank you for your interest in our affiliate program. We&apos;ll review your application and get back to you within 48 hours.
                  </p>
                  <div style={{
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: '8px',
                    padding: '16px',
                    color: '#166534'
                  }}>
                    <strong>Next Steps: Check your email for program details and onboarding information.</strong>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                  }}>
                    <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                      Apply to Become a Partner
                    </h2>
                    <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
                      Fill out the form below to join our exclusive affiliate program.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                            Full Name *
                          </label>
                          <input 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                            style={{
                              width: '100%',
                              padding: '12px',
                              border: `1px solid ${errors.name ? '#ef4444' : '#d1d5db'}`,
                              borderRadius: '6px',
                              fontSize: '14px'
                            }}
                          />
                          {errors.name && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.name}</p>}
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                            Company/Business Name *
                          </label>
                          <input 
                            type="text" 
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            required
                            style={{
                              width: '100%',
                              padding: '12px',
                              border: `1px solid ${errors.company ? '#ef4444' : '#d1d5db'}`,
                              borderRadius: '6px',
                              fontSize: '14px'
                            }}
                          />
                          {errors.company && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.company}</p>}
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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
                              padding: '12px',
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
                              padding: '12px',
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
                          Business Niche/Area of Expertise *
                        </label>
                        <input 
                          type="text" 
                          value={formData.businessNiche}
                          onChange={(e) => handleInputChange('businessNiche', e.target.value)}
                          placeholder="e.g., IT Consulting, Digital Marketing, Software Development"
                          required
                          style={{
                            width: '100%',
                            padding: '12px',
                            border: `1px solid ${errors.businessNiche ? '#ef4444' : '#d1d5db'}`,
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        />
                        {errors.businessNiche && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.businessNiche}</p>}
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                          How do you plan to promote our services? *
                        </label>
                        <textarea 
                          rows={3}
                          value={formData.promotionMethods}
                          onChange={(e) => handleInputChange('promotionMethods', e.target.value)}
                          placeholder="e.g., Website content, social media, direct client referrals, email marketing, webinars"
                          required
                          style={{
                            width: '100%',
                            padding: '12px',
                            border: `1px solid ${errors.promotionMethods ? '#ef4444' : '#d1d5db'}`,
                            borderRadius: '6px',
                            fontSize: '14px',
                            resize: 'vertical'
                          }}
                        />
                        {errors.promotionMethods && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.promotionMethods}</p>}
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                          Platform Links (Website, Social Media, etc.)
                        </label>
                        <textarea 
                          rows={2}
                          value={formData.platformLinks}
                          onChange={(e) => handleInputChange('platformLinks', e.target.value)}
                          placeholder="Please provide links to your website, LinkedIn, social media profiles, or other relevant platforms"
                          style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px',
                            resize: 'vertical'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                          Experience Level *
                        </label>
                        <select 
                          value={formData.experience}
                          onChange={(e) => handleInputChange('experience', e.target.value)}
                          required
                          style={{
                            width: '100%',
                            padding: '12px',
                            border: `1px solid ${errors.experience ? '#ef4444' : '#d1d5db'}`,
                            borderRadius: '6px',
                            fontSize: '14px',
                            backgroundColor: 'white'
                          }}
                        >
                          <option value="">Select your experience level *</option>
                          <option value="New to affiliate marketing">New to affiliate marketing</option>
                          <option value="Some affiliate marketing experience">Some affiliate marketing experience</option>
                          <option value="Experienced affiliate marketer">Experienced affiliate marketer</option>
                          <option value="Expert in tech/cloud industry">Expert in tech/cloud industry</option>
                          <option value="AWS certified professional">AWS certified professional</option>
                        </select>
                        {errors.experience && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.experience}</p>}
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                          Additional Information
                        </label>
                        <textarea 
                          rows={3}
                          value={formData.additionalInfo}
                          onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                          placeholder="Tell us more about your background, audience, or why you'd be a great partner"
                          style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px',
                            resize: 'vertical'
                          }}
                        />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <input
                          type="checkbox"
                          checked={formData.agreeToTerms}
                          onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                          style={{ marginTop: '4px' }}
                        />
                        <div>
                          <label style={{ fontSize: '14px', color: '#374151', cursor: 'pointer' }}>
                            I agree to the <a href="/affiliate-terms" style={{ color: '#2563eb', textDecoration: 'underline' }}>Affiliate Terms and Conditions</a> and understand the commission structure and payment terms. *
                          </label>
                          {errors.agreeToTerms && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.agreeToTerms}</p>}
                        </div>
                      </div>

                      <button
                        onClick={handleSubmit}
                        style={{
                          background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                          color: 'white',
                          padding: '16px 32px',
                          borderRadius: '8px',
                          border: 'none',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          marginTop: '16px'
                        }}
                      >
                        Apply to Become a Partner 🚀
                      </button>
                    </div>
                  </div>

                  {/* FAQ Section */}
                  <div>
                    <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '24px' }}>
                      Frequently Asked Questions
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '16px'
                      }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                          How much can I earn?
                        </h3>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>
                          Earn 15-20% recurring commissions on all referred clients. With average project values of $50K-$500K+, top partners earn $10K-$100K+ annually.
                        </p>
                      </div>
                      <div style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '16px'
                      }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                          When do I get paid?
                        </h3>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>
                          Commissions are paid monthly via bank transfer or PayPal, 30 days after the client&apos;s payment is received.
                        </p>
                      </div>
                      <div style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '16px'
                      }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                          What marketing materials do you provide?
                        </h3>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>
                          We provide branded banners, case studies, email templates, landing pages, and detailed service information to help you promote effectively.
                        </p>
                      </div>
                      <div style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '16px'
                      }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                          Who is eligible to join?
                        </h3>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>
                          We welcome IT consultants, digital agencies, business consultants, and anyone with access to businesses that could benefit from AWS consulting services.
                        </p>
                      </div>
                    </div>

                    {/* Social Proof */}
                    <div style={{ marginTop: '32px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                        What Our Partners Say
                      </h3>
                      <div style={{
                        background: '#f0f9ff',
                        border: '1px solid #bae6fd',
                        borderRadius: '8px',
                        padding: '20px'
                      }}>
                        <p style={{ fontSize: '14px', color: '#0c4a6e', fontStyle: 'italic', marginBottom: '12px' }}>
                          &quot;Partnering with Cloud Nestle has been incredibly rewarding. Their expertise and professional service make it easy to refer clients, and the recurring commissions provide excellent passive income.&quot;
                        </p>
                        <p style={{ fontSize: '12px', color: '#0369a1', fontWeight: '600' }}>
                          - Sarah M., IT Consulting Partner
                        </p>
                      </div>
                    </div>

                    {/* Office Address */}
                    <div style={{ marginTop: '24px' }}>
                      <div style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '16px',
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
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
