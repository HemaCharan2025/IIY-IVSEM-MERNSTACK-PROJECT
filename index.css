import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get('/api/blogs/my');
        setBlogs(data.blogs);
      } catch {
        toast.error('Failed to load your blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog?')) return;
    setDeleting(id);
    try {
      await axios.delete('/api/blogs/' + id);
      setBlogs(blogs.filter(b => b._id !== id));
      toast.success('Blog deleted');
    } catch {
      toast.error('Failed to delete');
    } finally {
      setDeleting(null);
    }
  };

  const totalLikes = blogs.reduce((sum, b) => sum + (b.likes?.length || 0), 0);
  const totalViews = blogs.reduce((sum, b) => sum + (b.views || 0), 0);
  const published = blogs.filter(b => b.status === 'published').length;
  const drafts = blogs.filter(b => b.status === 'draft').length;

  return (
    <div className="page-layout">
      <div className="container dashboard-page animate-in">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Welcome back, <span className="highlight">{user?.username}</span></p>
          </div>
          <Link to="/create" className="btn btn-primary">Write New Blog</Link>
        </div>

        <div className="stats-grid">
          {[
            { icon: 'blog', value: blogs.length, label: 'Total Blogs' },
            { icon: 'pub', value: published, label: 'Published' },
            { icon: 'draft', value: drafts, label: 'Drafts' },
            { icon: 'like', value: totalLikes, label: 'Total Likes' },
            { icon: 'view', value: totalViews, label: 'Total Views' },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="my-blogs-section">
          <h2 className="section-title">Your Blogs</h2>
          {loading ? (
            <div className="blogs-list">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="blog-list-item">
                  <div className="list-item-body">
                    <div className="skeleton" style={{ height: 20, width: '60%', marginBottom: 10 }} />
                    <div className="skeleton" style={{ height: 14, width: '30%' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="empty-dash">
              <div style={{ fontSize: 56, marginBottom: 16 }}>&#9998;</div>
              <h3>No blogs yet</h3>
              <p>Start writing your first blog post!</p>
              <Link to="/create" className="btn btn-primary" style={{ marginTop: 16 }}>Write Your First Blog</Link>
            </div>
          ) : (
            <div className="blogs-list">
              {blogs.map(blog => (
                <div key={blog._id} className="blog-list-item">
                  {blog.coverImage && (
                    <div className="list-item-cover">
                      <img src={blog.coverImage} alt={blog.title} onError={(e) => { e.target.style.display='none'; }} />
                    </div>
                  )}
                  <div className="list-item-body">
                    <div className="list-item-meta">
                      <span className={'status-badge ' + blog.status}>{blog.status}</span>
                      <span className="badge" style={{ fontSize: 11 }}>{blog.category}</span>
                      <span className="list-item-time">{formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</span>
                    </div>
                    <h3 className="list-item-title">
                      <Link to={'/blog/' + blog._id}>{blog.title}</Link>
                    </h3>
                    <div className="list-item-stats">
                      <span>{blog.likes?.length || 0} likes</span>
                      <span>{blog.views || 0} views</span>
                      <span>{blog.readTime} min read</span>
                    </div>
                  </div>
                  <div className="list-item-actions">
                    <Link to={'/blog/' + blog._id} className="btn btn-ghost" style={{ padding: '7px 14px', fontSize: 13 }}>View</Link>
                    <Link to={'/edit/' + blog._id} className="btn btn-outline" style={{ padding: '7px 14px', fontSize: 13 }}>Edit</Link>
                    <button onClick={() => handleDelete(blog._id)} className="btn btn-danger" disabled={deleting === blog._id} style={{ padding: '7px 14px', fontSize: 13 }}>
                      {deleting === blog._id ? '...' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
