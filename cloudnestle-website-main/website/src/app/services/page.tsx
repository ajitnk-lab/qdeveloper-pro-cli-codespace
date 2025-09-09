import Layout from '@/components/layout/Layout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const services = [
  {
    slug: 'cloud-migration',
    title: 'Cloud Migration',
    description: 'Seamless migration of your infrastructure to AWS with minimal downtime and maximum efficiency.',
    features: ['Assessment & Planning', 'Data Migration', 'Application Modernization', '24/7 Support'],
    pricing: { basic: 5000, premium: 15000, enterprise: 'Custom' }
  },
  {
    slug: 'cost-optimization',
    title: 'Cost Optimization',
    description: 'Reduce your AWS costs by up to 40% with our proven optimization strategies.',
    features: ['Cost Analysis', 'Resource Right-sizing', 'Reserved Instance Planning', 'Monitoring Setup'],
    pricing: { basic: 2000, premium: 8000, enterprise: 'Custom' }
  },
  {
    slug: 'security-compliance',
    title: 'Security & Compliance',
    description: 'Ensure your cloud infrastructure meets industry standards and regulations.',
    features: ['Security Audit', 'Compliance Framework', 'Identity Management', 'Monitoring & Alerts'],
    pricing: { basic: 3000, premium: 12000, enterprise: 'Custom' }
  }
];

export default function ServicesPage() {
  return (
    <Layout>
      {/* Hero Banner */}
      <section className="section-hero">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-hero mb-6">Our Services</h1>
            <p className="text-body-large mb-8 max-w-3xl mx-auto text-gray-200">
              Comprehensive AWS consulting services designed to help your business succeed in the cloud.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-services">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service.slug} className="card-professional animate-slide-in-right" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="p-8">
                  <div className={`icon-wrapper ${index === 0 ? 'blue' : index === 1 ? 'orange' : 'green'} mb-6`}>
                    {index === 0 ? '☁' : index === 1 ? '$' : '🔒'}
                  </div>
                  
                  <h3 className="text-subheading mb-4">{service.title}</h3>
                  <p className="text-body-large mb-6">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-gray-800">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-gray-800">Starting from:</h4>
                    <div className="text-2xl font-bold" style={{color: 'var(--primary-blue)'}}>
                      ${service.pricing.basic.toLocaleString()}
                    </div>
                  </div>

                  <button className="btn-primary w-full">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-trust">
        <div className="container mx-auto px-4 text-center">
          <div className="card-professional max-w-4xl mx-auto p-12">
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
