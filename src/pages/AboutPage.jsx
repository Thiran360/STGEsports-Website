import React, { useEffect } from 'react';
// Last updated: 2026-05-06 19:15
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import phoenixBg from '../assets/mission-bg-new.jpg';
import jokerBg from '../assets/vision-bg-joker.jpeg';
import birdImg from '../assets/bird.jpeg';
import jokerImg from '../assets/jr.jpeg';
import STGWatermark from '../components/STGWatermark';
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
      <STGWatermark />
      {/* Hero Section - 3 column layout */}
      <section className="about-hero">
        <button className="global-back-btn" onClick={() => navigate(-1)}>
          <span className="arrow">←</span> BACK
        </button>

        <div className="about-hero-grid">

          {/* Left Column - Phoenix */}
          <div className="hero-img-col left-col">
            <div className="hero-img-box">
              <img src={birdImg} alt="Phoenix" loading="lazy" decoding="async" />
            </div>
          </div>

          {/* Center Column - Title */}
          <div className="hero-center-col">
            <motion.div 
              className="legacy-tag-pill"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              THE STG LEGACY
            </motion.div>
            
            <motion.h1 
              className="hero-title heading-font"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="line-1">OUR <span className="red-text">STG ESPORTS</span></span>
              <span className="line-2">PRINCIPLES</span>
            </motion.h1>

            <motion.div 
              className="hero-tags-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="tag-input-box">PHOENIX</div>
              <div className="tag-input-box">JOKER</div>
            </motion.div>

            <motion.div 
              className="scroll-indicator-v2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <span className="heading-font">SCROLL</span>
              <div className="mouse-icon">
                <div className="wheel"></div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Joker */}
          <div className="hero-img-col right-col">
            <div className="hero-img-box">
              <img src={jokerImg} alt="Joker" loading="lazy" decoding="async" />
            </div>
          </div>

        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision-section stg-section bg-darker">
        <div className="stg-container">
          <div className="mission-grid">
            <div className="mission-card glass phoenix-card" style={{ backgroundImage: `url(${phoenixBg})` }}>
              <h3 className="heading-font red-text">OUR MISSION</h3>
              <p>Like a Phoenix rising from the ashes, our mission is to turn every challenge into a powerful comeback. At STG eSports, we are committed to building resilient players and teams who evolve with every match. Through competitive tournaments, structured opportunities, and a strong community, we empower gamers to rise stronger, sharper, and ready to dominate the esports arena.</p>
            </div>
            <div className="mission-card glass phoenix-card" style={{ backgroundImage: `url(${jokerBg})` }}>
              <h3 className="heading-font red-text">OUR VISION</h3>
              <p>Strategically unpredictable, remarkably consistent—our vision is inspired by the calculated mindset of the Joker. We aim to stay ahead of the game, adapting to every shift in the esports landscape while delivering seamless and impactful experiences. STG eSports envisions becoming a leading force where innovation meets strategy, creating moments that are unexpected, exciting, and unforgettable.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophical Section */}
      <section className="about-philosophical stg-section">
        <div className="stg-container center">
          <motion.h2 className="heading-font section-title" {...fadeIn}>
            WHAT IS <span className="red-text">STG?</span>
          </motion.h2>
          
          <motion.div className="philosophy-content" {...fadeIn}>
            <div className="desc-block">
              <p>Strong Ties Gaming (STG) is a premier, community-driven esports platform in India, built to empower gamers and elevate competitive play to the next level.</p>
              <p>Inspired by the spirit of a <span className="red-text">Phoenix</span>, STG represents resilience, growth, and relentless determination. We believe every setback is an opportunity to rise stronger, pushing boundaries and redefining excellence in the esports arena.</p>
              <p>At STG, we bridge the gap between casual gaming and professional competition by hosting structured tournaments, high-quality events, and engaging live experiences. Our platform is designed to nurture talent, connect players, and create pathways for aspiring gamers to showcase their skills on a bigger stage.</p>
              <p>Our mission is to build a dynamic and inclusive gaming ecosystem where every player—whether beginner or pro—has the opportunity to grow, compete, and dominate.</p>
            </div>
          </motion.div>
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
            <div className="value-card">
              <div className="value-icon">⚖️</div>
              <h3 className="heading-font red-text">INTEGRITY</h3>
              <p>Fair play is our priority. We maintain the highest standards of tournament regulation.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3 className="heading-font red-text">INNOVATION</h3>
              <p>Leveraging cutting-edge tech to provide a seamless and immersive tournament experience.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🎮</div>
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
