import Layout from '@/components/layout/Layout';
import Card from '@/components/ui/Card';
import { getAllBlogPosts } from '@/lib/content';
import Link from 'next/link';

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="section-hero">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-hero mb-6">Blog</h1>
            <p className="text-body-large mb-8 max-w-3xl mx-auto text-gray-200">
              Insights, tips, and best practices for AWS cloud computing and digital transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-services">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="card-professional max-w-2xl mx-auto p-12">
                <div className="icon-wrapper blue mx-auto mb-6">
                  📝
                </div>
                <h3 className="text-subheading mb-4">No blog posts available yet</h3>
                <p className="text-body-large">Check back soon for insights and best practices!</p>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {posts.map((post, index) => (
                <div key={post.slug} className="card-professional animate-slide-in-right" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
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
                    
                    <h2 className="text-subheading mb-4">
                      <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                        {post.title}
                      </Link>
                    </h2>
                    
                    <p className="text-body-large mb-6">{post.excerpt}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t" style={{borderColor: 'var(--border-light)'}}>
                      <span>By {post.author}</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-trust">
        <div className="container mx-auto px-4 text-center">
          <div className="card-professional max-w-4xl mx-auto p-12">
            <div className="icon-wrapper orange mx-auto mb-6">
              📧
            </div>
            <h2 className="text-heading mb-4">Stay Updated</h2>
            <p className="text-body-large mb-8">
              Subscribe to our newsletter for the latest AWS insights and best practices.
            </p>
            <button className="btn-primary">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
