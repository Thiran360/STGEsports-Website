import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Events from '../components/Events';
import EventsShowcase from '../components/EventsShowcase';
import eventsBg from '../assets/pubg_events_bg.jpg';
import './LineupPage.css'; // Reuse some layout utilities

const EventsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="events-page">
      <Hero 
        imageSrc={eventsBg}
        title={<>STG <span className="text-dark-red">EVENTS</span></>}
        subtitle="Experience the thrill of competitive gaming in our seasonal tournaments."
        badgeText="ELITE TOURNAMENTS"
      />
      <Events />
      <EventsShowcase />
      <div style={{ height: '5rem' }}></div>
    </div>
  );
};

export default EventsPage;


