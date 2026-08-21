import React, { useState, useEffect } from 'react';
import './STGWatermark.css';

const STGWatermark = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const rows = 17;
  const rowH = 17;
  const sLine = 'SNIPER  SQUAD  SURVIVAL  SHOOTER  SCOPE  STEALTH  SOLO  SPRAY  ';
  const tLine = 'TRIGGER  TACTICAL  TEAM  TITAN  TAKEDOWN  TOP FRAG  THUNDER  ';
  const gLine = 'GLORY  GUNFIRE  GRENADE  GRANDMASTER  GRIND  GUERRILLA  GUN  ';
  const rep = (s, n) => Array(n).fill(s).join('');

  return (
    <div className={`stg-wm-wrap ${isScrolled ? 'visible' : 'hidden'}`} aria-hidden="true">
      <svg
        viewBox="0 0 780 300"
        xmlns="http://www.w3.org/2000/svg"
        className="stg-wm-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="shine-grad" x1="-100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,0,0,0.95)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,0,0,0.95)" />
            <animate 
              attributeName="x1" 
              from="-100%" to="100%" 
              dur="4s" 
              repeatCount="indefinite" 
            />
            <animate 
              attributeName="x2" 
              from="0%" to="200%" 
              dur="4s" 
              repeatCount="indefinite" 
            />
          </linearGradient>

          <clipPath id="stgwm-s">
            <text x="50" y="275" className="stg-wm-ltr">S</text>
          </clipPath>
          <clipPath id="stgwm-t">
            <text x="290" y="275" className="stg-wm-ltr">T</text>
          </clipPath>
          <clipPath id="stgwm-g">
            <text x="530" y="275" className="stg-wm-ltr">G</text>
          </clipPath>
        </defs>

        <g clipPath="url(#stgwm-s)">
          {Array.from({ length: rows }, (_, i) => (
            <text 
              key={i} 
              x="0" 
              y={14 + i * rowH} 
              className={`stg-wm-word ${i % 2 === 0 ? 'marquee-left' : 'marquee-right'}`}
              fill="url(#shine-grad)"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {rep(sLine, 4)}
            </text>
          ))}
        </g>

        <g clipPath="url(#stgwm-t)">
          {Array.from({ length: rows }, (_, i) => (
            <text 
              key={i} 
              x="265" 
              y={14 + i * rowH} 
              className={`stg-wm-word ${i % 2 === 0 ? 'marquee-right' : 'marquee-left'}`}
              fill="url(#shine-grad)"
              style={{ animationDelay: `${(i + 4) * 0.15}s` }}
            >
              {rep(tLine, 4)}
            </text>
          ))}
        </g>

        <g clipPath="url(#stgwm-g)">
          {Array.from({ length: rows }, (_, i) => (
            <text 
              key={i} 
              x="505" 
              y={14 + i * rowH} 
              className={`stg-wm-word ${i % 2 === 0 ? 'marquee-left' : 'marquee-right'}`}
              fill="url(#shine-grad)"
              style={{ animationDelay: `${(i + 8) * 0.15}s` }}
            >
              {rep(gLine, 4)}
            </text>
          ))}
        </g>

      </svg>
    </div>
  );
};

export default STGWatermark;
