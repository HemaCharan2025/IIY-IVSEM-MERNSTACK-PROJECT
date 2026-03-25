import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import './Home.css';

const CATEGORIES = ['All', 'Technology', 'Science', 'Lifestyle', 'Education', 'Entertainment', 'Other'];

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState('All');

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 9 };
      if (search) params.search = search;
      if (category !== 'All') params.category = category;

      const { data } = await axios.get('/api/blogs', { params });
      setBlogs(data.blogs);
      setTotalPages(data.pagination.pages);
    } catch {
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [page, search, category]);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setPage(1);
  };

  const SkeletonCard = () => (
    <div className="blog-card" style={{ padding: 22 }}>
      <div className="skeleton" style={{ height: 200, marginBottom: 16, borderRadius: 12 }} />
      <div className="skeleton" style={{ height: 14, width: '40%', marginBottom: 12 }} />
      <div className="skeleton" style={{ height: 22, marginBottom: 8 }} />
      <div className="skeleton" style={{ height: 22, width: '80%', marginBottom: 16 }} />
      <div className="skeleton" style={{ height: 14, marginBottom: 6 }} />
      <div className="skeleton" style={{ height: 14, width: '70%', marginBottom: 20 }} />
      <div className="skeleton" style={{ height: 1, marginBottom: 14 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="skeleton" style={{ height: 28, width: 100 }} />
        <div className="skeleton" style={{ height: 14, width: 80 }} />
      </div>
    </div>
  );

  return (
    <div className="page-layout">
      {/* Hero */}
      <section className="hero-section container">
        <div className="hero-badge">✦ The Platform for Creators</div>
        <h1 className="hero-title">
          Write. Share.<br />
          <span className="hero-title-accent">Inspire.</span>
        </h1>
        <p className="hero-subtitle">
          A fully custom blogging platform with no restrictions, no ads, and complete ownership of your content.
        </p>

        {/* Search */}
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Search blogs, topics, tags..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">Search</button>
        </form>
      </section>

      {/* Category Filter */}
      <section className="categories-section container">
        <div className="category-list">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`category-btn ${category === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="blogs-section container">
        {search && (
          <div className="search-result-info">
            Showing results for: <strong>"{search}"</strong>
            <button onClick={() => { setSearch(''); setSearchInput(''); setPage(1); }} className="clear-search">✕ Clear</button>
          </div>
        )}

        {loading ? (
          <div className="blogs-grid">
            {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : blogs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No blogs found</h3>
            <p>Be the first to write about this topic!</p>
          </div>
        ) : (
          <div className="blogs-grid">
            {blogs.map((blog, i) => (
              <div key={blog._id} style={{ animationDelay: `${i * 0.05}s` }}>
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="btn btn-ghost"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ← Previous
            </button>
            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`page-num ${p === page ? 'active' : ''}`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              className="btn btn-ghost"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next →
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
