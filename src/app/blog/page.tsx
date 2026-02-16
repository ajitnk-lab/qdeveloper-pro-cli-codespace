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
  {
    slug: 'cli-agent-orchestrator',
    title: 'CLI Agent Orchestrator',
    excerpt: 'CLI Agent Orchestrator: Transforming Developer CLI Tools into a Multi-Agent Powerhouse',
    publishedAt: '2026-02-16',
    category: 'AWS',
    tags: [],
    author: 'CloudNestle Team',
    featured: false,
  },
  {
    slug: 'testing-blog-automation-system',
    title: 'Testing Blog Automation System',
    excerpt: 'Testing Blog Automation System',
    publishedAt: '2026-02-16',
    category: 'AWS',
    tags: ["Testing", "Automation"],
    author: 'CloudNestle Team',
    featured: false,
  },
  {
    slug: 'test-automation-blog',
    title: 'Test: Automated Blog Publishing System',
    excerpt: 'Testing automated blog generation and publishing workflow from social media automation system.',
    publishedAt: '2026-02-16',
    category: 'Testing',
    tags: ["Automation", "Testing", "CI/CD"],
    author: 'CloudNestle Team',
    featured: false,
  },
  {
    slug: '2025-09-09-automated-deployment-live',
    title: '🚀 Automated Deployment is Now Live!',
    excerpt: 'Our website now features professional CI/CD automation with GitHub Actions, enabling instant deployments with every code push.',
    publishedAt: '2025-09-09',
    category: 'Announcements',
    tags: ["Automation", "GitHub Actions", "DevOps", "CI/CD"],
    author: 'CloudNestle Team',
    featured: false,
  },
  {
    slug: 'aws-cost-optimization-guide',
    title: 'Complete Guide to AWS Cost Optimization in 2024',
    excerpt: 'Learn proven strategies to reduce your AWS costs by up to 40% without compromising performance or reliability.',
    publishedAt: '2024-01-15',
    category: 'Cost Optimization',
    tags: ["AWS", "Cost Optimization", "Cloud Computing", "FinOps"],
    author: 'CloudNestle Team',
    featured: false,
  },
  {
    slug: 'cloud-migration-checklist',
    title: 'Essential Cloud Migration Checklist for 2024',
    excerpt: 'A comprehensive checklist to ensure your cloud migration project succeeds without unexpected surprises.',
    publishedAt: '2024-01-10',
    category: 'Cloud Migration',
    tags: ["AWS", "Cloud Migration", "Infrastructure", "Planning"],
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
