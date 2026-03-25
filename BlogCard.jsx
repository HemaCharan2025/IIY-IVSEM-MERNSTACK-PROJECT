.blog-form-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 24px 60px;
}

.blog-form-header {
  margin-bottom: 36px;
}

.blog-form-title {
  font-family: 'Sora', sans-serif;
  font-size: 32px;
  font-weight: 800;
  background: var(--gradient-main);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 6px;
}

.blog-form-subtitle {
  color: var(--text-muted);
  font-size: 15px;
}

.form-toggle {
  display: flex;
  gap: 8px;
  margin-top: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 4px;
  width: fit-content;
}

.toggle-btn {
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Outfit', sans-serif;
}

.toggle-btn.active {
  background: rgba(139, 92, 246, 0.2);
  color: var(--accent-pink);
}

.blog-form,
.blog-preview {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 36px;
}

.label-optional {
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0;
}

.cover-preview {
  width: 100%;
  max-height: 240px;
  object-fit: cover;
  border-radius: 10px;
  margin-top: 10px;
  border: 1px solid var(--border);
}

.title-input {
  font-size: 22px !important;
  font-weight: 700;
  font-family: 'Sora', sans-serif !important;
}

.char-count,
.word-count {
  display: block;
  text-align: right;
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 4px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.tags-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.content-editor {
  min-height: 400px;
  font-family: 'Outfit', monospace;
  font-size: 15px;
  line-height: 1.8;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

/* Preview */
.preview-cover {
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 24px;
}

.preview-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.preview-title {
  font-family: 'Sora', sans-serif;
  font-size: 36px;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.2;
  margin-bottom: 16px;
}

.preview-excerpt {
  font-size: 18px;
  color: var(--text-secondary);
  line-height: 1.7;
  border-left: 3px solid var(--accent-purple);
  padding-left: 16px;
  margin-bottom: 24px;
}

.preview-content {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.9;
}

@media (max-width: 600px) {
  .form-row { grid-template-columns: 1fr; }
  .blog-form, .blog-preview { padding: 22px 18px; }
}
