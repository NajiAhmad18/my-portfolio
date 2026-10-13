import React from 'react';
import styles from './ArchitectureFlow.module.css';

const ArchitectureFlow = ({ intro }) => (
  <div className={`${styles.flow} ${intro ? styles.introFlow : ''}`} aria-label="Client requests flow through an API and services to a database">
    <span className={styles.caption}>system / request-path</span>
    <div className={styles.diagram} aria-hidden="true">
      <div className={styles.node}><span>01</span><strong>Client</strong><small>React</small></div>
      <i className={styles.line} />
      <div className={styles.node}><span>02</span><strong>API</strong><small>Node.js</small></div>
      <i className={styles.line} />
      <div className={styles.node}><span>03</span><strong>Services</strong><small>Logic</small></div>
      <i className={styles.line} />
      <div className={styles.node}><span>04</span><strong>Data</strong><small>MongoDB</small></div>
    </div>
    <p>Clear boundaries. Reliable paths. Useful interfaces.</p>
  </div>
);

export default ArchitectureFlow;
