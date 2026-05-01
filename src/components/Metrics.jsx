import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import './Metrics.css';

const Counter = ({ value, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  // Extract number from value string if needed, but easier to pass target directly
  const target = parseInt(value);
  
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = target;
      if (start === end) return;

      let totalDuration = 2000;
      let incrementTime = (totalDuration / end) > 10 ? (totalDuration / end) : 10;
      
      let timer = setInterval(() => {
        start += Math.ceil(end / 100); // larger steps for higher numbers
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
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
