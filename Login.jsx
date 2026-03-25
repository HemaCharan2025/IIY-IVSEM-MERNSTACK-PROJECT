.profile-page { max-width: 960px; margin: 0 auto; padding: 0 24px 80px; }
.profile-header-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 40px; text-align: center; margin-bottom: 40px; }
.profile-avatar-lg { width: 88px; height: 88px; border-radius: 50%; background: var(--gradient-main); display: flex; align-items: center; justify-content: center; font-size: 36px; font-weight: 800; color: white; margin: 0 auto 20px; overflow: hidden; border: 3px solid rgba(139,92,246,0.3); }
.profile-avatar-lg img { width: 100%; height: 100%; object-fit: cover; }
.profile-name { font-family: 'Sora', sans-serif; font-size: 28px; font-weight: 800; color: var(--text-primary); margin-bottom: 8px; }
.profile-bio { font-size: 15px; color: var(--text-secondary); max-width: 480px; margin: 0 auto 10px; line-height: 1.6; }
.profile-joined { font-size: 13px; color: var(--text-muted); margin-bottom: 24px; }
.profile-stats-row { display: flex; align-items: center; justify-content: center; gap: 0; }
.profile-stat { padding: 0 28px; text-align: center; }
.profile-stat-divider { width: 1px; height: 36px; background: var(--border); }
.ps-value { display: block; font-family: 'Sora', sans-serif; font-size: 24px; font-weight: 800; background: var(--gradient-main); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.ps-label { font-size: 12px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
.edit-form { max-width: 400px; margin: 0 auto; text-align: left; }
.profile-blogs { }
.section-title { font-family: 'Sora', sans-serif; font-size: 22px; font-weight: 700; color: var(--text-primary); margin-bottom: 24px; }
.profile-blogs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
.empty-profile { text-align: center; padding: 48px; background: var(--bg-card); border: 1px dashed var(--border); border-radius: var(--radius); color: var(--text-muted); }
@media (max-width: 600px) { .profile-blogs-grid { grid-template-columns: 1fr; } }
