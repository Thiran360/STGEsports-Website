import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import './Metrics.css';

const Counter = ({ value, suffix = '', prefix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  
  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2, ease: "easeOut" });
      return controls.stop;
    } else {
      count.set(0); // Reset when scrolled out of view
    }
  }, [isInView, value, count]);

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

const metricsData = [
  { target: 10, suffix: 'K+', label: 'COMMUNITY PLAYERS', color: 'red' },
  { target: 50, prefix: '₹', suffix: 'L+', label: 'PRIZES DISTRIBUTED', color: 'orange' },
  { target: 500, suffix: '+', label: 'OFFICIAL OPERATIONS', color: 'red' }
];

const Metrics = () => {
  return (
    <section className="metrics-section stg-section">
      <div className="stg-container">
        <div className="section-header">
          <h2 className="heading-font">METRICS THAT <span className="glow-red">MATTER</span></h2>
        </div>
        <div className="metrics-grid">
          {metricsData.map((m, i) => (
            <div key={i} className="metric-item">
              <span className={`metric-value heading-font glow-${m.color}`}>
                <Counter value={m.target} suffix={m.suffix} prefix={m.prefix} />
              </span>
              <span className="metric-label">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
