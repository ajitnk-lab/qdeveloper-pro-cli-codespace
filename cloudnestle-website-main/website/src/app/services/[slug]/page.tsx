import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const servicesData = {
  'cloud-migration': {
    title: 'Cloud Migration Services',
    description: 'Seamless migration of your infrastructure to AWS with minimal downtime and maximum efficiency.',
    overview: 'Our cloud migration services help businesses transition from on-premises infrastructure to AWS cloud with minimal disruption. We provide end-to-end migration support including assessment, planning, execution, and post-migration optimization.',
    features: [
      'Comprehensive infrastructure assessment',
      'Migration strategy and roadmap development',
      'Data migration with zero data loss',
      'Application modernization and optimization',
      'Security and compliance validation',
      '24/7 support during migration'
    ],
    pricing: {
      basic: { price: 5000, features: ['Basic assessment', 'Migration plan', 'Email support'] },
      premium: { price: 15000, features: ['Full assessment', 'Managed migration', 'Application modernization', '24/7 support'] },
      enterprise: { price: 'Custom', features: ['Enterprise assessment', 'White-glove migration', 'Custom solutions', 'Dedicated team'] }
    }
  },
  'cost-optimization': {
    title: 'AWS Cost Optimization',
    description: 'Reduce your AWS costs by up to 40% with our proven optimization strategies.',
    overview: 'Our cost optimization services analyze your current AWS usage and implement strategies to reduce costs while maintaining or improving performance. We help you right-size resources, optimize storage, and implement cost-effective architectures.',
    features: [
      'Detailed cost analysis and reporting',
      'Resource right-sizing recommendations',
      'Reserved Instance and Savings Plans optimization',
      'Storage optimization strategies',
      'Automated cost monitoring and alerts',
      'Monthly cost optimization reviews'
    ],
    pricing: {
      basic: { price: 2000, features: ['Cost analysis report', 'Basic recommendations', 'Email support'] },
      premium: { price: 8000, features: ['Detailed analysis', 'Implementation support', 'Monthly reviews', 'Phone support'] },
      enterprise: { price: 'Custom', features: ['Enterprise analysis', 'Dedicated consultant', 'Custom automation', 'Weekly reviews'] }
    }
  },
  'security-compliance': {
    title: 'Security & Compliance',
    description: 'Ensure your cloud infrastructure meets industry standards and regulations.',
    overview: 'Our security and compliance services help you implement robust security measures and meet regulatory requirements. We provide comprehensive security assessments, compliance frameworks, and ongoing monitoring.',
    features: [
      'Comprehensive security audit',
      'Compliance framework implementation',
      'Identity and access management setup',
      'Security monitoring and alerting',
      'Incident response planning',
      'Regular security reviews and updates'
    ],
    pricing: {
      basic: { price: 3000, features: ['Security assessment', 'Basic recommendations', 'Email support'] },
      premium: { price: 12000, features: ['Full audit', 'Implementation support', 'Monitoring setup', '24/7 support'] },
      enterprise: { price: 'Custom', features: ['Enterprise audit', 'Custom compliance', 'Dedicated security team', 'Incident response'] }
    }
  }
};

interface ServicePageProps {
  params: { slug: string };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = servicesData[params.slug as keyof typeof servicesData];

  if (!service) {
    return (
      <Layout>
        <section className="section-hero">
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="animate-fade-in-up">
              <h1 className="text-hero mb-6">Service Not Found</h1>
              <p className="text-body-large text-gray-200">The requested service could not be found.</p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="section-hero">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-hero mb-6">{service.title}</h1>
            <p className="text-body-large mb-8 max-w-3xl mx-auto text-gray-200">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section-services">
        <div className="container mx-auto px-4">
          <div className="card-professional mb-12 animate-fade-in-up">
            <div className="p-8">
              <h2 className="text-heading mb-6">Overview</h2>
              <p className="text-body-large">{service.overview}</p>
            </div>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h2 className="text-heading mb-8 text-center">What&apos;s Included</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-center animate-slide-in-right" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="icon-wrapper green mr-4" style={{width: '32px', height: '32px', fontSize: '16px'}}>
                    ✓
                  </div>
                  <span className="text-body-large">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-12">
            <h2 className="text-heading mb-8 text-center">Pricing Plans</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(service.pricing).map(([plan, details], index) => (
                <div key={plan} className="card-professional animate-slide-in-right" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="p-8 text-center">
                    <h3 className="text-subheading mb-4 capitalize">{plan}</h3>
                    <div className="text-4xl font-bold mb-6" style={{color: 'var(--primary-blue)'}}>
                      {typeof details.price === 'number' ? `$${details.price.toLocaleString()}` : details.price}
                    </div>
                    <ul className="space-y-3 mb-8">
                      {details.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="btn-primary w-full">Get Started</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-trust">
        <div className="container mx-auto px-4 text-center">
          <div className="card-professional max-w-4xl mx-auto p-12">
            <div className="icon-wrapper orange mx-auto mb-6">
              🚀
            </div>
            <h2 className="text-heading mb-4">Ready to Get Started?</h2>
            <p className="text-body-large mb-8">
              Contact us today for a free consultation and see how we can help your business.
            </p>
            <button className="btn-accent">
              Schedule Free Consultation
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }));
}
