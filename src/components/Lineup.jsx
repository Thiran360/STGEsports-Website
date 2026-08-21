import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Lineup.css';

const players = [
  { name: 'DHARSHAN STG', role: 'CHIEF EXECUTIVE OFFICER', img: 'https://img.freepik.com/premium-photo/pubg-game-wallpaper-gaming-background-player-with-gun_1020697-28045.jpg', stats: { kd: 4.5, matches: 1200, wins: 450 } },
  { name: 'STG DON', role: 'OPERATIONS MANAGER', img: 'https://img.freepik.com/premium-photo/gaming-poster-holding-gun-game-wallpaper_1020697-28038.jpg', stats: { kd: 3.8, matches: 900, wins: 310 } },
  { name: 'STG ALPHA', role: 'PRO PLAYER / ENTRY', img: 'https://img.freepik.com/premium-photo/pubg-background-gaming-wallpaper-4k_1020697-28035.jpg', stats: { kd: 5.2, matches: 1500, wins: 600 } },
  { name: 'STG MINDRIP', role: 'PRO PLAYER / SNIPER', img: 'https://img.freepik.com/premium-photo/pubg-mobile-background-gaming-wallpaper_1020697-28034.jpg', stats: { kd: 4.9, matches: 1400, wins: 550 } },
];

const Lineup = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  return (
    <section className="lineup-section stg-section" id="lineup">
      <div className="stg-container">
        <div className="section-header">
          <h2 className="glow-green">ELITE LINEUP</h2>
          <p>Commanders and Operatives of the STG Field</p>
        </div>
        <div className="lineup-grid">
          {players.map((p, i) => (
            <div key={i} className="player-card glass border-glow-green" onClick={() => setSelectedPlayer(p)}>
              <div className="player-img-container">
                <img src={p.img} alt={p.name} className="player-img" loading="lazy" decoding="async" />
                <div className="player-info">
                  <h3>{p.name}</h3>
                  <p>{p.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="view-more-container">
          <Link to="/lineup" className="view-all-btn glass border-glow-green heading-font">
            VIEW FULL LINEUP <span className="arrow">→</span>
          </Link>
        </div>
      </div>

      {selectedPlayer && (
        <div className="player-modal-backdrop" onClick={() => setSelectedPlayer(null)}>
          <div className="player-modal glass border-glow-green" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedPlayer(null)}>×</button>
            <div className="modal-content">
              <h2 className="heading-font glow-green">{selectedPlayer.name}</h2>
              <p className="modal-role">{selectedPlayer.role}</p>
              <div className="modal-stats">
                <div className="stat"><span>K/D</span><strong>{selectedPlayer.stats.kd}</strong></div>
                <div className="stat"><span>Matches</span><strong>{selectedPlayer.stats.matches}</strong></div>
                <div className="stat"><span>Wins</span><strong>{selectedPlayer.stats.wins}</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Lineup;
