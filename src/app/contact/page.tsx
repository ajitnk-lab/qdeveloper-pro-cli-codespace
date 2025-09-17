'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';

export default function ContactPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    companySize: '',
    industry: [] as string[],
    role: '',
    supportType: [] as string[],
    awsSetup: [] as string[],
    awsServices: [] as string[],
    devopsMaturity: [] as string[],
    ccoe: [] as string[],
    compliance: [] as string[],
    monitoring: [] as string[],
    message: ''
  });

  const totalSteps = 4;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelectChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = prev[field as keyof typeof prev] as string[];
      if (checked) {
        return { ...prev, [field]: [...currentArray, value] };
      } else {
        return { ...prev, [field]: currentArray.filter(item => item !== value) };
      }
    });
  };

  const nextStep = () => {
    // Validate current step before proceeding
    if (currentStep === 1) {
      if (!formData.name || !formData.email || !formData.phone || !formData.role) {
        alert('Please fill in all required fields in Step 1');
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.company || !formData.companySize || formData.industry.length === 0 || formData.supportType.length === 0) {
        alert('Please fill in all required fields in Step 2');
        return;
      }
    } else if (currentStep === 3) {
      if (formData.awsSetup.length === 0 || formData.awsServices.length === 0 || formData.devopsMaturity.length === 0 || formData.monitoring.length === 0) {
        alert('Please fill in all required fields in Step 3');
        return;
      }
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Validate final step
    if (formData.ccoe.length === 0 || formData.compliance.length === 0 || !formData.message) {
      alert('Please fill in all required fields in Step 4');
      return;
    }
    
    // Validate all fields one more time
    if (!formData.name || !formData.email || !formData.phone || !formData.company || !formData.role || !formData.companySize || !formData.message ||
        formData.industry.length === 0 || formData.supportType.length === 0 || formData.awsSetup.length === 0 || formData.awsServices.length === 0 ||
        formData.devopsMaturity.length === 0 || formData.monitoring.length === 0 || formData.ccoe.length === 0 || formData.compliance.length === 0) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      // Send to Formspree
      const response = await fetch('https://formspree.io/f/xeolbraj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          company: formData.company,
          companySize: formData.companySize,
          industry: formData.industry,
          supportType: formData.supportType,
          awsSetup: formData.awsSetup,
          awsServices: formData.awsServices,
          devopsMaturity: formData.devopsMaturity,
          monitoring: formData.monitoring,
          ccoe: formData.ccoe,
          compliance: formData.compliance,
          message: formData.message,
          _subject: `New Contact Form Submission from ${formData.name}`,
        }),
      });

      if (response.ok) {
        alert('Thank you! Your message has been sent successfully.');
        // Reset form
        setFormData({
          name: '', email: '', phone: '', company: '', role: '', companySize: '', message: '',
          industry: [], supportType: [], awsSetup: [], awsServices: [], 
          devopsMaturity: [], ccoe: [], compliance: [], monitoring: []
        });
        setCurrentStep(1);
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
              Contact Us
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', maxWidth: '768px', margin: '0 auto' }}>
              Ready to transform your business with Cloud Nestle? Get in touch with our cloud experts today.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '14px', color: '#64748b' }}>Step {currentStep} of {totalSteps}</span>
                  <span style={{ fontSize: '14px', color: '#64748b' }}>{Math.round((currentStep / totalSteps) * 100)}%</span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '6px', 
                  backgroundColor: '#e2e8f0', 
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: `${(currentStep / totalSteps) * 100}%`, 
                    height: '100%', 
                    backgroundColor: '#2563eb',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>

              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                {currentStep === 1 && 'Basic Information'}
                {currentStep === 2 && 'Company Details'}
                {currentStep === 3 && 'Technical Environment'}
                {currentStep === 4 && 'Requirements & Message'}
              </h2>

              <div style={{ minHeight: '320px' }}>
                {currentStep === 1 && (
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
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                        Email *
                      </label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                        Phone Number *
                      </label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                        Role & Technical Background *
                      </label>
                      <select 
                        value={formData.role}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                          backgroundColor: 'white'
                        }}
                      >
                        <option value="">Select your role *</option>
                        <option value="CTO">CTO</option>
                        <option value="CIO">CIO</option>
                        <option value="VP Engineering">VP Engineering</option>
                        <option value="Engineering Manager">Engineering Manager</option>
                        <option value="DevOps Engineer">DevOps Engineer</option>
                        <option value="Cloud Architect">Cloud Architect</option>
                        <option value="Finance Manager">Finance Manager</option>
                        <option value="Product Lead">Product Lead</option>
                        <option value="IT Director">IT Director</option>
                        <option value="Security Lead">Security Lead</option>
                        <option value="CEO">CEO</option>
                        <option value="Founder">Founder</option>
                        <option value="Not Applicable">Not Applicable</option>
                      </select>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                        Company Name *
                      </label>
                      <input 
                        type="text" 
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                        Company Size *
                      </label>
                      <select 
                        value={formData.companySize}
                        onChange={(e) => handleInputChange('companySize', e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                          backgroundColor: 'white'
                        }}
                      >
                        <option value="">Select company size *</option>
                        <option value="Less than 10">Less than 10 employees</option>
                        <option value="10-50">10-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="501-1000">501-1000 employees</option>
                        <option value="1001-5000">1001-5000 employees</option>
                        <option value="5000+">5000+ employees</option>
                        <option value="Not Applicable">Not Applicable</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                        Industry * (Select all that apply)
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: '#f9fafb' }}>
                        {['Manufacturing', 'Retail', 'Healthcare', 'Financial Services', 'Technology', 'Education', 'Government', 'Media & Entertainment', 'Automotive', 'Real Estate', 'Logistics', 'Energy & Utilities', 'Not Applicable'].map((option) => (
                          <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={formData.industry.includes(option)}
                              onChange={(e) => handleMultiSelectChange('industry', option, e.target.checked)}
                              style={{ margin: 0 }}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                        What kind of support are you looking for? * (Select all that apply)
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: '#f9fafb' }}>
                        {['Gen AI/ML', 'Migration & Modernization', 'Security & Compliance', 'DevOps & Automation', 'Staff Augmentation', 'Training', 'Just Exploring', 'Not Applicable'].map((option) => (
                          <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={formData.supportType.includes(option)}
                              onChange={(e) => handleMultiSelectChange('supportType', option, e.target.checked)}
                              style={{ margin: 0 }}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                        Existing AWS Setup * (Select all that apply)
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: '#f9fafb' }}>
                        {['Already on AWS', 'Using Hybrid Approach', 'Entirely On-Premises', 'Using Other Cloud Provider', 'Not Applicable'].map((option) => (
                          <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={formData.awsSetup.includes(option)}
                              onChange={(e) => handleMultiSelectChange('awsSetup', option, e.target.checked)}
                              style={{ margin: 0 }}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                        Key AWS Services in Use * (Select all that apply)
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: '#f9fafb' }}>
                        {['EC2 & S3', 'ECS', 'EKS', 'Lambda', 'RDS', 'Cognito', 'Bedrock', 'SageMaker', 'API Gateway', 'CloudFront', 'Route 53', 'VPC', 'IAM', 'Not Applicable'].map((option) => (
                          <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={formData.awsServices.includes(option)}
                              onChange={(e) => handleMultiSelectChange('awsServices', option, e.target.checked)}
                              style={{ margin: 0 }}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                        DevOps Maturity * (Select all that apply)
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: '#f9fafb' }}>
                        {['Jenkins', 'Terraform', 'AWS CDK', 'CloudFormation', 'GitHub Actions', 'GitOps', 'Docker & Kubernetes', 'Ansible', 'Not Applicable'].map((option) => (
                          <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={formData.devopsMaturity.includes(option)}
                              onChange={(e) => handleMultiSelectChange('devopsMaturity', option, e.target.checked)}
                              style={{ margin: 0 }}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                        Monitoring and Observability * (Select all that apply)
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: '#f9fafb' }}>
                        {['CloudWatch', 'Datadog', 'New Relic', 'Splunk', 'Prometheus & Grafana', 'Elastic Stack', 'Dynatrace', 'Not Applicable'].map((option) => (
                          <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={formData.monitoring.includes(option)}
                              onChange={(e) => handleMultiSelectChange('monitoring', option, e.target.checked)}
                              style={{ margin: 0 }}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                        Do you have Existing Cloud Center of Excellence (CCOE)? * (Select all that apply)
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: '#f9fafb' }}>
                        {['Yes', 'No', 'Planning to establish', 'Not Applicable'].map((option) => (
                          <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={formData.ccoe.includes(option)}
                              onChange={(e) => handleMultiSelectChange('ccoe', option, e.target.checked)}
                              style={{ margin: 0 }}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                        Compliance and Security Requirements * (Select all that apply)
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: '#f9fafb' }}>
                        {['GDPR', 'HIPAA', 'SOC 2', 'PCI DSS', 'ISO 27001', 'FedRAMP', 'Multiple Compliance Requirements', 'Not Applicable'].map((option) => (
                          <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={formData.compliance.includes(option)}
                              onChange={(e) => handleMultiSelectChange('compliance', option, e.target.checked)}
                              style={{ margin: 0 }}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                        Message *
                      </label>
                      <textarea 
                        rows={4}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us about your specific cloud transformation needs and goals..."
                        required
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                          resize: 'vertical'
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid #e2e8f0'
              }}>
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  style={{
                    background: currentStep === 1 ? '#f3f4f6' : '#6b7280',
                    color: currentStep === 1 ? '#9ca3af' : 'white',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: currentStep === 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  ← Previous
                </button>
                
                {currentStep < totalSteps ? (
                  <button
                    onClick={nextStep}
                    style={{
                      background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                      color: 'white',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    style={{
                      background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                      color: 'white',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Send Message 🚀
                  </button>
                )}
              </div>
            </div>

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
                    fontSize: '18px',
                    color: '#2563eb'
                  }}>
                    📧
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '2px' }}>
                      Email
                    </h3>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>
                      contact@cloudnestle.com
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(37, 99, 235, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    color: '#2563eb'
                  }}>
                    📍
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '2px' }}>
                      Office
                    </h3>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>
                      Bengaluru, India
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
