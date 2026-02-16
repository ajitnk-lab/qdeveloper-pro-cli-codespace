const posts = [
  {
    slug: 'your-own-jupyterlab-application',
    title: 'Your own JupyterLab application',
    excerpt: 'Your Own JupyterLab Application: Deploying with Real-Time Collaboration in Minutes',
    publishedAt: '2026-02-16',
    category: 'AWS',
    tags: ["jupyter","aws","cloud"],
    author: 'CloudNestle Team',
    featured: false,
  },
];

export default function BlogPage() {
  return (
    <div>
      <h1>Blog</h1>
      {posts.map(post => (
        <div key={post.slug}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </div>
      ))}
    </div>
  );
}
