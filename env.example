const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    excerpt: {
      type: String,
      maxlength: [300, 'Excerpt cannot exceed 300 characters'],
    },
    coverImage: {
      type: String,
      default: '',
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    category: {
      type: String,
      enum: ['Technology', 'Science', 'Lifestyle', 'Education', 'Entertainment', 'Other'],
      default: 'Other',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    views: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
    },
    readTime: {
      type: Number, // in minutes
      default: 1,
    },
  },
  { timestamps: true }
);

// Auto-generate excerpt and read time before saving
blogSchema.pre('save', function (next) {
  if (this.isModified('content')) {
    // Auto excerpt
    if (!this.excerpt) {
      this.excerpt = this.content.replace(/<[^>]+>/g, '').substring(0, 200) + '...';
    }
    // Estimate read time (avg 200 wpm)
    const wordCount = this.content.replace(/<[^>]+>/g, '').split(/\s+/).length;
    this.readTime = Math.max(1, Math.ceil(wordCount / 200));
  }
  next();
});

// Indexes for search
blogSchema.index({ title: 'text', content: 'text', tags: 'text' });

module.exports = mongoose.model('Blog', blogSchema);
