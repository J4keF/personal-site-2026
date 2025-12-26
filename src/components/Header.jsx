import React, { useState, useEffect, useMemo } from 'react';
import './Header.css';

const Header = ({ setIsHovered }) => {
  const [fontIndex, setFontIndex] = useState(0);
  
  // Fonts to rapidly for the 'Jake' text to flip through
  const fonts = [
    'font-bbh-bartle',
    'font-playfair',
    'font-bebas',
    'font-geom',
    'font-dm-serif',
    'font-fira-code'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      // Font's flip every x milliseconds
      setFontIndex((prev) => (prev + 1) % fonts.length);
    }, 250); 
    return () => clearInterval(timer);
  }, [fonts.length]);

  // For dark mode only, randomly generate a pattern of stars
  const stars = useMemo(() => {
    const count = 28;
    const arr = [];
    for (let i = 0; i < count; i++) {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const size = 6 + Math.random() * 8;
      arr.push({ left, top, size });
    }
    return arr;
  }, []);

  return (
    <header className="pixel-header">
      {/* Night sky stars layer (shows in dark theme) */}
      <div className="stars-layer" aria-hidden="true">
        {stars.map((s, idx) => (
          <svg
            key={idx}
            className="star"
            viewBox="0 0 24 24"
            width={s.size}
            height={s.size}
            style={{ left: `${s.left}%`, top: `${s.top}%` }}
          >
            <path d="M12 2c.6 2.5 3.5 5.4 6 6-2.5.6-5.4 3.5-6 6-.6-2.5-3.5-5.4-6-6 2.5-.6 5.4-3.5 6-6Z" fill="currentColor" />
          </svg>
        ))}
      </div>
      <h1 className="hero-text">
        <span className="hero-prefix">Hey there, I'm </span>
        <span className="highlight-slot">
          <span className={`highlight ${fonts[fontIndex]}`}>Jake</span>
        </span>
      </h1>
      <div 
        className="explore-container" 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        // Clicking the explore button will eventuall jump to the about section
        onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})}
      >
        <div className="arrow-down"></div>
      </div>
    </header>
  );
};

export default Header;