import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { loadEvents, saveEvents, sortEvents, formatRomanTitle } from '../components/eventsData';

const renderRomanTitle = (title) => {
  if (!title) return 'Untitled Event';
  const words = title.split(' ');
  const lastWord = words[words.length - 1];
  
  if (/^[IVXLCDM]+$/i.test(lastWord)) {
    words.pop();
    return (
      <>
        {words.join(' ')} {words.length > 0 ? ' ' : ''}
        <span className="roman-serif">{lastWord}</span>
      </>
    );
  }
  return title;
};

/* ─── Credentials Storage ────────────────────────────────── */
const CREDS_KEY = 'stg_admin_creds';
const DEFAULT_CREDS = { mobile: '9025594503', password: 'STGAdmin@2026' };

const loadCreds = () => {
  try {
    const s = sessionStorage.getItem(CREDS_KEY);
    if (s) return JSON.parse(s);
  } catch {}
  return DEFAULT_CREDS;
};

/* ─── Default Teams ──────────────────────────────────────── */
const DEFAULT_TEAM_IMAGES = {
  esports: "https://thumbs.dreamstime.com/b/professional-esports-gamer-rejoices-victory-red-game-room-background-professional-esports-gamer-rejoices-victory-273619312.jpg",
  raiders: "https://t3.ftcdn.net/jpg/04/43/09/58/360_F_443095819_8t79WqB05n196x3cIhA0vCgN5Z5wH17z.jpg",
  warriors: "https://t4.ftcdn.net/jpg/05/23/06/15/360_F_523061559_kPjS60EaB0n15l3Z2q09VbO8M1X9I6C8.jpg",
  mindrip: "https://t3.ftcdn.net/jpg/06/14/08/94/360_F_614089476_8s9a067l4p193W1e0pX6V3n2G0p1B3a4.jpg",
  juniors: "https://t4.ftcdn.net/jpg/06/25/08/42/360_F_625084294_1R3x6t9p0q2P0u8v1W0n2S3Z1p0B5a7.jpg"
};

const DEFAULT_TEAMS = {
  esports: {
    label: 'STG Esports', glow: '#e60000', img: DEFAULT_TEAM_IMAGES.esports,
    players: [
      { id: 'es1', tag: 'STGzLitboii', roleLabel: 'IGL(LEADER)', description: 'Leads the team with smart decisions and strategies.\nControls gameplay, rotations, and team coordination.', ig: 'panipuri.nub', igLink: 'https://www.instagram.com/panipuri.nub?igsh=NjhqaHVudTljZmV4', img: null, badge: '🎮' },
      { id: 'es2', tag: 'STGzspencer', roleLabel: 'MENTOR', description: 'Guides the team with experience and insights\nImproves performance, mindset, and teamwork', ig: 'ghost_snipes', igLink: '', img: null, badge: '🎯' },
      { id: 'es3', tag: 'STGzZucksyy', roleLabel: 'ENTRY FRAGGER', description: 'Initiates fights and takes first contact\nCreates openings with aggressive plays', ig: 'zucksyyy_playss', igLink: 'https://www.instagram.com/zucksyyy_playss?igsh=cmN3bzZjdnF5cW1m', img: null, badge: '🛡️' },
      { id: 'es4', tag: 'STGzSycnoOG', roleLabel: 'ENTRY FRAGGER', description: 'Fearless frontline attacker in every push\nBreaks enemy defense with quick actions', ig: 'rex.sycnoo', igLink: 'https://www.instagram.com/rex.sycnoo?igsh=MWUwdG1xYTUxamJ2eQ==', img: null, badge: '⚡' },
      { id: 'es5', tag: 'STGzJONNY', roleLabel: 'ASSAULTER', description: 'Reliable fighter in intense situations\nSupports team with strong combat skills', ig: 'jonny_islive', igLink: 'https://www.instagram.com/jonny_islive?igsh=MWZhNW50ejVuY3Zmbw==', img: null, badge: '📊' },
      { id: 'es6', tag: 'STGzSTUNN', roleLabel: 'ASSAULTER/RIFLER', description: 'Master of versatility and high-precision rifling.\nDominates mid-range combat.', ig: '_stunn16', igLink: 'https://www.instagram.com/_stunn16?igsh=MW11aHRmNzg5MXR3Yw==', img: null, badge: '🏆' },
    ]
  },
  raiders: {
    label: 'STG Raiders', glow: '#39FF14', img: DEFAULT_TEAM_IMAGES.raiders,
    players: [
      { id: 'ra1', tag: 'STGzMaViMVP', roleLabel: 'ENTRY FRAGGER', description: 'Elite Entry Fragger with 4 years of professional experience.\nIGN ID: 5746388363', ig: 'maviesm_', igLink: 'https://www.instagram.com/maviesm_?igsh=MXFkc2ZhbHJjOTZnYQ%3D%3D&utm_source=qr', img: null, badge: '⚡' },
      { id: 'ra2', tag: 'STGzPHENOMENAL', roleLabel: 'ASSAULTER/ENTRY FRAGGER', description: 'High-impact Assaulter and Entry Fragger with 5+ years of competitive experience.\nIGN ID: 5229964999', ig: 'saheal.bgmi', igLink: 'https://www.instagram.com/saheal.bgmi?igsh=dGNpOHZxMmVtczkx', img: null, badge: '🎯' },
      { id: 'ra3', tag: 'STGzMoneyy', roleLabel: 'ENTRY FRAGGER/ASSAULTER', description: 'Aggressive Entry Fragger and Assaulter with 4.5 years of experience.\nIGN ID: 5835189437', ig: 'moneyyy.og', igLink: 'https://www.instagram.com/moneyyy.og?igsh=MWQ3NGlhdzh2Zjhhcg==', img: null, badge: '💰' },
      { id: 'ra4', tag: 'STGzDrDooM', roleLabel: 'IGL (LEADER)', description: 'Strategic In-Game Leader with 5 years of professional experience.\nIGN ID: 5200981165', ig: 'ig_dr.doom_igl', igLink: 'https://www.instagram.com/ig_dr.doom_igl?igsh=MW50YXRlNmhkeGNsMg==', img: null, badge: '👑' },
      { id: 'ra5', tag: 'STGzShiYi', roleLabel: 'FRAGGER / FILTER', description: 'Experienced Fragger and Filter with 7 years of professional gaming.\nIGN ID: 5879754323', ig: 'shiyiijood', igLink: 'https://www.instagram.com/shiyiijood?igsh=YnFtOWkzMHBidmU2', img: null, badge: '🎖️' },
      { id: 'ra6', tag: '----------', roleLabel: '----------', description: 'Profile under construction.\nComing soon to STG RAIDERS.', ig: 'stgesports.in', igLink: '', img: null, badge: '👤' },
    ]
  },
  warriors: { label: 'STG Warriors', glow: '#ff8c00', img: DEFAULT_TEAM_IMAGES.warriors, players: Array.from({ length: 6 }, (_, i) => ({ id: `wa${i+1}`, tag: '----------', roleLabel: '----------', description: 'Profile under construction.\nComing soon to STG WARRIORS.', ig: 'stgesports.in', igLink: '', img: null, badge: '👤' })) },
  mindrip:  { label: 'STG Mindrip',  glow: '#00f2ff', img: DEFAULT_TEAM_IMAGES.mindrip, players: Array.from({ length: 6 }, (_, i) => ({ id: `mr${i+1}`, tag: '----------', roleLabel: '----------', description: 'Profile under construction.\nComing soon to STG MINDRIP.',  ig: 'stgesports.in', igLink: '', img: null, badge: '👤' })) },
  juniors:  { label: 'STG Juniors',  glow: '#ffff00', img: DEFAULT_TEAM_IMAGES.juniors, players: Array.from({ length: 6 }, (_, i) => ({ id: `jr${i+1}`, tag: '----------', roleLabel: '----------', description: 'Profile under construction.\nComing soon to STG JUNIORS.',  ig: 'stgesports.in', igLink: '', img: null, badge: '👤' })) },
};

// Teams are saved to localStorage so players persist across refresh/logout
const TEAMS_STORAGE_KEY = 'stg_teams_v2';

const loadTeams = () => {
  try {
    const raw = localStorage.getItem(TEAMS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) return parsed;
    }
  } catch (e) { /* ignore */ }
  return {};
};

const saveTeams = (teams) => {
  try {
    // Strip base64 images before saving to keep storage small
    const slim = {};
    for (const [k, t] of Object.entries(teams)) {
      slim[k] = {
        ...t,
        img: t.img && t.img.startsWith('data:') ? null : t.img,
        players: (t.players || []).map(p => ({
          ...p,
          img: p.img && typeof p.img === 'string' && p.img.startsWith('data:') ? null : p.img
        }))
      };
    }
    localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(slim));
  } catch (e) { console.warn('saveTeams failed:', e); }
};

const newBlankPlayer = (teamKey, idx) => ({
  id: `${teamKey}_new_${Date.now()}_${idx}`,
  tag: '', roleLabel: '', description: '', ig: '', igLink: '', img: null, badge: '👤',
});

/* ─── Custom Confirm Delete Modal ───────────────────────── */
const ConfirmDeleteModal = ({ playerName, onConfirm, onCancel }) => (
  <div className="adm-modal-overlay" onClick={onCancel}>
    <div className="adm-confirm-modal" onClick={e => e.stopPropagation()}>
      <div className="adm-confirm-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </div>
      <h3 className="adm-confirm-title heading-font">DELETE PLAYER</h3>
      <p className="adm-confirm-msg">Are you sure you want to delete <span className="adm-confirm-name">"{playerName || 'this player'}"</span>?<br/>This action cannot be undone.</p>
      <div className="adm-confirm-actions">
        <button className="adm-confirm-cancel" onClick={onCancel}>CANCEL</button>
        <button className="adm-confirm-yes" onClick={onConfirm}>YES, DELETE</button>
      </div>
    </div>
  </div>
);


/* ─── Delete Team Confirm Modal ──────────────────────────── */
const ConfirmDeleteTeamModal = ({ teamName, onConfirm, onCancel }) => (
  <div className="adm-modal-overlay" onClick={onCancel}>
    <div className="adm-confirm-modal" onClick={e => e.stopPropagation()}>
      <div className="adm-confirm-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </div>
      <h3 className="adm-confirm-title heading-font">DELETE TEAM</h3>
      <p className="adm-confirm-msg">Are you sure you want to delete <span className="adm-confirm-name">"{teamName}"</span> and all its players?<br/>This action cannot be undone.</p>
      <div className="adm-confirm-actions">
        <button className="adm-confirm-cancel" onClick={onCancel}>CANCEL</button>
        <button className="adm-confirm-yes" onClick={onConfirm}>YES, DELETE</button>
      </div>
    </div>
  </div>
);

/* ─── Player Edit / Add Modal ───────────────────────────── */
const PlayerEditModal = ({ player, teamGlow, teamLabel, isNew, onSave, onDelete, onClose }) => {
  const [form, setForm]         = useState({ ...player });
  const [imgPreview, setPreview] = useState(player.img || null);
  const [confirmDel, setConfirm] = useState(false);
  const fileRef = useRef();

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      // Compress image using canvas before storing
      const img = new Image();
      img.onload = () => {
        const MAX_W = 200, MAX_H = 250;
        let w = img.width, h = img.height;
        if (w > MAX_W || h > MAX_H) {
          const ratio = Math.min(MAX_W / w, MAX_H / h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        const compressed = canvas.toDataURL('image/jpeg', 0.65);
        setPreview(compressed);
        setForm(f => ({ ...f, img: compressed }));
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="adm-modal-overlay" onClick={onClose}>
      <div className="adm-modal" onClick={e => e.stopPropagation()}>
        <div className="adm-modal-header" style={{ borderColor: teamGlow }}>
          <h3 className="adm-modal-title heading-font">{isNew ? '➕ ADD PLAYER' : '✏️ EDIT PLAYER'}</h3>
          <button className="adm-modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="adm-modal-body">
          {isNew && (
            <div className="adm-team-badge" style={{ borderColor: teamGlow, color: teamGlow }}>
              <span className="adm-tab-dot" style={{ background: teamGlow }} />
              Team: {teamLabel}
            </div>
          )}

          {/* Photo */}
          <div className="adm-photo-section">
            <div className="adm-photo-preview" style={{ borderColor: teamGlow }} onClick={() => fileRef.current.click()}>
              {imgPreview
                ? <img loading="lazy" decoding="async" src={imgPreview} alt="Preview" className="adm-photo-img" />
                : <div className="adm-photo-placeholder">
                    <span style={{ fontSize: '2rem' }}>📷</span>
                    <span className="adm-photo-hint">Tap to upload</span>
                  </div>
              }
              <div className="adm-photo-overlay">📷 Change</div>
            </div>
            <input type="file" accept="image/*" ref={fileRef} style={{ display: 'none' }} onChange={handleImg} />
            {imgPreview && (
              <button className="adm-remove-photo-btn" onClick={() => { setPreview(null); setForm(f => ({ ...f, img: null })); }}>
                ✕ Remove
              </button>
            )}
          </div>

          {/* Fields */}
          <div className="adm-fields">
            {[
              { label: 'PLAYER TAG (NAME)', field: 'tag', placeholder: 'e.g. STGzPhantom' },
              { label: 'ROLE', field: 'roleLabel', placeholder: 'e.g. ENTRY FRAGGER' },
            ].map(({ label, field, placeholder }) => (
              <div className="adm-field-group" key={field}>
                <label className="adm-field-label heading-font">{label}</label>
                <input className="adm-field-input" value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} placeholder={placeholder} />
              </div>
            ))}
            <div className="adm-field-group">
              <label className="adm-field-label heading-font">DESCRIPTION</label>
              <textarea className="adm-field-input adm-textarea" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Player description..." rows={3} />
            </div>
            <div className="adm-field-group">
              <label className="adm-field-label heading-font">INSTAGRAM USERNAME</label>
              <div className="adm-ig-row">
                <span className="adm-ig-at">@</span>
                <input className="adm-field-input" value={form.ig} onChange={e => setForm(f => ({ ...f, ig: e.target.value }))} placeholder="username" />
              </div>
            </div>
            <div className="adm-field-group">
              <label className="adm-field-label heading-font">INSTAGRAM LINK (optional)</label>
              <input className="adm-field-input" value={form.igLink} onChange={e => setForm(f => ({ ...f, igLink: e.target.value }))} placeholder="https://instagram.com/..." />
            </div>
          </div>
        </div>

        <div className="adm-modal-footer">
          {!isNew && (
            confirmDel
              ? <div className="adm-confirm-del">
                  <span>Delete this player?</span>
                  <button className="adm-btn-del-yes" onClick={() => { onDelete(player.id); onClose(); }}>YES</button>
                  <button className="adm-btn-cancel" onClick={() => setConfirm(false)}>NO</button>
                </div>
              : <button className="adm-btn-delete" onClick={() => setConfirm(true)}>🗑 DELETE</button>
          )}
          {!confirmDel && <>
            <button className="adm-btn-cancel" onClick={onClose}>CANCEL</button>
            <button
              className="adm-btn-save"
              style={{ background: `linear-gradient(135deg, ${teamGlow}bb, ${teamGlow})`, boxShadow: `0 4px 20px ${teamGlow}44`, color: '#000' }}
              onClick={() => { onSave(form); onClose(); }}
            >
              {isNew ? 'ADD PLAYER' : 'SAVE CHANGES'}
            </button>
          </>}
        </div>
      </div>
    </div>
  );
};

/* ─── Team Edit / Add Modal ─────────────────────────────────────── */
const TeamEditModal = ({ team, isNew, onSave, onClose }) => {
  const [form, setForm] = useState({ 
    label: team?.label || '', 
    glow: team?.glow || '#e60000', 
    img: team?.img || null 
  });
  const [imgPreview, setPreview] = useState(form.img);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef();

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setPreview(ev.target.result); setForm(f => ({ ...f, img: ev.target.result })); };
    reader.readAsDataURL(file);
  };

  const isValidHex = (c) => /^#[0-9A-Fa-f]{6}$/i.test(c);

  const handleSave = () => {
    if (!form.label.trim()) return;
    onSave(form);
    onClose();
  };

  return (
    <div className="adm-modal-overlay" onClick={onClose}>
      <div
        className="adm-modal"
        onClick={e => e.stopPropagation()}
        style={{ boxShadow: `0 0 40px ${form.glow}22, 0 20px 60px rgba(0,0,0,0.8)` }}
      >
        <div className="adm-modal-header" style={{ borderColor: form.glow, background: `linear-gradient(135deg, ${form.glow}18 0%, transparent 60%)` }}>
          <h3 className="adm-modal-title heading-font" style={{ color: form.glow }}>{isNew ? '➕ ADD NEW TEAM' : '✏️ EDIT TEAM'}</h3>
          <button className="adm-modal-close" onClick={onClose} disabled={saving}>✕</button>
        </div>
        <div className="adm-modal-body">
          {/* Photo */}
          <div className="adm-photo-section">
            <div className="adm-photo-preview" style={{ borderColor: form.glow }} onClick={() => fileRef.current.click()}>
              {imgPreview
                ? <img loading="lazy" decoding="async" src={imgPreview} alt="Preview" className="adm-photo-img" style={{ objectFit: 'cover' }} />
                : <div className="adm-photo-placeholder">
                    <span style={{ fontSize: '2rem' }}>📷</span>
                    <span className="adm-photo-hint">Team Logo</span>
                  </div>
              }
              <div className="adm-photo-overlay">📷 Change</div>
            </div>
            <input type="file" accept="image/*" ref={fileRef} style={{ display: 'none' }} onChange={handleImg} />
            {imgPreview && (
              <button className="adm-remove-photo-btn" onClick={() => { setPreview(null); setForm(f => ({ ...f, img: null })); }}>
                ✕ Remove
              </button>
            )}
          </div>

          <div className="adm-fields">
            <div className="adm-field-group">
              <label className="adm-field-label heading-font">TEAM NAME</label>
              <input
                className="adm-field-input"
                value={form.label}
                onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
                placeholder="e.g. STG Newbies"
                autoFocus
                disabled={saving}
                style={{ borderColor: form.glow, boxShadow: `0 0 8px ${form.glow}33` }}
              />
            </div>
            <div className="adm-field-group">
              <label className="adm-field-label heading-font">TEAM COLOR</label>
              <div style={{
                display: 'flex', gap: '15px', alignItems: 'center',
                background: 'rgba(255,255,255,0.05)', padding: '10px',
                borderRadius: '8px',
                border: `1px solid ${form.glow}`,
                boxShadow: `0 0 8px ${form.glow}33`
              }}>
                <input
                  type="color"
                  value={isValidHex(form.glow) ? form.glow : '#ffffff'}
                  onChange={e => setForm(f => ({ ...f, glow: e.target.value }))}
                  style={{ width: '40px', height: '40px', padding: '0', border: 'none', cursor: 'pointer', background: 'transparent', borderRadius: '6px' }}
                />
                <input
                  className="adm-field-input"
                  value={form.glow}
                  onChange={e => setForm(f => ({ ...f, glow: e.target.value }))}
                  onBlur={e => {
                    const ctx = document.createElement('canvas').getContext('2d');
                    ctx.fillStyle = e.target.value;
                    if (ctx.fillStyle !== '#000000' || e.target.value.toLowerCase() === 'black' || e.target.value === '#000000') {
                      setForm(f => ({ ...f, glow: ctx.fillStyle }));
                    }
                  }}
                  placeholder="#ffffff or red or rgb(...)"
                  style={{
                    flex: 1, margin: 0,
                    borderColor: form.glow,
                    boxShadow: `0 0 6px ${form.glow}33`,
                    fontWeight: '700',
                    color: form.glow,
                    letterSpacing: '1px'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="adm-modal-footer">
          <button className="adm-btn-cancel" onClick={onClose} disabled={saving}>CANCEL</button>
          <button
            className="adm-btn-save"
            style={{
              background: saving
                ? 'rgba(255,255,255,0.15)'
                : `linear-gradient(135deg, ${form.glow}bb, ${form.glow})`,
              color: '#000',
              cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.8 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}
            disabled={saving}
            onClick={handleSave}
          >
            {saving ? (
              <>
                <span style={{
                  display: 'inline-block',
                  width: '14px', height: '14px',
                  border: '2px solid rgba(0,0,0,0.3)',
                  borderTopColor: '#000',
                  borderRadius: '50%',
                  animation: 'adm-spin 0.7s linear infinite'
                }} />
                SAVING...
              </>
            ) : (
              isNew ? 'ADD TEAM' : 'SAVE CHANGES'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Profile Modal ──────────────────────────────────────── */
const ProfileModal = ({ onClose }) => {
  const creds = loadCreds();
  const [mobile, setMobile] = useState(creds.mobile || '');
  const [pass, setPass] = useState('');
  const [confPass, setConf] = useState('');
  const [showP, setShowP] = useState(false);
  const [showC, setShowC] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleSave = async () => {
    if (pass && pass !== confPass) {
      setMsg({ type: 'err', text: '⚠️ Passwords do not match' });
      return;
    }

    try {
      const response = await fetch('https://api.codingboss.in/sports_app/admin-profile/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${sessionStorage.getItem('stg_admin_token') || ''}`,
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
          phone: mobile.trim(),
          password: pass || creds.password,
        })
      });

      const data = await response.json();
      if (response.ok) {
        const newCreds = { mobile: mobile.trim(), password: pass || creds.password };
        sessionStorage.setItem(CREDS_KEY, JSON.stringify(newCreds));
        setMsg({ type: 'ok', text: '✅ Credentials updated! New login active.' });
        setTimeout(onClose, 1800);
      } else {
        setMsg({ type: 'err', text: data.error || data.message || '⚠️ Failed to update credentials' });
      }
    } catch (err) {
      console.error(err);
      setMsg({ type: 'err', text: '⚠️ Network error. Try again.' });
    }
  };

  return (
    <div className="adm-modal-overlay" onClick={onClose}>
      <div className="adm-modal" onClick={e => e.stopPropagation()}>
        <div className="adm-modal-header" style={{ borderColor: '#e60000' }}>
          <h3 className="adm-modal-title heading-font">👤 ADMIN PROFILE</h3>
          <button className="adm-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="adm-modal-body">
          <p className="adm-profile-hint">Update your login credentials. Leave password blank to keep current one.</p>
          <div className="adm-fields">
            <div className="adm-field-group">
              <label className="adm-field-label heading-font">MOBILE NUMBER</label>
              <div className="adm-input-icon-wrap">
                <span className="adm-fi">📱</span>
                <input className="adm-field-input" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="Mobile number" maxLength={15} />
              </div>
            </div>
            <div className="adm-field-group">
              <label className="adm-field-label heading-font">NEW PASSWORD</label>
              <div className="adm-input-icon-wrap">
                <span className="adm-fi">🔒</span>
                <input className="adm-field-input" type={showP ? 'text' : 'password'} value={pass} onChange={e => setPass(e.target.value)} placeholder="New password (leave blank to keep)" />
                <button type="button" className="adm-eye-btn" onClick={() => setShowP(v => !v)}>{showP ? '🙈' : '👁️'}</button>
              </div>
            </div>
            <div className="adm-field-group">
              <label className="adm-field-label heading-font">CONFIRM NEW PASSWORD</label>
              <div className="adm-input-icon-wrap">
                <span className="adm-fi">🔒</span>
                <input className="adm-field-input" type={showC ? 'text' : 'password'} value={confPass} onChange={e => setConf(e.target.value)} placeholder="Confirm new password" />
                <button type="button" className="adm-eye-btn" onClick={() => setShowC(v => !v)}>{showC ? '🙈' : '👁️'}</button>
              </div>
            </div>
            {msg && <div className={`adm-profile-msg ${msg.type === 'ok' ? 'adm-msg-ok' : 'adm-msg-err'}`}>{msg.text}</div>}
          </div>
        </div>
        <div className="adm-modal-footer">
          <button className="adm-btn-cancel" onClick={onClose}>CANCEL</button>
          <button className="adm-btn-save" style={{ background: 'linear-gradient(135deg, #cc0000, #e60000)', color: '#fff', boxShadow: '0 4px 20px rgba(230,0,0,0.4)' }} onClick={handleSave}>
            SAVE CREDENTIALS
          </button>
        </div>
      </div>
    </div>
  );
};



/* ─── Event Edit / Add Modal ────────────────────────────── */
const EventEditModal = ({ event, isNew, onSave, onDelete, onClose }) => {
  const [form, setForm] = React.useState({ ...event });
  const [imgPreview, setPreview] = React.useState(event.posterImage || null);
  const [confirmDel, setConfirm] = React.useState(false);
  const fileRef = React.useRef();

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setPreview(ev.target.result); setForm(f => ({ ...f, posterImage: ev.target.result })); };
    reader.readAsDataURL(file);
  };

  return (
    <div className="adm-modal-overlay" onClick={onClose}>
      <div className="adm-modal" onClick={e => e.stopPropagation()} style={{ width: '600px', maxWidth: '95%' }}>
        <div className="adm-modal-header" style={{ borderColor: '#e60000' }}>
          <h3 className="adm-modal-title heading-font">{isNew ? '➕ ADD EVENT' : '✏️ EDIT EVENT'}</h3>
          <button className="adm-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="adm-modal-body">
          <div className="adm-photo-section">
            <div className="adm-photo-preview" style={{ borderColor: '#e60000', height: '150px', aspectRatio: '16/9' }} onClick={() => fileRef.current.click()}>
              {imgPreview
                ? <img loading="lazy" src={imgPreview} alt="Preview" className="adm-photo-img" style={{ objectFit: 'cover' }} />
                : <div className="adm-photo-placeholder"><span style={{fontSize: '2rem'}}>📷</span><span className="adm-photo-hint">Poster Image</span></div>
              }
            </div>
            <input type="file" accept="image/*" ref={fileRef} style={{ display: 'none' }} onChange={handleImg} />
          </div>
          <div className="adm-fields">
            <div className="adm-field-group">
              <label className="adm-field-label heading-font">OPERATION TITLE</label>
              <input 
                className="adm-field-input" 
                value={form.title} 
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))} 
                onBlur={() => setForm(f => ({ ...f, title: formatRomanTitle(f.title) }))}
                placeholder="e.g. STG OPERATION\nI" 
              />
            </div>
            <div className="adm-field-group">
              <label className="adm-field-label heading-font">SERIES & SEASON</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input className="adm-field-input" value={form.series} onChange={e => setForm(f => ({ ...f, series: e.target.value }))} placeholder="STG SERIES" />
                <input className="adm-field-input" value={form.season} onChange={e => setForm(f => ({ ...f, season: e.target.value }))} placeholder="01" />
              </div>
            </div>
            <div className="adm-field-group">
              <label className="adm-field-label heading-font">STATUS & PRIZE POOL</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <select className="adm-field-input" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="UPCOMING">UPCOMING</option>
                </select>
                <input className="adm-field-input" value={form.prizePool} onChange={e => setForm(f => ({ ...f, prizePool: e.target.value }))} placeholder="₹10,000" />
              </div>
            </div>
            <div className="adm-field-group">
              <label className="adm-field-label heading-font">PERIOD</label>
              <input className="adm-field-input" value={form.period} onChange={e => setForm(f => ({ ...f, period: e.target.value }))} placeholder="JANUARY 2024" />
            </div>
            <div className="adm-field-group">
              <label className="adm-field-label heading-font">YOUTUBE VIDEO URL (optional)</label>
              <input className="adm-field-input" value={form.videoUrl} onChange={e => setForm(f => ({ ...f, videoUrl: e.target.value }))} placeholder="https://youtube.com/live/..." />
            </div>
            <div className="adm-field-group">
              <label className="adm-field-label heading-font">DESCRIPTION</label>
              <textarea className="adm-field-input adm-textarea" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Event details..." rows={4} />
            </div>
          </div>
        </div>
        <div className="adm-modal-footer">
          {!isNew && (
            confirmDel ? (
              <div className="adm-confirm-del">
                <span>Delete event?</span>
                <button className="adm-btn-del-yes" onClick={() => { onDelete(form.id); onClose(); }}>YES</button>
                <button className="adm-btn-cancel" onClick={() => setConfirm(false)}>NO</button>
              </div>
            ) : <button className="adm-btn-delete" onClick={() => setConfirm(true)}>🗑 DELETE</button>
          )}
          {!confirmDel && <>
            <button className="adm-btn-cancel" onClick={onClose}>CANCEL</button>
            <button className="adm-btn-save" style={{ background: '#e60000', color: '#fff' }} onClick={() => { onSave(form); onClose(); }}>{isNew ? 'ADD EVENT' : 'SAVE CHANGES'}</button>
          </>}
        </div>
      </div>
    </div>
  );
};

/* ─── Main Dashboard ─────────────────────────────────────── */
const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab]           = useState('teams');
  const [eventsList, setEventsList]         = useState([]);

  // One-time cleanup: remove legacy team and events sessionStorage
  useEffect(() => {
    try {
      // Teams and events are now API-only — remove any stale cached data
      sessionStorage.removeItem('stg_admin_teams');
      sessionStorage.removeItem('stg_admin_events');
    } catch (e) {
      console.warn('Clearing corrupted sessionStorage:', e);
      sessionStorage.removeItem('stg_admin_events');
      sessionStorage.removeItem('stg_admin_teams');
    }
  }, []); // runs once on mount
  const [editingEvent, setEditingEvent]     = useState(null);
  const [isNewEvent, setIsNewEvent]         = useState(false);
  const [deleteEventInfo, setDeleteEvent]   = useState(null);
  const [teams, setTeams]                   = useState(() => loadTeams());
  const [activeTeam, setActiveTeam]         = useState('esports');
  const [editingPlayer, setEditing]         = useState(null);
  const [isNewPlayer, setIsNew]             = useState(false);
  const [showProfile, setShowProfile]       = useState(false);
  const [isMenuOpen, setIsMenuOpen]         = useState(false);
  const [toast, setToast]                   = useState('');
  const [deletePlayerInfo, setDeletePlayer] = useState(null); // { id, name }
  const [showTeamEdit, setShowTeamEdit]       = useState(false);
  const [editingTeamKey, setEditingTeamKey]   = useState(null);
  const [addToTeamKey, setAddToTeamKey]     = useState(null);
  const [deleteTeamKey, setDeleteTeamKey]   = useState(null);
  const [editingDetails, setEditingDetails] = useState(null); // details editor state

  const fetchTeamsFromAPI = async () => {
    try {
      const [teamsRes, playersRes] = await Promise.all([
        fetch('https://api.codingboss.in/sports_app/get-team/', { headers: { 'ngrok-skip-browser-warning': 'true' } }),
        fetch('https://api.codingboss.in/sports_app/get-player/', { headers: { 'ngrok-skip-browser-warning': 'true' } }).catch(() => null)
      ]);

      if (!teamsRes.ok) return;
      const tData = await teamsRes.json();
      const apiTeams = Array.isArray(tData) ? tData : (tData.results || []);
      
      let apiPlayers = [];
      if (playersRes && playersRes.ok) {
        const pData = await playersRes.json();
        apiPlayers = Array.isArray(pData) ? pData : (pData.data || pData.results || pData.value || []);
      }

      setTeams(prev => {
        // Helper to fix image URLs from backend
        const resolveMediaUrl = (url) => {
          if (!url) return null;
          if (typeof url === 'string' && url.startsWith('/')) return `https://api.codingboss.in${url}`;
          return url;
        };

        // Build fresh teams from API (preserve existing players by team key)
        const merged = {};

        // Step 1: Build teams from API
        apiTeams.forEach(apiTeam => {
          if (!apiTeam || !apiTeam.teamName) return;
          const newKey = apiTeam.teamName.trim().toLowerCase().replace(/\s+/g, '');

          // Try to match by ID in prev (handles renamed teams)
          const existingKey = Object.keys(prev).find(k => String(prev[k].id) === String(apiTeam.id));
          const existingData = existingKey ? prev[existingKey] : (prev[newKey] || {});

          merged[newKey] = {
            players: [], // Always start fresh - populated below from API only
            id: apiTeam.id,
            label: apiTeam.teamName,
            glow: apiTeam.teamColor || existingData.glow || '#ffffff',
            img: resolveMediaUrl(apiTeam.teamLogo) || existingData.img || null,
          };
        });

        // If API returned no teams, keep existing local teams
        if (Object.keys(merged).length === 0) return prev;

        const firstTeamKey = Object.keys(merged)[0];

        // Step 2: Build a player-team roster from:
        //   a) localStorage per-player entries (set on create)
        //   b) previously saved teams state (prev)
        //   c) fallback to first team
        const getTeamKeyForPlayer = (playerId, playerTag) => {
          // Check localStorage mapping (set when player was created)
          const lsKey = localStorage.getItem('stg_player_team_' + playerId);
          if (lsKey && merged[lsKey]) return lsKey;

          // Check previously saved state by player ID
          for (const [k, t] of Object.entries(prev)) {
            if (!t.players) continue;
            if (t.players.some(x => String(x.id) === String(playerId) || x.tag === playerTag)) {
              if (merged[k]) {
                // Remember it for next time
                localStorage.setItem('stg_player_team_' + playerId, k);
                return k;
              }
            }
          }

          // Fallback: put in first team so no player is lost
          localStorage.setItem('stg_player_team_' + playerId, firstTeamKey);
          return firstTeamKey;
        };

        // Step 3: Place each API player into its team - EXACTLY ONCE (dedup by id)
        const seenIds = new Set();
        apiPlayers.forEach(p => {
          const pid = String(p.id);
          if (seenIds.has(pid)) return; // skip duplicates from API
          seenIds.add(pid);

          const playerObj = {
            id: p.id,
            tag: p.playerTag,
            roleLabel: p.role,
            description: p.description,
            ig: p.instagramUsername,
            igLink: p.instagramLink,
            img: resolveMediaUrl(p.profileImage),
            badge: '🎮'
          };

          const teamKey = getTeamKeyForPlayer(p.id, p.playerTag);
          if (merged[teamKey]) {
            // Only push if not already present (extra safety)
            const already = merged[teamKey].players.some(x => String(x.id) === pid || x.tag === p.playerTag);
            if (!already) {
              merged[teamKey].players.push(playerObj);
            }
          }
        });

        saveTeams(merged);
        setActiveTeam(k => (k && merged[k]) ? k : firstTeamKey);
        return merged;
      });
    } catch (e) {
      console.error('Failed to fetch teams/players from API:', e);
    }
  };

  const fetchEventsFromAPI = async () => {
    try {
      const res = await fetch('https://api.codingboss.in/sports_app/get-event/', {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      if (!res.ok) return;
      const data = await res.json();
      const rawEvents = Array.isArray(data) ? data : (data.results || []);
      if (!rawEvents.length) return;

      const mappedEvents = rawEvents.map(e => {
        let pImage = e.image || e.posterImage || '';
        if (pImage && typeof pImage === 'string' && pImage.startsWith('/')) {
          if (pImage.startsWith('/assets/')) {
            // Strip the hash from the Vite built asset path for local dev, 
            // and map it to /src/assets/
            if (import.meta.env.DEV) {
              pImage = pImage.replace(/-[a-zA-Z0-9_]+\.(png|jpe?g)$/, '.$1').replace('/assets/', '/src/assets/');
            }
          } else {
            pImage = `https://api.codingboss.in${pImage}`;
          }
        }
        return {
          ...e,
          title: e.operationName || e.title || '',
          prizePool: e.price || e.prizePool || '',
          posterImage: pImage,
          status: e.status || 'COMPLETED',
          mode: e.mode || '',
          slots: e.slots || '',
          entry: e.entry || ''
        };
      });

      setEventsList(() => {
        const sorted = sortEvents(mappedEvents);
        saveEvents(sorted);
        window.dispatchEvent(new CustomEvent('stg_events_updated', { detail: sorted }));
        return sorted;
      });
    } catch (e) {
      console.error('Failed to fetch events from API:', e);
    }
  };

  // Auto-correct activeTeam if the key no longer exists in teams (e.g., after API fetch)
  useEffect(() => {
    if (teams && !teams[activeTeam]) {
      const firstKey = Object.keys(teams)[0];
      if (firstKey) setActiveTeam(firstKey);
    }
  }, [teams, activeTeam]);

  useEffect(() => {
    if (sessionStorage.getItem('stg_admin_auth') !== 'true') navigate('/admin');
    else {
      fetchTeamsFromAPI();
      fetchEventsFromAPI();
    }
  }, [navigate]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  /* Save / Add player */
  const handleSavePlayer = async (p) => {
    const teamKey = addToTeamKey || activeTeam;
    // Capture before resetting state
    const isAdding = isNewPlayer;
    setAddToTeamKey(null);
    setEditing(null);
    setIsNew(false);
    showToast(isAdding ? '⏳ Adding player...' : '⏳ Saving...');

    try {
      const isStringPlaceholder = typeof p.id === 'string' && isNaN(Number(p.id));
      const method = (isAdding || isStringPlaceholder) ? 'POST' : 'PUT';
      const payload = {
        playerTag: p.tag,
        role: p.roleLabel,
        description: p.description,
        instagramUsername: p.ig,
        instagramLink: p.igLink,
        profileImage: p.img,
        teamName: teams[teamKey].label,
        team: teams[teamKey].id
      };
      if (method === 'PUT' && !isStringPlaceholder) {
         payload.id = p.id;
      }

      let res = await fetch('https://api.codingboss.in/sports_app/player/', {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${sessionStorage.getItem('stg_admin_token') || ''}`,
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(payload)
      });

      if (method === 'PUT' && payload.id && (res.status === 500 || res.status === 405 || res.status === 404)) {
         res = await fetch(`https://api.codingboss.in/sports_app/player/${payload.id}/`, {
           method: 'PUT',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': `Token ${sessionStorage.getItem('stg_admin_token') || ''}`,
             'ngrok-skip-browser-warning': 'true'
           },
           body: JSON.stringify(payload)
         });
      }

      // If still 404 or DoesNotExist, recreate with POST
      if (method === 'PUT' && (res.status === 404 || res.status === 500)) {
         console.warn('Player not found on server, converting PUT to POST to recreate it.');
         delete payload.id;
         res = await fetch('https://api.codingboss.in/sports_app/player/', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': `Token ${sessionStorage.getItem('stg_admin_token') || ''}`,
             'ngrok-skip-browser-warning': 'true'
           },
           body: JSON.stringify(payload)
         });
      }

      if (!res.ok) {
         console.error('Failed to save player to server', await res.text());
         showToast('❌ Save failed');
      } else {
         const data = await res.json();
         const resolvedId = data?.data?.id || data?.id;
         if (resolvedId) {
            localStorage.setItem('stg_player_team_' + resolvedId, teamKey);
         }
         showToast(isAdding ? '✅ Player added!' : '✅ Saved!');
         // Refresh from API — this is the single source of truth
         await fetchTeamsFromAPI();
      }
    } catch (err) {
      console.error('API Error saving player', err);
      showToast('❌ Network error');
    }
  };

  /* Delete player */
  const handleDeletePlayer = async (id) => {
    const isLocalOnly = typeof id === 'string' && isNaN(Number(id));
    setDeletePlayer(null); // Close modal immediately

    // Optimistic UI: remove player from state instantly (no waiting for API)
    setTeams(prev => {
      const updated = {};
      for (const key of Object.keys(prev)) {
        updated[key] = { ...prev[key], players: prev[key].players.filter(p => p.id !== id) };
      }
      return updated;
    });
    showToast('🗑 Player deleted!');

    // Fire-and-forget API call in background
    if (!isLocalOnly) {
      (async () => {
        try {
          let res = await fetch('https://api.codingboss.in/sports_app/player/', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${sessionStorage.getItem('stg_admin_token') || ''}`,
              'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify({ id })
          });

          if (res.status === 405 || res.status === 404) {
            res = await fetch(`https://api.codingboss.in/sports_app/player/${id}/`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Token ${sessionStorage.getItem('stg_admin_token') || ''}`,
                'ngrok-skip-browser-warning': 'true'
              }
            });
          }
          // Remove from localStorage mapping too
          localStorage.removeItem('stg_player_team_' + id);
        } catch (e) {
          console.error('Failed to delete player on server', e);
        }
      })();
    }
  };

  /* Delete team */
  const handleDeleteTeam = async (key) => {
    setDeleteTeamKey(null); // Close modal immediately to prevent double-clicks
    try {
      const teamId = teams[key]?.id;
      if (!teamId) {
        console.warn('No team ID found locally for delete.');
      } else {
        let res = await fetch('https://api.codingboss.in/sports_app/team/', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('stg_admin_token') || ''}`,
            'ngrok-skip-browser-warning': 'true'
          },
          body: JSON.stringify({ id: teamId })
        });
        
        if (res.status === 405 || res.status === 404) {
           res = await fetch(`https://api.codingboss.in/sports_app/team/${teamId}/`, {
             method: 'DELETE',
             headers: {
               'Authorization': `Token ${sessionStorage.getItem('stg_admin_token') || ''}`,
               'ngrok-skip-browser-warning': 'true'
             }
           });
        }
      }
    } catch (e) {
      console.error('Failed to delete team on server:', e);
    }

    if (activeTeam === key) {
      const remaining = Object.keys(teams).filter(k => k !== key);
      if (remaining.length > 0) setActiveTeam(remaining[0]);
    }
    showToast('🗑 Team deleted!');
    await fetchTeamsFromAPI();
  };

  /* Save Team (Add or Edit) */
  
  const handleSaveEvent = async (form) => {
    const isNew = isNewEvent;
    const finalForm = { ...form };
    finalForm.title = formatRomanTitle(finalForm.title); // force roman numerals on save
    const oldId = form.id;
    
    const isLocalOnly = typeof finalForm.id === 'string' || (typeof finalForm.id === 'number' && finalForm.id > 1000000000000) || !finalForm.id;
    const method = (isNew || isLocalOnly) ? 'POST' : 'PUT';

    if (!finalForm.id) finalForm.id = Date.now();

    // OPTIMISTIC UPDATE: Update UI immediately so there's no delay
    setEventsList(prev => {
      const updated = isNew ? [...prev, finalForm] : prev.map(e => e.id === oldId ? finalForm : e);
      const sorted = sortEvents(updated);
      saveEvents(sorted);
      window.dispatchEvent(new CustomEvent('stg_events_updated', { detail: sorted }));
      return sorted;
    });
    setEditingEvent(null);
    setIsNewEvent(false);
    showToast(isNew ? '✅ Event added!' : '✅ Event updated!');

    const payload = {
      status: finalForm.status || 'COMPLETED',
      operationName: finalForm.title || '',
      price: finalForm.prizePool || '',
      mode: finalForm.mode || '',
      slots: finalForm.slots || '',
      entry: finalForm.entry || '',
      image: finalForm.posterImage || '',
      themeColor: finalForm.themeColor || ''
    };

    if (method === 'PUT' && oldId) {
      payload.id = oldId;
    }

    console.log(`📦 EVENT PAYLOAD [${method}]:`, JSON.stringify(payload, null, 2));

    try {
      const res = await fetch('https://api.codingboss.in/sports_app/event/', {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${sessionStorage.getItem('stg_admin_token') || ''}`,
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        const resolvedId = data?.id || data?.data?.id || null;
        if (resolvedId && isNew) {
           // Update the ID in the background so future edits use the real DB id
           setEventsList(prev => {
             const updated = prev.map(e => e.id === finalForm.id ? { ...e, id: resolvedId } : e);
             saveEvents(updated);
             window.dispatchEvent(new CustomEvent('stg_events_updated', { detail: updated }));
             return updated;
           });
        }
      } else {
        const errText = await res.text();
        console.error('Event save error:', errText);
      }
    } catch (e) {
      console.error('Failed to save event on server:', e);
    }
  };

  const handleDeleteEvent = async (id) => {
    const isLocalOnly = typeof id === 'string' || (typeof id === 'number' && id > 1000000000000);

    if (!isLocalOnly) {
      try {
        // Try body-based delete first
        let res = await fetch('https://api.codingboss.in/sports_app/event/', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('stg_admin_token') || ''}`,
            'ngrok-skip-browser-warning': 'true'
          },
          body: JSON.stringify({ id })
        });
        
        // If Method Not Allowed, try URL-based delete (Standard Django REST)
        if (res.status === 405 || res.status === 404) {
           res = await fetch(`https://api.codingboss.in/sports_app/event/${id}/`, {
             method: 'DELETE',
             headers: {
               'Authorization': `Token ${sessionStorage.getItem('stg_admin_token') || ''}`,
               'ngrok-skip-browser-warning': 'true'
             }
           });
        }

        if (!res.ok) {
          console.error('Delete event failed with status:', res.status);
        }
      } catch (e) {
        console.error('Failed to delete event on server:', e);
      }
    }

    setEventsList(prev => {
      const updated = prev.filter(e => e.id !== id);
      saveEvents(updated);
      window.dispatchEvent(new CustomEvent('stg_events_updated', { detail: updated }));
      return updated;
    });
    setDeleteEvent(null);
    showToast('🗑 Event deleted!');
  };

  /* Save Team (Add or Edit) */
  const handleSaveTeam = async (form) => {
    if (!form.label.trim()) {
      showToast('⚠️ Team name cannot be empty');
      return;
    }
    const key = editingTeamKey || form.label.trim().toLowerCase().replace(/\s+/g, '');
    if (!editingTeamKey && teams[key]) {
      showToast('⚠️ Team already exists');
      return;
    }

    // Always save locally first (offline-first approach)
    const saveLocally = (resolvedId) => {
      setTeams(prev => {
        const updated = {
          ...prev,
          [key]: {
            ...(prev[key] || { players: [] }),
            id: resolvedId || form.id || prev[key]?.id,
            label: form.label.trim(),
            glow: form.glow,
            img: form.img,
          }
        };
        saveTeams(updated);
        return updated;
      });
    };

    try {
      let method = editingTeamKey ? 'PUT' : 'POST';
      
      // Build the payload
      const payload = {
        teamName: form.label.trim(),
        teamColor: form.glow,
        teamLogo: form.img
      };

      // For PUT, resolve the team id and send it in the body
      if (method === 'PUT') {
        let teamId = teams[editingTeamKey]?.id;

        // If no local id, fetch it from the API by matching team name
        if (!teamId) {
          try {
            const getRes = await fetch('https://api.codingboss.in/sports_app/get-team/', {
              headers: { 'ngrok-skip-browser-warning': 'true' }
            });
            if (getRes.ok) {
              const allTeams = await getRes.json();
              const list = Array.isArray(allTeams) ? allTeams : (allTeams.results || []);
              const match = list.find(t =>
                t.teamName.trim().toLowerCase() === (teams[editingTeamKey]?.label || '').trim().toLowerCase()
              );
              if (match) {
                teamId = match.id;
                // Cache it locally for future edits
                setTeams(prev => {
                  const up = { ...prev, [editingTeamKey]: { ...prev[editingTeamKey], id: match.id } };
                  saveTeams(up);
                  return up;
                });
              }
            }
          } catch (e) {
            console.error('Could not resolve team id:', e);
          }
        }

        if (teamId) {
           payload.id = teamId;
        } else {
           // If we still can't find an ID, we MUST fallback to POST because the server will crash on a PUT without an ID.
           method = 'POST';
        }
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      let response = await fetch('https://api.codingboss.in/sports_app/team/', {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${sessionStorage.getItem('stg_admin_token') || ''}`,
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      
      // Fallback for Django REST generic views that require ID in URL for PUT
      if (method === 'PUT' && payload.id && (response.status === 500 || response.status === 405 || response.status === 404)) {
        response = await fetch(`https://api.codingboss.in/sports_app/team/${payload.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('stg_admin_token') || ''}`,
            'ngrok-skip-browser-warning': 'true'
          },
          body: JSON.stringify(payload),
          signal: controller.signal
        });
      }
      
      // If still 404 or DoesNotExist, it means the team is missing on the server. Recreate it with POST.
      if (method === 'PUT' && (response.status === 404 || response.status === 500)) {
        console.warn('Team not found on server, converting PUT to POST to recreate it.');
        delete payload.id;
        response = await fetch('https://api.codingboss.in/sports_app/team/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('stg_admin_token') || ''}`,
            'ngrok-skip-browser-warning': 'true'
          },
          body: JSON.stringify(payload)
        });
      }
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        // Support both { id } and { data: { id } } response shapes
        const resolvedId = data?.id || data?.data?.id || null;
        if (resolvedId) form.id = resolvedId;
        saveLocally(resolvedId);
      } else {
        const err = await response.json().catch(() => ({}));
        console.error('Team save error:', err);
        // Still save locally so the team appears even if API fails
        saveLocally(null);
        showToast(`⚠️ Saved locally. Server: ${err.detail || err.message || response.status}`);
        setShowTeamEdit(false);
        setEditingTeamKey(null);
        setActiveTeam(key);
        return;
      }
    } catch (e) {
      console.error('Failed to save team on server:', e);
      // Network error — save locally and continue
      saveLocally(null);
    }
    
    setShowTeamEdit(false);
    setEditingTeamKey(null);
    setActiveTeam(key);
    showToast(editingTeamKey ? '✅ Team updated!' : '✅ Team added!');
    await fetchTeamsFromAPI();
  };

  /* Add player (bypassing team select) */
  const handleAddNewClick = () => {
    setAddToTeamKey(activeTeam);
    setEditing(newBlankPlayer(activeTeam, teams[activeTeam].players.length));
    setIsNew(true);
  };

  const openEdit = (p) => { setEditing(p); setIsNew(false); setAddToTeamKey(null); };

  const handleLogout = () => { sessionStorage.removeItem('stg_admin_auth'); navigate('/admin'); };

  // Fully null-safe: never let team be undefined — prevents black screen crash
  const team = (teams[activeTeam] && teams[activeTeam].players)
    ? teams[activeTeam]
    : (Object.values(teams).find(t => t && t.players) || { label: 'Loading...', glow: '#e60000', players: [], img: null });

  return (
    <div className="adm-bg">
      <div className="adm-scanlines" />

      {/* Header */}
      <header className="adm-header">
        <div className="adm-header-brand">
          <img src="/stg-logo.png" alt="STG Logo" className="adm-header-icon" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
          <div>
            <span className="adm-header-title heading-font">STG <span style={{ color: '#e60000' }}>ADMIN</span></span>
            <span className="adm-header-sub">DASHBOARD</span>
          </div>
        </div>

        
        <div className="adm-header-center adm-tabs-center">
          <button className={`adm-tab-btn heading-font ${activeTab === 'teams' ? 'active' : ''}`} onClick={() => setActiveTab('teams')}>TEAMS</button>
          <button className={`adm-tab-btn heading-font ${activeTab === 'events' ? 'active' : ''}`} onClick={() => setActiveTab('events')}>EVENTS</button>
        </div>

        <button className="adm-mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? '✕' : '☰'}
        </button>

        <div className={`adm-header-right ${isMenuOpen ? 'adm-menu-open' : ''}`}>
          {toast && <span className="adm-saved-toast">{toast}</span>}
          <button className="adm-profile-btn heading-font" onClick={() => { setShowProfile(true); setIsMenuOpen(false); }}>👤 PROFILE</button>
          <button className="adm-logout-btn heading-font" onClick={handleLogout}>LOGOUT ⎋</button>
        </div>
      </header>

      
      {activeTab === 'teams' ? (
        <div className="adm-layout">
          {/* Sidebar */}
          <aside className="adm-sidebar">
            <p className="adm-sidebar-label heading-font">TEAMS</p>
            {Object.entries(teams).map(([key, t]) => (
              <div key={key} className="adm-team-tab-row">
                <button
                  className={`adm-team-tab ${activeTeam === key ? 'adm-team-tab--active' : ''}`}
                  style={activeTeam === key ? { borderColor: t.glow, color: t.glow, boxShadow: `0 0 12px ${t.glow}33` } : {}}
                  onClick={() => setActiveTeam(key)}
                >
                  <span className="adm-tab-dot" style={{ background: t.glow }} />
                  {t.label}
                </button>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    className="adm-team-del-btn"
                    title={`Edit ${t.label}`}
                    onClick={() => { setEditingTeamKey(key); setShowTeamEdit(true); }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  </button>
                  <button
                    className="adm-team-del-btn"
                    title={`Delete ${t.label}`}
                    onClick={() => setDeleteTeamKey(key)}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </aside>

          {/* Main */}
          <main className="adm-main">
            <div className="adm-main-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {team.img && (
                  <img src={team.img} alt={team.label} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${team.glow}` }} />
                )}
                <div>
                  <h2 className="adm-main-title heading-font" style={{ color: team.glow }}>{team.label}</h2>
                  <p className="adm-main-sub">{team.players.length} player{team.players.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <div className="adm-main-actions">
                <button className="adm-add-btn heading-font" style={{ borderColor: team.glow, color: team.glow }} onClick={handleAddNewClick}>
                  ➕ ADD PLAYER
                </button>
                <button className="adm-add-btn heading-font" style={{ borderColor: team.glow, color: team.glow }} onClick={() => { setEditingTeamKey(null); setShowTeamEdit(true); }}>
                  ➕ ADD TEAM
                </button>
              </div>
            </div>

            <div className="adm-players-grid">
              {team.players.map((player, idx) => (
                <div key={player.id} className="adm-player-card" style={{ '--team-glow': team.glow }}>
                  <div className="adm-card-top-actions">
                    <button className="adm-top-btn" onClick={(e) => { e.stopPropagation(); openEdit(player); }} title="Edit">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button className="adm-top-btn adm-top-btn-del" onClick={(e) => { e.stopPropagation(); setDeletePlayer({ id: player.id, name: player.tag }); }} title="Delete">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </div>
                  <div className="adm-player-photo-wrap" onClick={() => openEdit(player)}>
                    {player.img
                      ? <img loading="lazy" decoding="async" src={player.img} alt={player.tag} className="adm-player-photo" />
                      : <div className="adm-player-no-photo"><span style={{ fontSize: '2rem' }}>{player.badge}</span></div>
                    }
                    <div className="adm-player-edit-overlay"><span>✏️ EDIT</span></div>
                    <div className="adm-player-num" style={{ background: team.glow }}>#{idx + 1}</div>
                  </div>
                  <div className="adm-card-actions">
                    <div className="adm-player-info" onClick={() => openEdit(player)} style={{ flex: 1, cursor: 'pointer' }}>
                      <p className="adm-player-tag heading-font" style={{ color: team.glow }}>{player.tag || '—'}</p>
                      <p className="adm-player-role">{player.roleLabel || '—'}</p>
                      <p className="adm-player-ig">{player.ig ? `@${player.ig}` : '—'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      ) : (
        <div className="adm-events-split-layout">
          <div className="adm-events-left">
            <div className="adm-main-header" style={{ marginBottom: '1.5rem' }}>
              <div>
                <h2 className="adm-main-title heading-font" style={{ color: '#e60000', margin: 0 }}>EVENTS SHOWCASE</h2>
                <p className="adm-main-sub">{eventsList?.length || 0} event{eventsList?.length !== 1 ? 's' : ''}</p>
              </div>
              <div className="adm-main-actions">
                <button className="adm-add-btn heading-font" style={{ borderColor: '#e60000', color: '#e60000' }} onClick={() => { 
                  setIsNewEvent(true); 
                  setEditingEvent({ id: Date.now(), title: '', description: '', series: 'STG SERIES', season: '', status: 'COMPLETED', prizePool: '', period: '', videoUrl: '', posterImage: null, hasDetailsButton: true, slots: '', mode: '', entry: '', registrationDate: '', winnersStr: '' }); 
                }}>➕ ADD EVENT</button>
                <button className="adm-add-btn heading-font" style={{ borderColor: '#00c8ff', color: '#00c8ff' }} onClick={() => {
                  const base = editingEvent || {};
                  setEditingDetails({
                    id: base.id || null,
                    detailsApiId: base.detailsApiId || null,
                    detailImage: base.posterImage || null,
                    title: base.title || '',
                    description: base.description || '',
                    videoUrl: base.videoUrl || '',
                    date: base.registrationDate || base.period || '',
                    winnersStr: base.winners ? base.winners.join(', ') : (base.winnersStr || '')
                  });
                }}>📋 CREATE DETAILS</button>
              </div>
            </div>
            <div className="adm-events-grid">
              {!Array.isArray(eventsList) || eventsList.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)', gridColumn: '1 / -1' }}>
                  <p className="heading-font" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>NO EVENTS FOUND</p>
                  <p>Click "➕ ADD NEW EVENT" to create your first event.</p>
                </div>
              ) : (
                eventsList.map(ev => {
                  if (!ev) return null;
                  return (
                    <div key={ev.id || Math.random()} className={`adm-event-card ${editingEvent?.id === ev.id ? 'active' : ''}`} onClick={() => { 
                      setEditingEvent({ 
                        slots: '', mode: '', entry: '', registrationDate: '', videoUrl: '', description: '', period: '', series: 'STG SERIES', season: '', winnersStr: '',
                        ...ev, 
                        status: ev.status || 'COMPLETED',
                        prizePool: ev.prizePool || '',
                        winnersStr: ev.winners ? ev.winners.join(', ') : (ev.winnersStr || '') 
                      }); 
                      setIsNewEvent(false);
                      setTimeout(() => {
                        document.getElementById('adm-events-right-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 50);
                    }}>
                       <div className="adm-card-top-actions" style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 10 }}>
                        <button className="adm-top-btn adm-top-btn-del" onClick={(e) => { e.stopPropagation(); setDeleteEvent({ id: ev.id, name: ev.title || 'Unknown' }); }}>🗑</button>
                       </div>
                       <div className="adm-event-img-wrap">
                         {ev.posterImage ? <img src={ev.posterImage} alt={ev.title || 'Event'} className="adm-event-img" /> : <div className="adm-event-no-img">No Image</div>}
                         <span className={`adm-event-badge ${ev.status === 'UPCOMING' ? 'upcoming' : 'completed'}`}>{ev.status || 'COMPLETED'}</span>
                       </div>
                       <div className="adm-event-info">
                         <h4 className="heading-font">{renderRomanTitle(ev.title)}</h4>
                         {ev.period && <p>{ev.period}</p>}
                       </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="adm-events-right" id="adm-events-right-panel">
             {editingEvent ? (
                <div className="adm-event-form">
                  {/* Mobile back button */}
                  <button
                    className="adm-event-back-btn"
                    onClick={() => setEditingEvent(null)}
                    style={{
                      display: 'none',
                      background: 'none',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: 'rgba(255,255,255,0.6)',
                      borderRadius: '8px',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      letterSpacing: '1px',
                      alignItems: 'center',
                      gap: '6px',
                      width: 'fit-content',
                      marginBottom: '0.5rem'
                    }}
                  >
                    ← BACK TO LIST
                  </button>
                  <div className="adm-event-form-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <h3 className="adm-event-form-title heading-font">{isNewEvent ? '➕ NEW EVENT' : '✏️ EDIT EVENT'}</h3>
                     <button
                       className="adm-add-btn heading-font"
                       style={{ borderColor: '#00c8ff', color: '#00c8ff', padding: '0.4rem 0.8rem', fontSize: '0.7rem', margin: 0 }}
                       onClick={() => {
                         setEditingDetails({
                           id: editingEvent.id,
                           detailImage: editingEvent.posterImage || null,
                           title: editingEvent.title || '',
                           description: editingEvent.description || '',
                           videoUrl: editingEvent.videoUrl || '',
                           date: editingEvent.registrationDate || editingEvent.period || '',
                           prizePool: editingEvent.prizePool || '',
                           winnersStr: editingEvent.winners ? editingEvent.winners.join(', ') : (editingEvent.winnersStr || '')
                         });
                       }}
                     >
                       📋 {isNewEvent ? 'CREATE DETAILS' : 'EDIT DETAILS'}
                     </button>
                  </div>
                  
                  <div className="adm-fields" style={{ marginBottom: '1.5rem' }}>
                    <div className="adm-field-group">
                      <label className="adm-field-label heading-font">STATUS</label>
                      <select
                        className="adm-field-input"
                        value={editingEvent.status === 'UPCOMING' ? 'UPCOMING' : 'COMPLETED'}
                        onChange={e => setEditingEvent(f => ({ ...f, status: e.target.value }))}
                        style={{
                          color: editingEvent.status === 'UPCOMING' ? '#39FF14' : '#e60000',
                          fontWeight: 'bold',
                          background: '#111',
                          border: `2px solid ${editingEvent.status === 'UPCOMING' ? '#39FF14' : '#e60000'}`,
                        }}
                      >
                        <option value="COMPLETED" style={{ color: '#e60000' }}>✅ COMPLETED</option>
                        <option value="UPCOMING" style={{ color: '#39FF14' }}>🔜 UPCOMING</option>
                      </select>
                    </div>

                    <div className="adm-field-group">
                      <label className="adm-field-label heading-font">OPERATION NAME</label>
                      <input 
                        className="adm-field-input" 
                        value={editingEvent.title} 
                        onChange={e => setEditingEvent(f => ({ ...f, title: e.target.value }))} 
                        onBlur={() => setEditingEvent(f => ({ ...f, title: formatRomanTitle(f.title) }))}
                        placeholder="e.g. STG OPERATION I" 
                      />
                    </div>

                    <div className="adm-field-group">
                      <label className="adm-field-label heading-font">EVENT COLOR</label>
                      <div style={{
                        display: 'flex', gap: '15px', alignItems: 'center',
                        background: 'rgba(255,255,255,0.05)', padding: '10px',
                        borderRadius: '8px',
                        border: `1px solid ${editingEvent.themeColor || '#e60000'}`,
                        boxShadow: `0 0 8px ${editingEvent.themeColor || '#e60000'}33`
                      }}>
                        <input
                          type="color"
                          value={/^#[0-9A-Fa-f]{6}$/i.test(editingEvent.themeColor) ? editingEvent.themeColor : '#e60000'}
                          onChange={e => setEditingEvent(f => ({ ...f, themeColor: e.target.value }))}
                          style={{ width: '40px', height: '40px', padding: '0', border: 'none', cursor: 'pointer', background: 'transparent', borderRadius: '6px' }}
                        />
                        <input
                          className="adm-field-input"
                          value={editingEvent.themeColor || '#e60000'}
                          onChange={e => setEditingEvent(f => ({ ...f, themeColor: e.target.value }))}
                          onBlur={e => {
                            const ctx = document.createElement('canvas').getContext('2d');
                            ctx.fillStyle = e.target.value;
                            if (ctx.fillStyle !== '#000000' || e.target.value.toLowerCase() === 'black' || e.target.value === '#000000') {
                              setEditingEvent(f => ({ ...f, themeColor: ctx.fillStyle }));
                            }
                          }}
                          placeholder="#e60000"
                          style={{
                            border: 'none', background: 'transparent', flex: 1, padding: 0,
                            color: editingEvent.themeColor || '#e60000', fontWeight: 'bold', letterSpacing: '1px'
                          }}
                        />
                      </div>
                    </div>

                    <div className="adm-field-group">
                      <label className="adm-field-label heading-font">PRICE</label>
                      <input className="adm-field-input" value={editingEvent.prizePool} onChange={e => setEditingEvent(f => ({ ...f, prizePool: e.target.value }))} placeholder="10,000" />
                    </div>

                    <div className="adm-field-group" style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ flex: 1 }}>
                        <label className="adm-field-label heading-font">MODE</label>
                        <input className="adm-field-input" value={editingEvent.mode || ''} onChange={e => setEditingEvent(f => ({ ...f, mode: e.target.value }))} placeholder="CLASSIC - SQUAD" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label className="adm-field-label heading-font">SLOTS</label>
                        <input className="adm-field-input" value={editingEvent.slots || ''} onChange={e => setEditingEvent(f => ({ ...f, slots: e.target.value }))} placeholder="160" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label className="adm-field-label heading-font">ENTRY</label>
                        <input className="adm-field-input" value={editingEvent.entry || ''} onChange={e => setEditingEvent(f => ({ ...f, entry: e.target.value }))} placeholder="FREE" />
                      </div>
                    </div>
                  </div>

                  <div className="adm-photo-section">
                    <label className="adm-field-label heading-font" style={{ marginBottom: '8px', display: 'block' }}>UPLOAD IMAGE</label>
                    <div className="adm-photo-preview" style={{ borderColor: '#e60000', height: '150px', aspectRatio: '16/9', width: '100%', maxWidth: '280px' }} onClick={() => document.getElementById('eventPhotoInput').click()}>
                      {editingEvent.posterImage
                        ? <img loading="lazy" src={editingEvent.posterImage} alt="Preview" className="adm-photo-img" style={{ objectFit: 'cover' }} />
                        : <div className="adm-photo-placeholder"><span style={{fontSize: '2rem'}}>📷</span><span className="adm-photo-hint">Poster Image</span></div>
                      }
                    </div>
                    <input id="eventPhotoInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => {
                       const file = e.target.files[0];
                       if (!file) return;
                       const reader = new FileReader();
                       reader.onload = (ev) => {
                         const img = new Image();
                         img.onload = () => {
                           const MAX_W = 800, MAX_H = 600;
                           let w = img.width, h = img.height;
                           if (w > MAX_W || h > MAX_H) {
                             const ratio = Math.min(MAX_W / w, MAX_H / h);
                             w = Math.round(w * ratio);
                             h = Math.round(h * ratio);
                           }
                           const canvas = document.createElement('canvas');
                           canvas.width = w; canvas.height = h;
                           canvas.getContext('2d').drawImage(img, 0, 0, w, h);
                           const compressed = canvas.toDataURL('image/jpeg', 0.65);
                           setEditingEvent(f => ({ ...f, posterImage: compressed }));
                         };
                         img.src = ev.target.result;
                       };
                       reader.readAsDataURL(file);
                    }} />
                  </div>

                  <div className="adm-modal-footer" style={{ padding: '1rem 0' }}>
                    {!isNewEvent && (
                       <button className="adm-btn-delete" onClick={() => setDeleteEvent({ id: editingEvent.id, name: editingEvent.title })}>🗑 DELETE</button>
                    )}
                    <button className="adm-btn-cancel" onClick={() => setEditingEvent(null)}>CANCEL</button>
                    <button className="adm-btn-save" style={{ background: '#e60000', color: '#fff' }} onClick={() => {
                       const finalEvent = {
                         ...editingEvent,
                         winners: editingEvent.winnersStr ? editingEvent.winnersStr.split(',').map(s => s.trim()).filter(Boolean) : []
                       };
                       delete finalEvent.winnersStr;
                       handleSaveEvent(finalEvent); 
                    }}>{isNewEvent ? 'ADD EVENT' : 'SAVE CHANGES'}</button>
                  </div>
                </div>
             ) : (
                <div className="adm-no-selection">
                   <p>Select an event from the left to edit it,<br/>or click Add New Event.</p>
                </div>
             )}
          </div>
        </div>
      )}

      {/* Add / Edit Team Modal */}
      {showTeamEdit && (
        <TeamEditModal
          team={editingTeamKey ? teams[editingTeamKey] : null}
          isNew={!editingTeamKey}
          onSave={handleSaveTeam}
          onClose={() => { setShowTeamEdit(false); setEditingTeamKey(null); }}
        />
      )}

      {/* Custom Delete Player Confirmation */}
      {deletePlayerInfo && (
        <ConfirmDeleteModal
          playerName={deletePlayerInfo.name}
          onConfirm={() => handleDeletePlayer(deletePlayerInfo.id)}
          onCancel={() => setDeletePlayer(null)}
        />
      )}

      {/* Custom Delete Team Confirmation */}
      {deleteTeamKey && (
        <ConfirmDeleteTeamModal
          teamName={teams[deleteTeamKey]?.label}
          onConfirm={() => handleDeleteTeam(deleteTeamKey)}
          onCancel={() => setDeleteTeamKey(null)}
        />
      )}

      {/* Edit / Add Modal */}
      {editingPlayer && (
        <PlayerEditModal
          player={editingPlayer}
          teamGlow={teams[addToTeamKey || activeTeam]?.glow || team.glow}
          teamLabel={teams[addToTeamKey || activeTeam]?.label || team.label}
          isNew={isNewPlayer}
          onSave={handleSavePlayer}
          onDelete={(id) => setDeletePlayer({ id, name: editingPlayer.tag })}
          onClose={() => { setEditing(null); setAddToTeamKey(null); }}
        />
      )}

      
      
      
      {deleteEventInfo && (
        <ConfirmDeleteModal
          playerName={deleteEventInfo.name + ' (Event)'}
          onConfirm={() => handleDeleteEvent(deleteEventInfo.id)}
          onCancel={() => setDeleteEvent(null)}
        />
      )}

      {/* CREATE DETAILS Modal */}
      {editingDetails && (
        <div className="adm-modal-overlay" onClick={() => setEditingDetails(null)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()} style={{ borderColor: '#00c8ff' }}>
            {/* Header */}
            <div className="adm-modal-header" style={{ borderColor: '#00c8ff' }}>
              <h3 className="adm-modal-title heading-font" style={{ color: '#00c8ff' }}>📋 EVENT DETAILS EDITOR</h3>
              <button className="adm-modal-close" onClick={() => setEditingDetails(null)}>✕</button>
            </div>

            {/* Fields ABOVE image */}
            <div className="adm-modal-body adm-fields">

              {/* Operation Name */}
              <div className="adm-field-group">
                <label className="adm-field-label heading-font" style={{ color: '#00c8ff' }}>OPERATION NAME</label>
                <input
                  className="adm-field-input"
                  value={editingDetails.title}
                  onChange={e => setEditingDetails(d => ({ ...d, title: e.target.value }))}
                  onBlur={() => setEditingDetails(d => ({ ...d, title: formatRomanTitle(d.title) }))}
                  placeholder="e.g. STG OPERATION I"
                />
              </div>

              {/* Description */}
              <div className="adm-field-group">
                <label className="adm-field-label heading-font" style={{ color: '#00c8ff' }}>DESCRIPTION</label>
                <textarea
                  className="adm-field-input adm-textarea"
                  value={editingDetails.description}
                  onChange={e => setEditingDetails(d => ({ ...d, description: e.target.value }))}
                  placeholder="Write the event story / details here..."
                  rows={4}
                />
              </div>

              {/* YouTube Link */}
              <div className="adm-field-group">
                <label className="adm-field-label heading-font" style={{ color: '#00c8ff' }}>YOUTUBE LINK</label>
                <input
                  className="adm-field-input"
                  value={editingDetails.videoUrl}
                  onChange={e => setEditingDetails(d => ({ ...d, videoUrl: e.target.value }))}
                  placeholder="https://youtube.com/live/..."
                />
              </div>

              {/* Date */}
              <div className="adm-field-group">
                <label className="adm-field-label heading-font" style={{ color: '#00c8ff' }}>DATE / PERIOD</label>
                <input
                  className="adm-field-input"
                  value={editingDetails.date}
                  onChange={e => setEditingDetails(d => ({ ...d, date: e.target.value }))}
                  placeholder="e.g. JANUARY 2024 or Registration ended: 0d 0h 0m 0s"
                />
              </div>

              {/* Price */}
              <div className="adm-field-group">
                <label className="adm-field-label heading-font" style={{ color: '#00c8ff' }}>PRICE</label>
                <input
                  className="adm-field-input"
                  value={editingDetails.prizePool || ''}
                  onChange={e => setEditingDetails(d => ({ ...d, prizePool: e.target.value }))}
                  placeholder="e.g. 10,000"
                />
              </div>

              {/* Prize Winners */}
              <div className="adm-field-group">
                <label className="adm-field-label heading-font" style={{ color: '#00c8ff' }}>PRIZE WINNERS (Comma separated)</label>
                <input
                  className="adm-field-input"
                  value={editingDetails.winnersStr}
                  onChange={e => setEditingDetails(d => ({ ...d, winnersStr: e.target.value }))}
                  placeholder="e.g. GODLIKE, TEAM XSPARK, SOUL, BLIND ESPORTS, GLADIATORS"
                />
                <p style={{ color: '#888', fontSize: '0.7rem', marginTop: '4px' }}>1st prize first, then 2nd, 3rd... separated by commas</p>
              </div>

              {/* Image Upload - BELOW other fields */}
            <div className="adm-field-group">
              <label className="adm-field-label heading-font" style={{ color: '#00c8ff' }}>UPLOAD DETAIL IMAGE</label>
              <div
                onClick={() => document.getElementById('detailPhotoInput').click()}
                style={{
                  width: '100%', height: '180px',
                  border: `2px dashed ${editingDetails.detailImage ? '#00c8ff' : '#444'}`,
                  borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  background: '#0a0a0a',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s'
                }}
              >
                {editingDetails.detailImage
                  ? <img src={editingDetails.detailImage} alt="Detail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ textAlign: 'center', color: '#666' }}>
                      <div style={{ fontSize: '2.5rem' }}>🖼️</div>
                      <div style={{ fontSize: '0.85rem', marginTop: '8px' }}>Click to upload image</div>
                    </div>
                }
              </div>
              <input
                id="detailPhotoInput"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={e => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = ev => setEditingDetails(d => ({ ...d, detailImage: ev.target.result }));
                  reader.readAsDataURL(file);
                }}
              />
              {editingDetails.detailImage && (
                <button
                  onClick={() => setEditingDetails(d => ({ ...d, detailImage: null }))}
                  style={{ marginTop: '6px', background: 'none', border: '1px solid #e60000', color: '#e60000', borderRadius: '6px', padding: '4px 12px', cursor: 'pointer', fontSize: '0.75rem' }}
                >
                  🗑 Remove Image
                </button>
              )}
            </div>
            </div>

            {/* Footer */}
            <div className="adm-modal-footer">
              {/* Delete Details button (only when editing existing) */}
              {editingDetails?.detailsApiId && (
                <button
                  className="adm-btn-delete"
                  onClick={async () => {
                    if (!window.confirm('Delete these event details from the server?')) return;
                    try {
                      await fetch(`https://api.codingboss.in/sports_app/event-details/${editingDetails.detailsApiId}/`, {
                        method: 'DELETE',
                        headers: { 'ngrok-skip-browser-warning': 'true' }
                      });
                      
                      // Also remove detailsApiId from local state
                      setEventsList(prev => {
                        const updated = prev.map(ev => 
                          ev.id === editingDetails.id ? { ...ev, detailsApiId: null } : ev
                        );
                        saveEvents(updated);
                        return updated;
                      });
                      if (editingEvent && editingEvent.id === editingDetails.id) {
                        setEditingEvent(f => ({ ...f, detailsApiId: null }));
                      }

                      showToast('🗑 Details deleted from server!');
                    } catch (e) {
                      console.error('Delete details failed:', e);
                    }
                    setEditingDetails(null);
                  }}
                >
                  🗑 DELETE
                </button>
              )}
              {!editingDetails?.detailsApiId && <div style={{ flex: 1 }}></div>}
              
              <button className="adm-btn-cancel" onClick={() => setEditingDetails(null)}>CANCEL</button>
              <button
                className="adm-btn-save"
                  style={{ background: '#00c8ff', color: '#000', fontWeight: 'bold' }}
                  onClick={async () => {
                    const winners = editingDetails.winnersStr
                      ? editingDetails.winnersStr.split(',').map(s => s.trim()).filter(Boolean)
                      : [];

                    // Merge details back into the matching event or into editingEvent
                    const mergeDetails = (ev) => {
                      if (!editingDetails.id || ev.id === editingDetails.id) {
                        return {
                          ...ev,
                          posterImage: editingDetails.detailImage || ev.posterImage,
                          title: editingDetails.title || ev.title,
                          description: editingDetails.description || ev.description,
                          videoUrl: editingDetails.videoUrl || ev.videoUrl,
                          registrationDate: editingDetails.date || ev.registrationDate,
                          period: editingDetails.date || ev.period,
                          prizePool: editingDetails.prizePool !== undefined ? editingDetails.prizePool : ev.prizePool,
                          winners,
                          hasDetailsButton: true
                        };
                      }
                      return ev;
                    };

                    // --- Local state update ---
                    if (editingDetails.id) {
                      setEventsList(prev => {
                        const updated = sortEvents(prev.map(mergeDetails));
                        saveEvents(updated);
                        window.dispatchEvent(new CustomEvent('stg_events_updated', { detail: updated }));
                        return updated;
                      });
                      if (editingEvent && editingEvent.id === editingDetails.id) {
                        setEditingEvent(f => mergeDetails(f));
                      }
                    } else if (editingEvent) {
                      setEditingEvent(f => ({
                        ...f,
                        posterImage: editingDetails.detailImage || f.posterImage,
                        title: editingDetails.title || f.title,
                        description: editingDetails.description || f.description,
                        videoUrl: editingDetails.videoUrl || f.videoUrl,
                        registrationDate: editingDetails.date || f.registrationDate,
                        period: editingDetails.date || f.period,
                        prizePool: editingDetails.prizePool !== undefined ? editingDetails.prizePool : f.prizePool,
                        winners,
                        hasDetailsButton: true
                      }));
                    } else {
                      const newId = Date.now();
                      const newEvent = {
                        id: newId,
                        posterImage: editingDetails.detailImage || null,
                        title: editingDetails.title || '',
                        description: editingDetails.description || '',
                        videoUrl: editingDetails.videoUrl || '',
                        registrationDate: editingDetails.date || '',
                        period: editingDetails.date || '',
                        winners,
                        hasDetailsButton: true,
                        series: 'STG SERIES',
                        season: '',
                        status: 'COMPLETED',
                        prizePool: editingDetails.prizePool || '',
                        slots: '',
                        mode: '',
                        entry: ''
                      };
                      setEventsList(prev => {
                        const updated = [...prev, newEvent];
                        saveEvents(updated);
                        window.dispatchEvent(new CustomEvent('stg_events_updated', { detail: updated }));
                        return updated;
                      });
                      setEditingEvent(newEvent);
                      setIsNewEvent(false);
                    }
                    
                    // Close the modal instantly so the UI feels fast!
                    setEditingDetails(null);

                    // --- API call: POST (new) or PUT (existing) ---
                    try {
                      const isExisting = !!editingDetails.detailsApiId;
                      const payload = {
                        operationName: editingDetails.title || '',
                        description: editingDetails.description || '',
                        videoUrl: editingDetails.videoUrl || '',
                        date: editingDetails.date || '',
                        winners: winners.join(', '),
                        price: editingDetails.prizePool || '',
                        image: editingDetails.detailImage || '',
                        event: editingDetails.id || null
                      };

                      const url = isExisting
                        ? `https://api.codingboss.in/sports_app/event-details/${editingDetails.detailsApiId}/`
                        : `https://api.codingboss.in/sports_app/event-details/`;
                      const method = isExisting ? 'PUT' : 'POST';

                      console.log(`📋 DETAILS PAYLOAD [${method}] → ${url}:`, JSON.stringify(payload, null, 2));

                      const res = await fetch(url, {
                        method,
                        headers: {
                          'Content-Type': 'application/json',
                          'ngrok-skip-browser-warning': 'true'
                        },
                        body: JSON.stringify(payload)
                      });

                      if (!res.ok) {
                        const errData = await res.json().catch(() => ({}));
                        console.error('event-details API error:', errData);
                        showToast(`⚠️ Saved locally. Server error: ${res.status}`);
                      } else {
                        const responseData = await res.json().catch(() => null);
                        showToast(isExisting ? '✅ Details updated!' : '✅ Details created!');
                        
                        // If POST was successful, save the returned details ID so future edits use PUT
                        if (!isExisting && responseData && responseData.id) {
                          const newDetailsApiId = responseData.id;
                          setEventsList(prev => {
                            const updated = prev.map(ev => 
                              ev.id === editingDetails.id ? { ...ev, detailsApiId: newDetailsApiId } : ev
                            );
                            saveEvents(updated);
                            return updated;
                          });
                          if (editingEvent && editingEvent.id === editingDetails.id) {
                            setEditingEvent(f => ({ ...f, detailsApiId: newDetailsApiId }));
                          }
                        }
                      }
                    } catch (e) {
                      console.error('event-details API call failed:', e);
                      showToast('✅ Saved locally (network error)');
                    }
                  }}
                >
                  SAVE DETAILS
                </button>
            </div>
          </div>
        </div>
      )}




      {/* Profile Modal */}
      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
    </div>
  );
};

class AdminErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error('AdminDashboard crashed:', error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'sans-serif', padding: '2rem'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <h2 style={{ color: '#e60000', fontFamily: 'Orbitron, sans-serif', marginBottom: '0.5rem' }}>
            ADMIN DASHBOARD ERROR
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem', textAlign: 'center' }}>
            Something crashed. Click reload to try again.
          </p>
          <pre style={{ color: '#ff6666', fontSize: '0.7rem', maxWidth: '600px', overflowX: 'auto', marginBottom: '1.5rem' }}>
            {this.state.error?.message}
          </pre>
          <button
            onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}
            style={{ background: '#e60000', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.8rem 2rem', cursor: 'pointer', fontFamily: 'Orbitron, sans-serif', fontSize: '0.9rem' }}
          >
            🔄 RELOAD DASHBOARD
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const AdminDashboardWithBoundary = () => (
  <AdminErrorBoundary>
    <AdminDashboard />
  </AdminErrorBoundary>
);

export default AdminDashboardWithBoundary;
