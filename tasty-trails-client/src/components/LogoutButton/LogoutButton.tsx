import React from 'react';
import { useDispatch } from 'react-redux';
import { clearAuth } from '../../auth/authSlice.ts';
import { useNavigate } from "react-router-dom";
import styles from './LogoutButton.module.scss';

interface LogoutButtonProps {
  className?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({className}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token and log the user out
    dispatch(clearAuth());
    navigate('/login');
    
  };

  return (
      <div className={styles.logout} onClick={handleLogout}>
        <img src={`${process.env.PUBLIC_URL}/assets/logout-icon.svg`} alt="Logout" className={styles.logoutIcon}/>
        <button className={styles.logoutButton}>Logout</button>
      </div>
  );
};

export default LogoutButton;
