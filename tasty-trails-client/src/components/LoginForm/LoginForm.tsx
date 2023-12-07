import React from 'react';
import styles from './LoginForm.module.scss';

interface LoginFormProps {
  formData: {
    userName: string;
    password: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSignupClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ formData, onChange, onSubmit, onSignupClick }) => {
  return (
    <div className={styles.coverImage}>
      <div className={styles.loginPage}>
        <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="Tasty Trails Logo" className={styles.logo}/>
        <h1 className={styles.heading}>Sign in to Tasty Trails</h1>
        <form onSubmit={onSubmit} className={styles.loginForm}>
          <div className={styles.inputContainer}>
            <label htmlFor="userName" className={styles.inputLabel}>Username</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={onChange}
              placeholder="Enter your username"
              required
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password" className={styles.inputLabel}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              placeholder="Enter your password"
              required
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.loginButton}>Login</button>
          <hr className={styles.loginDivision}/>
        </form>
        <div className={styles.secondaryLogin}>
          <button type="submit" className={styles.secondaryLoginButton}>Sign in with Google
          </button>
        </div>
        <div className={styles.signup}>
          <span className={styles.signupText}>Don't have an account?</span>
          <button onClick={onSignupClick} className={styles.signupButton}>Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
