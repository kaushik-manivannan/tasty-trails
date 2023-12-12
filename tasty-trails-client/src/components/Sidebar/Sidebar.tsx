import React from "react";
import styles from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";
import LogoutButton from '../LogoutButton/LogoutButton';
import { useTranslation } from 'react-i18next';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  return (
    <nav className={styles.sidebar}>
      <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} className={styles.logo}/>
      <div className={styles.navLinks}>
          <NavLink to="/posts" className={styles.navLink}>
            <img src={`${process.env.PUBLIC_URL}/assets/home-outline.svg`} alt="Home" className={styles.navIcon}/>
            <p className={styles.navText}>{t('Home')}</p>
          </NavLink>
          <NavLink to="/communities" className={styles.navLink}>
            <img src={`${process.env.PUBLIC_URL}/assets/communities-outline.svg`} alt="Communities" className={styles.navIcon}/>
            <p className={styles.navText}>{t('Communities')}</p>
          </NavLink>
          <NavLink to="/posts/create" className={styles.navLink}>
            <img src={`${process.env.PUBLIC_URL}/assets/create-outline.svg`} alt="Create" className={styles.navIcon}/>
            <p className={styles.navText}>{t('Create')}</p>
          </NavLink>
          <NavLink to="/profile" className={styles.navLink}>
            <img src={`${process.env.PUBLIC_URL}/assets/profile-outline.svg`} alt="Profile" className={styles.navIcon}/>
            <p className={styles.navText}>{t('Profile')}</p>
          </NavLink>
          <div className={styles.logout}>
            <LogoutButton /> 
          </div>
      </div>
    </nav>
  );
};

export default Sidebar;