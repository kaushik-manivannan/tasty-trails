import React from 'react';
import styles from './LoginForm.module.scss';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
  formData: {
    userName: string;
    password: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSignupClick: () => void;
  onGoogleLogin: () => void;
  usernameError: string;
  passwordError: string;
  errorMessage: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ formData, onChange, onSubmit, onSignupClick, onGoogleLogin, usernameError, passwordError, errorMessage,}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.coverImage}>
      <div className={styles.loginPage}>
        <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="Tasty Trails Logo" className={styles.logo}/>
        <h1 className={styles.heading}>{t('Sign in to Tasty Trails')}</h1>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={onSubmit} className={styles.loginForm}>
          <div className={styles.inputContainer}>
            <label htmlFor="userName" className={styles.inputLabel}>{t('Username')}</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={onChange}
              placeholder={t('Enter your username')}
              required
              className={styles.input}
            />
            <div className={styles.errorMessage}>{usernameError}</div>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password" className={styles.inputLabel}>{t('Password')}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              placeholder={t('Enter your password')}
              required
              className={styles.input}
            />
            <div className={styles.errorMessage}>{passwordError}</div>
          </div>
          <button type="submit" className={styles.loginButton}>{t('Login')}</button>
          <hr className={styles.loginDivision}/>
        </form>
        <div className={styles.secondaryLogin}>
          <button type="submit" className={styles.secondaryLoginButton} onClick={onGoogleLogin}>{t('Sign in with Google')}
          </button>
        </div>
        <div className={styles.signup}>
          <span className={styles.signupText}>Don't have an account?</span>
          <button onClick={onSignupClick} className={styles.signupButton}>{t('Sign up')}</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
