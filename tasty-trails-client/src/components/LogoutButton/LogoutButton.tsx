import React from 'react';
import { useDispatch } from 'react-redux';
import { clearAuth } from '../../auth/authSlice.ts';
import { useNavigate } from "react-router-dom";
import styles from './LogoutButton.module.scss';
import { useTranslation } from 'react-i18next';

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Clear the authentication state (token, user info, etc.)
    dispatch(clearAuth());
    // Navigate to the login page after logout
    navigate('/login');
  };

  // Translation hook
  const { t } = useTranslation();

  return (
    // Logout button container
    <div className={styles.logout} onClick={handleLogout}>
      {/* Logout icon */}
      <img src={`${process.env.PUBLIC_URL}/assets/logout-icon.svg`} alt="Logout" className={styles.logoutIcon} />
      {/* Logout button with translation */}
      <button className={styles.logoutButton}>{t('Logout')}</button>
    </div>
  );
};

export default LogoutButton;