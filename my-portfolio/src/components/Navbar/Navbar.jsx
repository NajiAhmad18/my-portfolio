import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { NavLink, Link } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import profileImg from '../../assets/profile.jpg';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home',     href: '/' },
    { name: 'About',    href: '/about' },
    { name: 'Skills',   href: '/skills' },
    { name: 'Projects', href: '/projects' },
    { name: 'Articles', href: '/articles' },
    { name: 'Contact',  href: '/contact' },
  ];

  return (
    <motion.nav 
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.navContainer}>
        <Link to="/about" className={styles.logo}>
          <div className={styles.logoAvatarContainer}>
            <img src={profileImg} alt="Naji Ahmad Javahir" className={styles.logoAvatar} />
          </div>
        </Link>

        <div className={`${styles.navLinks} ${mobileOpen ? styles.mobileOpen : ''}`}>
          {navLinks.map((link) => (
            <NavLink 
              key={link.name} 
              to={link.href} 
              className={({ isActive }) => 
                isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
              }
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
        <div className={styles.controls}>
          <ThemeToggle />
          <button 
            className={styles.mobileMenuBtn} 
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
