const fs = require('fs');
const file = 'src/pages/AdminDashboard.jsx';
let content = fs.readFileSync(file, 'utf8');

const targetStart = '<div className="adm-layout">';
const targetEnd = '      {/* Add / Edit Team Modal */}';

const before = content.substring(0, content.indexOf(targetStart));
const after = content.substring(content.indexOf(targetEnd));

const newLayout = `
      {activeTab === 'teams' ? (
        <div className="adm-layout">
          {/* Sidebar */}
          <aside className="adm-sidebar">
            <p className="adm-sidebar-label heading-font">TEAMS</p>
            {Object.entries(teams).map(([key, t]) => (
              <div key={key} className="adm-team-tab-row">
                <button
                  className={\`adm-team-tab \${activeTeam === key ? 'adm-team-tab--active' : ''}\`}
                  style={activeTeam === key ? { borderColor: t.glow, color: t.glow, boxShadow: \`0 0 12px \${t.glow}33\` } : {}}
                  onClick={() => setActiveTeam(key)}
                >
                  <span className="adm-tab-dot" style={{ background: t.glow }} />
                  {t.label}
                </button>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    className="adm-team-del-btn"
                    title={\`Edit \${t.label}\`}
                    onClick={() => { setEditingTeamKey(key); setShowTeamEdit(true); }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  </button>
                  <button
                    className="adm-team-del-btn"
                    title={\`Delete \${t.label}\`}
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
              <div>
                <h2 className="adm-main-title heading-font" style={{ color: team.glow }}>{team.label}</h2>
                <p className="adm-main-sub">{team.players.length} player{team.players.length !== 1 ? 's' : ''}</p>
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
                      <p className="adm-player-ig">{player.ig ? \`@\${player.ig}\` : '—'}</p>
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
            <div className="adm-events-header">
              <h2 className="adm-main-title heading-font" style={{ color: '#e60000', margin: 0 }}>EVENTS SHOWCASE</h2>
              <button className="adm-add-btn heading-font" style={{ borderColor: '#e60000', color: '#e60000', margin: 0, padding: '0.6rem 1rem' }} onClick={() => { 
                setIsNewEvent(true); 
                setEditingEvent({ id: Date.now(), title: '', description: '', series: 'STG SERIES', season: '', status: 'COMPLETED', prizePool: '', period: '', videoUrl: '', posterImage: null, hasDetailsButton: true }); 
              }}>➕ ADD NEW EVENT</button>
            </div>
            <div className="adm-events-grid">
              {eventsList.map(ev => (
                <div key={ev.id} className={\`adm-event-card \${editingEvent?.id === ev.id ? 'active' : ''}\`} onClick={() => { setEditingEvent(ev); setIsNewEvent(false); }}>
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
          </div>
          <div className="adm-events-right">
             {editingEvent ? (
                <div className="adm-event-form">
                  <div className="adm-event-form-header">
                     <h3 className="adm-event-form-title heading-font">{isNewEvent ? '➕ NEW EVENT' : '✏️ EDIT EVENT'}</h3>
                  </div>
                  
                  <div className="adm-photo-section">
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
                       reader.onload = (ev) => { setEditingEvent(f => ({ ...f, posterImage: ev.target.result })); };
                       reader.readAsDataURL(file);
                    }} />
                  </div>

                  <div className="adm-fields">
                    <div className="adm-field-group">
                      <label className="adm-field-label heading-font">OPERATION TITLE</label>
                      <input className="adm-field-input" value={editingEvent.title} onChange={e => setEditingEvent(f => ({ ...f, title: e.target.value }))} placeholder="e.g. STG OPERATION\\nI" />
                    </div>
                    <div className="adm-field-group">
                      <label className="adm-field-label heading-font">SERIES & SEASON</label>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <input className="adm-field-input" value={editingEvent.series} onChange={e => setEditingEvent(f => ({ ...f, series: e.target.value }))} placeholder="STG SERIES" />
                        <input className="adm-field-input" value={editingEvent.season} onChange={e => setEditingEvent(f => ({ ...f, season: e.target.value }))} placeholder="01" />
                      </div>
                    </div>
                    <div className="adm-field-group">
                      <label className="adm-field-label heading-font">STATUS & PRIZE POOL</label>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <select className="adm-field-input" value={editingEvent.status} onChange={e => setEditingEvent(f => ({ ...f, status: e.target.value }))}>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="UPCOMING">UPCOMING</option>
                        </select>
                        <input className="adm-field-input" value={editingEvent.prizePool} onChange={e => setEditingEvent(f => ({ ...f, prizePool: e.target.value }))} placeholder="₹10,000" />
                      </div>
                    </div>
                    <div className="adm-field-group">
                      <label className="adm-field-label heading-font">PERIOD</label>
                      <input className="adm-field-input" value={editingEvent.period} onChange={e => setEditingEvent(f => ({ ...f, period: e.target.value }))} placeholder="JANUARY 2024" />
                    </div>
                    <div className="adm-field-group">
                      <label className="adm-field-label heading-font">YOUTUBE VIDEO URL (optional)</label>
                      <input className="adm-field-input" value={editingEvent.videoUrl || ''} onChange={e => setEditingEvent(f => ({ ...f, videoUrl: e.target.value }))} placeholder="https://youtube.com/live/..." />
                    </div>
                    <div className="adm-field-group">
                      <label className="adm-field-label heading-font">DESCRIPTION</label>
                      <textarea className="adm-field-input adm-textarea" value={editingEvent.description} onChange={e => setEditingEvent(f => ({ ...f, description: e.target.value }))} placeholder="Event details..." rows={5} />
                    </div>
                  </div>

                  <div className="adm-modal-footer" style={{ padding: '1rem 0' }}>
                    {!isNewEvent && (
                       <button className="adm-btn-delete" onClick={() => setDeleteEvent({ id: editingEvent.id, name: editingEvent.title })}>🗑 DELETE</button>
                    )}
                    <button className="adm-btn-cancel" onClick={() => setEditingEvent(null)}>CANCEL</button>
                    <button className="adm-btn-save" style={{ background: '#e60000', color: '#fff' }} onClick={() => handleSaveEvent(editingEvent)}>{isNewEvent ? 'ADD EVENT' : 'SAVE CHANGES'}</button>
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

`;

// Remove the old EventEditModal rendering since we embedded it.
const finalAfter = after.replace(/\{\s*editingEvent\s*&&\s*\(\s*<EventEditModal[\s\S]*?\/>\s*\)\s*\}/, '');

fs.writeFileSync(file, before + newLayout + finalAfter);
console.log('Split layout injected!');
