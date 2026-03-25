import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { formatDistanceToNow, format } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './BlogDetail.css';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [deletingBlog, setDeletingBlog] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const [blogRes, commentsRes] = await Promise.all([
          axios.get(`/api/blogs/${id}`),
          axios.get(`/api/comments/${id}`),
        ]);
        setBlog(blogRes.data.blog);
        setLikeCount(blogRes.data.blog.likes?.length || 0);
        setLiked(user && blogRes.data.blog.likes?.includes(user._id));
        setComments(commentsRes.data.comments);
      } catch {
        toast.error('Blog not found');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, user, navigate]);

  const handleLike = async () => {
    if (!user) { toast.error('Please login to like'); return; }
    try {
      const { data } = await axios.put(`/api/blogs/${id}/like`);
      setLiked(data.isLiked);
      setLikeCount(data.likes);
    } catch { toast.error('Failed to like'); }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) { toast.error('Please login to comment'); return; }
    if (!commentText.trim()) return;
    setSubmittingComment(true);
    try {
      const { data } = await axios.post(`/api/comments/${id}`, { content: commentText });
      setComments([data.comment, ...comments]);
      setCommentText('');
      toast.success('Comment added!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`);
      setComments(comments.filter(c => c._id !== commentId));
      toast.success('Comment deleted');
    } catch { toast.error('Failed to delete comment'); }
  };

  const handleDeleteBlog = async () => {
    if (!window.confirm('Delete this blog? This cannot be undone.')) return;
    setDeletingBlog(true);
    try {
      await axios.delete(`/api/blogs/${id}`);
      toast.success('Blog deleted');
      navigate('/dashboard');
    } catch { toast.error('Failed to delete blog'); setDeletingBlog(false); }
  };

  if (loading) return (
    <div className="page-layout">
      <div className="container blog-detail-container">
        <div className="skeleton" style={{ height: 380, borderRadius: 16, marginBottom: 32 }} />
        <div className="skeleton" style={{ height: 36, width: '70%', marginBottom: 16 }} />
        <div className="skeleton" style={{ height: 18, marginBottom: 10 }} />
        <div className="skeleton" style={{ height: 18, width: '80%', marginBottom: 10 }} />
      </div>
    </div>
  );

  if (!blog) return null;
  const isOwner = user && (blog.author._id === user._id || user.role === 'admin');

  return (
    <div className="page-layout">
      <div className="container blog-detail-container animate-in">
        {blog.coverImage && (
          <div className="detail-cover">
            <img src={blog.coverImage} alt={blog.title} />
          </div>
        )}

        <div className="detail-meta">
          <span className="badge">{blog.category}</span>
          <span className="detail-read-time">⏱ {blog.readTime} min read</span>
          <span className="detail-views">👁 {blog.views} views</span>
        </div>

        <h1 className="detail-title">{blog.title}</h1>

        <div className="detail-author-row">
          <Link to={`/profile/${blog.author._id}`} className="detail-author">
            <div className="author-avatar-lg">
              {blog.author.avatar
                ? <img src={blog.author.avatar} alt={blog.author.username} />
                : <span>{blog.author.username[0].toUpperCase()}</span>
              }
            </div>
            <div>
              <div className="author-name-lg">{blog.author.username}</div>
              <div className="author-date">{format(new Date(blog.createdAt), 'MMMM d, yyyy')}</div>
            </div>
          </Link>

          {isOwner && (
            <div className="owner-controls">
              <Link to={`/edit/${blog._id}`} className="btn btn-outline" style={{ fontSize: 13, padding: '7px 14px' }}>✏️ Edit</Link>
              <button onClick={handleDeleteBlog} className="btn btn-danger" disabled={deletingBlog} style={{ fontSize: 13, padding: '7px 14px' }}>
                {deletingBlog ? '...' : '🗑 Delete'}
              </button>
            </div>
          )}
        </div>

        {blog.tags?.length > 0 && (
          <div className="detail-tags">
            {blog.tags.map(tag => <span key={tag} className="tag-chip">#{tag}</span>)}
          </div>
        )}

        <div className="divider" />
        {blog.excerpt && <p className="detail-excerpt">{blog.excerpt}</p>}
        <div className="detail-content" style={{ whiteSpace: 'pre-wrap' }}>{blog.content}</div>
        <div className="divider" />

        <div className="like-section">
          <button onClick={handleLike} className={`like-btn ${liked ? 'liked' : ''}`}>
            {liked ? '❤️' : '🤍'} {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
          </button>
        </div>

        <div className="divider" />

        <section className="comments-section">
          <h2 className="comments-title">💬 Comments <span className="comments-count">{comments.length}</span></h2>

          {user ? (
            <form onSubmit={handleComment} className="comment-form">
              <div className="comment-input-row">
                <div className="comment-avatar">{user.username[0].toUpperCase()}</div>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="form-control"
                  rows={3}
                  maxLength={1000}
                />
              </div>
              <div className="comment-actions">
                <span className="char-count">{commentText.length}/1000</span>
                <button type="submit" className="btn btn-primary" disabled={submittingComment || !commentText.trim()} style={{ fontSize: 14 }}>
                  {submittingComment ? <span className="btn-spinner" /> : 'Post Comment'}
                </button>
              </div>
            </form>
          ) : (
            <div className="login-to-comment">
              <Link to="/login" className="btn btn-primary" style={{ fontSize: 14 }}>Login to comment</Link>
            </div>
          )}

          <div className="comments-list">
            {comments.length === 0 ? (
              <div className="no-comments"><span>🌟</span><p>Be the first to comment!</p></div>
            ) : (
              comments.map(comment => (
                <div key={comment._id} className="comment-card">
                  <div className="comment-header">
                    <Link to={`/profile/${comment.author._id}`} className="comment-author">
                      <div className="comment-avatar-sm">
                        {comment.author.avatar
                          ? <img src={comment.author.avatar} alt={comment.author.username} />
                          : comment.author.username[0].toUpperCase()
                        }
                      </div>
                      <span>{comment.author.username}</span>
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span className="comment-time">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
                      {user && (user._id === comment.author._id || user.role === 'admin') && (
                        <button onClick={() => handleDeleteComment(comment._id)} className="delete-comment-btn" title="Delete">✕</button>
                      )}
                    </div>
                  </div>
                  <p className="comment-content">{comment.content}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
