import React, { useMemo } from 'react';
import './Resume.css';
import resumePDF from '../Assets/jake-fogel-resume.pdf';

const Resume = ({ setIsHovered }) => {
  // Generate the grid of flowers for the background
  const flowers = useMemo(() => {
    const rows = 8;
    const cols = 12;
    const arr = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        arr.push({ row, col });
      }
    }
    return arr;
  }, []);

  return (
    <section id="resume" className="resume-section" aria-label="Resume">
      {/* Flower grid background */}
      <div className="flower-grid" aria-hidden="true">
        {flowers.map((f, idx) => (
          <div 
            key={idx} 
            className="flower-item"
            style={{
              gridRow: f.row + 1,
              gridColumn: f.col + 1
            }}
          >
            <div className="flower-center"></div>
            <div className="flower-petal fp1"></div>
            <div className="flower-petal fp2"></div>
            <div className="flower-petal fp3"></div>
            <div className="flower-petal fp4"></div>
          </div>
        ))}
      </div>
      <div className="resume-content">
        <h1 className="resume-title">Resume</h1>
        <div className="resume-buttons">
          <a 
            href={resumePDF}
            target="_blank" 
            rel="noopener noreferrer"
            className="resume-btn"
            aria-label="View Jake Fogel's Resume"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
          
          <a 
            href="https://www.linkedin.com/in/jakefogel/"
            target="_blank" 
            rel="noopener noreferrer"
            className="resume-btn linkedin-btn"
            aria-label="View Jake Fogel's LinkedIn Profile"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Resume;
