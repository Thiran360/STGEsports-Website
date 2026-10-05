import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './EventsShowcase.css';
import jokerBg from '../assets/joker-phoenix-bg.jpg';
import cyberBg from '../assets/cyber-grid-bg.png';
import phoenixBg from '../assets/phoenix-bg.png';
import trophyImg from '../assets/trophy.png';

import { loadEvents, sortEvents, formatRomanTitle } from './eventsData';

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

const EventsShowcase = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    // Fetch from backend
    const fetchEventsFromAPI = async () => {
      try {
        const res = await fetch('https://api.codingboss.in/sports_app/get-event/', {
          headers: { 'ngrok-skip-browser-warning': 'true' }
        });
        if (!res.ok) {
          setEventsData(loadEvents());
          return;
        }
        const data = await res.json();
        const rawEvents = Array.isArray(data) ? data : (data.results || []);
        if (!rawEvents.length) {
          setEventsData(loadEvents());
          return;
        }

        const mappedEvents = rawEvents.map(e => {
          let pImage = e.image || e.posterImage || '';
          if (pImage && typeof pImage === 'string' && pImage.startsWith('/')) {
            if (pImage.startsWith('/assets/')) {
              // Map backend hardcoded asset paths to local imports
              if (pImage.includes('cyber-grid-bg')) pImage = cyberBg;
              else if (pImage.includes('joker-phoenix')) pImage = jokerBg;
              else if (pImage.includes('matrix-bg')) pImage = phoenixBg; // fallback if we don't import matrix-bg, or we can just let it try the path. Actually, we'll strip the hash for dev if no match.
              
              // If it's a dev environment and didn't match our imports, try to strip the hash
              if (pImage.startsWith('/assets/') && import.meta.env.DEV) {
                pImage = pImage.replace(/-[a-zA-Z0-9_]+\.(png|jpe?g)$/, '.$1').replace('/assets/', '/src/assets/');
              }
            } else {
              pImage = `https://api.codingboss.in${pImage}`;
            }
          }
          const eventTitle = formatRomanTitle(e.operationName || e.title || '');
          const isOperation1 = eventTitle.endsWith('Ⅰ') || eventTitle.endsWith('I') || eventTitle.endsWith('1') || String(e.id) === '11' || String(e.id) === 'def_1';

          return {
            ...e,
            title: eventTitle,
            prizePool: isOperation1 ? '₹25,000' : (e.price || e.prizePool || ''),
            posterImage: pImage,
            status: e.status || 'COMPLETED',
            mode: e.mode || '',
            slots: e.slots || '',
            entry: isOperation1 ? '500' : (e.entry || '')
          };
        });
        
        setEventsData(sortEvents(mappedEvents));
      } catch (e) {
        console.error('Failed to fetch events from API:', e);
        setEventsData(loadEvents());
      }
    };
    fetchEventsFromAPI();
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setIsPlaying(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedEvent]);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const videoId = url.split('live/')[1]?.split('?')[0] || url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  const [loadingDetailsId, setLoadingDetailsId] = useState(null);

  const handleViewDetails = async (ev) => {
    setLoadingDetailsId(ev.id || ev.title);
    try {
      const res = await fetch('https://api.codingboss.in/sports_app/get-event-details/', {
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      let enrichedEvent = { ...ev };
      
      if (res.ok) {
        const detailsData = await res.json();
        // Try to match by ID or operationName (title)
        const details = detailsData.find(d => 
          String(d.id) === String(ev.id) || 
          (d.operationName && ev.title && d.operationName.trim().toLowerCase() === ev.title.trim().toLowerCase())
        );
        
        if (details) {
          const resolveMedia = (url) => {
            if (!url) return null;
            if (typeof url === 'string' && url.startsWith('/')) return `https://api.codingboss.in${url}`;
            return url;
          };

          enrichedEvent = {
            ...enrichedEvent,
            description: details.description || ev.description,
            videoUrl: details.youtubeLink || ev.videoUrl,
            period: details.datePeriod || ev.period,
            winners: details.prizeWinners ? details.prizeWinners.split(',').map(w => w.trim()) : ev.winners,
            posterImage: resolveMedia(details.detailImage) || ev.posterImage
          };
        }
      }
      setSelectedEvent(enrichedEvent);
    } catch (e) {
      console.error('Failed to fetch event details', e);
      setSelectedEvent(ev);
    } finally {
      setLoadingDetailsId(null);
    }
  };

  return (
    <section className="events-showcase-section">
      <div className="stg-container">
        {/* Header Section */}
        <div className="showcase-header">
          <div className="showcase-title-group">
            <div className="red-bar"></div>
            <h2 className="showcase-title heading-font">PREVIOUS EVENTS SHOWCASE</h2>
          </div>
        </div>

        {/* Professional List layout */}
        <div className="visionaries-grid" style={{ padding: '0 1rem' }}>
          {!Array.isArray(eventsData) || eventsData.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.5)', width: '100%', gridColumn: '1 / -1' }}>
              <p className="heading-font" style={{ fontSize: '1.5rem' }}>STG EVENTS COMING SOON</p>
              <p>Stay tuned for our upcoming tournaments!</p>
            </div>
          ) : (
            eventsData.map((ev, index) => {
              if (!ev) return null;
              const themeColor = ev.themeColor || '#e50914';
              let themeGlow = ev.themeGlow || 'rgba(229, 9, 20, 0.4)';
              let themeBorder = ev.themeBorder || 'rgba(229, 9, 20, 0.25)';
              
              if (ev.themeColor && ev.themeColor.startsWith('#')) {
                const hex = ev.themeColor.replace('#', '');
                const r = parseInt(hex.substring(0, 2), 16) || 229;
                const g = parseInt(hex.substring(2, 4), 16) || 9;
                const b = parseInt(hex.substring(4, 6), 16) || 20;
                themeGlow = `rgba(${r}, ${g}, ${b}, 0.4)`;
                themeBorder = `rgba(${r}, ${g}, ${b}, 0.25)`;
              }

              return (
                <motion.div 
                  key={ev.id || Math.random()} 
                  className="visionary-card glass"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onClick={(e) => { e.stopPropagation(); handleViewDetails(ev); }}
                  style={{ 
                    cursor: 'pointer',
                    borderColor: themeBorder,
                  }}
                >
                  <div className="player-frame" style={{ borderColor: themeColor, boxShadow: `0 0 20px ${themeGlow}` }}>
                    <img loading="lazy" decoding="async" src={ev.posterImage} alt={ev.title || 'Event'} />
                  </div>
                  <div className="visionary-info">
                    <span className="tag-founder" style={{ 
                      background: ev.status === 'UPCOMING' ? themeColor : '#555',
                      boxShadow: ev.status === 'UPCOMING' ? `0 0 15px ${themeGlow}` : 'none',
                      borderColor: ev.status === 'UPCOMING' ? themeColor : '#444'
                    }}>
                      {ev.status === 'UPCOMING' ? 'UPCOMING' : 'COMPLETED'}
                    </span>
                    <h3 className="heading-font" style={{ 
                      marginTop: '0.8rem', 
                      color: themeColor, 
                      textShadow: `0 0 10px ${themeGlow}` 
                    }}>
                      {renderRomanTitle(ev.title)}
                    </h3>
                    <p className="role-red" style={{ color: themeColor }}>
                      PRICE: {ev.prizePool || (ev.price ? (ev.price.startsWith('₹') ? ev.price : `₹${ev.price}`) : '₹15,000')}
                    </p>
                    <p className="visionary-desc" style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                      <strong>Mode:</strong> {ev.mode || 'CLASSIC - SQUAD'}<br/>
                      <strong>Slots:</strong> {ev.slots || '500'}<br/>
                      <strong>Entry:</strong> {ev.entry || 'FREE'}
                    </p>
                    <button 
                      className="prof-outline-btn" 
                      style={{ 
                        width: '100%', 
                        padding: '0.6rem', 
                        marginTop: '0.5rem', 
                        background: 'transparent', 
                        color: 'white', 
                        border: `1px solid ${themeColor}`, 
                        cursor: 'pointer', 
                        fontFamily: 'var(--font-heading)' 
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = themeColor;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/checkout', { state: { event: ev } });
                      }}
                    >
                      REGISTER
                    </button>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        <AnimatePresence>
          {selectedEvent && (
            <motion.div 
              className="event-modal-overlay news-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div 
                className="event-modal-content news-modal"
                style={(() => {
                  const tc = selectedEvent.themeColor || '#e50914';
                  let tg = selectedEvent.themeGlow || 'rgba(229, 9, 20, 0.4)';
                  let tb = selectedEvent.themeBorder || 'rgba(229, 9, 20, 0.25)';
                  if (selectedEvent.themeColor && selectedEvent.themeColor.startsWith('#')) {
                    const hex = selectedEvent.themeColor.replace('#', '');
                    const r = parseInt(hex.substring(0, 2), 16) || 229;
                    const g = parseInt(hex.substring(2, 4), 16) || 9;
                    const b = parseInt(hex.substring(4, 6), 16) || 20;
                    tg = `rgba(${r}, ${g}, ${b}, 0.4)`;
                    tb = `rgba(${r}, ${g}, ${b}, 0.25)`;
                  }
                  return {
                    '--theme-color': tc,
                    '--theme-glow': tg,
                    '--theme-border': tb
                  };
                })()}
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="modal-close-btn" onClick={() => setSelectedEvent(null)}>✕</button>
                
                <div className="news-modal-inner">
                  {/* Left Side: Poster */}
                  <div className="news-modal-image-col">
                    <img loading="lazy" decoding="async" src={selectedEvent.posterImage} alt={selectedEvent.title} className="news-modal-img" />
                  </div>

                  {/* Right Side: Description and Winners */}
                  <div className="news-modal-content-col">
                    <h3 className="news-modal-title heading-font">
                      {renderRomanTitle(selectedEvent.title)}
                    </h3>
                    
                    <div className="news-modal-desc">
                      <p>
                        {(() => {
                          const text = selectedEvent.description || "";
                          const sentences = text.match(/[^\.!\?]+[\.!\?]+/g);
                          if (sentences && sentences.length > 0) {
                            return sentences.slice(0, 3).join(' ').trim();
                          }
                          return text;
                        })()}
                      </p>
                    </div>

                    <div className="modal-actions-row">
                      <a 
                        href={selectedEvent.videoUrl || "#"} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="news-out-link heading-font"
                      >
                        {selectedEvent.isUpcoming ? "GET NOTIFIED" : "WATCH EVENT"}
                        <svg className="yt-icon" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4s-6.254,0-7.814,0.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.86-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" />
                        </svg>
                      </a>
                      {selectedEvent.status === 'COMPLETED' && (
                        <span className="modal-ended-text">{selectedEvent.registrationDate || 'Registration ended: 0d 0h 0m 0s'}</span>
                      )}
                    </div>

                    {(() => {
                      const eventId = selectedEvent.id;
                      const defaultEvent = eventsData.find(e => e.id === eventId);
                      const winnersList = (selectedEvent.winners && selectedEvent.winners.length > 0) 
                        ? selectedEvent.winners 
                        : (defaultEvent?.winners || []);

                      if (!winnersList || winnersList.length === 0) return null;

                      return (
                        <>
                          <hr className="modal-hr" />
                          <div className="modal-winners-section">
                            <h4 className="winners-heading heading-font">PRIZE WINNERS</h4>
                            <div className="winners-grid">
                              {winnersList.map((winner, idx) => {
                                let prizeText = "";
                                if (idx === 0) prizeText = "1ST PRIZE";
                                else if (idx === 1) prizeText = "2ND PRIZE";
                                else if (idx === 2) prizeText = "3RD PRIZE";
                                else prizeText = `${idx + 1}TH PRIZE`;

                                return (
                                  <div className="winner-small-card" key={idx}>
                                    <div className="prize-badge">{prizeText}</div>
                                    <span className="winner-name">{winner}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default EventsShowcase;
