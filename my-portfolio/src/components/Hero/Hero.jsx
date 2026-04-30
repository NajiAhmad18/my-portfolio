import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import { useInteraction } from '../../hooks/useInteraction';
const HeroScene = React.lazy(() => import('./HeroScene'));

const CodePanel = () => {
  const panelRef = useRef(null);
  const [visibleChars, setVisibleChars] = React.useState(0);
  
  const fullCode = React.useMemo(() => [
    { text: 'const ', type: 'keyword' },
    { text: 'buildSystem ', type: 'variable' },
    { text: '= (', type: 'plain' },
    { text: 'requirements', type: 'arg' },
    { text: ': Config) => {\n', type: 'plain' },
    { text: '  return new ', type: 'keyword' },
    { text: 'Architecture', type: 'class' },
    { text: '({\n', type: 'plain' },
    { text: '    scale: ', type: 'plain' },
    { text: "'predictable'", type: 'string' },
    { text: ',\n', type: 'plain' },
    { text: '    performance: ', type: 'plain' },
    { text: '0.99', type: 'number' },
    { text: ',\n', type: 'plain' },
    { text: '    state: ', type: 'plain' },
    { text: 'true', type: 'keyword' },
    { text: '\n  });\n', type: 'plain' },
    { text: '};', type: 'plain' }
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
      className={`${styles.codePanel} spotlight`} 
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

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.grid}>
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.status}>
            <span className={styles.dot}></span>
            <span className="moduleLabel" style={{ marginBottom: 0 }}>AVAILABLE FOR WORK</span>
          </div>

          <div className={styles.identity}>
            <h2 className={styles.name}>Naji Ahmad Javahir</h2>
            <span className="moduleLabel" style={{ color: 'var(--accent-primary)', marginBottom: 0 }}>FULL-STACK ENGINEER</span>
          </div>

          <motion.h1 
            className={styles.headline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Designing backend systems and APIs with a focus on structure, reliability, and performance.
          </motion.h1>

          <motion.p 
            className={styles.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Specialized in database architecture and building interfaces that scale with real usage.
          </motion.p>

          <div className={styles.heroActions}>
            <button
              className={styles.primaryAction}
              onClick={() => {
                triggerFeedback('medium');
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Projects
            </button>
            <Link
              to="/contact"
              className={styles.secondaryAction}
              onClick={() => triggerFeedback('light')}
            >
              Contact Me
            </Link>
          </div>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.visualContainer}>
            <div className={styles.sceneWrapper}>
              <React.Suspense fallback={null}>
                <HeroScene />
              </React.Suspense>
            </div>
            <div className={styles.panelWrapper}>
              <CodePanel />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
