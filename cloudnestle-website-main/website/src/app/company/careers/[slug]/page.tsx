import Layout from '@/components/layout/Layout';
import { getAllCareers, getMarkdownContent } from '@/lib/content';
import { notFound } from 'next/navigation';

interface CareerPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const careers = getAllCareers();
  return careers.map((career) => ({
    slug: career.slug,
  }));
}

export default async function CareerPage({ params }: CareerPageProps) {
  const careers = getAllCareers();
  const career = careers.find(c => c.slug === params.slug);

  if (!career) {
    notFound();
  }

  const { content } = await getMarkdownContent(`company/careers/${params.slug}.md`);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-hero">
        <div className="w-full px-[10%] text-center relative z-10">
          <div className="animate-fade-in-up">
            <div className="flex justify-center items-center gap-4 mb-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {career.type}
              </span>
              <span className="text-gray-300">{career.location}</span>
            </div>
            <h1 className="text-hero mb-6">{career.title}</h1>
            <p className="text-body-large mb-8 max-w-3xl mx-auto text-gray-200">
              {career.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-services">
        <div className="w-full px-[10%]">
          <div className="max-w-4xl mx-auto">
            <div className="card-professional p-8 mb-12">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="card-professional p-8">
                <h3 className="text-subheading mb-4">Requirements</h3>
                <ul className="space-y-3">
                  {career.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="card-professional p-8">
                <h3 className="text-subheading mb-4">Responsibilities</h3>
                <ul className="space-y-3">
                  {career.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Apply Section */}
            <div className="card-professional p-12 text-center">
              <h2 className="text-heading mb-4">Ready to Apply?</h2>
              <p className="text-body-large mb-8">
                Join our team and help us deliver world-class cloud solutions.
              </p>
              <button className="btn-accent">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
