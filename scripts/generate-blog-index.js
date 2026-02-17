const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { convertToIST, formatISTDate } = require('./utils/timezone');

/**
 * Calculate reading time from content
 * @param {string} content - Markdown content
 * @returns {string} Reading time (e.g., "5 min")
 */
function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
}

/**
 * Generate blog index from markdown files
 */
function generateBlogIndex() {
  const blogDir = path.join(process.cwd(), 'content/blog');
  const outputPath = path.join(blogDir, '_index.json');
  
  console.log('📚 Generating blog index...');
  console.log(`Reading from: ${blogDir}`);
  
  // Read all markdown files
  const files = fs.readdirSync(blogDir)
    .filter(file => file.endsWith('.md') && file !== 'README.md');
  
  console.log(`Found ${files.length} blog posts`);
  
  const posts = [];
  let errors = 0;
  
  files.forEach(file => {
    try {
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data: frontmatter, content } = matter(fileContent);
      
      // Validate required fields
      if (!frontmatter.title) {
        console.warn(`⚠️  Missing title in ${file}`);
        errors++;
        return;
      }
      
      // Generate slug from filename
      const slug = file.replace('.md', '');
      
      // Convert date to IST
      let publishedAt = frontmatter.publishedAt || new Date().toISOString().split('T')[0];
      try {
        const istDate = convertToIST(publishedAt);
        publishedAt = formatISTDate(istDate);
      } catch (error) {
        console.warn(`⚠️  Invalid date in ${file}, using current date`);
        publishedAt = formatISTDate(new Date());
      }
      
      // Build post object
      const post = {
        slug,
        title: frontmatter.title,
        excerpt: frontmatter.excerpt || '',
        publishedAt,
        category: frontmatter.category || 'Uncategorized',
        tags: frontmatter.tags || [],
        author: frontmatter.author || 'CloudNestle Team',
        featured: frontmatter.featured || false,
        readTime: calculateReadingTime(content)
      };
      
      posts.push(post);
      
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
      errors++;
    }
  });
  
  // Sort by publishedAt (newest first)
  posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  
  // Write index file
  const indexData = { posts };
  fs.writeFileSync(outputPath, JSON.stringify(indexData, null, 2));
  
  // Summary
  console.log('\n✅ Blog index generated successfully!');
  console.log(`📝 Total posts: ${posts.length}`);
  if (posts.length > 0) {
    console.log(`📅 Newest: ${posts[0].title} (${posts[0].publishedAt})`);
    console.log(`📅 Oldest: ${posts[posts.length - 1].title} (${posts[posts.length - 1].publishedAt})`);
  }
  if (errors > 0) {
    console.log(`⚠️  Errors: ${errors}`);
  }
  console.log(`💾 Saved to: ${outputPath}`);
  
  // Check for duplicates
  const slugs = posts.map(p => p.slug);
  const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
  if (duplicates.length > 0) {
    console.warn(`⚠️  Duplicate slugs found: ${duplicates.join(', ')}`);
  }
}

// Run if called directly
if (require.main === module) {
  try {
    generateBlogIndex();
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

module.exports = { generateBlogIndex };
