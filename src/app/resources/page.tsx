"use client";

import Layout from '@/components/layout/Layout';
import { useState, useEffect, useMemo } from 'react';
import { filterByDateRange, searchItems, filterByCategory, filterByType, getUniqueCategories, getUniqueTypes, type Resource, type DateRange } from '@/utils/filters';

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<DateRange>('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Load resources from _index.json
  useEffect(() => {
    fetch('/content/resources/_index.json')
      .then(res => res.json())
      .then(data => {
        setResources(data.resources || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading resources:', error);
        setLoading(false);
      });
  }, []);

  // Filter resources
  const filteredResources = useMemo(() => {
    let filtered = filterByDateRange(resources, activeTab);
    filtered = searchItems(filtered, searchQuery, ['title', 'description', 'category', 'type', 'tags']);
    filtered = filterByType(filtered, selectedType);
    filtered = filterByCategory(filtered, selectedCategory);
    return filtered;
  }, [resources, activeTab, searchQuery, selectedType, selectedCategory]);

  // Get unique types and categories
  const types = useMemo(() => getUniqueTypes(resources), [resources]);
  const categories = useMemo(() => getUniqueCategories(resources), [resources]);

  // Count resources by tab
  const recentCount = useMemo(() => filterByDateRange(resources, 'recent').length, [resources]);
  const thisMonthCount = useMemo(() => filterByDateRange(resources, 'thisMonth').length, [resources]);
  const archiveCount = useMemo(() => filterByDateRange(resources, 'archive').length, [resources]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedCategory('all');
    setActiveTab('recent');
  };

  if (loading) {
    return (
      <Layout>
        <div style={{ padding: '40px 0', textAlign: 'center' }}>
          <p>Loading resources...</p>
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
              Resources
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', maxWidth: '768px', margin: '0 auto' }}>
              Free tools, guides, and resources to help you succeed with AWS cloud computing.
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

            {/* Search and Filters */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Search resources..."
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
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                style={{
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  background: 'white'
                }}
              >
                <option value="all">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
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
              {(searchQuery || selectedType !== 'all' || selectedCategory !== 'all') && (
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
              Showing {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'}
            </p>
          </div>

          {/* Resources Grid */}
          {filteredResources.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
              <p>No resources found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {filteredResources.map((resource) => (
                <div 
                  key={resource.slug} 
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '20px',
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
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    marginBottom: '20px',
                    background: `${resource.color}15`,
                    color: resource.color
                  }}>
                    {resource.icon}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '4px 12px',
                      backgroundColor: `${resource.color}15`,
                      color: resource.color,
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {resource.type}
                    </span>
                    {resource.category && (
                      <span style={{
                        padding: '4px 12px',
                        backgroundColor: '#f1f5f9',
                        color: '#64748b',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {resource.category}
                      </span>
                    )}
                  </div>
                  
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: '600', 
                    color: '#1e293b', 
                    marginBottom: '12px',
                    lineHeight: '1.3'
                  }}>
                    {resource.title}
                  </h3>
                  
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#64748b', 
                    lineHeight: '1.6', 
                    marginBottom: '20px', 
                    flex: '1'
                  }}>
                    {resource.description}
                  </p>
                  
                  <a
                    href={resource.pdfUrl}
                    download
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '12px 20px',
                      background: resource.color,
                      color: 'white',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '14px',
                      transition: 'all 0.2s',
                      marginTop: 'auto'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.9';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    Download PDF
                  </a>
                  
                  {resource.publishedAt && (
                    <p style={{ 
                      fontSize: '12px', 
                      color: '#94a3b8', 
                      marginTop: '12px',
                      textAlign: 'center'
                    }}>
                      {new Date(resource.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
