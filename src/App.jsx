import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const LineupPage = React.lazy(() => import('./pages/LineupPage'));
const EventsPage = React.lazy(() => import('./pages/EventsPage'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));
const PaymentPage = React.lazy(() => import('./pages/PaymentPage'));
const AdminLogin = React.lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ScrollToHashElement from './components/ScrollToHashElement';
import './App.css';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Scroll Performance Optimizer
  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      if (!document.body.classList.contains('is-scrolling')) {
        document.body.classList.add('is-scrolling');
      }
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 150); // 150ms after scroll ends, restore events
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className="app-container">
      <ScrollToHashElement />
      {!isAdminRoute && <Navbar />}
      <main>
        <React.Suspense fallback={<div className="loading-fallback"></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/lineup" element={<LineupPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/checkout" element={<PaymentPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </React.Suspense>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <Chatbot />}
    </div>
  );
}

export default App;
