import React from 'react';
import styles from './LiquidBlobs.module.css';

const LiquidBlobs = () => (
  <div className={styles.blobContainer} aria-hidden="true">
    <div className={`${styles.blob} ${styles.blob1}`} />
    <div className={`${styles.blob} ${styles.blob2}`} />
    <div className={`${styles.blob} ${styles.blob3}`} />
  </div>
);

export default LiquidBlobs;
