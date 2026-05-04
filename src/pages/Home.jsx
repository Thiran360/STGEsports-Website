import React from 'react';
import Hero from '../components/Hero';
import SponsorsElite from '../components/SponsorsElite';
import Metrics from '../components/Metrics';
import Features from '../components/Features';
import Events from '../components/Events';

const Home = () => {
  return (
    <>
      <Hero 
        badgeText="India's #1 Esports Platform"
        title={
          <>
            <span style={{ display: 'block', width: '100%', textAlign: 'center', fontSize: '0.55em', letterSpacing: '5px', color: 'var(--text-white)', opacity: 0.8, marginBottom: '0.5rem', fontWeight: 600 }}>WELCOME TO</span>
            STG <span className="red-text">ESPORTS</span>
          </>
        }
        subtitle="The ultimate battleground for PUBG & BGMI champions."
        showTitleBox={false}
      />
      <SponsorsElite />
      <Metrics />
      <Features />
    </>
  );
};

export default Home;
