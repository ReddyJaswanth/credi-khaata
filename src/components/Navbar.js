import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';
import ThemeToggle from './ThemeToggle';
import { showToast } from './Toast';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    showToast.info('Logged out successfully');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/dashboard" className={styles.logo}>
          CrediKhaata
        </Link>
        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
        <div className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
          <Link
            to="/dashboard"
            className={`${styles.navLink} ${isActive('/dashboard') ? styles.activeLink : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/add-customer"
            className={`${styles.navLink} ${isActive('/add-customer') ? styles.activeLink : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Add Customer
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
            className={styles.navLink}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Logout
          </button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 