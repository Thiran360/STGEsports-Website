import React, { useEffect, useRef } from 'react';
import './STGBackgroundRain.css';
import stgLogo from '../assets/stg-logo.png';
import myluvLogo from '../assets/myluv-logo.png';

const STGBackgroundRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false }); // alpha:false = faster compositing
    let animationFrameId;
    let lastTime = 0;
    const FPS = 24; // Throttle to 24fps - smooth enough, saves CPU
    const fpsInterval = 1000 / FPS;
    let isPaused = false;

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
      drops = Array(columns).fill(0).map(() => Math.random() * -100);
      dropData = Array(columns).fill(0).map(() => {
        const rand = Math.random();
        if (rand > 0.95) return 2; // MYLUV
        if (rand > 0.90) return 1; // STG
        return 0; // char
      });
    };

    // Debounce resize
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initRain, 150);
    };
    window.addEventListener('resize', handleResize);
    initRain();

    // Pause when tab is hidden to save CPU
    const handleVisibility = () => {
      isPaused = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const draw = (timestamp) => {
      animationFrameId = requestAnimationFrame(draw);

      if (isPaused) return; // Tab hidden - skip drawing

      // Throttle: only draw if enough time has passed
      const elapsed = timestamp - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = timestamp - (elapsed % fpsInterval);

      // Semi-transparent black to create trailing effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${fontSize}px Orbitron, monospace`;

      for (let i = 0; i < columns; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (dropData[i] === 0) {
          const text = characters[Math.floor(Math.random() * characters.length)];
          const opacity = Math.random() * 0.7 + 0.3;
          ctx.fillStyle = `rgba(255, 20, 20, ${opacity})`;
          ctx.fillText(text, x, y);
        } else if (dropData[i] === 1 && stgImg.complete) {
          ctx.globalAlpha = 0.6;
          ctx.drawImage(stgImg, x - 10, y - 10, 32, 32);
          ctx.globalAlpha = 1.0;
        } else if (dropData[i] === 2 && myluvImg.complete) {
          ctx.globalAlpha = 0.6;
          ctx.drawImage(myluvImg, x - 10, y - 10, 42, 42);
          ctx.globalAlpha = 1.0;
        }

        if (y > canvas.height) {
          if (Math.random() > 0.975) {
            drops[i] = 0;
            const rand = Math.random();
            if (rand > 0.90) dropData[i] = 2;
            else if (rand > 0.80) dropData[i] = 1;
            else dropData[i] = 0;
          }
        }
        
        if (dropData[i] === 0) {
          drops[i] += 1;
        } else {
          drops[i] += 0.4;
        }
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="stg-rain-canvas" />;
};

export default STGBackgroundRain;
