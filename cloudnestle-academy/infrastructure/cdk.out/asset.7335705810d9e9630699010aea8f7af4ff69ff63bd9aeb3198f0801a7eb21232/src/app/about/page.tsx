export default function About() {
  return (
    <div className="bg-white min-h-full">
      <div className="w-4/5 mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            About CloudNestle Academy
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Empowering learners with cutting-edge technology education
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              <p className="mt-4 text-lg text-gray-600">
                At CloudNestle Academy, we believe in democratizing access to high-quality 
                technology education. Our mission is to provide comprehensive, practical, 
                and up-to-date courses that prepare learners for the rapidly evolving 
                tech industry.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">What We Offer</h2>
              <ul className="mt-4 text-lg text-gray-600 space-y-2">
                <li>• Expert-led courses in cloud computing, web development, and DevOps</li>
                <li>• Hands-on projects and real-world applications</li>
                <li>• Flexible learning paths for all skill levels</li>
                <li>• Industry-recognized certifications</li>
                <li>• Community support and mentorship</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Why Choose Us?</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="bg-blue-100 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900">Expert Instructors</h3>
                <p className="mt-2 text-gray-600">
                  Learn from industry professionals with years of real-world experience
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900">Practical Learning</h3>
                <p className="mt-2 text-gray-600">
                  Build real projects and gain hands-on experience with modern tools
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900">Career Support</h3>
                <p className="mt-2 text-gray-600">
                  Get guidance on career paths and job placement assistance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
