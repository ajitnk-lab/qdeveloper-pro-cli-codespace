import Layout from '@/components/layout/Layout';
import { getAllResources } from '@/lib/content';
import Image from 'next/image';
import Link from 'next/link';

export default function ResourcesPage() {
  const events = getAllResources('event');
  const aboutPages = getAllResources('about');
  const clientResources = getAllResources('client');

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="section-hero">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-hero mb-6">Resources</h1>
            <p className="text-body-large mb-8 max-w-3xl mx-auto text-gray-200">
              Explore our events, learn about our company, and access client resources.
            </p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      {events.length > 0 && (
        <section className="section-services">
          <div className="container mx-auto px-4">
            <h2 className="text-heading mb-8 text-center">Upcoming Events</h2>
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {events.map((event) => (
                <div key={event.slug} className="card-professional overflow-hidden">
                  <div className="relative h-48 bg-gray-200">
                    <Image
                      src={event.image || '/images/resources/default.jpg'}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                      {event.eventDate && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          {new Date(event.eventDate).toLocaleDateString()}
                        </span>
                      )}
                      {event.location && <span>{event.location}</span>}
                    </div>
                    <h3 className="text-subheading mb-4">{event.title}</h3>
                    <p className="text-body-large mb-6">{event.description}</p>
                    <Link href={`/resources/events/${event.slug}`} className="btn-primary">
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {aboutPages.length > 0 && (
        <section className="section-services">
          <div className="container mx-auto px-4">
            <h2 className="text-heading mb-8 text-center">About Us</h2>
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {aboutPages.map((page) => (
                <div key={page.slug} className="card-professional">
                  <div className="p-8">
                    <h3 className="text-subheading mb-4">{page.title}</h3>
                    <p className="text-body-large mb-6">{page.description}</p>
                    <Link href={`/resources/about/${page.slug}`} className="btn-primary">
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Client Resources */}
      {clientResources.length > 0 && (
        <section className="section-services">
          <div className="container mx-auto px-4">
            <h2 className="text-heading mb-8 text-center">Client Resources</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {clientResources.map((resource) => (
                <div key={resource.slug} className="card-professional">
                  <div className="p-8">
                    <h3 className="text-subheading mb-4">{resource.title}</h3>
                    <p className="text-body-large mb-6">{resource.description}</p>
                    <Link href={`/resources/client/${resource.slug}`} className="btn-primary">
                      Access Resource
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
