import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PlayerModal from '../components/PlayerModal';
import dharshanImg from '../assets/dharshan-stg.png';
import donImg from '../assets/stg-don.png';
import cyberBg from '../assets/bgmi-lineup-bg.png';
import './LineupPage.css';

const squadMembers = [
  { name: 'STG Esports', role: 'ENTRY FRAGGER', icon: '🎮', kd: '3.8', id: 'STG_ES_01' },
  { name: 'STG Emergency', role: 'SUPPORT', icon: '👤', kd: '2.5', id: 'STG_EM_05' },
  { name: 'STG Alpha', role: 'IGL (IN-GAME LEADER)', icon: '⭐', kd: '4.2', id: 'STG_AL_09' },
  { name: 'STG Riders', role: 'SNIPER', icon: '🏆', kd: '5.1', id: 'STG_RI_03' },
  { name: 'STG WhiteFango', role: 'RUSHER', icon: '👤', kd: '4.0', id: 'STG_WF_07' },
  { name: 'STG Mindrip', role: 'LURKER', icon: '🎮', kd: '3.2', id: 'STG_MR_04' },
  { name: 'STG Seniors', role: 'VETERAN', icon: '🛡️', kd: '3.5', id: 'STG_SN_02' },
  { name: 'STG Juniors', role: 'RISING STAR', icon: '🎮', kd: '2.8', id: 'STG_JR_08' },
  { name: 'STG Warriors', role: 'FIGHTER', icon: '🏆', kd: '3.9', id: 'STG_WA_06' },
  { name: 'STG Rulers', role: 'DOMINATOR', icon: '⭐', kd: '4.8', id: 'STG_RU_10' }
];

const LineupPage = () => {
  const navigate = useNavigate();
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="lineup-page">
      {/* Hero Section */}
      <section className="lineup-hero">
        <div className="hero-bg-animated" style={{ backgroundImage: `url(${cyberBg})` }}></div>
        <div className="hero-hud-overlay"></div>
        
        {/* Tactical HUD Elements */}
        <div className="tactical-hud hud-left">
          <div className="hud-box">
            <span className="hud-label">PLAYERS ONLINE</span>
            <span className="hud-value">12,456</span>
          </div>
          <div className="hud-stats">
            <div className="hud-stat-item">
              <span className="hud-icon">⚡</span>
              <span>LATENCY: 24ms</span>
            </div>
            <div className="hud-stat-item">
              <span className="hud-icon">🌍</span>
              <span>REGION: ASIA-SOUTH</span>
            </div>
          </div>
        </div>

        <div className="tactical-hud hud-right">
          <div className="hud-box">
            <span className="hud-label">CURRENT SEASON</span>
            <span className="hud-value">09</span>
          </div>
          <div className="hud-rank">
            <div className="rank-tier">GRANDMASTER</div>
          </div>
        </div>

        <button className="back-btn glass" onClick={() => navigate(-1)}>
          <span className="arrow">←</span> BACK
        </button>

        <div className="stg-container h-full relative">
          
          <div className="hero-content">
            <motion.div 
              className="roster-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              ELITE ROSTER
            </motion.div>
            
            <motion.h1 
              className="lineup-title heading-font"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              STG <span className="green-text">LINEUP</span>
            </motion.h1>
            
            <motion.p 
              className="lineup-desc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Meet the brilliant minds and elite gamers powering the heart of STG Esports. <br />
              Precision, strategy, and raw skill.
            </motion.p>
          </div>

          <div className="scroll-indicator-v2">
            <span className="heading-font">SCROLL</span>
            <div className="mouse-icon">
              <div className="wheel"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Visionaries Section */}
      <section className="visionaries-section stg-section">
        <div className="stg-container">
          <div className="visionaries-grid">
            {/* Dharshan */}
            <div className="visionary-card glass border-glow-green">
              <div className="player-frame">
                <img src={dharshanImg} alt="Dharshan STG" />
                <div className="rank-star">★</div>
              </div>
              <div className="visionary-info">
                <span className="tag-visionary">VISIONARY</span>
                <h3 className="heading-font">Dharshan STG</h3>
                <p className="role-green">IGL</p>
                <p className="visionary-desc">
                  Strategic Founder & CEO, leading STG Esports with a mission to empower elite talent and dominate the global stage.
                </p>
              </div>
            </div>

            {/* STG DON */}
            <div className="visionary-card glass border-glow-green">
              <div className="player-frame">
                <img src={donImg} alt="STG DON" />
                <div className="rank-star">★</div>
              </div>
              <div className="visionary-info">
                <span className="tag-strategist">STRATEGIST</span>
                <h3 className="heading-font">STG DON</h3>
                <p className="role-green">OPERATION MANAGER</p>
                <p className="visionary-desc">
                  Masterminding team operations and orchestrating our path to regional dominance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Squad Section */}
      <section className="squad-section stg-section">
        <div className="stg-container">
          <motion.div className="squad-header center" {...fadeIn}>
            <h2 className="heading-font">STG'S <span className="green-text">SQUAD</span></h2>
            <div className="green-underline"></div>
            <p className="instruction-text">Click on a team card to view player stats</p>
          </motion.div>

          <div className="squad-grid">
            {squadMembers.map((member, i) => (
              <div 
                key={i} 
                className="squad-card glass"
                onClick={() => handlePlayerClick(member)}
              >
                <div className="squad-icon-box">
                  <span className="squad-icon">{member.icon}</span>
                </div>
                <div className="squad-info">
                  <h4 className="heading-font">{member.name}</h4>
                  <p className="squad-role">{member.role}</p>
                </div>
                <div className="dropdown-arrow">▼</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PlayerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        player={selectedPlayer} 
      />
    </div>
  );
};

export default LineupPage;
