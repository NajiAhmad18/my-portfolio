import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { articlesData } from '../../data/articles';
import styles from './Articles.module.css';
import { useInteraction } from '../../hooks/useInteraction';

const ArticleCard = ({ article }) => {
  const { triggerFeedback } = useInteraction();
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.article 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`${styles.articleCard} spotlight`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.cardInner}>
        <span className={styles.date}>{article.date}</span>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.preview}>{article.preview}</p>
        
        <a 
          href={article.link} 
          className={styles.readMore} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(e) => { if (article.link === '#') e.preventDefault(); else triggerFeedback('light'); }}
          style={{
            opacity: article.link === '#' ? 0.4 : 1,
            cursor: article.link === '#' ? 'not-allowed' : 'pointer',
            pointerEvents: article.link === '#' ? 'none' : 'auto'
          }}
        >
          Read Publication <FiArrowRight />
        </a>
      </div>
    </motion.article>
  );
};

const Articles = () => {
  return (
    <section id="articles" className={styles.articles}>
      <div className="section-container">
        <div className={styles.header}>
          <span className="moduleLabel">MODULE: ARTICLES</span>
          <h2 className="moduleTitle">Featured Articles</h2>
        </div>

        <div className={styles.grid}>
          {articlesData.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;
