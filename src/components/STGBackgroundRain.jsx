import React, { useEffect, useRef } from 'react';
import './STGBackgroundRain.css';
import stgLogo from '../assets/stg-logo.png';
import myluvLogo from '../assets/myluv-logo.png';

const STGBackgroundRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Load images
    const stgImg = new Image();
    stgImg.src = stgLogo;
    const myluvImg = new Image();
    myluvImg.src = myluvLogo;

    const characters = ['S', 'T', 'G'];
    const fontSize = 18;
    let columns = 0;
    let drops = [];
    let dropData = [];

    const initRain = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      // Preserve existing drops if possible or just reset
      drops = Array(columns).fill(0).map(() => Math.random() * -100);
      dropData = Array(columns).fill(0).map(() => {
        const rand = Math.random();
        if (rand > 0.95) return 2; // MYLUV
        if (rand > 0.90) return 1; // STG
        return 0; // char
      });
    };

    window.addEventListener('resize', initRain);
    initRain();

    const draw = () => {
      // Semi-transparent black to create trailing effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${fontSize}px Orbitron, monospace`;

      for (let i = 0; i < columns; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (dropData[i] === 0) {
          // Draw character - Brighter Red
          const text = characters[Math.floor(Math.random() * characters.length)];
          const opacity = Math.random() * 0.7 + 0.3;
          ctx.fillStyle = `rgba(255, 20, 20, ${opacity})`;
          ctx.fillText(text, x, y);
        } else if (dropData[i] === 1 && stgImg.complete) {
          // Draw STG Logo
          ctx.globalAlpha = 0.6;
          ctx.drawImage(stgImg, x - 10, y - 10, 32, 32);
          ctx.globalAlpha = 1.0;
        } else if (dropData[i] === 2 && myluvImg.complete) {
          // Draw MYLUV Logo
          ctx.globalAlpha = 0.6;
          ctx.drawImage(myluvImg, x - 10, y - 10, 42, 42);
          ctx.globalAlpha = 1.0;
        }

        // Reset drop randomly after hitting the bottom
        if (y > canvas.height) {
          if (Math.random() > 0.975) {
            drops[i] = 0;
            const rand = Math.random();
            if (rand > 0.90) dropData[i] = 2;
            else if (rand > 0.80) dropData[i] = 1;
            else dropData[i] = 0;
          }
        }
        
        // Speed control
        if (dropData[i] === 0) {
          drops[i] += 1;
        } else {
          drops[i] += 0.4;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    console.log('STG Background Rain: Initialized with', columns, 'columns');
    draw();

    return () => {
      window.removeEventListener('resize', initRain);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="stg-rain-canvas" />;
};

export default STGBackgroundRain;
