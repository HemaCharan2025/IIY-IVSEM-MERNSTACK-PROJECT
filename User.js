const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Blog = require('../models/Blog');
const { protect } = require('../middleware/auth');

// @route   GET /api/comments/:blogId
// @desc    Get all comments for a blog
// @access  Public
router.get('/:blogId', async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId, parentComment: null })
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 });

    // Attach replies
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await Comment.find({ parentComment: comment._id })
          .populate('author', 'username avatar')
          .sort({ createdAt: 1 });
        return { ...comment.toObject(), replies };
      })
    );

    res.json({ success: true, comments: commentsWithReplies });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/comments/:blogId
// @desc    Add a comment to a blog
// @access  Private
router.post('/:blogId', protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    const comment = await Comment.create({
      content: req.body.content,
      author: req.user._id,
      blog: req.params.blogId,
      parentComment: req.body.parentComment || null,
    });

    await comment.populate('author', 'username avatar');
    res.status(201).json({ success: true, comment });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages[0] });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   DELETE /api/comments/:id
// @desc    Delete a comment
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    if (comment.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await Comment.findByIdAndDelete(req.params.id);
    // Also delete replies
    await Comment.deleteMany({ parentComment: req.params.id });

    res.json({ success: true, message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/comments/:id/like
// @desc    Like/Unlike a comment
// @access  Private
router.put('/:id/like', protect, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    const isLiked = comment.likes.includes(req.user._id);
    if (isLiked) {
      comment.likes = comment.likes.filter((id) => id.toString() !== req.user._id.toString());
    } else {
      comment.likes.push(req.user._id);
    }

    await comment.save();
    res.json({ success: true, likes: comment.likes.length, isLiked: !isLiked });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
