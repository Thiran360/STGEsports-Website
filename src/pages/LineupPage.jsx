import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PlayerModal from "../components/PlayerModal";
import dharshanImg from "../assets/founder.jpeg";
import donImg from "../assets/stg-don.png";
import STGWatermark from "../components/STGWatermark";
import myluvLogo from "../assets/myluv-logo.png";
import cyberBg from "../assets/line-up-hero.png";
import phantomImg from "../assets/player-1.png";
import razorImg from "../assets/player-2.png";
import ghostImg from "../assets/player-3.png";
import viperImg from "../assets/player-4.png";
import bladeImg from "../assets/player-5.png";
import titanImg from "../assets/player-6.png";
import mindripImg from "../assets/stg-mindrip.png";
import juniorsImg from "../assets/stg-juniors.png";
import maviImg from "../assets/ridersimage1.jpeg";
import phenomenalImg from "../assets/raidersimage2.jpeg";
import moneyyImg from "../assets/raidersimag3.jpeg";
import doomImg from "../assets/raidersimag4.jpeg";
import shiyiImg from "../assets/raidersimg5.jpeg";
import { FaInstagram } from "react-icons/fa";
import "./LineupPage.css";
import "../components/SponsorsElite.css";

/* ─── Teams come exclusively from the backend API ────────────── */

const defaultTeamImages = {
  esports:
    "https://thumbs.dreamstime.com/b/professional-esports-gamer-rejoices-victory-red-game-room-background-professional-esports-gamer-rejoices-victory-273619312.jpg",
  raiders:
    "https://lasvegastoppicks.com/wp-content/uploads/2023/11/DALL·E-2023-11-21-15.19.59-An-ultra-modern-sleek-design-featuring-the-Las-Vegas-Raiders-branding-elements.-The-image-showcases-a-high-tech-vibrant-football-stadium-filled-wit-900x514.png",
  warriors: "https://pbs.twimg.com/media/EE3rYTIXsAASLEG.jpg",
  mindrip: mindripImg,
  juniors: juniorsImg,
};

const DEFAULT_TEAMS = {
  esports: {
    label: "STG Esports",
    glow: "#e60000",
    img: defaultTeamImages.esports,
    players: [
      {
        id: "es1",
        tag: "STGzLitboii",
        roleLabel: "IGL(LEADER)",
        description:
          "Leads the team with smart decisions and strategies.\nControls gameplay, rotations, and team coordination.",
        ig: "panipuri.nub",
        igLink: "https://www.instagram.com/panipuri.nub?igsh=NjhqaHVudTljZmV4",
        img: razorImg,
        badge: "🎮",
      },
      {
        id: "es2",
        tag: "STGzspencer",
        roleLabel: "MENTOR",
        description:
          "Guides the team with experience and insights\nImproves performance, mindset, and teamwork",
        ig: "ghost_snipes",
        igLink: "",
        img: ghostImg,
        badge: "🎯",
      },
      {
        id: "es3",
        tag: "STGzZucksyy",
        roleLabel: "ENTRY FRAGGER",
        description:
          "Initiates fights and takes first contact\nCreates openings with aggressive plays",
        ig: "zucksyyy_playss",
        igLink:
          "https://www.instagram.com/zucksyyy_playss?igsh=cmN3bzZjdnF5cW1m",
        img: viperImg,
        badge: "🛡️",
      },
      {
        id: "es4",
        tag: "STGzSycnoOG",
        roleLabel: "ENTRY FRAGGER",
        description:
          "Fearless frontline attacker in every push\nBreaks enemy defense with quick actions",
        ig: "rex.sycnoo",
        igLink:
          "https://www.instagram.com/rex.sycnoo?igsh=MWUwdG1xYTUxamJ2eQ==",
        img: bladeImg,
        badge: "⚡",
      },
      {
        id: "es5",
        tag: "STGzJONNY",
        roleLabel: "ASSAULTER",
        description:
          "Reliable fighter in intense situations\nSupports team with strong combat skills",
        ig: "jonny_islive",
        igLink:
          "https://www.instagram.com/jonny_islive?igsh=MWZhNW50ejVuY3Zmbw==",
        img: titanImg,
        badge: "📊",
      },
      {
        id: "es6",
        tag: "STGzSTUNN",
        roleLabel: "ASSAULTER/RIFLER",
        description:
          "Master of versatility and high-precision rifling.\nDominates mid-range combat.",
        ig: "_stunn16",
        igLink: "https://www.instagram.com/_stunn16?igsh=MW11aHRmNzg5MXR3Yw==",
        img: phantomImg,
        badge: "🏆",
      },
    ],
  },
  raiders: {
    label: "STG Raiders",
    glow: "#39FF14",
    img: defaultTeamImages.raiders,
    players: [
      {
        id: "ra1",
        tag: "STGzMaViMVP",
        roleLabel: "ENTRY FRAGGER",
        description:
          "Elite Entry Fragger with 4 years of professional experience.\nIGN ID: 5746388363",
        ig: "maviesm_",
        igLink:
          "https://www.instagram.com/maviesm_?igsh=MXFkc2ZhbHJjOTZnYQ%3D%3D&utm_source=qr",
        img: maviImg,
        badge: "⚡",
      },
      {
        id: "ra2",
        tag: "STGzPHENOMENAL",
        roleLabel: "ASSAULTER/ENTRY FRAGGER",
        description:
          "High-impact Assaulter and Entry Fragger with 5+ years of competitive experience.\nIGN ID: 5229964999",
        ig: "saheal.bgmi",
        igLink: "https://www.instagram.com/saheal.bgmi?igsh=dGNpOHZxMmVtczkx",
        img: phenomenalImg,
        badge: "🎯",
      },
      {
        id: "ra3",
        tag: "STGzMoneyy",
        roleLabel: "ENTRY FRAGGER/ASSAULTER",
        description:
          "Aggressive Entry Fragger and Assaulter with 4.5 years of experience.\nIGN ID: 5835189437",
        ig: "moneyyy.og",
        igLink:
          "https://www.instagram.com/moneyyy.og?igsh=MWQ3NGlhdzh2Zjhhcg==",
        img: moneyyImg,
        badge: "💰",
      },
      {
        id: "ra4",
        tag: "STGzDrDooM",
        roleLabel: "IGL (LEADER)",
        description:
          "Strategic In-Game Leader with 5 years of professional experience.\nIGN ID: 5200981165",
        ig: "ig_dr.doom_igl",
        igLink:
          "https://www.instagram.com/ig_dr.doom_igl?igsh=MW50YXRlNmhkeGNsMg==",
        img: doomImg,
        badge: "👑",
      },
      {
        id: "ra5",
        tag: "STGzShiYi",
        roleLabel: "FRAGGER / FILTER",
        description:
          "Experienced Fragger and Filter with 7 years of professional gaming.\nIGN ID: 5879754323",
        ig: "shiyiijood",
        igLink: "https://www.instagram.com/shiyiijood?igsh=YnFtOWkzMHBidmU2",
        img: shiyiImg,
        badge: "🎖️",
      },
      {
        id: "ra6",
        tag: "----------",
        roleLabel: "----------",
        description: "Profile under construction.\nComing soon to STG RAIDERS.",
        ig: "stgesports.in",
        igLink: "",
        img: null,
        badge: "👤",
      },
    ],
  },
  warriors: {
    label: "STG Warriors",
    glow: "#ff8c00",
    img: defaultTeamImages.warriors,
    players: Array.from({ length: 6 }, (_, i) => ({
      id: `wa${i + 1}`,
      tag: "----------",
      roleLabel: "----------",
      description: "Profile under construction.\nComing soon to STG WARRIORS.",
      ig: "stgesports.in",
      igLink: "",
      img: null,
      badge: "👤",
    })),
  },
  mindrip: {
    label: "STG Mindrip",
    glow: "#00f2ff",
    img: defaultTeamImages.mindrip,
    players: Array.from({ length: 6 }, (_, i) => ({
      id: `mr${i + 1}`,
      tag: "----------",
      roleLabel: "----------",
      description: "Profile under construction.\nComing soon to STG MINDRIP.",
      ig: "stgesports.in",
      igLink: "",
      img: null,
      badge: "👤",
    })),
  },
  juniors: {
    label: "STG Juniors",
    glow: "#ffff00",
    img: defaultTeamImages.juniors,
    players: Array.from({ length: 6 }, (_, i) => ({
      id: `jr${i + 1}`,
      tag: "----------",
      roleLabel: "----------",
      description: "Profile under construction.\nComing soon to STG JUNIORS.",
      ig: "stgesports.in",
      igLink: "",
      img: null,
      badge: "👤",
    })),
  },
};



/* ─── Typewriter Effect Component ────────────────────────── */
const TypewriterText = ({ text, baseDelay = 0, speed = 0.03, skip = false }) => {
  if (skip) return <span>{text}</span>;
  return (
    <span>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: baseDelay + i * speed,
            duration: 0.1,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

/* ─── STG Team Modal ─────────────────────────────── */
const TeamModal = ({ isOpen, onClose, players }) => {
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [cardKey, setCardKey] = useState(0); // force re-mount for re-animation
  const [skipAnimation, setSkipAnimation] = useState(false);
  const modalScrollRef = React.useRef(null);
  const autoScrollTimerRef = React.useRef(null);

  const [desktopPage, setDesktopPage] = useState(0);
  // How long (ms) each card stays visible before auto-advancing
  const CARD_DISPLAY_MS = 4500;
  // Desktop stagger delay per card - user wants strict one-by-one (3 seconds allows all typewriter text to finish)
  const CARD_SEQUENCE_DELAY = 3.0;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setMobileIndex(0);
      setDesktopPage(0);
      setCardKey(0);
      setSkipAnimation(false);
      // Auto-scroll to reveal extra cards before they start animating (on desktop)
      if (!isMobile && players && players.length > 6) {
        // Scroll 1.5s BEFORE the 7th card starts animating so it's in view when it plays
        const scrollDelay = (6 * CARD_SEQUENCE_DELAY - 1.5) * 1000;
        autoScrollTimerRef.current = setTimeout(() => {
          if (modalScrollRef.current) {
            // Find the 7th card element (index 6) and scroll it into view
            const cards = modalScrollRef.current.querySelectorAll('.et-grid-card');
            if (cards[6]) {
              cards[6].scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
              // fallback: scroll to bottom of overlay
              modalScrollRef.current.scrollTo({ top: modalScrollRef.current.scrollHeight, behavior: 'smooth' });
            }
          }
        }, scrollDelay);
      }
      return () => {
        document.body.style.overflow = "";
        if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
      };
    } else {
      document.body.style.overflow = "";
      if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
    }
  }, [isOpen]);

  // Auto-advance on mobile
  useEffect(() => {
    if (!isOpen || !isMobile || !players || players.length === 0) return;
    if (mobileIndex >= players.length) return;
    if (skipAnimation) {
      setMobileIndex(players.length);
      return;
    }
    const timer = setTimeout(() => {
      setMobileIndex((prev) => prev + 1);
      setCardKey((prev) => prev + 1);
    }, CARD_DISPLAY_MS);
    return () => clearTimeout(timer);
  }, [isOpen, isMobile, mobileIndex, players, skipAnimation]);

  const handleSkip = (e) => {
    e.stopPropagation();
    setSkipAnimation(true);
    if (isMobile) {
      setMobileIndex(players?.length || 0);
    }
    // Cancel auto-scroll timer if user skips
    if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
  };

  if (!isOpen) return null;

  if (!players || players.length === 0) {
    return (
      <div className="et-overlay" onClick={onClose}>
        <div
          className="et-modal"
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "300px",
          }}
        >
          <button className="et-close-btn" onClick={onClose}>
            ✕
          </button>
          <div style={{ textAlign: "center" }}>
            <h2
              className="heading-font"
              style={{
                color: "var(--primary-red)",
                letterSpacing: "2px",
                fontSize: "2rem",
              }}
            >
              ROSTER UPDATE PENDING
            </h2>
            <p
              style={{
                color: "#888",
                marginTop: "1rem",
                fontStyle: "italic",
                fontSize: "1rem",
              }}
            >
              New recruits are currently undergoing evaluation. Check back soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ── MOBILE: one card at a time ── */
  if (isMobile) {
    const isDone = mobileIndex >= players.length;
    const p = isDone ? null : players[mobileIndex];

    return (
      <div className="et-overlay" onClick={onClose}>
        <div
          className="et-modal et-modal-mobile"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="et-modal-header">
            <span className="et-mobile-counter heading-font">
              {isDone
                ? "✓ ALL PLAYERS"
                : `${mobileIndex + 1} / ${players.length}`}
            </span>
            <button className="et-close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
          <div className="et-divider"></div>

          <div
            className="et-scroll-container"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              width: "100%",
              minHeight: 0,
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <AnimatePresence mode="wait">
              {isDone ? (
                <motion.div
                  key="all-players"
                  className="et-done-screen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ width: "100%" }}
                >
                  {/* <h3
                    className="heading-font"
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                  >
                    ALL PLAYERS
                  </h3> */}

                  <div className="mobile-player-grid">
                    {players.map((player) => (
                      <div
                        key={player.id}
                        className="mobile-player-card"
                        style={{ "--player-glow": player.glow || "var(--primary-red)" }}
                        onClick={() => {
                          const idx = players.findIndex(p => p.id === player.id);
                          if (idx !== -1) {
                            setMobileIndex(idx);
                            setSkipAnimation(false);
                            setCardKey(prev => prev + 1);
                          }
                        }}
                      >
                        <div className="mobile-player-img-wrap">
                          {player.img ? (
                            <img loading="lazy" decoding="async"
                              src={player.img}
                              alt={player.tag}
                              className="mobile-player-img"
                            />
                          ) : (
                            <div className="mobile-player-placeholder">👤</div>
                          )}
                        </div>

                        <div className="mobile-player-info">
                          <h4>{player.tag}</h4>

                          {/* Player Role */}
                          <p className="mobile-player-role">
                            {player.roleLabel}
                          </p>

                          {/* Instagram ID */}
                          <div className="mobile-player-ig">
                            <a
                              href={player.igLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FaInstagram className="ig-icon" />
                              <span>@{player.ig}</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={cardKey}
                  className="et-grid-card"
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{
                    "--player-glow": p.glow,
                    width: "100%",
                    maxWidth: "350px",
                  }}
                >
                  <div className="et-card-layout">
                    <div className="et-card-left">
                      <motion.div
                        className="et-id-photo-wrap"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                      >
                        {p.img ? (
                          <img
                            src={p.img}
                            alt={p.tag}
                            className="et-id-photo"
                            loading="eager"
                            decoding="async"
                          />
                        ) : (
                          <div className="et-id-placeholder">
                            <span className="placeholder-icon">{p.badge}</span>
                          </div>
                        )}
                      </motion.div>
                    </div>

                    <div className="et-card-right">
                      <div className="et-info-item">
                        <span className="et-info-label">Name :</span>
                        <span className="et-info-value heading-font" style={{ color: p.glow || "var(--primary-red)" }}>
                          <TypewriterText text={p.tag} baseDelay={0.3} skip={skipAnimation} />
                        </span>
                      </div>
                      <div className="et-info-item">
                        <span className="et-info-label">Role :</span>
                        <span className="et-info-value role-text">
                          <TypewriterText text={p.roleLabel} baseDelay={0.6} skip={skipAnimation} />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="et-desc-section">
                    <p className="et-id-desc">
                      <TypewriterText
                        text={p.description}
                        baseDelay={1.0}
                        speed={0.008}
                        skip={skipAnimation}
                      />
                    </p>
                  </div>

                  <motion.div
                    className="et-footer-social"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: skipAnimation ? 0 : 1.8, duration: skipAnimation ? 0 : 0.4 }}
                  >
                    <a
                      href={
                        p.igLink ||
                        p.socials?.igLink ||
                        `https://instagram.com/${p.ig || p.socials?.ig || "stgesports.in"}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="et-id-social"
                    >
                      <div className="et-ig-icon-wrap">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </div>
                      <span>@{ (p.ig || p.socials?.ig || "stgesports.in").replace(/^@+/, '') }</span>
                    </a>
                  </motion.div>

                  {/* Progress dots */}
                  <div className="et-mobile-dots">
                    {players.map((_, i) => (
                      <span
                        key={i}
                        className={`et-dot${i === mobileIndex ? " et-dot--active" : i < mobileIndex ? " et-dot--done" : ""}`}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!skipAnimation && !isDone && (
            <div style={{ position: 'fixed', bottom: '2rem', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 100, pointerEvents: 'none' }}>
              <button className="et-replay-btn" onClick={handleSkip} style={{ pointerEvents: 'auto' }}>
                SKIP
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── DESKTOP: all cards in grid ── */
  const renderDesktopCard = (p, arrayIndex, customStyle = {}) => {
    const cardStartDelay = skipAnimation ? 0 : arrayIndex * CARD_SEQUENCE_DELAY;
    return (
      <motion.div
        key={`${arrayIndex}-${skipAnimation}`}
        className="et-grid-card"
        initial={{ opacity: 0, y: 0, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 15,
          delay: cardStartDelay,
          duration: skipAnimation ? 0 : 0.6,
        }}
        style={{ "--player-glow": p.glow, ...customStyle }}
      >
        <div className="et-card-layout">
          <div className="et-card-left">
            <motion.div
              className="et-id-photo-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: skipAnimation ? 0 : cardStartDelay + 0.2 }}
            >
              {p.img ? (
                <img
                  src={p.img}
                  alt={p.tag}
                  className="et-id-photo"
                  loading="eager"
                />
              ) : (
                <div className="et-id-placeholder">
                  <span className="placeholder-icon">{p.badge}</span>
                </div>
              )}
            </motion.div>
          </div>

          <div className="et-card-right">
            <div className="et-info-item">
              <span className="et-info-label">Name :</span>
              <span className="et-info-value heading-font" style={{ color: p.glow || "var(--primary-red)" }}>
                <TypewriterText
                  text={p.tag}
                  baseDelay={cardStartDelay + 0.4}
                  skip={skipAnimation}
                />
              </span>
            </div>
            <div className="et-info-item">
              <span className="et-info-label">Role :</span>
              <span className="et-info-value role-text">
                <TypewriterText
                  text={p.roleLabel}
                  baseDelay={cardStartDelay + 0.7}
                  skip={skipAnimation}
                />
              </span>
            </div>
          </div>
        </div>

        <div className="et-desc-section">
          <p className="et-id-desc">
            <TypewriterText
              text={p.description}
              baseDelay={cardStartDelay + 1.1}
              speed={0.008}
              skip={skipAnimation}
            />
          </p>
        </div>

        <motion.div
          className="et-footer-social"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: skipAnimation ? 0 : cardStartDelay + 1.4 }}
        >
          <a
            href={
              p.igLink ||
              p.socials?.igLink ||
              `https://instagram.com/${p.ig || p.socials?.ig || "stgesports.in"}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="et-id-social"
          >
            <div className="et-ig-icon-wrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <span>@{ (p.ig || p.socials?.ig || "stgesports.in").replace(/^@+/, '') }</span>
          </a>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="et-overlay" ref={modalScrollRef} onClick={onClose}>
      <div className="et-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="et-modal-header">
          <button className="et-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="et-divider"></div>

        <div className="et-players-grid-v3" style={{ paddingBottom: '2rem' }}>
          <AnimatePresence mode="wait">
            {players.slice(desktopPage * 6, (desktopPage + 1) * 6).map((p, idx) => renderDesktopCard(p, desktopPage * 6 + idx))}
          </AnimatePresence>
        </div>
        
        {players.length > 6 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', paddingBottom: '2rem' }}>
            {Array.from({ length: Math.ceil(players.length / 6) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setDesktopPage(idx); setSkipAnimation(true); }}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: desktopPage === idx ? 'var(--primary-red)' : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        )}
        
        {!skipAnimation && (
          <div style={{ position: 'fixed', bottom: '2rem', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 1000000, pointerEvents: 'none' }}>
            <button className="et-replay-btn" onClick={handleSkip} style={{ pointerEvents: 'auto' }}>
              SKIP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Main Page ──────────────────────────────────────────── */
const LineupPage = () => {
  const navigate = useNavigate();
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [modalPlayers, setModalPlayers] = useState([]);

    const resolveMediaUrl = (url) => {
      if (!url) return null;
      if (typeof url === 'string' && url.startsWith('/')) return `https://api.codingboss.in${url}`;
      return url;
    };

    // Build squad list helper
    const buildSquad = (teamsData) =>
      Object.entries(teamsData).map(([key, teamData]) => ({
        key,
        name: teamData.label,
        role: 'STG TEAM',
        icon: '🎮',
        img: teamData.img,
        id: `STG_${key.toUpperCase()}`,
      }));

  const [activeTeamsData, setActiveTeamsData] = useState({});

  const [squadMembers, setSquadMembers] = useState([]);
  
  const [teamsLoading, setTeamsLoading] = useState(() => {
    return Object.keys(activeTeamsData).length === 0;
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch teams and players exclusively from API
    const fetchAPIData = async () => {
      try {
        const [teamsRes, playersRes] = await Promise.all([
          fetch('https://api.codingboss.in/sports_app/get-team/', { headers: { 'ngrok-skip-browser-warning': 'true' } }),
          fetch('https://api.codingboss.in/sports_app/get-player/', { headers: { 'ngrok-skip-browser-warning': 'true' } }).catch(() => null)
        ]);

        let apiTeams = [];
        if (teamsRes && teamsRes.ok) {
           const tData = await teamsRes.json();
           apiTeams = Array.isArray(tData) ? tData : (tData.results || tData.value || []);
        }

        let apiPlayers = [];
        if (playersRes && playersRes.ok) {
           const pData = await playersRes.json();
           apiPlayers = Array.isArray(pData) ? pData : (pData.data || pData.results || pData.value || []);
        }

        setActiveTeamsData(prev => {
          const updated = { ...prev };

          // Build teams structure
          apiTeams.forEach(team => {
            if (!team || !team.teamName) return;
            const newKey = team.teamName.trim().toLowerCase().replace(/\s+/g, '');
            const existing = updated[newKey] || {};
            updated[newKey] = {
              players: [], // Always start fresh — populated below from API only
              id: team.id || existing.id,
              label: team.teamName,
              glow: team.teamColor || existing.glow || '#ffffff',
              img: resolveMediaUrl(team.teamLogo) || existing.img || null,
            };
          });

          // Create a new fresh players map to avoid duplicates
          const freshPlayers = {};
          Object.keys(updated).forEach(k => { freshPlayers[k] = []; });

          // Place each API player into its team EXACTLY ONCE
          const seenIds = new Set();
          apiPlayers.forEach(p => {
            const pid = String(p.id);
            if (seenIds.has(pid)) return; // skip duplicates from API
            seenIds.add(pid);

            const playerObj = {
              id: p.id,
              tag: p.playerTag,
              roleLabel: p.role,
              description: p.description,
              ig: p.instagramUsername,
              igLink: p.instagramLink,
              img: resolveMediaUrl(p.profileImage),
              badge: '🎮'
            };

            // Find which team this player belongs to
            let foundTeamKey = null;
            if (p.teamName) {
              const possibleKey = p.teamName.trim().toLowerCase().replace(/\s+/g, '');
              if (updated[possibleKey]) foundTeamKey = possibleKey;
            }

            if (!foundTeamKey && Object.keys(updated).length > 0) {
              foundTeamKey = Object.keys(updated)[0]; // Fallback to first team if unknown
            }

            if (foundTeamKey && updated[foundTeamKey]) {
                // Only push if not already present
                const already = updated[foundTeamKey].players.some(x => String(x.id) === pid || x.tag === p.playerTag);
                if (!already) {
                  updated[foundTeamKey].players.push(playerObj);
                }
            }
          });

          setSquadMembers(buildSquad(updated));
          setTeamsLoading(false);
          return updated;
        });
      } catch (e) {
        console.error('Failed to fetch data from API:', e);
        setTeamsLoading(false);
      }
    };

    fetchAPIData();
  }, []);

  const handlePlayerClick = (member) => {
    if (member.key && activeTeamsData[member.key]) {
      const teamGlow = activeTeamsData[member.key].glow || "var(--primary-red)";
      const playersWithGlow = activeTeamsData[member.key].players.map(p => ({
        ...p,
        glow: p.glow || teamGlow
      }));
      setModalPlayers(playersWithGlow);
      setShowTeamModal(true);
      return;
    }
    setSelectedPlayer(member);
    setIsModalOpen(true);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <div className="lineup-page">
      <STGWatermark />
      {/* Hero Section */}
      <section className="lineup-hero">
        <img
          src={cyberBg}
          alt="Cyber Background"
          className="hero-bg-animated"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fill",
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
          fetchpriority="high"
          decoding="async"
          loading="eager"
        />
        <div className="hero-hud-overlay"></div>

        <div className="tactical-hud hud-left">
          <div className="hud-box">
            <span className="hud-label">PLAYERS ONLINE</span>
            <span className="hud-value">12,456</span>
          </div>
          <div className="hud-stats">
            <div className="hud-stat-item">
              <span className="hud-icon">⚡</span>
              <span>LATENCY: 24ms</span>
            </div>
            <div className="hud-stat-item">
              <span className="hud-icon">🌍</span>
              <span>REGION: ASIA-SOUTH</span>
            </div>
          </div>
        </div>

        <div className="tactical-hud hud-right">
          <div className="hud-box">
            <span className="hud-label">CURRENT SEASON</span>
            <span className="hud-value">09</span>
          </div>
          <div className="hud-rank">
            <div className="rank-tier">GRANDMASTER</div>
          </div>
        </div>

        <button className="global-back-btn" onClick={() => navigate(-1)}>
          <span className="arrow">←</span> BACK
        </button>

        <div className="stg-container h-full relative">
          <div className="hero-content">
            <motion.div
              className="roster-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              ELITE ROSTER
            </motion.div>
            <motion.h1
              className="lineup-title heading-font"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span>STG</span> <span className="red-text">TEAM</span>
            </motion.h1>
            <motion.p
              className="lineup-desc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Meet the brilliant minds and elite gamers powering the heart of
              STG Esports. <br />
              Precision, strategy, and raw skill.
            </motion.p>

            <div className="scroll-indicator-v2">
              <span className="heading-font">SCROLL</span>
              <div className="mouse-icon">
                <div className="wheel"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visionaries Section */}
      <section className="visionaries-section stg-section">
        <div className="stg-container">
          <div className="visionaries-grid">
            <div className="visionary-card glass theme-founder">
              <div className="player-frame">
                <img
                  src={dharshanImg}
                  alt="Dharshan STG"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="visionary-info">
                <span className="tag-founder">FOUNDER</span>
                <h3 className="heading-font">STG SUJAN</h3>
                <p className="role-red">IGL</p>
                <p className="visionary-desc">
                  Strategic Founder &amp; CEO, leading STG Esports with a
                  mission to empower elite talent and dominate the global stage.
                </p>
                <a
                  href="https://www.instagram.com/dhar_shan_03?igsh=MWkwMWdkanllOHF3cg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="visionary-social-link"
                >
                  <div className="v-social-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <span>@dhar_shan_03</span>
                </a>
              </div>
            </div>

            <div className="visionary-card glass theme-sponsor">
              <div
                className="player-frame"
                style={{
                  background: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={myluvLogo}
                  alt="MYLUV"
                  style={{ objectFit: "contain", width: "90%", height: "90%" }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="visionary-info">
                <span className="tag-sponsor">OFFICIAL SPONSOR</span>
                <h3 className="heading-font">MYLUV</h3>
                <p className="role-red">PREMIUM SPONSOR</p>
                <p className="visionary-desc">
                  Proudly sponsoring STG Esports on our journey to dominate the
                  gaming universe. Unmatched support for unmatched talent.
                </p>
                <a
                  href="https://www.instagram.com/05myluv?igsh=MW1mOG8yZWd6cnlvaw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="visionary-social-link"
                >
                  <div className="v-social-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <span>@05myluv</span>
                </a>
              </div>
            </div>

            <div className="visionary-card glass theme-strategist">
              <div className="player-frame">
                <img
                  src={donImg}
                  alt="STG DON"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="visionary-info">
                <span className="tag-strategist">STRATEGIST</span>
                <h3 className="heading-font">STG DON</h3>
                <p className="role-red">OPERATION MANAGER</p>
                <p className="visionary-desc">
                  Masterminding team operations and orchestrating our path to
                  regional dominance.
                </p>
                <a
                  href="https://www.instagram.com/ig.stg_don?igsh=bHV1cWNmMnY0M2Fj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="visionary-social-link"
                >
                  <div className="v-social-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <span>@ig.stg_don</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Squad Section */}
      <section className="squad-section stg-section">
        <div className="stg-container">
          <motion.div className="squad-header center" {...fadeIn}>
            <h2 className="heading-font">
              STG'S <span className="red-text">SQUAD</span>
            </h2>
            <div className="red-underline"></div>
            <p className="instruction-text">
              Click on a team card to view player stats
            </p>
          </motion.div>

          <div className="squad-vertical-list">
            {teamsLoading ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.5)', width: '100%' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚡</div>
                <p style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.15em' }}>LOADING TEAMS...</p>
              </div>
            ) : squadMembers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.4)', width: '100%' }}>
                <p style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.1em' }}>NO TEAMS AVAILABLE</p>
              </div>
            ) : squadMembers.map((member, i) => (
              <motion.div
                key={i}
                className="squad-profile-item"
                onClick={() => handlePlayerClick(member)}
              >
                <div className="squad-profile-main">
                  <div className="squad-avatar-box">
                    {member.img ? (
                      <img
                        src={member.img}
                        alt={member.name}
                        className="squad-profile-img"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span className="squad-icon">{member.icon}</span>
                    )}
                  </div>
                  <div className="squad-profile-details">
                    <h4 className="heading-font">{member.name}</h4>
                  </div>
                </div>

                <div className="squad-profile-action">
                  <span className="click-here-text">VIEW PLAYERS</span>
                  <div className="action-arrow">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STG Team Modal (Reusable for Esports & Raiders) */}
      <TeamModal
        isOpen={showTeamModal}
        onClose={() => setShowTeamModal(false)}
        players={modalPlayers}
      />

      <PlayerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        player={selectedPlayer}
      />
    </div>
  );
};

export default LineupPage;
