import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="w-full px-4">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-6xl font-bold mb-6">Cloud Nestle</h3>
            <p className="text-gray-400 text-2xl leading-relaxed">
              Professional AWS consulting and services for businesses of all sizes.
            </p>
          </div>
          
          <div>
            <h4 className="text-3xl font-semibold mb-6">Services</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/services/cloud-migration" className="hover:text-white text-2xl">Cloud Migration</Link></li>
              <li><Link href="/services/cost-optimization" className="hover:text-white text-2xl">Cost Optimization</Link></li>
              <li><Link href="/services/security-compliance" className="hover:text-white text-2xl">Security & Compliance</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-3xl font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/about" className="hover:text-white text-2xl">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-white text-2xl">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white text-2xl">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-3xl font-semibold mb-6">Contact</h4>
            <div className="text-gray-400 space-y-4">
              <p className="text-2xl">Email: info@cloudnestle.com</p>
              <p className="text-2xl">Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p className="text-2xl">&copy; 2024 Cloud Nestle Consulting & Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
