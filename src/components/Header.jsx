import React, { useState, useEffect } from 'react';
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

  return (
    <header className="pixel-header">
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