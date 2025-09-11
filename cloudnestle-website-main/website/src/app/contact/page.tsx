import Layout from '@/components/layout/Layout';
import { getAllContactInfo } from '@/lib/content';

export default function ContactPage() {
  const contactInfo = getAllContactInfo();
  const salesInfo = contactInfo.find(info => info.type === 'sales');
  const supportInfo = contactInfo.find(info => info.type === 'support');

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="section-hero">
        <div className="w-full px-[10%] text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-hero mb-6">Contact Us</h1>
            <p className="text-body-large mb-8 max-w-3xl mx-auto text-gray-200">
              Get in touch with our team for sales inquiries, support, or general questions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section-services">
        <div className="w-full px-[10%]">
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Sales Contact */}
            <div className="card-professional">
              <div className="p-8">
                <div className="icon-wrapper blue mb-6">
                  💼
                </div>
                <h3 className="text-subheading mb-4">Sales Inquiries</h3>
                <p className="text-body-large mb-6">
                  Ready to start your cloud transformation? Contact our sales team for a consultation.
                </p>
                {salesInfo && (
                  <div className="space-y-3 mb-6">
                    {salesInfo.email && (
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Email:</span>
                        <a href={`mailto:${salesInfo.email}`} className="text-blue-600 hover:text-blue-800">
                          {salesInfo.email}
                        </a>
                      </div>
                    )}
                    {salesInfo.phone && (
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Phone:</span>
                        <a href={`tel:${salesInfo.phone}`} className="text-blue-600 hover:text-blue-800">
                          {salesInfo.phone}
                        </a>
                      </div>
                    )}
                  </div>
                )}
                <button className="btn-primary w-full">
                  Schedule Consultation
                </button>
              </div>
            </div>

            {/* Support Contact */}
            <div className="card-professional">
              <div className="p-8">
                <div className="icon-wrapper green mb-6">
                  🛠️
                </div>
                <h3 className="text-subheading mb-4">Technical Support</h3>
                <p className="text-body-large mb-6">
                  Need help with your existing services? Our support team is here to assist you.
                </p>
                {supportInfo && (
                  <div className="space-y-3 mb-6">
                    {supportInfo.email && (
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Email:</span>
                        <a href={`mailto:${supportInfo.email}`} className="text-blue-600 hover:text-blue-800">
                          {supportInfo.email}
                        </a>
                      </div>
                    )}
                    {supportInfo.phone && (
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Phone:</span>
                        <a href={`tel:${supportInfo.phone}`} className="text-blue-600 hover:text-blue-800">
                          {supportInfo.phone}
                        </a>
                      </div>
                    )}
                  </div>
                )}
                <button className="btn-primary w-full">
                  Get Support
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-professional max-w-4xl mx-auto">
            <div className="p-8">
              <h2 className="text-heading mb-8 text-center">Send us a Message</h2>
              <form className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>General Inquiry</option>
                    <option>Sales Question</option>
                    <option>Technical Support</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea 
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your project or question..."
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="btn-primary w-full">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
