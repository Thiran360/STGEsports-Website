import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import STGWatermark from '../components/STGWatermark';
import './PaymentPage.css';

// SVG Icons for Payment Gateways & UPI
const PhonePeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.467 1.5H4.533C2.86 1.5 1.5 2.86 1.5 4.533v14.934C1.5 21.14 2.86 22.5 4.533 22.5h14.934c1.673 0 3.033-1.36 3.033-3.033V4.533C22.5 2.86 21.14 1.5 19.467 1.5z" fill="#5F259F"/>
    <path d="M16.8 7.2h-3.6v4.8h3.6c.99 0 1.8-.81 1.8-1.8V9c0-.99-.81-1.8-1.8-1.8zm0 3.6h-2.4V8.4h2.4c.33 0 .6.27.6.6v.6c0 .33-.27.6-.6.6zM8.4 7.2v9.6h1.8v-3.6h2.4c1.99 0 3.6-1.61 3.6-3.6s-1.61-3.6-3.6-3.6H8.4zm3.6 4.8H10.2V8.4h1.8c.99 0 1.8.81 1.8 1.8s-.81 1.8-1.8 1.8z" fill="#FFF"/>
  </svg>
);

const GPayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#1A73E8"/>
    <path d="M17.15 11.23h-4.9v2.12h2.82c-.12.66-.5 1.22-1.06 1.59v1.32h1.72c1.01-.93 1.59-2.3 1.59-3.93 0-.37-.03-.73-.17-1.1z" fill="#4285F4"/>
    <path d="M12.25 16.25c1.39 0 2.56-.46 3.41-1.25l-1.72-1.32c-.46.31-1.05.5-1.69.5-1.3 0-2.4-.88-2.79-2.06H7.71v1.36c.86 1.7 2.62 2.77 4.54 2.77z" fill="#34A853"/>
    <path d="M9.46 12.12c-.1-.31-.16-.64-.16-.97s.06-.66.16-.97V8.82H7.71C7.35 9.53 7.15 10.34 7.15 11.15s.2 1.62.56 2.33l1.75-1.36z" fill="#FBBC05"/>
    <path d="M12.25 8.04c.76 0 1.44.26 1.98.77l1.48-1.48C14.81 6.47 13.64 6 12.25 6c-1.92 0-3.68 1.07-4.54 2.77l1.75 1.36c.39-1.18 1.49-2.09 2.79-2.09z" fill="#EA4335"/>
  </svg>
);

const PaytmIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#002E6E"/>
    <path d="M5 8h4v8H5V8zm10 0h4v8h-4V8z" fill="#00B9F5"/>
    <path d="M10 8h4v4h-4V8z" fill="#FFF"/>
  </svg>
);

const UPIIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4h16v16H4V4z" fill="#FF9933" opacity="0.2"/>
    <path d="M12 2L2 7l10 5 10-5-10-5zm0 8.5L4.5 7 12 3.25 19.5 7 12 10.5z" fill="#FF9933"/>
    <path d="M12 13.5L4.5 10v3.5l7.5 4 7.5-4V10L12 13.5z" fill="#138808"/>
  </svg>
);

const QRIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v3h-3v-3zm-5 5h3v3h-3v-3zm3 0h3v3h-3v-3z" />
  </svg>
);

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Selected event from location state or fallback
  const event = location.state?.event || {
    title: 'STG OPERATION Ⅰ',
    prizePool: '₹25,000',
    mode: 'CLASSIC - SQUAD',
    slots: '130',
    entry: '500',
    themeColor: '#00f2fe'
  };

  // Extract base numerical amount for GST & fee breakdown
  const parseAmount = (entryVal, prizeVal) => {
    if (entryVal && entryVal.toUpperCase() !== 'FREE' && entryVal.toUpperCase() !== 'TBA') {
      const num = parseInt(entryVal.replace(/[^0-9]/g, ''), 10);
      if (!isNaN(num) && num > 0) return num;
    }
    // Fallback default tournament entry fee
    return 500;
  };

  const basePrice = parseAmount(event.entry, event.prizePool);
  const gstAmount = 0.00;
  const platformFee = 0.00;
  const totalAmount = basePrice + gstAmount + platformFee;

  // Form State
  const [squadName, setSquadName] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [playerUid, setPlayerUid] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('phonepe');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [txRefId, setTxRefId] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const upiId = '8056823309@ybl'; // Official STG Esports UPI ID

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  // Generate UPI Deep Link for Mobile Apps
  const getUpiDeepLink = (app) => {
    const note = encodeURIComponent(`STG Esports Registration - ${event.title}`);
    const name = encodeURIComponent('STG Esports');
    const baseUpi = `upi://pay?pa=${upiId}&pn=${name}&am=${totalAmount}&cu=INR&tn=${note}`;
    
    if (app === 'phonepe') return `phonepe://pay?pa=${upiId}&pn=${name}&am=${totalAmount}&cu=INR`;
    if (app === 'gpay') return `gpay://upi/pay?pa=${upiId}&pn=${name}&am=${totalAmount}&cu=INR`;
    if (app === 'paytm') return `paytmmp://pay?pa=${upiId}&pn=${name}&am=${totalAmount}&cu=INR`;
    return baseUpi;
  };

  const handleInitiatePayment = (e) => {
    e.preventDefault();
    if (!squadName.trim() || !captainName.trim() || !whatsapp.trim()) {
      alert('Please fill in your Squad Name, Captain Name, and WhatsApp number before proceeding.');
      return;
    }

    const ref = `STG-REG-${Math.floor(10000 + Math.random() * 90000)}`;
    setTxRefId(ref);

    // Try deep link on mobile devices
    const deepLink = getUpiDeepLink(selectedMethod);
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile && selectedMethod !== 'qr') {
      window.location.href = deepLink;
      // Show confirmation popup after initiating deep link
      setTimeout(() => {
        setShowSuccessModal(true);
      }, 1500);
    } else {
      setShowSuccessModal(true);
    }
  };

  const handleSendWhatsappVerification = () => {
    const text = encodeURIComponent(
      `🎮 *STG ESPORTS TOURNAMENT REGISTRATION*\n` +
      `--------------------------------------\n` +
      `🏆 *Event:* ${event.title}\n` +
      `🛡️ *Squad Name:* ${squadName || 'N/A'}\n` +
      `👤 *Captain:* ${captainName || 'N/A'}\n` +
      `📱 *WhatsApp:* ${whatsapp || 'N/A'}\n` +
      `🆔 *Game UID:* ${playerUid || 'N/A'}\n` +
      `💳 *Payment Method:* ${selectedMethod.toUpperCase()}\n` +
      `💰 *Amount Paid:* ₹${totalAmount.toFixed(2)} (GST 0.0%: ₹0.00)\n` +
      `🔖 *Ref ID:* ${txRefId}\n` +
      `--------------------------------------\n` +
      `Hi STG Team, I have completed the registration payment. Please confirm my squad slot!`
    );
    window.open(`https://wa.me/918056823309?text=${text}`, '_blank');
  };

  return (
    <div className="payment-page-container">
      <div className="payment-bg-overlay"></div>
      <STGWatermark />

      <div className="payment-content-wrapper">
        {/* Navigation Header */}
        <button 
          className="payment-back-btn" 
          onClick={() => navigate('/events')}
        >
          <span className="arrow">←</span> BACK TO EVENTS
        </button>

        <div className="payment-header">
          <div className="payment-badge border-glow-red">
            ⚡ OFFICIAL ESPORTS CHECKOUT
          </div>
          <h1 className="payment-title heading-font">TOURNAMENT REGISTRATION</h1>
          <p className="payment-subtitle">
            Secure squad slot for <strong>{event.title}</strong> with instant UPI verification.
          </p>
        </div>

        <div className="payment-grid">
          {/* Left Column: Order Summary & Cost Breakdown */}
          <div className="payment-card">
            <h3 className="payment-card-title heading-font">
              ORDER SUMMARY
              <span style={{ fontSize: '0.8rem', color: '#00f2fe', textTransform: 'none' }}>#ONLINE-CHECKOUT</span>
            </h3>

            <div className="event-mini-preview">
              <img 
                src={event.posterImage || 'https://img.youtube.com/vi/r1iIFdNG_uc/hqdefault.jpg'} 
                alt={event.title} 
                className="event-mini-img"
              />
              <div className="event-mini-info">
                <span className="event-mini-tag">{event.status || 'COMPLETED'}</span>
                <h4 className="heading-font">{event.title}</h4>
                <div className="event-mini-meta">
                  Mode: <strong>{event.mode || 'CLASSIC - SQUAD'}</strong> | Slots: <strong>{event.slots || '500'}</strong>
                </div>
              </div>
            </div>

            <div className="price-breakdown">
              <div className="price-row">
                <span>Tournament Registration Fee</span>
                <span>₹{basePrice.toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span>Platform & System Service Fee</span>
                <span style={{ color: '#00ff88' }}>FREE (₹0.00)</span>
              </div>
              <div className="price-row gst-row">
                <span>
                  GST Tax <span className="gst-badge">0.0% EXEMPT</span>
                </span>
                <span>₹{gstAmount.toFixed(2)}</span>
              </div>
              <div className="price-row total-row">
                <span>Total Amount Payable</span>
                <span className="total-amount">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 215, 0, 0.06)',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              borderRadius: '8px',
              padding: '0.85rem',
              fontSize: '0.82rem',
              color: 'rgba(255, 255, 255, 0.75)',
              display: 'flex',
              gap: '0.6rem',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '1.2rem', color: '#ffd700' }}>🔒</span>
              <span>100% Encrypted & Direct UPI Transfer. Zero hidden charges or GST markups applied.</span>
            </div>
          </div>

          {/* Right Column: Squad Details & Payment Methods */}
          <div className="payment-card">
            <h3 className="payment-card-title heading-font">
              SQUAD DETAILS & PAYMENT
            </h3>

            <form onSubmit={handleInitiatePayment}>
              {/* Form Input: Squad Name */}
              <div className="payment-form-group">
                <label className="payment-label">SQUAD / TEAM NAME *</label>
                <input 
                  type="text" 
                  className="payment-input" 
                  placeholder="e.g. STG VIPERS" 
                  value={squadName}
                  onChange={(e) => setSquadName(e.target.value)}
                  required
                />
              </div>

              {/* Form Input: Captain Name & WhatsApp */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="payment-form-group">
                  <label className="payment-label">CAPTAIN NAME *</label>
                  <input 
                    type="text" 
                    className="payment-input" 
                    placeholder="e.g. Alex STG" 
                    value={captainName}
                    onChange={(e) => setCaptainName(e.target.value)}
                    required
                  />
                </div>
                <div className="payment-form-group">
                  <label className="payment-label">WHATSAPP NO *</label>
                  <input 
                    type="tel" 
                    className="payment-input" 
                    placeholder="+91 80568 23309" 
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Form Input: Player UID */}
              <div className="payment-form-group">
                <label className="payment-label">BGMI / GAME UID (OPTIONAL)</label>
                <input 
                  type="text" 
                  className="payment-input" 
                  placeholder="e.g. 5123987410" 
                  value={playerUid}
                  onChange={(e) => setPlayerUid(e.target.value)}
                />
              </div>

              {/* Payment Methods */}
              <label className="payment-label" style={{ marginTop: '1.25rem' }}>SELECT PAYMENT METHOD</label>
              <div className="payment-methods-grid">
                <button 
                  type="button" 
                  className={`method-btn phonepe ${selectedMethod === 'phonepe' ? 'selected' : ''}`}
                  onClick={() => setSelectedMethod('phonepe')}
                >
                  <div className="method-icon-wrap"><PhonePeIcon /></div>
                  <span>PhonePe</span>
                </button>

                <button 
                  type="button" 
                  className={`method-btn gpay ${selectedMethod === 'gpay' ? 'selected' : ''}`}
                  onClick={() => setSelectedMethod('gpay')}
                >
                  <div className="method-icon-wrap"><GPayIcon /></div>
                  <span>Google Pay</span>
                </button>

                <button 
                  type="button" 
                  className={`method-btn paytm ${selectedMethod === 'paytm' ? 'selected' : ''}`}
                  onClick={() => setSelectedMethod('paytm')}
                >
                  <div className="method-icon-wrap"><PaytmIcon /></div>
                  <span>Paytm UPI</span>
                </button>

                <button 
                  type="button" 
                  className={`method-btn ${selectedMethod === 'qr' ? 'selected' : ''}`}
                  onClick={() => setSelectedMethod('qr')}
                >
                  <div className="method-icon-wrap"><QRIcon /></div>
                  <span>Scan QR Code</span>
                </button>
              </div>

              {/* Display QR Code UI if 'qr' is selected */}
              {selectedMethod === 'qr' ? (
                <div className="qr-container">
                  <div className="qr-box">
                    {/* Dynamic SVG QR Code mockup for UPI */}
                    <svg width="150" height="150" viewBox="0 0 100 100" fill="#000">
                      <rect width="100" height="100" fill="#FFF"/>
                      <path d="M10 10h30v30H10zM15 15v20h20V15zm5 5h10v10H20zm40-10h30v30H60zM65 15v20h20V15zm5 5h10v10H70zM10 60h30v30H10zM15 65v20h20V65zm5 5h10v10H20zm45-5h10v10H65zm15 0h10v10H80zm-15 15h10v10H65zm15 0h10v10H80z" />
                      <circle cx="50" cy="50" r="8" fill="#e50914" />
                    </svg>
                  </div>
                  <div className="upi-id-badge">
                    <span>UPI ID: {upiId}</span>
                    <button type="button" className="copy-btn" onClick={handleCopyUpi}>
                      {copiedUpi ? 'COPIED! ✓' : 'COPY'}
                    </button>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.6rem' }}>
                    Scan with PhonePe, GPay, Paytm or any UPI app to pay ₹{totalAmount.toFixed(2)}
                  </p>
                </div>
              ) : (
                <div style={{ marginBottom: '1.25rem', textAlign: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                  Clicking below will launch <strong>{selectedMethod.toUpperCase()}</strong> directly on your phone.
                </div>
              )}

              {/* Submit CTA */}
              <button 
                type="submit" 
                className={`pay-action-btn ${selectedMethod}-btn`}
              >
                PAY ₹{totalAmount.toFixed(2)} VIA {selectedMethod.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Verification / Confirmation Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div 
            className="payment-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="payment-success-card"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
            >
              <div className="success-icon">✓</div>
              <h2 className="heading-font" style={{ color: '#00ff88', marginBottom: '0.5rem' }}>
                REGISTRATION INITIATED
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Your squad details for <strong>{event.title}</strong> have been submitted!
              </p>

              <div className="ref-box">
                REG REF: {txRefId}
              </div>

              <div style={{ textAlign: 'left', background: 'rgba(255,255,255,0.04)', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
                <div><strong>Squad:</strong> {squadName}</div>
                <div><strong>Captain:</strong> {captainName} ({whatsapp})</div>
                <div><strong>Amount Payable:</strong> ₹{totalAmount.toFixed(2)} (GST ₹0.00)</div>
                <div><strong>Payment Method:</strong> {selectedMethod.toUpperCase()}</div>
              </div>

              <p style={{ fontSize: '0.82rem', color: '#ffd700', marginBottom: '1.2rem' }}>
                📲 Send your payment screenshot to STG Admin on WhatsApp to get your official slot confirmation.
              </p>

              <button className="verify-btn" onClick={handleSendWhatsappVerification}>
                💬 VERIFY & SEND SCREENSHOT ON WHATSAPP
              </button>

              <button 
                onClick={() => { setShowSuccessModal(false); navigate('/events'); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '0.8rem',
                  marginTop: '1rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Close & Return to Events Showcase
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentPage;
