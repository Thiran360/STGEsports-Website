const fs = require('fs');
const file = 'src/pages/AdminDashboard.jsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('eventsData')) {
  content = content.replace(/import '\.\/AdminDashboard\.css';/, "import './AdminDashboard.css';\nimport { loadEvents, saveEvents } from '../components/eventsData';");
}

const eventEditModalCode = `
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
              <input className="adm-field-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. STG OPERATION\\nI" />
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
`;

if (!content.includes('EventEditModal =')) {
  content = content.replace('/* ─── Main Dashboard ─────────────────────────────────────── */', eventEditModalCode + '\n/* ─── Main Dashboard ─────────────────────────────────────── */');
}

const stateInjection = `
  const [activeTab, setActiveTab]           = useState('teams');
  const [eventsList, setEventsList]         = useState(loadEvents);
  const [editingEvent, setEditingEvent]     = useState(null);
  const [isNewEvent, setIsNewEvent]         = useState(false);
  const [deleteEventInfo, setDeleteEvent]   = useState(null);`;

if (!content.includes('activeTab, setActiveTab')) {
  content = content.replace('const [teams, setTeams]                   = useState(loadTeams);', stateInjection + '\n  const [teams, setTeams]                   = useState(loadTeams);');
}

const handlersInjection = `
  const handleSaveEvent = (form) => {
    setEventsList(prev => {
      const updated = isNewEvent ? [...prev, { ...form, id: Date.now() }] : prev.map(e => e.id === form.id ? form : e);
      saveEvents(updated);
      return updated;
    });
    setEditingEvent(null);
    showToast(isNewEvent ? '✅ Event added!' : '✅ Event updated!');
  };
  const handleDeleteEvent = (id) => {
    setEventsList(prev => {
      const updated = prev.filter(e => e.id !== id);
      saveEvents(updated);
      return updated;
    });
    setDeleteEvent(null);
    showToast('🗑 Event deleted!');
  };`;

if (!content.includes('handleSaveEvent =')) {
  content = content.replace('const handleSaveTeam =', handlersInjection + '\n\n  /* Save Team (Add or Edit) */\n  const handleSaveTeam =');
}

const headerTabs = `
        <div className="adm-header-center adm-tabs-center">
          <button className={\`adm-tab-btn heading-font \${activeTab === 'teams' ? 'active' : ''}\`} onClick={() => setActiveTab('teams')}>TEAMS</button>
          <button className={\`adm-tab-btn heading-font \${activeTab === 'events' ? 'active' : ''}\`} onClick={() => setActiveTab('events')}>EVENTS</button>
        </div>`;

if (!content.includes('adm-header-center adm-tabs-center')) {
  content = content.replace('<button className="adm-mobile-menu-btn"', headerTabs + '\n\n        <button className="adm-mobile-menu-btn"');
}

const eventsLayout = `
      {activeTab === 'events' ? (
        <div className="adm-layout adm-events-layout">
          <main className="adm-main" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', paddingTop: '20px' }}>
            <div className="adm-main-header">
              <div>
                <h2 className="adm-main-title heading-font" style={{ color: '#e60000' }}>EVENTS SHOWCASE</h2>
                <p className="adm-main-sub">Manage events displayed on the website</p>
              </div>
              <button className="adm-add-btn heading-font" style={{ borderColor: '#e60000', color: '#e60000' }} onClick={() => { 
                setIsNewEvent(true); 
                setEditingEvent({ title: '', description: '', series: 'STG SERIES', season: '', status: 'COMPLETED', prizePool: '', period: '', videoUrl: '', posterImage: null, hasDetailsButton: true }); 
              }}>➕ ADD EVENT</button>
            </div>
            <div className="adm-events-grid">
              {eventsList.map(ev => (
                <div key={ev.id} className="adm-event-card">
                   <div className="adm-card-top-actions">
                    <button className="adm-top-btn" onClick={() => { setEditingEvent(ev); setIsNewEvent(false); }}>✏️</button>
                    <button className="adm-top-btn adm-top-btn-del" onClick={() => setDeleteEvent({ id: ev.id, name: ev.title })}>🗑</button>
                   </div>
                   <div className="adm-event-img-wrap">
                     {ev.posterImage ? <img src={ev.posterImage} alt={ev.title} className="adm-event-img" /> : <div className="adm-event-no-img">No Image</div>}
                     <span className={\`adm-event-badge \${ev.status === 'UPCOMING' ? 'upcoming' : 'completed'}\`}>{ev.status}</span>
                   </div>
                   <div className="adm-event-info">
                     <h4 className="heading-font">{ev.title}</h4>
                     <p>{ev.series} | {ev.period}</p>
                   </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      ) : (
`;

if (!content.includes('activeTab === \'events\'')) {
  content = content.replace('<div className="adm-layout">', eventsLayout + '        <div className="adm-layout">');
  content = content.replace('      {/* Add / Edit Team Modal */}', '      )}\n\n      {/* Add / Edit Team Modal */}');
}

const modalRender = `
      {editingEvent && (
        <EventEditModal
          event={editingEvent}
          isNew={isNewEvent}
          onSave={handleSaveEvent}
          onDelete={(id) => setDeleteEvent({ id, name: editingEvent.title })}
          onClose={() => setEditingEvent(null)}
        />
      )}
      
      {deleteEventInfo && (
        <ConfirmDeleteModal
          playerName={deleteEventInfo.name + ' (Event)'}
          onConfirm={() => handleDeleteEvent(deleteEventInfo.id)}
          onCancel={() => setDeleteEvent(null)}
        />
      )}
`;

if (!content.includes('<EventEditModal')) {
  content = content.replace('{/* Profile Modal */}', modalRender + '\n      {/* Profile Modal */}');
}

fs.writeFileSync(file, content);
console.log('AdminDashboard updated successfully!');
