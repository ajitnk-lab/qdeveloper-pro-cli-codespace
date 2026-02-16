const posts = [
  {
    slug: 'strands-agents-10',
    title: 'Strands Agents 1.0',
    excerpt: 'Introducing Strands Agents 1.0: Production-Ready Multi-Agent Orchestration Made Simple',
    publishedAt: '2026-02-16',
    category: 'AWS',
    tags: [],
    author: 'CloudNestle Team',
    featured: false,
  },
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
