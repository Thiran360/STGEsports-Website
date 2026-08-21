import React from "react";
import { motion } from "framer-motion";
import jerseyFront from "../assets/stg-jersey-front.png";
import jerseyBack from "../assets/stg-jersey-back.png";
import jerseyStageBg from "../assets/jersey-grid-bg.png";
import "./SponsorsElite.css";

const SponsorsElite = () => {
  return (
    <section className="sponsors-elite-section stg-section">
      <div className="stg-container">
        <div className="jersey-center-wrapper">
          {/* Centered Jersey Showcase */}
          <div className="elite-column elite-column-centered">
            <div className="elite-visual glass border-glow-red">
              {/* Section Label */}
              <div className="jersey-showcase-label heading-font">
                <span className="label-dot"></span>
                OFFICIAL JERSEY
                <span className="label-dot"></span>
              </div>

              {/* Jersey + Stage Combined Zone */}
              <div className="jersey-stage-zone theater-stage-theme">
                <div
                  className="stage-background-layer"
                  style={{ backgroundImage: `url(${jerseyStageBg})` }}
                ></div>
                <div className="stage-spotlight-overlay"></div>

                <div className="jersey-showcase-container">
                  <div className="jersey-showcase-container">
                    <div className="jersey-rotator">
                      {/* FRONT SIDE */}
                      <div className="jersey-card jersey-front-card">
                        <img
                          src={jerseyFront}
                          alt="Front Jersey"
                          className="jersey-img"
                          loading="lazy"
                          decoding="async"
                        />

                        <div className="jersey-side-tag">FRONT</div>
                      </div>

                      {/* BACK SIDE */}
                      <div className="jersey-card jersey-back-card">
                        <img
                           src={jerseyBack}
                           alt="Back Jersey"
                           className="jersey-img"
                           loading="lazy"
                           decoding="async"
                        />
                        <div className="jersey-side-tag">BACK</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="theater-stage-floor-shadow"></div>
              </div>
              {/* Bottom Bar: Branding */}
              <div className="elite-bottom-bar">
                <div className="elite-branding">
                  <h4 className="heading-font">
                    THE <span className="glow-cyan">NEXT</span> GEN
                  </h4>
                  <p className="elite-gaming-label">ELITE GAMING</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsElite;
