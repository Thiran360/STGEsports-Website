import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import '../components/SponsorsElite.css'; // Import styles for jersey

const Hero = ({ 
  imageSrc = null, 
  mobileImageSrc = null,
  videoSrc = null,
  title = null, 
  subtitle = null, 
  badgeText = null,
  showScroll = true,
  showTitleBox = true,
  bgStyle = {},
  overlayStyle = {},
  bgComponent = null
}) => {
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(err => {});
    }
  };

  return (
    <section className="hero-section" id="home">
      {videoSrc && (
        <video 
          ref={videoRef}
          className="hero-video-bg" 
          autoPlay 
          loop 
          muted 
          playsInline
          preload="metadata"
          onEnded={handleVideoEnd}
          style={bgStyle}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      {imageSrc && !videoSrc && (
        <>
          <div 
            className={`hero-image-bg ${mobileImageSrc ? 'desktop-bg' : ''}`} 
            style={{ backgroundImage: `url("${imageSrc}")`, ...bgStyle }}
          ></div>
          {mobileImageSrc && (
            <div 
              className="hero-image-bg mobile-bg" 
              style={{ backgroundImage: `url("${mobileImageSrc}")`, ...bgStyle }}
            ></div>
          )}
        </>
      )}
      {bgComponent && bgComponent}
      
      <div className="hero-grid-container single-column">
        <div className="hero-grid-left">
          <div className={showTitleBox ? "hero-title-box glass border-glow-red" : "hero-title-plain"}>
            {badgeText && (
              <motion.div 
                className="hero-badge heading-font"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {badgeText}
              </motion.div>
            )}
            <motion.h1 
              className="hero-main-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {title || <><span className="red-text">STG</span> <span className="red-text">ESPORTS</span></>}
            </motion.h1>
            {subtitle && (
              <motion.p 
                className="hero-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {subtitle}
              </motion.p>
            )}

            {showScroll && (
              <motion.div 
                className="scroll-indicator-v2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{ position: 'relative', bottom: 'auto', left: 'auto', transform: 'none', marginTop: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <span className="heading-font">SCROLL</span>
                <div className="mouse-icon">
                  <div className="wheel"></div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        {/* Right side grid removed as per user request to make Hero single column */}
      </div>
      <div className="hero-overlay" style={overlayStyle}></div>
    </section>
  );
};

export default Hero;


