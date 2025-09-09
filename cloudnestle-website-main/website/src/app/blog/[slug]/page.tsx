import Layout from '@/components/layout/Layout';
import { getBlogPost, getAllBlogPosts } from '@/lib/content';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="section-hero">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <div className="flex justify-center items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded text-sm font-medium ${
                post.category === 'Cost Optimization' ? 'bg-orange-100 text-orange-800' :
                post.category === 'Cloud Migration' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {post.category}
              </span>
              {post.featured && (
                <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded font-medium">
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-hero mb-6">{post.title}</h1>
            
            <div className="flex items-center justify-center gap-4 text-gray-200 mb-6">
              <span>By {post.author}</span>
              <span>•</span>
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
            
            <div className="flex justify-center flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-white bg-opacity-20 text-white text-sm px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-services">
        <div className="container mx-auto px-4">
          <div className="card-professional max-w-4xl mx-auto animate-fade-in-up">
            <article className="p-12">
              <div 
                className="prose prose-lg max-w-none"
                style={{
                  color: 'var(--text-primary)',
                  lineHeight: '1.7'
                }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="section-trust">
        <div className="container mx-auto px-4">
          <div className="card-professional max-w-4xl mx-auto p-12 text-center">
            <div className="icon-wrapper blue mx-auto mb-6">
              💡
            </div>
            <h3 className="text-heading mb-4">Need Expert Help?</h3>
            <p className="text-body-large mb-8">
              Our AWS certified professionals can help you implement these strategies in your organization.
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

export function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
