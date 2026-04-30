import React from 'react';
import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { useSettings } from '../../hooks/useSettings';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { socialLinks: dynamicLinks, siteTitle } = useSettings();

  const navLinks = [
    { name: 'Home',     url: '/' },
    { name: 'About',    url: '/about' },
    { name: 'Skills',   url: '/skills' },
    { name: 'Projects', url: '/projects' },
    { name: 'Articles', url: '/articles' },
    { name: 'Contact',  url: '/contact' },
  ];

  const handlePhoneClick = (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      `📞 Call ${siteTitle || 'Naji Ahmad Javahir'}?\n\n+94 75 8014 299\n\nYour device will open the phone app to place this call.`
    );
    if (confirmed) {
      window.location.href = 'tel:+94758014299';
    }
  };

  const socialLinks = [
    {
      icon: <FiGithub />,
      url: dynamicLinks?.github || 'https://github.com/NajiAhmad18',
      label: 'GitHub',
      external: true,
    },
    {
      icon: <FiLinkedin />,
      url: dynamicLinks?.linkedin || 'https://www.linkedin.com/in/naji-ahmad-javahir-a8612a236/',
      label: 'LinkedIn',
      external: true,
    },
    {
      icon: <FiMail />,
      url: dynamicLinks?.email ? `mailto:${dynamicLinks.email}` : 'mailto:naji.a.javahir@gmail.com',
      label: 'Email',
      external: false,
    },
    {
      icon: <FiPhone />,
      url: '#',
      label: 'Phone',
      external: false,
      onClick: handlePhoneClick,
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              NAJI.
            </Link>
            <p className={styles.bio}>
              Software engineer building reliable backend services and clean web interfaces. Open to work and client projects — let's connect.
            </p>
          </div>

          <div className={styles.links}>
            <h3>Quick Links</h3>
            <ul>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.url}>{link.name}</Link>
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
                  target={social.external ? '_blank' : undefined}
                  rel={social.external ? 'noopener noreferrer' : undefined}
                  onClick={social.onClick}
                  aria-label={social.label}
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {currentYear} Naji Ahmad Javahir. All rights reserved.</p>
          <p 
            className={styles.builtWith}
            onClick={() => {
              const now = Date.now();
              const lastClick = window._lastAdminClick || 0;
              const clickCount = window._adminClickCount || 0;
              
              if (now - lastClick < 500) {
                window._adminClickCount = clickCount + 1;
              } else {
                window._adminClickCount = 1;
              }
              
              window._lastAdminClick = now;
              
              if (window._adminClickCount === 3) {
                window.dispatchEvent(new CustomEvent('toggleAdminTerminal'));
                window._adminClickCount = 0;
              }
            }}
            style={{ cursor: 'default' }}
          >
            Built with React &amp; Three.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

