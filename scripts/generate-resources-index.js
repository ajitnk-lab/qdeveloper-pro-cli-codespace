const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { convertToIST, formatISTDate } = require('./utils/timezone');

/**
 * Get icon and color based on resource type
 */
function getTypeMetadata(type) {
  const metadata = {
    'Guide': { icon: '📚', color: '#2563eb' },
    'Checklist': { icon: '✅', color: '#10b981' },
    'Template': { icon: '📄', color: '#8b5cf6' },
    'Whitepaper': { icon: '📋', color: '#f59e0b' },
    'Case Study': { icon: '📊', color: '#ef4444' },
    'Tutorial': { icon: '🎓', color: '#06b6d4' },
    'Reference': { icon: '📖', color: '#6366f1' }
  };
  
  return metadata[type] || { icon: '📄', color: '#64748b' };
}

/**
 * Generate resources index from markdown files
 */
function generateResourcesIndex() {
  const resourcesDir = path.join(process.cwd(), 'content/resources');
  const outputPath = path.join(resourcesDir, '_index.json');
  
  console.log('📦 Generating resources index...');
  console.log(`Reading from: ${resourcesDir}`);
  
  // Read all markdown files
  const files = fs.readdirSync(resourcesDir)
    .filter(file => file.endsWith('.md') && file !== 'README.md');
  
  console.log(`Found ${files.length} resources`);
  
  const resources = [];
  let errors = 0;
  const typeCounts = {};
  
  files.forEach(file => {
    try {
      const filePath = path.join(resourcesDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data: frontmatter } = matter(fileContent);
      
      // Validate required fields
      if (!frontmatter.title) {
        console.warn(`⚠️  Missing title in ${file}`);
        errors++;
        return;
      }
      
      if (!frontmatter.type) {
        console.warn(`⚠️  Missing type in ${file}`);
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
      
      // Get type metadata
      const { icon, color } = getTypeMetadata(frontmatter.type);
      
      // Build resource object
      const resource = {
        slug,
        title: frontmatter.title,
        description: frontmatter.description || frontmatter.excerpt || '',
        type: frontmatter.type,
        category: frontmatter.category || 'General',
        tags: frontmatter.tags || [],
        icon,
        color,
        publishedAt,
        pdfUrl: `/resources/pdfs/${slug}.pdf`
      };
      
      resources.push(resource);
      
      // Count by type
      typeCounts[resource.type] = (typeCounts[resource.type] || 0) + 1;
      
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
      errors++;
    }
  });
  
  // Sort by publishedAt (newest first)
  resources.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  
  // Write index file
  const indexData = { resources };
  fs.writeFileSync(outputPath, JSON.stringify(indexData, null, 2));
  
  // Summary
  console.log('\n✅ Resources index generated successfully!');
  console.log(`📦 Total resources: ${resources.length}`);
  if (resources.length > 0) {
    console.log(`📅 Newest: ${resources[0].title} (${resources[0].publishedAt})`);
    console.log(`📅 Oldest: ${resources[resources.length - 1].title} (${resources[resources.length - 1].publishedAt})`);
  }
  console.log('\n📊 By type:');
  Object.entries(typeCounts).forEach(([type, count]) => {
    console.log(`   ${type}: ${count}`);
  });
  if (errors > 0) {
    console.log(`\n⚠️  Errors: ${errors}`);
  }
  console.log(`💾 Saved to: ${outputPath}`);
  
  // Check for duplicates
  const slugs = resources.map(r => r.slug);
  const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
  if (duplicates.length > 0) {
    console.warn(`⚠️  Duplicate slugs found: ${duplicates.join(', ')}`);
  }
}

// Run if called directly
if (require.main === module) {
  try {
    generateResourcesIndex();
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

module.exports = { generateResourcesIndex };
