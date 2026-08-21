import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';
import stgLogo from '../assets/stg-logo.png';

const loadCreds = () => {
  try {
    const s = sessionStorage.getItem('stg_admin_creds');
    if (s) return JSON.parse(s);
  } catch {}
  return { mobile: '9025594503', password: 'STGAdmin@2026' };
};

const AdminLogin = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('stg_admin_auth') === 'true') {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://api.codingboss.in/sports_app/admin-login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
          phone: mobile.trim(),
          password: password.trim()
        })
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('stg_admin_auth', 'true');
        if (data.token) {
          sessionStorage.setItem('stg_admin_token', data.token);
        } else if (data.access) {
          sessionStorage.setItem('stg_admin_token', data.access);
        }
        navigate('/admin/dashboard');
      } else {
        setError(data.error || data.message || data.detail || 'Invalid mobile number or password.');
      }
    } catch (err) {
      console.error("Login error:", err);
      setError('Network error or server unreachable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-bg">
      <div className="admin-login-scanlines" />
      
      <button className="admin-back-btn heading-font" onClick={() => navigate('/')}>
        <span className="arrow">←</span> BACK TO SITE
      </button>

      <div className="admin-login-card">
        <div className="admin-login-logo-row">
          <div className="admin-login-logo-ring">
            <img src={stgLogo} alt="STG Logo" style={{ width: '55%', height: '55%', objectFit: 'contain' }} />
          </div>
        </div>
        <h1 className="admin-login-title heading-font">STG <span className="admin-red">ADMIN</span></h1>
        <p className="admin-login-sub">PORTAL ACCESS — AUTHORIZED ONLY</p>

        <form className="admin-login-form" onSubmit={handleLogin}>
          <div className="admin-field">
            <label className="admin-label heading-font">MOBILE NUMBER</label>
            <div className="admin-input-wrap">
              <span className="admin-input-icon">📱</span>
              <input
                type="tel"
                className="admin-input"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                maxLength={10}
                required
              />
            </div>
          </div>

          <div className="admin-field">
            <label className="admin-label heading-font">PASSWORD</label>
            <div className="admin-input-wrap">
              <span className="admin-input-icon">🔒</span>
              <input
                type={showPass ? 'text' : 'password'}
                className="admin-input"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button type="button" className="admin-eye-btn" onClick={() => setShowPass(v => !v)}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {error && <div className="admin-error">⚠️ {error}</div>}

          <button type="submit" className="admin-login-btn heading-font" disabled={loading}>
            {loading ? <span className="admin-btn-spinner" /> : 'ENTER PORTAL'}
          </button>
        </form>

        <div className="admin-login-footer-note">
          STG Esports · Admin System v1.0
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
