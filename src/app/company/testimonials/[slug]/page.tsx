import Layout from '@/components/layout/Layout';
import { getAllTestimonials, getMarkdownContent } from '@/lib/content';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface TestimonialPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const testimonials = getAllTestimonials();
  return testimonials.map((testimonial) => ({
    slug: testimonial.slug,
  }));
}

export default async function TestimonialPage({ params }: TestimonialPageProps) {
  const testimonials = getAllTestimonials();
  const testimonial = testimonials.find(t => t.slug === params.slug);

  if (!testimonial) {
    notFound();
  }

  const { content } = await getMarkdownContent(`company/testimonials/${params.slug}.md`);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-hero">
        <div className="w-full px-[10%] text-center relative z-10">
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-center mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-2xl">★</span>
              ))}
            </div>
            <h1 className="text-hero mb-6">Client Testimonial</h1>
            <p className="text-body-large mb-8 max-w-3xl mx-auto text-gray-200 italic">
              &ldquo;{testimonial.content}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-services">
        <div className="w-full px-[10%]">
          <div className="max-w-4xl mx-auto">
            <div className="card-professional p-12 text-center">
              {testimonial.image && (
                <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-6">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h2 className="text-heading mb-2">{testimonial.name}</h2>
              <p className="text-body-large text-gray-600 mb-8">
                {testimonial.title}, {testimonial.company}
              </p>
              
              <div className="card-professional p-8">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
