import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section - Professional AWS Partner Style */}
      <section className="section-hero">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-hero mb-6">
              Cloud Nestle Consulting & Services
            </h1>
            <p className="text-body-large mb-8 max-w-3xl mx-auto text-gray-200">
              Professional AWS expertise for businesses of all sizes. 
              Cost-effective cloud migration and optimization services that scale with your business.
            </p>
            <button className="btn-accent">
              Get Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Services Overview - Professional Cards */}
      <section className="section-services">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-heading mb-4">Our Services</h2>
            <p className="text-body-large max-w-2xl mx-auto">
              Comprehensive AWS solutions designed to accelerate your digital transformation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-professional animate-slide-in-right" style={{animationDelay: '0.1s'}}>
              <div className="p-8">
                <div className="icon-wrapper blue">
                  ☁
                </div>
                <h3 className="text-subheading mb-4">Cloud Migration</h3>
                <p className="text-body-large mb-6">
                  Seamless migration of your infrastructure to AWS with minimal downtime and maximum efficiency.
                </p>
                <Link href="/services/cloud-migration" className="btn-secondary">
                  Learn More →
                </Link>
              </div>
            </div>
            
            <div className="card-professional animate-slide-in-right" style={{animationDelay: '0.2s'}}>
              <div className="p-8">
                <div className="icon-wrapper orange">
                  $
                </div>
                <h3 className="text-subheading mb-4">Cost Optimization</h3>
                <p className="text-body-large mb-6">
                  Reduce your AWS costs by up to 40% with our proven optimization strategies and best practices.
                </p>
                <Link href="/services/cost-optimization" className="btn-secondary">
                  Learn More →
                </Link>
              </div>
            </div>
            
            <div className="card-professional animate-slide-in-right" style={{animationDelay: '0.3s'}}>
              <div className="p-8">
                <div className="icon-wrapper green">
                  🔒
                </div>
                <h3 className="text-subheading mb-4">Security & Compliance</h3>
                <p className="text-body-large mb-6">
                  Ensure your cloud infrastructure meets industry standards and regulatory requirements.
                </p>
                <Link href="/services/security-compliance" className="btn-secondary">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators - Professional Style */}
      <section className="section-trust">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-heading mb-8">Trusted by Businesses Worldwide</h2>
          <div className="flex justify-center items-center space-x-8 mb-8 flex-wrap gap-4">
            <div className="card-professional px-6 py-4 animate-pulse-subtle">
              <span className="font-medium text-gray-700">AWS Partner</span>
            </div>
            <div className="card-professional px-6 py-4 animate-pulse-subtle" style={{animationDelay: '0.5s'}}>
              <span className="font-medium text-gray-700">ISO 27001 Certified</span>
            </div>
            <div className="card-professional px-6 py-4 animate-pulse-subtle" style={{animationDelay: '1s'}}>
              <span className="font-medium text-gray-700">SOC 2 Compliant</span>
            </div>
          </div>
          <button className="btn-primary">
            Schedule Free Consultation
          </button>
        </div>
      </section>
    </Layout>
  );
}
