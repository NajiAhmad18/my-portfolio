import React, { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import styles from './EngineeringApproach.module.css';
const stages = [['Interface', 'Clear, purposeful screens'], ['API', 'Explicit contracts and routes'], ['Services', 'Focused business boundaries'], ['Data', 'Durable application records']];
const EngineeringApproach = () => {
  const sectionRef = useRef(null); const [activeStage, setActiveStage] = useState(0); const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 78%', 'end 45%'] });
  const scaleX = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [.76, .96]);
  const radius = useTransform(scrollYProgress, [0, 1], reducedMotion ? ['1rem', '1rem'] : ['1.25rem', '0rem']);
  const opacity = useTransform(scrollYProgress, [0, .16], [.72, 1]); const pulseY = useTransform(scrollYProgress, [0, 1], ['3%', '86%']);
  useMotionValueEvent(scrollYProgress, 'change', value => setActiveStage(Math.min(stages.length - 1, Math.floor(value * stages.length))));
  return <section ref={sectionRef} className={styles.section} aria-labelledby="approach-title"><div className={styles.sticky}><motion.div className={styles.panel} style={{ scaleX, borderRadius: radius }}><div className={styles.inner}><span className="moduleLabel">04 / Engineering approach</span><div className={styles.composition}><div className={styles.copy}><p className={styles.intro}>Building with intent</p><h2 id="approach-title"><span>Good software</span><span>should stay clear</span><span>at every layer.</span></h2><p className={styles.supporting}>Structure keeps systems understandable. Reliability follows from deliberate boundaries.</p><span className={styles.scrollHint}>Scroll to explore ↓</span></div><motion.div className={styles.detail} style={{ opacity }} aria-label="Architecture flow"><div className={styles.architectureFlow}><motion.span className={styles.pulse} style={{ top: pulseY }} aria-hidden="true" />{stages.map(([title, description], index) => <div className={`${styles.node} ${index < activeStage ? styles.complete : ''} ${index === activeStage ? styles.active : ''}`} key={title}><span className={styles.nodeIndex}>0{index + 1}</span><div><strong>{title}</strong><small>{description}</small></div><span className={styles.nodeState}>{index < activeStage ? 'Complete' : index === activeStage ? 'Active' : 'Queued'}</span></div>)}</div></motion.div></div></div></motion.div></div></section>;
};
export default EngineeringApproach;
