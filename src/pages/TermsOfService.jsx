import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGavel, FaUserCheck, FaGamepad, FaMoneyBillWave, FaUndo, FaShieldAlt, FaBalanceScale } from 'react-icons/fa';
import STGWatermark from '../components/STGWatermark';
import './LegalPages.css';

const TermsOfService = () => {
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
          <FaGavel />
        </motion.div>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="legal-title heading-font"
        >
          TERMS OF <span className="red-text">SERVICE</span>
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="legal-subtitle"
        >
          Please read these terms carefully before accessing or using the STG Esports platform and participating in tournaments.
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
            <FaUserCheck className="legal-section-icon" />
            <h2>1. Eligibility & Registration</h2>
          </div>
          <p>By registering for an account on STG Esports, you agree to the following eligibility requirements:</p>
          <ul>
            <li>You must be at least 18 years of age. Participation in cash-prize tournaments by minors is strictly prohibited.</li>
            <li>You are responsible for ensuring that participating in skill-based esports tournaments with entry fees is legal in your state/jurisdiction.</li>
            <li>You must provide accurate, current, and complete registration information, including your real name and valid gaming IDs.</li>
            <li>You may only maintain one active account on the platform. Multiple accounts created to bypass bans or manipulate matchmaking will result in a permanent ban.</li>
          </ul>
        </motion.section>

        <motion.section variants={fadeIn} className="legal-card">
          <div className="legal-section-header">
            <FaGamepad className="legal-section-icon" />
            <h2>2. Fair Play & Conduct</h2>
          </div>
          <p>STG Esports maintains a zero-tolerance policy against cheating and unfair advantages to protect the integrity of our tournaments:</p>
          <ul>
            <li><strong>Cheating:</strong> The use of aimbots, wallhacks, macros, scripts, or any unauthorized third-party software modifying the game client is strictly forbidden.</li>
            <li><strong>Collusion:</strong> Teaming up in solo events, match-fixing, or purposefully losing to boost another player's rank/winnings.</li>
            <li><strong>Exploits:</strong> Intentionally abusing in-game bugs or glitches to gain an unfair advantage.</li>
            <li><strong>Toxicity:</strong> Harassment, hate speech, threats, or severe toxic behavior towards admins, staff, or other players will lead to suspension or permanent banishment.</li>
          </ul>
          <p>Violation of any Fair Play rules will result in immediate disqualification, forfeiture of all pending winnings, and permanent banning from the STG Esports platform.</p>
        </motion.section>

        <motion.section variants={fadeIn} className="legal-card">
          <div className="legal-section-header">
            <FaMoneyBillWave className="legal-section-icon" />
            <h2>3. Payments, Fees & Prize Distribution</h2>
          </div>
          <p>STG Esports utilizes secured third-party payment gateways for all financial transactions:</p>
          <ul>
            <li><strong>Entry Fees:</strong> Registration for paid tournaments requires successful processing of entry fees prior to the bracket generation.</li>
            <li><strong>Prize Distribution:</strong> Winnings are credited to the user's registered wallet/payment method within 24-48 hours after tournament results are officially verified by STG Admins.</li>
            <li><strong>Verification:</strong> STG Esports reserves the right to withhold prize distribution pending verification of a player's gameplay for suspected Fair Play violations.</li>
            <li><strong>Taxes:</strong> Users are solely responsible for all taxes, duties, and fees applicable to their winnings under their local jurisdiction's laws.</li>
          </ul>
        </motion.section>

        <motion.section variants={fadeIn} className="legal-card">
          <div className="legal-section-header">
            <FaUndo className="legal-section-icon" />
            <h2>4. Refund & Cancellation Policy</h2>
          </div>
          <p>Due to the live nature of competitive esports, our refund policies are strictly enforced:</p>
          <ul>
            <li><strong>No-Shows:</strong> If a player or team fails to join the custom room/lobby by the designated start time, the entry fee is forfeited and non-refundable.</li>
            <li><strong>Player Cancellations:</strong> Entry fees are non-refundable once the tournament bracket or room details have been generated.</li>
            <li><strong>Platform Cancellations:</strong> If a tournament is cancelled by STG Esports (due to server issues, lack of participants, etc.), 100% of the entry fee will be refunded to the participants' original payment method or platform wallet.</li>
          </ul>
        </motion.section>

        <motion.section variants={fadeIn} className="legal-card">
          <div className="legal-section-header">
            <FaShieldAlt className="legal-section-icon" />
            <h2>5. Intellectual Property</h2>
          </div>
          <p>All content present on this platform, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of STG Esports or its content suppliers and protected by international copyright laws. You may not extract or utilize parts of the content without express written consent.</p>
        </motion.section>

        <motion.section variants={fadeIn} className="legal-card">
          <div className="legal-section-header">
            <FaBalanceScale className="legal-section-icon" />
            <h2>6. Limitation of Liability</h2>
          </div>
          <p>STG Esports and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to, or use of, the platform. This includes damages for loss of profits, data, or other intangible losses. The platform is provided on an "AS IS" and "AS AVAILABLE" basis.</p>
        </motion.section>

      </motion.div>
    </div>
  );
};

export default TermsOfService;
