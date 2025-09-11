import Layout from '@/components/layout/Layout';
import { getAllConsultingServices } from '@/lib/content';
import Image from 'next/image';
import Link from 'next/link';

export default function ConsultingPage() {
  const governanceServices = getAllConsultingServices('governance');
  const strategyServices = getAllConsultingServices('strategy');
  const assessmentServices = getAllConsultingServices('assessment');

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="section-hero">
        <div className="w-full px-[10%] text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-hero mb-6">Consulting Services</h1>
            <p className="text-body-large mb-8 max-w-3xl mx-auto text-gray-200">
              Strategic guidance and expert consulting to accelerate your cloud transformation journey.
            </p>
          </div>
        </div>
      </section>

      {/* Governance Section */}
      <section className="section-services">
        <div className="w-full px-[10%]">
          <h2 className="text-heading mb-8 text-center">Governance</h2>
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {governanceServices.map((service, index) => (
              <div key={service.slug} className="card-professional overflow-hidden">
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={service.image || '/images/consulting/default.jpg'}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-subheading mb-4">{service.title}</h3>
                  <p className="text-body-large mb-6">{service.description}</p>
                  <Link href={`/consulting/${service.slug}`} className="btn-primary">
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Strategy Section */}
          <h2 className="text-heading mb-8 text-center">Strategy</h2>
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {strategyServices.map((service, index) => (
              <div key={service.slug} className="card-professional overflow-hidden">
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={service.image || '/images/consulting/default.jpg'}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-subheading mb-4">{service.title}</h3>
                  <p className="text-body-large mb-6">{service.description}</p>
                  <Link href={`/consulting/${service.slug}`} className="btn-primary">
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Assessment Section */}
          <h2 className="text-heading mb-8 text-center">Assessment</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {assessmentServices.map((service, index) => (
              <div key={service.slug} className="card-professional overflow-hidden">
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={service.image || '/images/consulting/default.jpg'}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-subheading mb-4">{service.title}</h3>
                  <p className="text-body-large mb-6">{service.description}</p>
                  <Link href={`/consulting/${service.slug}`} className="btn-primary">
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
