.dashboard-page { max-width: 960px; margin: 0 auto; padding: 0 24px 80px; }
.dashboard-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; margin-bottom: 36px; flex-wrap: wrap; }
.dashboard-title { font-family: 'Sora', sans-serif; font-size: 36px; font-weight: 800; background: var(--gradient-main); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 4px; }
.dashboard-subtitle { font-size: 16px; color: var(--text-muted); }
.highlight { color: var(--accent-pink); font-weight: 600; -webkit-text-fill-color: var(--accent-pink); }
.stats-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-bottom: 40px; }
.stat-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px 16px; text-align: center; transition: all 0.2s; }
.stat-card:hover { border-color: var(--border-hover); transform: translateY(-2px); box-shadow: var(--shadow-glow); }
.stat-value { font-family: 'Sora', sans-serif; font-size: 32px; font-weight: 800; background: var(--gradient-main); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 4px; }
.stat-label { font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
.section-title { font-family: 'Sora', sans-serif; font-size: 22px; font-weight: 700; color: var(--text-primary); margin-bottom: 20px; }
.blogs-list { display: flex; flex-direction: column; gap: 14px; }
.blog-list-item { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; display: flex; align-items: center; gap: 16px; transition: all 0.2s; }
.blog-list-item:hover { border-color: var(--border-hover); box-shadow: 0 4px 20px rgba(139, 92, 246, 0.1); }
.list-item-cover { width: 80px; height: 60px; border-radius: 8px; overflow: hidden; flex-shrink: 0; }
.list-item-cover img { width: 100%; height: 100%; object-fit: cover; }
.list-item-body { flex: 1; min-width: 0; }
.list-item-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap; }
.status-badge { padding: 2px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
.status-badge.published { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); }
.status-badge.draft { background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); }
.list-item-time { font-size: 12px; color: var(--text-muted); }
.list-item-title { font-size: 16px; font-weight: 700; margin-bottom: 8px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.list-item-title a { color: var(--text-primary); text-decoration: none; transition: color 0.2s; }
.list-item-title a:hover { color: var(--accent-pink); }
.list-item-stats { display: flex; gap: 14px; font-size: 12px; color: var(--text-muted); }
.list-item-actions { display: flex; gap: 8px; flex-shrink: 0; }
.empty-dash { text-align: center; padding: 60px 24px; background: var(--bg-card); border: 1px dashed var(--border); border-radius: var(--radius); }
.empty-dash h3 { font-family: 'Sora', sans-serif; font-size: 22px; color: var(--text-primary); margin-bottom: 8px; }
.empty-dash p { color: var(--text-muted); font-size: 15px; }
@media (max-width: 900px) { .stats-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 640px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } .blog-list-item { flex-direction: column; align-items: flex-start; } .list-item-actions { width: 100%; justify-content: flex-end; } }
