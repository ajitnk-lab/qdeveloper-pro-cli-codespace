import Layout from '@/components/layout/Layout';
import { getSolution, getAllSolutions } from '@/lib/content';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface SolutionPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const solutions = getAllSolutions();
  return solutions.map((solution) => ({
    slug: solution.slug,
  }));
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const solution = await getSolution(params.slug);

  if (!solution) {
    notFound();
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-hero">
        <div className="w-full px-[10%] text-center relative z-10">
          <div className="animate-fade-in-up">
            <div className={`icon-wrapper ${solution.color} mb-6 mx-auto`}>
              {solution.icon}
            </div>
            <h1 className="text-hero mb-6">{solution.title}</h1>
            <p className="text-body-large mb-8 max-w-3xl mx-auto text-gray-200">
              {solution.description}
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
              <p className="text-body-large text-gray-700 leading-relaxed">
                {solution.overview}
              </p>
            </div>

            <div className="card-professional p-8 mb-12">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: solution.content }}
              />
            </div>

            {/* Benefits & Technologies */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {solution.benefits && solution.benefits.length > 0 && (
                <div className="card-professional p-8">
                  <h3 className="text-subheading mb-4">Key Benefits</h3>
                  <ul className="space-y-3">
                    {solution.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {solution.technologies && solution.technologies.length > 0 && (
                <div className="card-professional p-8">
                  <h3 className="text-subheading mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {solution.technologies.map((tech, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA Section */}
            <div className="card-professional p-12 text-center">
              <h2 className="text-heading mb-4">Ready to Implement This Solution?</h2>
              <p className="text-body-large mb-8">
                Contact us today to discuss how we can implement {solution.title} for your organization.
              </p>
              <button className="btn-accent">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
