import React, { useState, useEffect } from 'react';
import './EventsShowcase.css';
import jokerBg from '../assets/joker-phoenix-bg.jpg';
import cyberBg from '../assets/cyber-grid-bg.png';
import phoenixBg from '../assets/phoenix-bg.png';

import stgSeason1 from '../assets/matrix-bg.png'; // Need to use appropriate images since I don't have the real posters
import stgSeason2 from '../assets/joker-phoenix-bg.jpg';
import stgSeason3 from '../assets/cyber-grid-bg.png';
import stgSeason4 from '../assets/phoenix-bg.png';
import operationVideo from '../assets/operation_video.mp4';


const showcaseEvents = [
  {
    id: 1,
    title: "STG LIVE",
    description: "The historical beginning of STG operations. A fiercely competitive arena where legends were first forged.",
    series: "STG SERIES",
    season: "01",
    status: "COMPLETED",
    prizePool: "₹10,000",
    period: "JANUARY 2024",
    posterImage: stgSeason1,
    videoThumbnail: "https://img.youtube.com/vi/Id1QKLK7_PA/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/live/Id1QKLK7_PA",
    hasDetailsButton: true,
    hashtag: "#UNLEASH_THE_BEAST"
  },
  {
    id: 2,
    title: "STG OPERATION II",
    description: "Expanding the field of battle. New tactics, higher stakes, and more intense squad rivalries.",
    series: "STG SERIES",
    season: "02",
    status: "COMPLETED",
    prizePool: "₹10,000",
    period: "JUNE 2024",
    posterImage: stgSeason2,
    videoThumbnail: "https://img.youtube.com/vi/u4Jf8AF9eKE/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/live/u4Jf8AF9eKE",
    hasDetailsButton: true,
    hashtag: "#UNLEASH_THE_BEAST"
  },
  {
    id: 3,
    title: "STG OPERATION III",
    description: "The pinnacle of tactical esports. A grand stage for the ultimate squad champions to claim their throne.",
    series: "STG SERIES",
    season: "03",
    status: "COMPLETED",
    prizePool: "₹15,000",
    period: "DECEMBER 2024",
    posterImage: stgSeason3,
    videoThumbnail: "https://img.youtube.com/vi/r1iIFdNG_uc/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/live/r1iIFdNG_uc",
    hasDetailsButton: true,
    hashtag: "#UNLEASH_THE_BEAST"
  },

  {
    id: 4,
    title: "STG OPERATION IV",
    description: "Preparation for STG 4 is underway. Mission protocols are being finalized for the next high-stakes operation. Brace for deployment.",
    series: "STG SERIES",
    season: "04",
    status: "UPCOMING",
    prizePool: "TBA",
    period: "COMING SOON",
    posterImage: stgSeason4,
    videoThumbnail: stgSeason4, // Using poster as thumbnail for local video
    videoUrl: operationVideo,
    isLocalVideo: true,
    autoPlayVideo: true,
    hasDetailsButton: false,

    notifyButtonText: "GET NOTIFIED FOR DEPLOYMENT",
    hashtag: "#UNLEASH_THE_BEAST",
    isUpcoming: true
  }



];

const EventsShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseEvents.length);
    }, 8000); // Slower interval: 8 seconds
    
    return () => clearInterval(timer);
  }, []);



  const nextEvent = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % showcaseEvents.length);
  };

  const prevEvent = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + showcaseEvents.length) % showcaseEvents.length);
  };

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  const currentEvent = showcaseEvents[currentIndex];

  // Extract video ID from URL
  const getEmbedUrl = (url) => {
    if (!url) return null;
    const videoId = url.split('live/')[1]?.split('?')[0] || url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  return (
    <section className="events-showcase-section">
      <div className="stg-container">
        
        {/* Header Section */}
        <div className="showcase-header">
          <div className="showcase-title-group">
            <div className="red-bar"></div>
            <h2 className="showcase-title heading-font">PREVIOUS EVENTS SHOWCASE</h2>
          </div>
        </div>

        {/* Main Card */}
        <div className="showcase-card">
          
          {/* Left Side - Image Poster */}
          <div className="showcase-image-wrapper">
            <img src={currentEvent.posterImage} alt={currentEvent.title} className="showcase-image" />
            <div className="image-overlay-bottom">
              <div className="image-carousel-dots">
                {showcaseEvents.map((_, i) => (
                  <span key={i} className={`img-dot ${i === currentIndex ? 'active' : ''}`} onClick={() => { setIsPlaying(false); setCurrentIndex(i); }}></span>
                ))}
              </div>
              <div className="hashtag heading-font">{currentEvent.hashtag}</div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="showcase-content">
            <div className="featured-badge heading-font">FEATURED EVENT</div>
            
            <h3 className="event-title heading-font">{currentEvent.title}</h3>
            <p className="event-desc">{currentEvent.description}</p>
            
            {/* Stats Row */}
            <div className="event-stats-row">
              <div className="stat-box">
                <span className="stat-label">SERIES</span>
                <span className="stat-value heading-font">{currentEvent.series}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">SEASON</span>
                <span className="stat-value heading-font">{currentEvent.season}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">STATUS</span>
                <span className="stat-value heading-font text-yellow">{currentEvent.status}</span>
              </div>
            </div>

            {/* Meta Info Row */}
            <div className="event-meta-row">
              <div className="meta-item">
                <span className="meta-label">Prize Pool:</span>
                <span className="meta-value heading-font text-yellow">{currentEvent.prizePool}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Period:</span>
                <span className="meta-value heading-font">{currentEvent.period}</span>
              </div>
            </div>

            {/* Video Thumbnail or Embed Player */}
            {currentEvent.videoThumbnail && (
              <div className="video-player-container">
                {isPlaying || currentEvent.autoPlayVideo ? (
                  <div className="video-iframe-wrapper">
                    {currentEvent.isLocalVideo ? (
                      <video 
                        src={currentEvent.videoUrl} 
                        controls
                        autoPlay 
                        onEnded={nextEvent}
                        muted={currentEvent.autoPlayVideo}
                        className="local-video-player"
                        playsInline
                      ></video>
                    ) : (

                      <iframe 
                        src={getEmbedUrl(currentEvent.videoUrl)}
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                      ></iframe>
                    )}
                  </div>
                ) : (
                  <div className="video-thumbnail-wrapper" onClick={handlePlayVideo}>
                    <img src={currentEvent.videoThumbnail} alt="Video Thumbnail" className="video-thumb" />
                    <div className="play-button-overlay">
                      <div className="play-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}




            {/* Details Button (if available) */}
            {currentEvent.hasDetailsButton && (
              <button className="view-details-btn heading-font">
                VIEW FULL EVENT DETAILS
              </button>
            )}

            {/* Notify Button (for upcoming events) */}
            {currentEvent.notifyButtonText && (
              <button className="view-details-btn notify-btn heading-font">
                {currentEvent.notifyButtonText}
              </button>
            )}


          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="showcase-nav-bottom">
          <button className="nav-btn prev" onClick={prevEvent}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <button className="nav-btn next" onClick={nextEvent}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventsShowcase;

