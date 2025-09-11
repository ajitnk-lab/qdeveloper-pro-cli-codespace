import Layout from '@/components/layout/Layout';
import { getAllCaseStudies, getAllTestimonials, getAllCareers } from '@/lib/content';
import Image from 'next/image';
import Link from 'next/link';

export default function CompanyPage() {
  const caseStudies = getAllCaseStudies().slice(0, 3);
  const testimonials = getAllTestimonials().slice(0, 3);
  const careers = getAllCareers().slice(0, 3);

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="section-hero">
        <div className="w-full px-[10%] text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-hero mb-6">Our Company</h1>
            <p className="text-body-large mb-8 max-w-3xl mx-auto text-gray-200">
              Learn about our success stories, hear from our clients, and join our team.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="section-services">
        <div className="w-full px-[10%]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-heading">Case Studies</h2>
            <Link href="/company/case-studies" className="text-blue-600 hover:text-blue-800">
              View All →
            </Link>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {caseStudies.map((study) => (
              <div key={study.slug} className="card-professional overflow-hidden">
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={study.image || '/images/company/default.jpg'}
                    alt={study.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="text-sm text-gray-500 mb-2">{study.industry}</div>
                  <h3 className="text-subheading mb-4">{study.title}</h3>
                  <p className="text-body-large mb-6">{study.challenge}</p>
                  <Link href={`/company/case-studies/${study.slug}`} className="btn-primary">
                    Read Case Study
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials Section */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-heading">Client Testimonials</h2>
            <Link href="/company/testimonials" className="text-blue-600 hover:text-blue-800">
              View All →
            </Link>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial) => (
              <div key={testimonial.slug} className="card-professional">
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-body-large mb-6 italic">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="flex items-center">
                    {testimonial.image && (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.title}, {testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Careers Section */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-heading">Join Our Team</h2>
            <Link href="/company/careers" className="text-blue-600 hover:text-blue-800">
              View All Positions →
            </Link>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {careers.map((career) => (
              <div key={career.slug} className="card-professional">
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {career.type}
                    </span>
                    <span className="text-sm text-gray-500">{career.location}</span>
                  </div>
                  <h3 className="text-subheading mb-4">{career.title}</h3>
                  <p className="text-body-large mb-6">{career.description}</p>
                  <Link href={`/company/careers/${career.slug}`} className="btn-primary">
                    Apply Now
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
