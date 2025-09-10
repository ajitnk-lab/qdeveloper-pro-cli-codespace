import Layout from '@/components/layout/Layout';
import { getAllSolutions } from '@/lib/content';
import Image from 'next/image';
import Link from 'next/link';

export default function SolutionsPage() {
  const solutions = getAllSolutions();

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="section-hero">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-hero mb-6">Solutions</h1>
            <p className="text-body-large mb-8 max-w-3xl mx-auto text-gray-200">
              Comprehensive cloud solutions designed to solve your specific business challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="section-services">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div key={solution.slug} className="card-professional overflow-hidden animate-slide-in-right" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={solution.image || '/images/solutions/default.jpg'}
                    alt={solution.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className={`icon-wrapper ${solution.color} mb-6`}>
                    {solution.icon}
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-2">{solution.category}</div>
                  <h3 className="text-subheading mb-4">{solution.title}</h3>
                  <p className="text-body-large mb-6">{solution.description}</p>
                  
                  <Link href={`/solutions/${solution.slug}`} className="btn-primary w-full">
                    Learn More
                  </Link>
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
            <h2 className="text-heading mb-4">Need a Custom Solution?</h2>
            <p className="text-body-large mb-8">
              Our team can design and implement custom solutions tailored to your specific requirements.
            </p>
            <button className="btn-accent">
              Discuss Your Needs
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
