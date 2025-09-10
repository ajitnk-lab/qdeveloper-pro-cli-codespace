import Layout from '@/components/layout/Layout';
import { getAllCaseStudies, getMarkdownContent } from '@/lib/content';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const caseStudies = getAllCaseStudies();
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudies = getAllCaseStudies();
  const caseStudy = caseStudies.find(s => s.slug === params.slug);

  if (!caseStudy) {
    notFound();
  }

  const { content } = await getMarkdownContent(`company/case-studies/${params.slug}.md`);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-hero">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <div className="text-sm text-gray-300 mb-4">{caseStudy.industry}</div>
            <h1 className="text-hero mb-6">{caseStudy.title}</h1>
            <p className="text-body-large mb-8 max-w-3xl mx-auto text-gray-200">
              {caseStudy.challenge}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-services">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="card-professional p-8">
                <h3 className="text-subheading mb-4">Challenge</h3>
                <p className="text-body-large text-gray-700">{caseStudy.challenge}</p>
              </div>
              <div className="card-professional p-8">
                <h3 className="text-subheading mb-4">Solution</h3>
                <p className="text-body-large text-gray-700">{caseStudy.solution}</p>
              </div>
            </div>

            <div className="card-professional p-8 mb-12">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="card-professional p-8">
                <h3 className="text-subheading mb-4">Results</h3>
                <ul className="space-y-3">
                  {caseStudy.results.map((result, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
              
              {caseStudy.technologies && caseStudy.technologies.length > 0 && (
                <div className="card-professional p-8">
                  <h3 className="text-subheading mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.technologies.map((tech, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
