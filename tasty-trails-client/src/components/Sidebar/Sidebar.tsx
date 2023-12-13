import React from "react";
import styles from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";
import LogoutButton from '../LogoutButton/LogoutButton';
import { useTranslation } from 'react-i18next';

const Sidebar: React.FC = () => {
  // Using the translation hook from react-i18next
  const { t } = useTranslation();

  return (
    <nav className={styles.sidebar}>
      {/* Logo */}
      <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} className={styles.logo}/>
      
      {/* Navigation Links */}
      <div className={styles.navLinks}>
        {/* Home Link */}
        <NavLink to="/posts" className={styles.navLink}>
          <img src={`${process.env.PUBLIC_URL}/assets/home-outline.svg`} alt="Home" className={styles.navIcon}/>
          <p className={styles.navText}>{t('Home')}</p>
        </NavLink>

        {/* Communities Link */}
        <NavLink to="/communities" className={styles.navLink}>
          <img src={`${process.env.PUBLIC_URL}/assets/communities-outline.svg`} alt="Communities" className={styles.navIcon}/>
          <p className={styles.navText}>{t('Communities')}</p>
        </NavLink>

        {/* Create Post Link */}
        <NavLink to="/posts/create" className={styles.navLink}>
          <img src={`${process.env.PUBLIC_URL}/assets/create-outline.svg`} alt="Create" className={styles.navIcon}/>
          <p className={styles.navText}>{t('Create')}</p>
        </NavLink>

        {/* Profile Link */}
        <NavLink to="/profile" className={styles.navLink}>
          <img src={`${process.env.PUBLIC_URL}/assets/profile-outline.svg`} alt="Profile" className={styles.navIcon}/>
          <p className={styles.navText}>{t('Profile')}</p>
        </NavLink>

        {/* Logout Button */}
        <div className={styles.logout}>
          <LogoutButton /> 
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;