import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import { useInteraction } from '../../hooks/useInteraction';
import ArchitectureFlow from './ArchitectureFlow';

const CodePanel = () => {
  const panelRef = useRef(null);
  const [visibleChars, setVisibleChars] = React.useState(0);
  
  const fullCode = React.useMemo(() => [
    { text: 'const ', type: 'keyword' },
    { text: 'system ', type: 'variable' },
    { text: '= ', type: 'plain' },
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
            <span>Available for opportunities</span>
          </div>

          <div className={styles.identity}>
            <p className={styles.role}>Full-stack software engineer</p>
            <h1 className={styles.name}>Naji<br />Ahmad Javahir</h1>
          </div>

          <motion.p
            className={styles.headline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Designing backend systems and APIs with a focus on structure, reliability, and performance.
          </motion.p>

          <motion.p 
            className={styles.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            I build maintainable services, thoughtful interfaces, and database foundations for products that need to work in the real world.
          </motion.p>

          <div className={styles.heroActions}>
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
          </div>
          <div className={styles.stackMeta} aria-label="Areas of expertise">
            <span>React</span><span>Node.js</span><span>APIs</span><span>Databases</span>
          </div>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.visualContainer}>
            <div className={styles.sceneWrapper}><ArchitectureFlow /></div>
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
