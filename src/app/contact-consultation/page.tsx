'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { validateName, validateEmail, validatePhone, validateCompany, validateCCOE, validateMessage } from '@/lib/validation';

export default function ConsultationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    postalCode: '',
    natureOfEnquiry: '',
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
    useCase: '',
    timeline: '',
    budget: '',
    message: ''
  });

  const totalSteps = 4;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      if (field === 'country') {
        newData.state = '';
      }
      return newData;
    });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getStatesForCountry = (country: string): string[] => {
    const statesByCountry: Record<string, string[]> = {
      'United States': ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
      'Canada': ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon'],
      'India': ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'],
      'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
      'Australia': ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania', 'Australian Capital Territory', 'Northern Territory']
    };
    return statesByCountry[country] || [];
  };

  const handleMultiSelectChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = prev[field as keyof typeof prev] as string[];
      let newArray;
      
      if (field === 'ccoe') {
        newArray = checked ? [value] : [];
      } else {
        if (checked) {
          newArray = [...currentArray, value];
        } else {
          newArray = currentArray.filter(item => item !== value);
        }
      }
      
      return { ...prev, [field]: newArray };
    });
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      const nameValidation = validateName(formData.name);
      if (!nameValidation.isValid) newErrors.name = nameValidation.error!;
      
      const emailValidation = validateEmail(formData.email);
      if (!emailValidation.isValid) newErrors.email = emailValidation.error!;
      
      const phoneValidation = validatePhone(formData.phone);
      if (!phoneValidation.isValid) newErrors.phone = phoneValidation.error!;
      
      if (!formData.country) newErrors.country = 'Country is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
      if (!formData.natureOfEnquiry) newErrors.natureOfEnquiry = 'Nature of enquiry is required';
      if (!formData.role) newErrors.role = 'Role is required';
    } else if (step === 2) {
      const companyValidation = validateCompany(formData.company);
      if (!companyValidation.isValid) newErrors.company = companyValidation.error!;
      
      if (!formData.companySize) newErrors.companySize = 'Company size is required';
      if (formData.industry.length === 0) newErrors.industry = 'Please select at least one industry';
      if (formData.supportType.length === 0) newErrors.supportType = 'Please select at least one support type';
    } else if (step === 3) {
      if (formData.awsSetup.length === 0) newErrors.awsSetup = 'Please select at least one AWS setup option';
      if (formData.awsServices.length === 0) newErrors.awsServices = 'Please select at least one AWS service';
      if (formData.devopsMaturity.length === 0) newErrors.devopsMaturity = 'Please select at least one DevOps option';
      if (formData.monitoring.length === 0) newErrors.monitoring = 'Please select at least one monitoring option';
    } else if (step === 4) {
      if (!formData.useCase) newErrors.useCase = 'Use case is required';
      if (!formData.timeline) newErrors.timeline = 'Timeline is required';
      
      const ccoeValidation = validateCCOE(formData.ccoe);
      if (!ccoeValidation.isValid) newErrors.ccoe = ccoeValidation.error!;
      
      if (formData.compliance.length === 0) newErrors.compliance = 'Please select at least one compliance option';
      
      const messageValidation = validateMessage(formData.message);
      if (!messageValidation.isValid) newErrors.message = messageValidation.error!;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      return;
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
    let allValid = true;
    for (let i = 1; i <= totalSteps; i++) {
      if (!validateStep(i)) {
        allValid = false;
      }
    }
    
    if (!allValid) {
      alert('Please fix all validation errors before submitting');
      return;
    }
    
    try {
      const response = await fetch('https://formspree.io/f/xeolbraj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _subject: `Consultation Request from ${formData.name}`,
          formType: 'Consultation Request'
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '', email: '', phone: '', company: '', role: '', companySize: '', message: '',
          industry: [], supportType: [], awsSetup: [], awsServices: [], 
          devopsMaturity: [], ccoe: [], compliance: [], monitoring: [],
          useCase: '', timeline: '', budget: '', country: '', state: '', postalCode: '', natureOfEnquiry: ''
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
            <a 
              href="/contact"
              style={{ 
                color: '#2563eb', 
                fontSize: '14px', 
                textDecoration: 'none',
                marginBottom: '16px',
                display: 'inline-block'
              }}
            >
              ← Back to form selection
            </a>
            <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
              Request a Consultation
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', maxWidth: '768px', margin: '0 auto' }}>
              Ready to transform your business with Cloud Nestle? Get in touch with our cloud experts today.
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
                  Your consultation request has been submitted successfully.
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
                <a
                  href="/contact"
                  style={{
                    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginTop: '24px',
                    display: 'inline-block',
                    textDecoration: 'none'
                  }}
                >
                  Back to Contact Forms
                </a>
              </div>
            ) : (
              <>
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
                    <p style={{ color: '#64748b', fontSize: '14px', textAlign: 'center', marginTop: '100px' }}>
                      Form steps implementation would go here...
                      <br />
                      This is a simplified version for demonstration.
                    </p>
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
                        Let&apos;s Talk 🚀
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                    Get in touch
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: 'rgba(37, 99, 235, 0.1)',
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
                        <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                          <strong style={{ fontWeight: '800' }}>📍 Registered Office:</strong><br />
                          Ground floor, #85, 2nd Cross Road,<br />
                          Central Excise Layout, Vijay Nagar,<br />
                          Bangalore 560040, India
                        </p>
                        <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.6', marginTop: '12px', marginBottom: 0 }}>
                          <strong style={{ fontWeight: '800' }}>📧 Contact:</strong><br />
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
        </div>
      </div>
    </Layout>
  );
}
