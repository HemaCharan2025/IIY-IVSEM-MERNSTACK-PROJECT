const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const Comment = require('../models/Comment');
const { protect } = require('../middleware/auth');

// @route   GET /api/blogs
// @desc    Get all published blogs (with pagination, search, filter)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = { status: 'published' };

    // Search
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    // Category filter
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Tag filter
    if (req.query.tag) {
      query.tags = req.query.tag;
    }

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-content');

    res.json({
      success: true,
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/blogs/my
// @desc    Get logged in user's blogs
// @access  Private
router.get('/my', protect, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id })
      .sort({ createdAt: -1 })
      .select('-content');
    res.json({ success: true, blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/blogs/:id
// @desc    Get single blog by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'username avatar bio');
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    // Increment views
    await Blog.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });

    res.json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/blogs
// @desc    Create a new blog
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { title, content, excerpt, tags, category, coverImage, status } = req.body;

    const blog = await Blog.create({
      title,
      content,
      excerpt,
      tags: tags ? tags.split(',').map((t) => t.trim()) : [],
      category: category || 'Other',
      coverImage: coverImage || '',
      status: status || 'published',
      author: req.user._id,
    });

    await blog.populate('author', 'username avatar');

    res.status(201).json({ success: true, blog });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages[0] });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/blogs/:id
// @desc    Update a blog
// @access  Private (owner only)
router.put('/:id', protect, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this blog' });
    }

    const { title, content, excerpt, tags, category, coverImage, status } = req.body;
    const updateData = {
      title,
      content,
      excerpt,
      category,
      coverImage,
      status,
      tags: tags ? tags.split(',').map((t) => t.trim()) : blog.tags,
    };

    blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).populate('author', 'username avatar');

    res.json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog
// @access  Private (owner or admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this blog' });
    }

    await Blog.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ blog: req.params.id });

    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/blogs/:id/like
// @desc    Like / Unlike a blog
// @access  Private
router.put('/:id/like', protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    const isLiked = blog.likes.includes(req.user._id);
    if (isLiked) {
      blog.likes = blog.likes.filter((id) => id.toString() !== req.user._id.toString());
    } else {
      blog.likes.push(req.user._id);
    }

    await blog.save();
    res.json({ success: true, likes: blog.likes.length, isLiked: !isLiked });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
