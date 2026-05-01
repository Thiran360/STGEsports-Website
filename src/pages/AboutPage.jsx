import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import phoenixBg from '../assets/about-phoenix.png';
import './AboutPage.css';

const AboutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="about-page">
      {/* Hero Section with Gaming Background */}
      <section className="about-hero">
        <div className="about-hero-bg" style={{ backgroundImage: `url(${phoenixBg})` }}></div>
        <div className="hero-overlay"></div>
        <div className="stg-container flex-col h-full center-content relative">
          <button className="back-btn glass" onClick={() => navigate(-1)}>
            <span className="arrow">←</span> BACK
          </button>
          
          <div className="hero-content center">
            <motion.div 
              className="legacy-tag-pill"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
            >
              THE STG LEGACY
            </motion.div>
            
            <motion.h1 
              className="hero-title heading-font"
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            >
              DO YOU KNOW ABOUT <br />
              <span className="red-text">
                STG?
              </span>
            </motion.h1>
          </div>

          <motion.div 
            className="scroll-indicator-v2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <span className="heading-font">SCROLL</span>
            <div className="mouse-icon">
              <div className="wheel"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophical Section */}
      <section className="about-philosophical stg-section">
        <div className="stg-container center">
          <motion.h2 className="heading-font section-title" {...fadeIn}>
            WHAT IS <span className="red-text">STG?</span>
          </motion.h2>
          
          <motion.div className="philosophy-content" {...fadeIn}>
            <p className="highlight-text">
              Just like a <span className="red-text">Phoenix</span> rising from the ashes, STG stands for relentless power and rebirth. 
              We never stay down, we only burn brighter.
            </p>
            
            <div className="desc-block">
              <p>Strong Ties Gaming (STG) is India's premier community-driven esports platform, dedicated to fostering talent and providing a professional stage for gamers.</p>
              <p>We bridge the gap between casual play and competitive excellence through meticulously organized tournaments and interactive live events.</p>
              <p>Our mission is to build a robust gaming ecosystem where every player has the opportunity to shine and dominate the arena.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision-section stg-section bg-darker">
        <div className="stg-container">
          <div className="mission-grid">
            <div className="mission-card glass">
              <h3 className="heading-font red-text">OUR MISSION</h3>
              <p>To provide an unparalleled competitive ecosystem for PUBG & BGMI players, where skill meets reward. We aim to identify, foster, and showcase the next generation of esports stars in India.</p>
            </div>
            <div className="mission-card glass">
              <h3 className="heading-font red-text">OUR VISION</h3>
              <p>To become the bedrock of the Indian esports industry, bridging the gap between amateur enthusiasm and professional excellence through integrity, technology, and community-driven initiatives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="values-section stg-section">
        <div className="stg-container">
          <motion.div className="values-header center" {...fadeIn}>
            <h2 className="heading-font">CORE VALUES</h2>
            <div className="red-underline"></div>
          </motion.div>

          <div className="values-grid-v2">
            <div className="value-card glass">
              <h3 className="heading-font red-text">INTEGRITY</h3>
              <p>Fair play is our priority. We maintain the highest standards of tournament regulation.</p>
            </div>
            <div className="value-card glass">
              <h3 className="heading-font red-text">INNOVATION</h3>
              <p>Leveraging cutting-edge tech to provide a seamless and immersive tournament experience.</p>
            </div>
            <div className="value-card glass">
              <h3 className="heading-font red-text">COMMUNITY</h3>
              <p>STG is built by gamers, for gamers. We listen, adapt, and grow with our community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer is already part of App layout */}
    </div>
  );
};

export default AboutPage;
