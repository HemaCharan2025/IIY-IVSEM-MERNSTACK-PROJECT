import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import './BlogForm.css';

const CATEGORIES = ['Technology', 'Science', 'Lifestyle', 'Education', 'Entertainment', 'Other'];

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`/api/blogs/${id}`);
        const blog = data.blog;
        // Only owner or admin can edit
        if (blog.author._id !== user._id && user.role !== 'admin') {
          toast.error('Not authorized to edit this blog');
          navigate('/');
          return;
        }
        setForm({
          title: blog.title,
          content: blog.content,
          excerpt: blog.excerpt || '',
          tags: blog.tags?.join(', ') || '',
          category: blog.category,
          coverImage: blog.coverImage || '',
          status: blog.status,
        });
      } catch {
        toast.error('Blog not found');
        navigate('/');
      } finally {
        setFetching(false);
      }
    };
    fetchBlog();
  }, [id, user, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      toast.error('Title and content are required');
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.put(`/api/blogs/${id}`, form);
      toast.success('Blog updated successfully!');
      navigate(`/blog/${data.blog._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="page-layout" style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center' }}>
        <div className="skeleton" style={{ width:200, height:28, margin:'0 auto 12px' }} />
        <div className="skeleton" style={{ width:400, height:16, margin:'0 auto' }} />
      </div>
    </div>
  );

  if (!form) return null;

  return (
    <div className="page-layout">
      <div className="container blog-form-page">
        <div className="blog-form-header animate-in">
          <h1 className="blog-form-title">Edit Blog</h1>
          <p className="blog-form-subtitle">Update your blog post</p>
        </div>

        <form onSubmit={handleSubmit} className="blog-form animate-in">
          <div className="form-group">
            <label>Cover Image URL <span className="label-optional">(optional)</span></label>
            <input
              type="url"
              name="coverImage"
              value={form.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="form-control"
            />
            {form.coverImage && (
              <img
                src={form.coverImage}
                alt="Preview"
                className="cover-preview"
                onError={(e) => e.target.style.display='none'}
              />
            )}
          </div>

          <div className="form-group">
            <label>Blog Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter a compelling title..."
              className="form-control title-input"
              maxLength={120}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="form-control">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="form-control">
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Tags <span className="label-optional">(comma separated)</span></label>
            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="react, webdev, javascript"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Excerpt</label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              placeholder="Short description..."
              className="form-control"
              rows={3}
              maxLength={300}
            />
          </div>

          <div className="form-group">
            <label>Content *</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Write your blog content here..."
              className="form-control content-editor"
              rows={20}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate(-1)} className="btn btn-ghost">Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="btn-spinner" /> : '💾 Update Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
