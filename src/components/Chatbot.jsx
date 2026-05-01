import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`chatbot-wrapper ${isOpen ? 'open' : ''}`}>
      <div className="chatbot-icon glass border-glow-red" onClick={() => setIsOpen(!isOpen)}>
        <svg viewBox="0 0 100 100" className="robot-svg">
          <defs>
            <linearGradient id="robot-head-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2c2c2c" />
              <stop offset="50%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
            <filter id="glow-red">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Robot Head Body */}
          <path 
            d="M20 30 Q20 15 50 15 Q80 15 80 30 L80 65 Q80 80 50 80 Q20 80 20 65 Z" 
            fill="url(#robot-head-grad)" 
            stroke="#333" 
            strokeWidth="1"
          />
          
          {/* Visor/Face Area */}
          <rect x="25" y="35" width="50" height="25" rx="12.5" fill="#0a0a0a" stroke="#444" />
          
          {/* Digital Scanlines on Visor */}
          <rect x="25" y="38" width="50" height="1" fill="rgba(255,255,255,0.05)" />
          <rect x="25" y="42" width="50" height="1" fill="rgba(255,255,255,0.05)" />
          <rect x="25" y="46" width="50" height="1" fill="rgba(255,255,255,0.05)" />
          <rect x="25" y="50" width="50" height="1" fill="rgba(255,255,255,0.05)" />
          <rect x="25" y="54" width="50" height="1" fill="rgba(255,255,255,0.05)" />
          
          {/* Reflection highlight */}
          <path d="M30 38 Q50 32 70 38" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
          
          {/* Glowing Eyes */}
          <circle cx="40" cy="47.5" r="4" fill="#ff3b30" className="eye-glow" filter="url(#glow-red)" />
          <circle cx="60" cy="47.5" r="4" fill="#ff3b30" className="eye-glow" filter="url(#glow-red)" />
          
          {/* Antennas */}
          <line x1="35" y1="15" x2="30" y2="5" stroke="#444" strokeWidth="3" strokeLinecap="round" />
          <line x1="65" y1="15" x2="70" y2="5" stroke="#444" strokeWidth="3" strokeLinecap="round" />
          <circle cx="30" cy="5" r="2" fill="#ff3b30" filter="url(#glow-red)" className="eye-glow" />
          <circle cx="70" cy="5" r="2" fill="#ff3b30" filter="url(#glow-red)" className="eye-glow" />
          
          {/* Mouth Detail */}
          <rect x="42.5" y="65" width="15" height="2" rx="1" fill="#333" />
        </svg>
      </div>
      
      {isOpen && (
        <div className="chatbot-window glass border-glow-red">
          <div className="chatbot-header heading-font">STG ASSISTANT</div>
          <div className="chatbot-body">
            <p>Welcome to STG Esports! How can we help you dominate today?</p>
            <div className="chat-options">
              <button>Tournaments</button>
              <button>Join Lineup</button>
              <button>Support</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
