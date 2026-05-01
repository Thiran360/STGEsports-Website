import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import LineupPage from './pages/LineupPage';
import EventsPage from './pages/EventsPage';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ScrollToHashElement from './components/ScrollToHashElement';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <ScrollToHashElement />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/lineup" element={<LineupPage />} />
          <Route path="/events" element={<EventsPage />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
