import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { getService, getAllServices } from '@/lib/content';
import { notFound } from 'next/navigation';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = await getService(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-hero">
        <div className="w-full px-[10%] text-center relative z-10">
          <div className="animate-fade-in-up">
            <div className={`icon-wrapper ${service.color} mb-6 mx-auto`}>
              {service.icon}
            </div>
            <h1 className="text-hero mb-6">{service.title}</h1>
            <p className="text-body-large mb-8 w-full text-gray-200">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section-services">
        <div className="w-full px-[10%]">
          <div className="w-full">
            <div className="card-professional p-8 mb-12">
              <h2 className="text-heading mb-6">Overview</h2>
              <p className="text-body-large text-gray-700 leading-relaxed">
                {service.overview}
              </p>
            </div>

            {/* Content Section */}
            <div className="card-professional p-8 mb-12">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: service.content }}
              />
            </div>

            {/* Pricing Section */}
            {service.pricing && (
              <div className="mb-12">
                <h2 className="text-heading mb-8 text-center">Pricing Plans</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {Object.entries(service.pricing).map(([tier, plan]) => (
                    <div key={tier} className="card-professional p-8 text-center">
                      <h3 className="text-subheading mb-4">{plan.name}</h3>
                      <div className="text-3xl font-bold mb-6" style={{color: 'var(--primary-blue)'}}>
                        {typeof plan.price === 'number' 
                          ? `$${plan.price.toLocaleString()}`
                          : plan.price
                        }
                      </div>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button className="btn-primary w-full">
                        Get Started
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="card-professional p-12 text-center">
              <h2 className="text-heading mb-4">Ready to Get Started?</h2>
              <p className="text-body-large mb-8">
                Contact us today for a free consultation and see how we can help your business.
              </p>
              <button className="btn-accent">
                Schedule Free Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
