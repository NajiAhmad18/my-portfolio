import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Home', url: '#home' },
    { name: 'About', url: '#about' },
    { name: 'Skills', url: '#skills' },
    { name: 'Projects', url: '#projects' },
    { name: 'Articles', url: '#articles' },
  ];

  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com/naji', label: 'GitHub' },
    { icon: <FiLinkedin />, url: 'https://linkedin.com/in/naji', label: 'LinkedIn' },
    { icon: <FiTwitter />, url: 'https://twitter.com/naji', label: 'Twitter' },
    { icon: <FiMail />, url: 'mailto:naji@example.com', label: 'Email' }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <a href="#home" className={styles.logo}>
              NAJI.
            </a>
            <p className={styles.bio}>
              Crafting high-performance web experiences with modern technologies. Let's build something amazing together.
            </p>
          </div>

          <div className={styles.links}>
            <h3>Quick Links</h3>
            <ul>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.url}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.social}>
            <h3>Connect</h3>
            <div className={styles.socialIcons}>
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {currentYear} Naji Ahmad Javahir. All rights reserved.</p>
          <p className={styles.builtWith}>
            Built with React & Three.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
