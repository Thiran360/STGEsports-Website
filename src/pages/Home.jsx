import React from 'react';
import Hero from '../components/Hero';
import STGWatermark from '../components/STGWatermark';
import SponsorsElite from '../components/SponsorsElite';
import Metrics from '../components/Metrics';
import Features from '../components/Features';
import homeVideo from '../assets/videoss.mp4';


const Home = () => {
  return (
    <>
      <Hero
        videoSrc={homeVideo}
        bgStyle={{
          inset: '0',
        }}
        bgComponent={<STGWatermark />}
        badgeText="India's #1 Esports Platform"
        title={
          <>
            <span className="hero-welcome-text">WELCOME TO</span>
            <span className="red-text">STG</span> <span className="red-text">ESPORTS</span>
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
