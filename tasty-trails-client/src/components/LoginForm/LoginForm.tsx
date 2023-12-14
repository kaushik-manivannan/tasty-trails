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
  // Translation hook
  const { t } = useTranslation();
 
  return (
    // Container with background image
    <div className={styles.coverImage}>
      <div className={styles.loginPage}>
 
        {/* Tasty Trails logo */}
        <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="Tasty Trails Logo" className={styles.logo} />
 
        {/* Heading for the login form */}
        <h1 className={styles.heading}>{t('Sign in to Tasty Trails')}</h1>
 
        {/* Login form */}
        <form onSubmit={onSubmit} className={styles.loginForm}>

          {errorMessage && <p className={styles.commonErrorMessage}>{errorMessage}</p>}

          {/* Username input */}
          <div className={styles.inputContainer}>
            <label htmlFor="userName" className={styles.inputLabel}>{t('Username')}</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={onChange}
              placeholder={t('Enter your username')}
              
              className={styles.input}
            />
            <div className={styles.errorMessage}>{usernameError}</div>
          </div>
 
          {/* Password input */}
          <div className={styles.inputContainer}>
            <label htmlFor="password" className={styles.inputLabel}>{t('Password')}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              placeholder={t('Enter your password')}
              
              className={styles.input}
            />
            <div className={styles.errorMessage}>{passwordError}</div>
          </div>
 
          {/* Submit button */}
          <button type="submit" className={styles.loginButton}>{t('Login')}</button>
 
          {/* Horizontal division line */}
          <hr className={styles.loginDivision}/>
        </form>
 
        {/* Secondary login option (Sign in with Google) */}
        <div className={styles.secondaryLogin}>
          <button type="submit" className={styles.secondaryLoginButton} onClick={onGoogleLogin}>{t("Sign in with Google")}
          </button>
        </div>
 
        {/* Signup Redirection */}
        <div className={styles.signup}>
          <span className={styles.signupText}>{t("Don't have an account?")}</span>
          <button onClick={onSignupClick} className={styles.signupButton}>{t('Sign up')}</button>
        </div>
      </div>
    </div>
  );
};
 
export default LoginForm;