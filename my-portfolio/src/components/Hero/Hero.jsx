import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import { useInteraction } from '../../hooks/useInteraction';
import ArchitectureFlow from './ArchitectureFlow';
import CircuitField from '../CircuitField';

const CodePanel = ({ intro }) => {
  const panelRef = useRef(null);
  const [visibleChars, setVisibleChars] = React.useState(0);
  
  const fullCode = React.useMemo(() => [
    { text: 'const ', type: 'keyword' },
    { text: 'system ', type: 'variable' },
    { text: '=\n  ', type: 'plain' },
    { text: 'createArchitecture', type: 'class' },
    { text: '({\n', type: 'plain' },
    { text: "  client: 'React'", type: 'string' },
    { text: ',\n', type: 'plain' },
    { text: "  api: 'Node.js'", type: 'string' },
    { text: ',\n', type: 'plain' },
    { text: '  services: ', type: 'plain' },
    { text: 'true', type: 'keyword' },
    { text: ',\n', type: 'plain' },
    { text: "  database: 'MongoDB'", type: 'string' },
    { text: '\n});', type: 'plain' }
  ], []);

  const totalChars = React.useMemo(() => 
    fullCode.reduce((acc, token) => acc + token.text.length, 0), 
  [fullCode]);

  React.useEffect(() => {
    if (visibleChars >= totalChars) return;
    
    const timer = setTimeout(() => {
      setVisibleChars(prev => prev + 1);
    }, Math.random() * 25 + 15);
    
    return () => clearTimeout(timer);
  }, [visibleChars, totalChars]);

  const renderTokens = () => {
    let charsLeft = visibleChars;
    return fullCode.map((token, i) => {
      if (charsLeft <= 0) return null;
      const content = token.text.slice(0, charsLeft);
      charsLeft -= token.text.length;
      return (
        <span key={i} className={styles[token.type] || ''}>
          {content}
        </span>
      );
    });
  };

  const handleMouseMove = (e) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    panelRef.current.style.setProperty('--mouse-x', `${x}px`);
    panelRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      className={`${styles.codePanel} spotlight ${intro ? styles.introCode : ''}`}
      ref={panelRef}
      onMouseMove={handleMouseMove}
    >
      <div className={styles.panelHeader}>
        <div className={styles.dots}>
          <span className={styles.dotRed}></span>
          <span className={styles.dotYellow}></span>
          <span className={styles.dotGreen}></span>
        </div>
        <div className={styles.filename}>system_architecture.ts</div>
      </div>
      <pre className={styles.codeContent}>
        <code>
          {renderTokens()}
          <span className={styles.cursor}>|</span>
        </code>
      </pre>
    </div>
  );
};

const Hero = () => {
  const { triggerFeedback } = useInteraction();
  const [hasVisited, setHasVisited] = React.useState(() => typeof window !== 'undefined' && sessionStorage.getItem('hero-intro-seen') === 'true');
  const [introComplete, setIntroComplete] = React.useState(false);
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const shortIntro = hasVisited || reducedMotion;

  React.useEffect(() => {
    if (!hasVisited && !reducedMotion) sessionStorage.setItem('hero-intro-seen', 'true');
    const timer = window.setTimeout(() => setIntroComplete(true), shortIntro ? 420 : 1400);
    return () => window.clearTimeout(timer);
  }, [hasVisited, reducedMotion, shortIntro]);

  return (
    <section id="hero" className={`${styles.hero} ${introComplete ? styles.introComplete : ''}`}><CircuitField variant="hero" />
      <div className={styles.grid}>
        <motion.div
          className={styles.left}
          initial={false}
        >
          <motion.div className={styles.status} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: shortIntro ? .2 : .35, delay: shortIntro ? 0 : .1 }}>
            <span className={styles.dot}></span>
            <span>Available for opportunities</span>
          </motion.div>

          <div className={styles.identity}>
            <motion.p className={styles.role} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: shortIntro ? .2 : .35, delay: shortIntro ? .03 : .2 }}>Full-stack software engineer</motion.p>
            <h1 className={styles.name}><span><motion.span initial={{ y: shortIntro ? 0 : '105%' }} animate={{ y: 0 }} transition={{ duration: shortIntro ? .2 : .55, delay: shortIntro ? .05 : .25 }}>Naji</motion.span></span><span><motion.span initial={{ y: shortIntro ? 0 : '105%' }} animate={{ y: 0 }} transition={{ duration: shortIntro ? .2 : .55, delay: shortIntro ? .08 : .34 }}>Ahmad</motion.span></span><span><motion.span initial={{ y: shortIntro ? 0 : '105%' }} animate={{ y: 0 }} transition={{ duration: shortIntro ? .2 : .55, delay: shortIntro ? .11 : .43 }}>Javahir</motion.span></span></h1>
          </div>

          <motion.p
            className={styles.headline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shortIntro ? .2 : .4, delay: shortIntro ? .12 : .65 }}
          >
            Designing backend systems and APIs with a focus on structure, reliability, and performance.
          </motion.p>

          <motion.p 
            className={styles.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shortIntro ? .2 : .4, delay: shortIntro ? .16 : .76 }}
          >
            I build maintainable services, thoughtful interfaces, and database foundations for products that need to work in the real world.
          </motion.p>

          <motion.div className={styles.heroActions} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: shortIntro ? .2 : .35, delay: shortIntro ? .2 : .84 }}>
            <button
              className={styles.primaryAction}
              onClick={() => {
                triggerFeedback('medium');
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View selected work
            </button>
            <Link
              to="/contact"
              className={styles.secondaryAction}
              onClick={() => triggerFeedback('light')}
            >
              Contact Me
            </Link>
          </motion.div>
          <motion.div className={styles.stackMeta} aria-label="Areas of expertise" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: shortIntro ? .2 : .3, delay: shortIntro ? .24 : .99 }}>
            <span>React</span><span>Node.js</span><span>APIs</span><span>Databases</span>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={false}
        >
          <div className={styles.visualContainer}>
            <motion.div className={styles.sceneWrapper} initial={{ opacity: 0, y: shortIntro ? 0 : 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: shortIntro ? .2 : .45, delay: shortIntro ? .12 : .93 }}><ArchitectureFlow intro={!shortIntro} /></motion.div>
            <div className={styles.panelWrapper}>
              <motion.div initial={{ opacity: 0, y: shortIntro ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: shortIntro ? .2 : .45, delay: shortIntro ? .08 : .65 }}><CodePanel intro={!shortIntro} /></motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
