import Layout from '@/components/layout/Layout';
import { getAllConsultingServices, getConsultingService } from '@/lib/content';
import { notFound } from 'next/navigation';

interface ConsultingPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const services = getAllConsultingServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ConsultingServicePage({ params }: ConsultingPageProps) {
  const services = getAllConsultingServices();
  const service = services.find(s => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  // Get the full content
  const fullService = await getConsultingService(service.category, params.slug);
  
  if (!fullService) {
    notFound();
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-hero">
        <div className="w-full px-[10%] text-center relative z-10">
          <div className="animate-fade-in-up">
            <div className={`icon-wrapper ${fullService.color} mb-6 mx-auto`}>
              {fullService.icon}
            </div>
            <h1 className="text-hero mb-6">{fullService.title}</h1>
            <p className="text-body-large mb-8 max-w-3xl mx-auto text-gray-200">
              {fullService.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-services">
        <div className="w-full px-[10%]">
          <div className="max-w-4xl mx-auto">
            <div className="card-professional p-8 mb-12">
              <h2 className="text-heading mb-6">Overview</h2>
              <p className="text-body-large text-gray-700 leading-relaxed mb-8">
                {fullService.overview}
              </p>
              
              {fullService.deliverables && fullService.deliverables.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-subheading mb-4">Key Deliverables</h3>
                  <ul className="space-y-2">
                    {fullService.deliverables.map((deliverable, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {fullService.duration && (
                <div className="mb-8">
                  <h3 className="text-subheading mb-4">Duration</h3>
                  <p className="text-body-large text-gray-700">{fullService.duration}</p>
                </div>
              )}
            </div>

            <div className="card-professional p-8 mb-12">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: fullService.content }}
              />
            </div>

            {/* CTA Section */}
            <div className="card-professional p-12 text-center">
              <h2 className="text-heading mb-4">Ready to Get Started?</h2>
              <p className="text-body-large mb-8">
                Contact us today to discuss how we can help with your {fullService.title.toLowerCase()} needs.
              </p>
              <button className="btn-accent">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
