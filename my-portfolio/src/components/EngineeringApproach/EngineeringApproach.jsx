import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import styles from './EngineeringApproach.module.css';

const EngineeringApproach = () => {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 78%', 'end 45%'] });
  const scaleX = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [.72, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], reducedMotion ? ['1rem', '1rem'] : ['1.25rem', '0rem']);
  const opacity = useTransform(scrollYProgress, [0, .45], [.28, 1]);
  return <section ref={sectionRef} className={styles.section} aria-labelledby="approach-title"><div className={styles.sticky}><motion.div className={styles.panel} style={{ scaleX, borderRadius: radius }}><div className={styles.inner}><span className="moduleLabel">04 / Engineering approach</span><div className={styles.composition}><div className={styles.copy}><p className={styles.intro}>Building with intent</p><h2 id="approach-title"><span>Good software</span><span>should stay clear</span><span>at every layer.</span></h2><span className={styles.scrollHint}>Scroll to explore ↓</span></div><motion.div className={styles.detail} style={{ opacity }}><div className={styles.path}><span>Interface</span><i>↓</i><span>API</span><i>↓</i><span>Services</span><i>↓</i><span>Data</span></div><div className={styles.supporting}><p>Structure keeps systems understandable. Reliability follows from deliberate boundaries.</p><span className={styles.meta}>route / service / data</span></div></motion.div></div></div></motion.div></div></section>;
};
export default EngineeringApproach;
