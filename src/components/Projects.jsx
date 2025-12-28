import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as TerminalIcon } from '../Assets/terminal-svgrepo-com.svg';
import './Projects.css';
import { ReactComponent as SmileIcon } from '../Assets/smile.svg';
import { ReactComponent as DnaIcon } from '../Assets/dna.svg';
import { ReactComponent as ScannerIcon } from '../Assets/scanner.svg';

const Projects = ({ setIsHovered }) => {
  const trackRef = useRef(null);
  const setWidthRef = useRef(0);
  const positionRef = useRef(0);
  const lastTimeRef = useRef(null);
  const speedRef = useRef(56); // pixels per second

  const [isCarouselSlow, setCarouselSlow] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const computeSetWidth = () => {
      const total = track.scrollWidth;
      setWidthRef.current = total / 2;
    };

    computeSetWidth();
    const onResize = () => computeSetWidth();
    window.addEventListener('resize', onResize);

    const step = (timestamp) => {
      if (lastTimeRef.current == null) {
        lastTimeRef.current = timestamp;
      }
      const delta = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      const distance = speedRef.current * delta;
      positionRef.current -= distance;

      const limit = setWidthRef.current || 1;
      if (positionRef.current <= -limit) {
        positionRef.current += limit;
      }

      track.style.transform = `translateX(${positionRef.current}px)`;
      requestAnimationFrame(step);
    };

    const id = requestAnimationFrame(step);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(id);
    };
  }, []);

  // Real project data
  const projects = [
    {
      id: 1,
      title: "Emotion Classification with LLMs",
      description: "Fine-tuned BERT-based models achieving >62% classification accuracy on GoEmotions dataset. Analyzed BERT attention heatmaps to interpret emotional word predictions.",
      link: "https://github.com/J4keF/GoEmotionsLLM",
      accentColor: "#ec4899",
      icon: (
        <SmileIcon width={40} height={40} />
      )
    },
    {
      id: 2,
      title: "Image Classification CNN",
      description: "Built custom CNN on OrganAMNIST dataset achieving 87.15% test accuracy. Fine-tuned ResNet18 with hyperparameter optimization for medical image classification.",
      link: "https://github.com/J4keF/OrganAMNIST-CNN",
      accentColor: "#8b5cf6",
      icon: (
        <ScannerIcon width={40} height={40} />
      )
    },
    {
      id: 3,
      title: "Hidden Markov Model Gene Finder",
      description: "Implemented Viterbi algorithm for 4-state HMM bacterial gene prediction. Trained on Vibrio cholerae genomic data with 87.5% accuracy.",
      link: "https://github.com/J4keF/HMM-GeneFinder",
      accentColor: "#06b6d4",
      icon: (
        <DnaIcon width={40} height={40} />
      )
    },
    {
      id: 4,
      title: "Bridge - Couples Communication App",
      description: "Full-stack web app for long-distance relationships. Real-time messaging and photo sharing with Django backend and JavaScript frontend.",
      link: "https://github.com/imiann/Bridge",
      accentColor: "#f43f5e",
      icon: (
        <svg width="40" height="40" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path d="M25 39.7l-.6-.5C11.5 28.7 8 25 8 19c0-5 4-9 9-9 4.1 0 6.4 2.3 8 4.1 1.6-1.8 3.9-4.1 8-4.1 5 0 9 4 9 9 0 6-3.5 9.7-16.4 20.2l-.6.5zM17 12c-3.9 0-7 3.1-7 7 0 5.1 3.2 8.5 15 18.1 11.8-9.6 15-13 15-18.1 0-3.9-3.1-7-7-7-3.5 0-5.4 2.1-6.9 3.8L25 17.1l-1.1-1.3C22.4 14.1 20.5 12 17 12z"/>
        </svg>
      )
    },
    {
      id: 5,
      title: "Custom Operating System",
      description: "Simulated OS shell with built-ins, FCFS/SJF/RR/aging schedulers, and demand-paged script execution using LRU replacement.",
      link: "https://github.com/J4keF/CustomOperatingSystem",
      accentColor: "#f97316",
      icon: (
        <TerminalIcon width={40} height={40} />
      )
    }
  ];

  return (
    <section
      id="projects"
      className="projects-section"
      aria-label="Projects"
      style={{ '--projects-items-per-set': projects.length * 2 }}
    >
      <div className="projects-container">
        <h1 className="projects-title">Projects</h1>
        
        <div 
          className={`carousel ${isCarouselSlow ? 'slow' : ''}`}
          onMouseEnter={() => { setCarouselSlow(true); speedRef.current = 18; }}
          onMouseLeave={() => { setCarouselSlow(false); speedRef.current = 56; }}
        >
          <div className="carousel-track" ref={trackRef}>
            {projects.map((project) => (
              <a 
                key={project.id} 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card"
                style={{ '--accent-color': project.accentColor }}
              >
                <div className="project-icon">{project.icon}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </a>
            ))}
            {/* Duplicate for seamless loop */}
            {projects.map((project) => (
              <a 
                key={`${project.id}-duplicate`}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card"
                style={{ '--accent-color': project.accentColor }}
              >
                <div className="project-icon">{project.icon}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </a>
            ))}
          </div>
        </div>
        <a 
          href="https://github.com/J4keF" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-more-btn"
          aria-label="View more projects on GitHub"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          More
        </a>
      </div>
    </section>
  );
};

export default Projects;
