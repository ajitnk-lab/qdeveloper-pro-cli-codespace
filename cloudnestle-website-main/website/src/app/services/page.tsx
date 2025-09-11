import Layout from '@/components/layout/Layout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { getAllServices } from '@/lib/content';
import Image from 'next/image';

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="section-hero">
        <div className="w-full px-[10%] text-center relative z-10">
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
        <div className="w-full px-[10%]">
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service.slug} className="card-professional overflow-hidden animate-slide-in-right" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={service.image || '/images/services/default.jpg'}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className={`icon-wrapper ${service.color} mb-6`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-subheading mb-4">{service.title}</h3>
                  <p className="text-body-large mb-6">{service.description}</p>
                  
                  {service.pricing?.basic && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 text-gray-800">Starting from:</h4>
                      <div className="text-2xl font-bold" style={{color: 'var(--primary-blue)'}}>
                        {typeof service.pricing.basic.price === 'number' 
                          ? `$${service.pricing.basic.price.toLocaleString()}`
                          : service.pricing.basic.price
                        }
                      </div>
                    </div>
                  )}

                  <button className="btn-primary w-full">
                    <a href={`/services/${service.slug}`}>Learn More</a>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-trust">
        <div className="w-full px-[10%] text-center">
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
