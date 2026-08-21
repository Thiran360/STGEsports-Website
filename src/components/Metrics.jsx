import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import './Metrics.css';

const Counter = ({ value, suffix = '', prefix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => setCount(Math.floor(latest)),
      });
      return () => controls.stop();
    } else {
      setCount(0); // Reset count when out of view so it restarts from 0 next time
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
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
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
            className="heading-font"
          >
            METRICS THAT <span className="glow-red">MATTER</span>
          </motion.h2>
        </div>
        <div className="metrics-grid">
          {metricsData.map((m, i) => (
            <motion.div 
              key={i} 
              className="metric-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <span className={`metric-value heading-font glow-${m.color}`}>
                <Counter value={m.target} suffix={m.suffix} prefix={m.prefix} />
              </span>
              <span className="metric-label">{m.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

  );
};

export default Metrics;

