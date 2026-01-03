import React, { useRef, useState } from 'react';
import './About.css';
import placeholder from '../Assets/deer.jpeg';

const About = () => {
  const imageRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const rafRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    
    // Use requestAnimationFrame for throttling
    if (rafRef.current) return;
    
    rafRef.current = requestAnimationFrame(() => {
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate the tilt opposite to the cursor
      const rotateY = ((x - centerX) / centerX) * 8;
      const rotateX = ((y - centerY) / centerY) * -8;
      
      setTilt({ rotateX, rotateY });
      rafRef.current = null;
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section id="about" className="about-section" aria-label="About">
      <div className="about-content">
        <img 
          ref={imageRef}
          className="about-image" 
          src={placeholder} 
          alt="Placeholder"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          }}
        />
        <div className="about-text">
          <h1 className="about-title">About</h1>
          <p>
            I'm a Computer Science student at McGill University with a professional background in generative AI and process automation. My academic record ranges from OS design and algorithms to computational biology and I lead a team coordinating the largest hackathon at McGill. I spent half a year studying in Tokyo, I love photography, and I get along royally with my moderately-well-behaved dog.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
