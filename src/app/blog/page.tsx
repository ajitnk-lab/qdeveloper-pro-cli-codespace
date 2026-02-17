"use client";

import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { filterByDateRange, searchItems, filterByCategory, getUniqueCategories, type BlogPost, type DateRange } from '@/utils/filters';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<DateRange>('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Load blog posts from _index.json
  useEffect(() => {
    fetch('/content/blog/_index.json')
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading blog posts:', error);
        setLoading(false);
      });
  }, []);

  // Filter posts
  const filteredPosts = useMemo(() => {
    let filtered = filterByDateRange(posts, activeTab);
    filtered = searchItems(filtered, searchQuery, ['title', 'excerpt', 'category', 'tags']);
    filtered = filterByCategory(filtered, selectedCategory);
    return filtered;
  }, [posts, activeTab, searchQuery, selectedCategory]);

  // Get unique categories
  const categories = useMemo(() => getUniqueCategories(posts), [posts]);

  // Count posts by tab
  const recentCount = useMemo(() => filterByDateRange(posts, 'recent').length, [posts]);
  const thisMonthCount = useMemo(() => filterByDateRange(posts, 'thisMonth').length, [posts]);
  const archiveCount = useMemo(() => filterByDateRange(posts, 'archive').length, [posts]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setActiveTab('recent');
  };

  if (loading) {
    return (
      <Layout>
        <div style={{ padding: '40px 0', textAlign: 'center' }}>
          <p>Loading blog posts...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ padding: '40px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
              Blog
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', maxWidth: '768px', margin: '0 auto' }}>
              Latest insights, tutorials, and best practices for AWS cloud computing.
            </p>
          </div>

          {/* Filters */}
          <div style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveTab('recent')}
                style={{
                  padding: '8px 16px',
                  background: activeTab === 'recent' ? '#2563eb' : 'transparent',
                  color: activeTab === 'recent' ? 'white' : '#64748b',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }}
              >
                Recent ({recentCount})
              </button>
              <button
                onClick={() => setActiveTab('thisMonth')}
                style={{
                  padding: '8px 16px',
                  background: activeTab === 'thisMonth' ? '#2563eb' : 'transparent',
                  color: activeTab === 'thisMonth' ? 'white' : '#64748b',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }}
              >
                This Month ({thisMonthCount})
              </button>
              <button
                onClick={() => setActiveTab('archive')}
                style={{
                  padding: '8px 16px',
                  background: activeTab === 'archive' ? '#2563eb' : 'transparent',
                  color: activeTab === 'archive' ? 'white' : '#64748b',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }}
              >
                Archive ({archiveCount})
              </button>
            </div>

            {/* Search and Category Filter */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: '1',
                  minWidth: '200px',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  background: 'white'
                }}
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {(searchQuery || selectedCategory !== 'all') && (
                <button
                  onClick={resetFilters}
                  style={{
                    padding: '12px 16px',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.2s'
                  }}
                >
                  Reset Filters
                </button>
              )}
            </div>

            {/* Results count */}
            <p style={{ fontSize: '14px', color: '#64748b' }}>
              Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
            </p>
          </div>

          {/* Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
              <p>No posts found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <article 
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '16px',
                      padding: '24px',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease-in-out',
                      cursor: 'pointer',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                      <span style={{
                        padding: '4px 12px',
                        background: '#dbeafe',
                        color: '#1e40af',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {post.category}
                      </span>
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h2 style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#1e293b',
                      marginBottom: '12px',
                      lineHeight: '1.3'
                    }}>
                      {post.title}
                    </h2>
                    
                    <p style={{
                      fontSize: '16px',
                      color: '#64748b',
                      lineHeight: '1.6',
                      marginBottom: '16px',
                      flex: '1'
                    }}>
                      {post.excerpt}
                    </p>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '16px',
                      borderTop: '1px solid #e2e8f0'
                    }}>
                      <span style={{ fontSize: '14px', color: '#94a3b8' }}>
                        {post.author}
                      </span>
                      <span style={{ fontSize: '14px', color: '#94a3b8' }}>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
