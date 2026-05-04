import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import '../components/SponsorsElite.css'; // Import styles for jersey

const Hero = ({ 
  imageSrc = null, 
  title = null, 
  subtitle = null, 
  badgeText = null,
  showScroll = true,
  showTitleBox = true,
  bgStyle = {},
  overlayStyle = {}
}) => {


  return (
    <section className="hero-section" id="home">
      {imageSrc && (
        <div 
          className="hero-image-bg" 
          style={{ backgroundImage: `url("${imageSrc}")`, ...bgStyle }}
        ></div>
      )}
      
      <div className="hero-grid-container single-column">
        <div className="hero-grid-left">
          <div className={showTitleBox ? "hero-title-box glass border-glow-red" : "hero-title-plain"}>
            {badgeText && (
              <motion.div 
                className="hero-badge heading-font"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                {badgeText}
              </motion.div>
            )}
            <motion.h1 
              className="hero-main-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {title || <>STG <span className="red-text">ESPORTS</span></>}
            </motion.h1>
            {subtitle && (
              <motion.p 
                className="hero-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>
        {/* Right side grid removed as per user request to make Hero single column */}
      </div>

      {showScroll && (
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span>SCROLL</span>
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </motion.div>
      )}
      <div className="hero-overlay" style={overlayStyle}></div>
    </section>
  );
};

export default Hero;


