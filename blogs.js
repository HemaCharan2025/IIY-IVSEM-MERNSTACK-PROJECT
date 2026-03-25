const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Blog = require('../models/Blog');
const { protect, adminOnly } = require('../middleware/auth');

// @route   GET /api/users/:id
// @desc    Get public profile of a user
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const blogCount = await Blog.countDocuments({ author: req.params.id, status: 'published' });
    res.json({ success: true, user, blogCount });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/users/:id/blogs
// @desc    Get all published blogs of a user
// @access  Public
router.get('/:id/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.params.id, status: 'published' })
      .sort({ createdAt: -1 })
      .populate('author', 'username avatar')
      .select('-content');
    res.json({ success: true, blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update own profile
// @access  Private
router.put('/profile/update', protect, async (req, res) => {
  try {
    const { username, bio, avatar } = req.body;

    // Check if new username is taken
    if (username && username !== req.user.username) {
      const exists = await User.findOne({ username });
      if (exists) {
        return res.status(400).json({ success: false, message: 'Username already taken' });
      }
    }

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { username, bio, avatar },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ success: true, user: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/users (admin)
// @desc    Get all users
// @access  Admin
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   DELETE /api/users/:id (admin)
// @desc    Delete a user
// @access  Admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Blog.deleteMany({ author: req.params.id });
    res.json({ success: true, message: 'User and their blogs deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
