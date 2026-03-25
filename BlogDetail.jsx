.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px 16px;
  position: relative;
}

.auth-glow {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.auth-container {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 44px 40px;
  width: 100%;
  max-width: 440px;
  position: relative;
  z-index: 1;
  box-shadow: var(--shadow-card), 0 0 60px rgba(139, 92, 246, 0.08);
}

.auth-header {
  text-align: center;
  margin-bottom: 36px;
}

.auth-logo {
  font-size: 32px;
  color: var(--accent-purple);
  margin-bottom: 16px;
  display: block;
}

.auth-title {
  font-family: 'Sora', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.auth-subtitle {
  font-size: 15px;
  color: var(--text-muted);
}

.auth-form {
  display: flex;
  flex-direction: column;
}

.auth-submit-btn {
  width: 100%;
  justify-content: center;
  padding: 14px;
  font-size: 16px;
  border-radius: 12px;
  margin-top: 4px;
}

.btn-spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.auth-footer {
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: var(--text-muted);
}

.auth-link {
  color: var(--accent-pink);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}

.auth-link:hover {
  color: var(--accent-purple);
  text-decoration: underline;
}

@media (max-width: 480px) {
  .auth-container {
    padding: 32px 22px;
  }
}
