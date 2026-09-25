import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserShield, FaDatabase, FaExchangeAlt, FaLock, FaChild, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import STGWatermark from '../components/STGWatermark';
import './LegalPages.css';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="legal-page">
      <STGWatermark />
      <div className="legal-bg-glow"></div>
      
      <div className="legal-header">
        <button className="global-back-btn" onClick={() => navigate(-1)}>
          <span className="arrow">←</span> BACK
        </button>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="legal-icon-wrapper"
        >
          <FaUserShield />
        </motion.div>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="legal-title heading-font"
        >
          PRIVACY <span className="red-text">POLICY</span>
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="legal-subtitle"
        >
          Your privacy is important to us. This policy outlines how STG Esports collects, uses, and protects your data.
        </motion.p>
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="legal-container"
      >
        <div className="legal-last-updated">LAST UPDATED: SEPTEMBER 2026</div>

        <motion.section variants={fadeIn} className="legal-card">
          <div className="legal-section-header">
            <FaDatabase className="legal-section-icon" />
            <h2>1. Information We Collect</h2>
          </div>
          <p>We collect information to provide better services to all our users, ensuring fair play and seamless transactions on the STG Esports platform. The types of data we collect include:</p>
          <ul>
            <li><strong>Personal Information:</strong> Name, email address, phone number, and date of birth provided during registration.</li>
            <li><strong>Gaming Data:</strong> In-Game Name (IGN), Character ID, match history, and gameplay statistics.</li>
            <li><strong>Financial Information:</strong> Payment gateway details required for processing entry fees and prize withdrawals (Note: We do not store raw credit card numbers or bank credentials on our servers).</li>
            <li><strong>Device & Usage Data:</strong> IP address, browser type, device identifiers, and platform interaction metrics for security and optimization.</li>
          </ul>
        </motion.section>

        <motion.section variants={fadeIn} className="legal-card">
          <div className="legal-section-header">
            <FaExchangeAlt className="legal-section-icon" />
            <h2>2. How We Use Your Information</h2>
          </div>
          <p>STG Esports utilizes the collected data strictly for operational and improvement purposes:</p>
          <ul>
            <li>To facilitate registration, verify eligibility, and manage your account.</li>
            <li>To process payments securely through our authorized payment gateways.</li>
            <li>To disburse tournament prize winnings to the correct individuals.</li>
            <li>To enforce our Terms of Service and prevent fraudulent activities or cheating.</li>
            <li>To communicate updates, match schedules, and promotional offers (you may opt-out of marketing emails).</li>
          </ul>
        </motion.section>

        <motion.section variants={fadeIn} className="legal-card">
          <div className="legal-section-header">
            <FaLock className="legal-section-icon" />
            <h2>3. Data Security & Protection</h2>
          </div>
          <p>We implement robust, industry-standard security measures to maintain the safety of your personal information. All sensitive payment transactions are transmitted via Secure Socket Layer (SSL) technology and encrypted into our payment gateway providers' database, accessible only by authorized personnel who are required to keep the information confidential.</p>
          <p>Despite our extensive security practices, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure. STG Esports cannot guarantee absolute security against unauthorized intrusions.</p>
        </motion.section>

        <motion.section variants={fadeIn} className="legal-card">
          <div className="legal-section-header">
            <FaChild className="legal-section-icon" />
            <h2>4. Children's Privacy</h2>
          </div>
          <p>The STG Esports platform is intended for users who are 18 years of age or older. We do not knowingly collect personal identifiable information from children under 18. If you are a parent or guardian and you believe that your child has provided us with personal data, please contact us immediately so we can take necessary actions to delete such information.</p>
        </motion.section>

        <motion.section variants={fadeIn} className="legal-card">
          <div className="legal-section-header">
            <FaFileAlt className="legal-section-icon" />
            <h2>5. Updates to This Policy</h2>
          </div>
          <p>STG Esports reserves the right to modify or update this Privacy Policy at any time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on this page and updating the "Last Updated" date.</p>
        </motion.section>

        <motion.section variants={fadeIn} className="legal-card">
          <div className="legal-section-header">
            <FaEnvelope className="legal-section-icon" />
            <h2>6. Contact Us</h2>
          </div>
          <p>If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please don't hesitate to reach out to our dedicated support team.</p>
          <div className="legal-contact-box">
            <p><strong>Email:</strong> support@stgesports.com</p>
            <p><strong>WhatsApp Support:</strong> <a href="https://wa.me/919025594503" target="_blank" rel="noopener noreferrer">+91 90255 94503</a></p>
          </div>
        </motion.section>

      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
