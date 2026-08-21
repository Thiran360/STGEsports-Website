import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import EventsShowcase from '../components/EventsShowcase';
import STGWatermark from '../components/STGWatermark';
import eventsBg from '../assets copy/events-stg.jpg';
import mobileBg from '../assets/WhatsApp Image 2026-06-09 at 7.07.41 PM.jpeg';
import './LineupPage.css'; // Reuse some layout utilities

const stgPattern = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100'%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Orbitron, sans-serif' font-size='50' font-weight='700' fill='rgba(255, 255, 255, 0.15)' transform='rotate(-15 100 50)' letter-spacing='1'%3ESTG%3C/text%3E%3C/svg%3E";

const EventsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="events-page relative">
      <button className="global-back-btn" onClick={() => navigate(-1)}>
        <span className="arrow">←</span> BACK
      </button>
      <Hero 
        imageSrc={eventsBg}
        mobileImageSrc={mobileBg}
        bgStyle={{ 
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          filter: 'brightness(1.0)',
          inset: '0',
          /* Removed animation to prevent cropping */
        }}
        overlayStyle={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))'
        }}
        title={<><span>STG</span> <span className="red-text">EVENTS</span></>}
        subtitle="Experience the thrill of competitive gaming in our seasonal tournaments."
        badgeText="ELITE TOURNAMENTS"
        showJersey={false}
        showTitleBox={false}
        bgComponent={<STGWatermark />}
      />
      <EventsShowcase />
      <div style={{ height: '2rem' }}></div>
    </div>
  );
};

export default EventsPage;


