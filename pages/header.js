import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/" passHref legacyBehavior>
              <a className={styles.navLink}>Home</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/events" passHref legacyBehavior>
              <a className={styles.navLink}>Events</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/results" passHref legacyBehavior>
              <a className={styles.navLink}>Results</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/news" passHref legacyBehavior>
              <a className={styles.navLink}>News</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/about" passHref legacyBehavior>
              <a className={styles.navLink}>About</a>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.headerContent}>
        <div className={styles.headerText}>
        </div>
      </div>
    </header>
  );
};

export default Header;
