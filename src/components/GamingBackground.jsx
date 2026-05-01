import React from 'react';
import './GamingBackground.css';
import plexusBg from '../assets/stg-plexus-bg.png';

const GamingBackground = () => {
  return (
    <div className="gaming-bg-container">
      <div 
        className="static-plexus-bg"
        style={{ backgroundImage: `url(${plexusBg})` }}
      ></div>
      
      {/* Atmospheric Gradients */}
      <div className="vignette"></div>
    </div>
  );
};

export default GamingBackground;
