import React from 'react';
import './Features.css';

const featuresList = [
  {
    title: 'Epic Battles',
    desc: 'Join intense PUBG & BGMI room matches daily with real prize pools',
    icon: '⚔️',
    color: 'red'
  },
  {
    title: 'Tournaments',
    desc: 'Compete in grand esports tournaments with massive prize pools up to ₹1 Lakh',
    icon: '🏆',
    color: 'dark-red'
  },
  {
    title: 'Live Streaming',
    desc: 'Watch all matches live with professional casting and commentary',
    icon: '📺',
    color: 'red'
  },
  {
    title: 'Achievements',
    desc: 'Earn badges, medals, and unique titles for your in-game performances',
    icon: '🥇',
    color: 'dark-red'
  }
];

const Features = () => {
  return (
    <section className="features-section stg-section">
      <div className="stg-container">
        <div className="section-header">
          <h2 className="glow-red">Core Features</h2>
          <p>Everything you need to become a pro</p>
        </div>
        <div className="features-grid">
          {featuresList.map((f, i) => (
            <div key={i} className={`feature-card glass border-glow-${f.color}`}>
              <div className={`feature-icon glow-${f.color}`}>{f.icon}</div>
              <h3 className={`glow-${f.color}`}>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
