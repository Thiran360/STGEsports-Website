import React, { useState } from 'react';
import './Events.css';

const events = [
  { id: '01', title: 'SEASON 01', status: 'COMPLETED', prize: '₹10,000', color: 'red' },
  { id: '02', title: 'SEASON 02', status: 'COMPLETED', prize: '₹25,000', color: 'red' },
  { id: '03', title: 'SEASON 03', status: 'COMPLETED', prize: '₹15,000', color: 'red' },
  { id: '04', title: 'SEASON 04', status: 'COMING SOON', prize: '₹1,00,000', color: 'orange' },
  { id: '05', title: 'SEASON 05', status: 'COMING SOON', prize: 'TBA', color: 'cyan' },
];

const Events = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % events.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + events.length) % events.length);

  return (
    <section className="events-vault-section stg-section" id="events">
      <div className="stg-container">
        <div className="vault-bg-pattern"></div>
        
        <div className="vault-header">
          <div className="vault-badge border-glow-orange">EVENT RECORDS</div>
          <h2 className="hero-title">
            EVENT <span className="glow-orange">VAULT</span>
          </h2>
          <p className="vault-subtitle">
            Accessing encrypted visual data from past STG field operations. 
            Swipe or click to view all seasonal records.
          </p>
        </div>

      <div className="carousel-container">
        <button className="carousel-btn prev" onClick={prevSlide}>{'<'}</button>
        <div className="carousel-window">
          <div className="events-carousel" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {events.map((ev, i) => (
              <div key={i} className={`event-card-wrapper ${i === activeIndex ? 'active' : ''}`}>
                <div className={`event-card glass border-glow-${ev.color}`}>
                  <div className="event-id heading-font">#{ev.id}</div>
                  <div className="event-content">
                    <h3 className="heading-font">{ev.title}</h3>
                    <p className="event-prize">PRIZE POOL: <span className={`glow-${ev.color}`}>{ev.prize}</span></p>
                    <div className={`status-tag ${ev.status === 'COMPLETED' ? 'completed' : 'upcoming'}`}>
                      {ev.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="carousel-btn next" onClick={nextSlide}>{'>'}</button>
      </div>

      <div className="carousel-dots">
        {events.map((_, i) => (
          <div key={i} className={`dot ${i === activeIndex ? 'active' : ''}`} onClick={() => setActiveIndex(i)}></div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Events;
