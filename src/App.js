import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Resume from './components/Resume';
import jLogo from './Assets/j.svg';
import './App.css';

function App() {
  // Initialize variables for the theme switching and the button hover effect
  const [theme, setTheme] = useState('light');
  const [isHovered, setIsHovered] = useState(false);
  
  const dotRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const dot = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const offset = 25;
      const speed = 0.5;

      dot.current.x += (mouse.current.x + offset - dot.current.x) * speed;
      dot.current.y += (mouse.current.y + offset - dot.current.y) * speed;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    const frameId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);



  return (
    <div className="App" data-theme={theme}>
      {/* Logo button in top left - scroll to top */}
      <button 
        className="logo-button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img className="logo" src={jLogo} alt="J Logo" />
      </button>

      {/* Cursor dot to work globally across website */}
      <div className={`cursor-dot ${isHovered ? 'flower' : ''}`} ref={dotRef}>
        <div className="spin-wrapper">
          <div className="petal p1"></div>
          <div className="petal p2"></div>
          <div className="petal p3"></div>
          <div className="petal p4"></div>
        </div>
      </div>

      {/* Theme switch logic */}
      <button 
        className="theme-toggle" 
        onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {theme === 'light' ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        )}
      </button>

      <Header setIsHovered={setIsHovered} />

      <About />
      <Projects setIsHovered={setIsHovered} />
      <Resume />
    </div>
  );
}

export default App;