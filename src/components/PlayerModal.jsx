import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PlayerModal.css';

const PlayerModal = ({ isOpen, onClose, player }) => {
  if (!isOpen || !player) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="modal-content glass border-glow-red"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" onClick={onClose}>&times;</button>
          
          <div className="modal-header">
            <h2 className="heading-font red-glow-text">{player.name}</h2>
            <span className="player-role-badge">{player.role}</span>
          </div>

          <div className="modal-body">
            <div className="stat-grid">
              <div className="stat-item">
                <span className="stat-label">PLAYER ID</span>
                <span className="stat-value">{player.id || 'STG_001'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">K/D RATIO</span>
                <span className="stat-value">{player.kd || '4.5'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">ROLE</span>
                <span className="stat-value">{player.roleDetail || 'Strategic Core'}</span>
              </div>
            </div>

            <div className="achievements-section">
              <h3 className="heading-font">ACHIEVEMENTS</h3>
              <ul>
                {player.achievements ? player.achievements.map((ach, i) => (
                  <li key={i}>{ach}</li>
                )) : (
                  <>
                    <li>🏆 PMSC Global Finals Finalist</li>
                    <li>🥇 NODWIN Esports Champion</li>
                    <li>🔥 MVP - Battlegrounds Series</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="modal-footer">
            <div className="tactical-line"></div>
            <p className="tactical-footer">SYSTEM INITIALIZED // SECURE CONNECTION STABLE</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PlayerModal;
