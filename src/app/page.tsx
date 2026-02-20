"use client";

import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import StickerTape from '@/components/StickerTape';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: 'white',
        padding: '30px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{
            fontSize: '14px',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '12px'
          }}>
            CloudNestle
          </h1>
          <p style={{
            fontSize: '14px',
            lineHeight: '1.3',
            color: '#f1f5f9',
            marginBottom: '8px',
            fontWeight: '600',
            background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '2px solid rgba(245, 158, 11, 0.3)',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            display: 'inline-block'
          }}>
            &ldquo;Where Your Business Finds Its Cloud Home&rdquo;
          </p>
          <StickerTape />
          <Link href="/contact">
            <button style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer'
            }}>
              Get Free Consultation ✨
            </button>
          </Link>
        </div>
      </section>

      {/* Marketplace Announcement Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
        padding: '24px 0',
        borderTop: '4px solid #f59e0b',
        borderBottom: '4px solid #f59e0b'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255, 255, 255, 0.2)', padding: '4px 12px', borderRadius: '20px', marginBottom: '12px' }}>
            <span style={{ color: '#fef3c7', fontSize: '12px', fontWeight: '700' }}>🎉 NEW LAUNCH</span>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'white', marginBottom: '12px' }}>
            Discover CloudNestle Marketplace
          </h2>
          <p style={{ fontSize: '16px', color: '#e0e7ff', marginBottom: '20px', maxWidth: '700px', margin: '0 auto 20px' }}>
            Browse, compare, and deploy pre-built cloud solutions, tools, and services from verified providers
          </p>
          <a href="https://marketplace.cloudnestle.com/register?utm_source=website&utm_medium=referral&utm_campaign=homepage-cta&utm_content=explore-marketplace-button" target="_blank" rel="noopener noreferrer">
            <button style={{
              background: 'white',
              color: '#7c3aed',
              padding: '14px 32px',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Explore Marketplace →
            </button>
          </a>
        </div>
      </section>

      {/* Services Overview */}
      <section style={{ padding: '40px 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
              Our Services
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', maxWidth: '512px', margin: '0 auto' }}>
              Comprehensive AWS solutions designed to accelerate your digital transformation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/services/cloud-migration" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div 
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '12px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  marginBottom: '20px',
                  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
                  color: '#2563eb'
                }}>
                  ☁️
                </div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                  Cloud Migration
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
                  Seamless migration of your infrastructure to AWS with minimal downtime and maximum efficiency.
                </p>
              </div>
            </Link>
            
            <Link href="/services/cost-optimization" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div 
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '12px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  marginBottom: '20px',
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%)',
                  color: '#f59e0b'
                }}>
                  💰
                </div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                  Cost Optimization
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
                  Reduce your AWS costs by up to 40% with our proven optimization strategies and best practices.
                </p>
              </div>
            </Link>
            
            <Link href="/services/security-compliance" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div 
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '12px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  marginBottom: '20px',
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)',
                  color: '#10b981'
                }}>
                  🔒
                </div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                  Security & Compliance
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
                  Ensure your cloud infrastructure meets industry standards and regulatory requirements.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Marketplace Feature Section */}
      <section style={{ padding: '60px 0', background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)', padding: '6px 16px', borderRadius: '20px', marginBottom: '16px' }}>
              <span style={{ color: 'white', fontSize: '12px', fontWeight: '700' }}>🛒 MARKETPLACE</span>
            </div>
            <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>
              CloudNestle Marketplace
            </h2>
            <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '700px', margin: '0 auto' }}>
              Your one-stop shop for cloud solutions, tools, and services. Deploy production-ready solutions in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8" style={{ marginBottom: '40px' }}>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '2px solid #e0e7ff'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚀</div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>
                Ready-to-Deploy Solutions
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
                Pre-configured cloud architectures, applications, and infrastructure templates tested and optimized for AWS
              </p>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '2px solid #fef3c7'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>
                Verified Providers
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
                All solutions from trusted, vetted providers with proven track records and customer reviews
              </p>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '2px solid #d1fae5'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>💡</div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>
                Flexible Pricing
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
                Compare pricing, features, and support options. Choose what fits your budget and requirements
              </p>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            borderRadius: '20px',
            padding: '40px',
            textAlign: 'center',
            color: 'white'
          }}>
            <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px' }}>
              Popular Categories in Marketplace
            </h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <span style={{ background: 'rgba(124, 58, 237, 0.3)', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', border: '1px solid rgba(124, 58, 237, 0.5)' }}>
                🔐 Security & Compliance
              </span>
              <span style={{ background: 'rgba(37, 99, 235, 0.3)', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', border: '1px solid rgba(37, 99, 235, 0.5)' }}>
                📊 Data & Analytics
              </span>
              <span style={{ background: 'rgba(245, 158, 11, 0.3)', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', border: '1px solid rgba(245, 158, 11, 0.5)' }}>
                🤖 AI & Machine Learning
              </span>
              <span style={{ background: 'rgba(16, 185, 129, 0.3)', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', border: '1px solid rgba(16, 185, 129, 0.5)' }}>
                ⚙️ DevOps Tools
              </span>
              <span style={{ background: 'rgba(239, 68, 68, 0.3)', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', border: '1px solid rgba(239, 68, 68, 0.5)' }}>
                🌐 Networking
              </span>
              <span style={{ background: 'rgba(168, 85, 247, 0.3)', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', border: '1px solid rgba(168, 85, 247, 0.5)' }}>
                💾 Storage Solutions
              </span>
            </div>
            <a href="https://marketplace.cloudnestle.com/catalog" target="_blank" rel="noopener noreferrer">
              <button style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                color: 'white',
                padding: '16px 40px',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '16px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Browse All Solutions →
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Why CloudNestle - Expertise & Credibility */}
      <section style={{ padding: '40px 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
              Why Choose CloudNestle?
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
              Proven expertise and credentials you can trust for your cloud transformation journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* AWS Certified */}
            <div 
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '12px',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                border: '2px solid #f59e0b',
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
              }}
            >
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
                AWS Certified Expert
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', marginBottom: '24px' }}>
                Certified AWS professional with validated expertise across multiple domains and specializations
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <img 
                  src="/solution architect associate.png" 
                  alt="AWS Solutions Architect Associate" 
                  style={{ width: '80px', height: 'auto', borderRadius: '6px', border: '2px solid #f59e0b' }}
                />
                <img 
                  src="/aws reg partnet.png" 
                  alt="AWS Registered Partner" 
                  style={{ width: '80px', height: 'auto', borderRadius: '6px', border: '2px solid #f59e0b' }}
                />
                <img 
                  src="/cloud economics.png" 
                  alt="AWS Cloud Economics" 
                  style={{ width: '80px', height: 'auto', borderRadius: '6px', border: '2px solid #f59e0b' }}
                />
                <img 
                  src="/well archited prof.png" 
                  alt="AWS Well-Architected Proficient" 
                  style={{ width: '80px', height: 'auto', borderRadius: '6px', border: '2px solid #f59e0b' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                  Solution Architecture
                </span>
                <span style={{ background: '#dbeafe', color: '#1e40af', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                  Cloud Economics
                </span>
                <span style={{ background: '#d1fae5', color: '#065f46', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                  Well-Architected Frameworks
                </span>
              </div>
            </div>

            {/* 20+ Years Experience */}
            <div 
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '12px',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                border: '2px solid #2563eb',
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
              }}
            >
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
                20+ Years Experience
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', marginBottom: '24px' }}>
                Two decades of enterprise IT experience across industries, from startups to Fortune 500 companies
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
                <img 
                  src="/questglobal.jfif" 
                  alt="Quest Global" 
                  style={{ height: '40px', width: 'auto', border: '2px solid #2563eb', borderRadius: '6px', padding: '4px' }}
                />
                <img 
                  src="/oracle.png" 
                  alt="Oracle" 
                  style={{ height: '40px', width: 'auto', border: '2px solid #2563eb', borderRadius: '6px', padding: '4px' }}
                />
                <img 
                  src="/sap.jfif" 
                  alt="SAP" 
                  style={{ height: '40px', width: 'auto', border: '2px solid #2563eb', borderRadius: '6px', padding: '4px' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ background: '#dbeafe', color: '#1e40af', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                  Enterprise IT
                </span>
                <span style={{ background: '#dbeafe', color: '#1e40af', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                  IT Modernization
                </span>
                <span style={{ background: '#dbeafe', color: '#1e40af', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                  DevSecOps
                </span>
              </div>
            </div>

            {/* Proven Results */}
            <div 
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '12px',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                border: '2px solid #10b981',
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
              }}
            >
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
                Proven Methodology
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', marginBottom: '24px' }}>
                Battle-tested frameworks for secure, cost-effective cloud transformations with minimal downtime
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
                <img 
                  src="/wellarchitecedframework.jfif" 
                  alt="AWS Well-Architected Framework" 
                  style={{ height: '50px', width: 'auto', borderRadius: '8px', border: '2px solid #10b981' }}
                />
                <img 
                  src="/cloudadoptionframework.png" 
                  alt="Cloud Adoption Framework" 
                  style={{ height: '50px', width: 'auto', borderRadius: '8px', border: '2px solid #10b981' }}
                />
                <img 
                  src="/secuitymodel.jfif" 
                  alt="Security Maturity Model" 
                  style={{ height: '50px', width: 'auto', borderRadius: '8px', border: '2px solid #10b981' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                  Well-Architected Framework
                </span>
                <span style={{ background: '#dbeafe', color: '#1e40af', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                  Cloud Adoption Framework
                </span>
                <span style={{ background: '#d1fae5', color: '#065f46', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                  Security Maturity Model Framework
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section style={{ padding: '30px 0', backgroundColor: '#ffffff' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#1e293b', marginBottom: '32px' }}>
            Trusted by Businesses Worldwide
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '32px', flexWrap: 'wrap' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '16px 24px'
            }}>
              <span style={{ fontWeight: '600', color: '#1e293b', fontSize: '14px' }}>🏆 AWS Registered Partner</span>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '16px 24px'
            }}>
              <span style={{ fontWeight: '600', color: '#1e293b', fontSize: '14px' }}>📊 20+ Years Enterprise Experience</span>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '16px 24px'
            }}>
              <span style={{ fontWeight: '600', color: '#1e293b', fontSize: '14px' }}>🎯 100% Client Success Rate</span>
            </div>
          </div>
          <Link href="/contact">
            <button style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(37, 99, 235, 0.25)'
            }}>
              Schedule Free Consultation 🚀
            </button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
