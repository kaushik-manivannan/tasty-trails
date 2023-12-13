import React from 'react';
import styles from './SignUpForm.module.scss';

interface SignupFormProps {
  formData: {
    firstName: string;
    lastName: string;
    emailId: string;
    userName: string;
    password: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onLoginClick: () => void;
  onGoogleSignup: () => void;
  formErrors: {
    firstName: string;
    lastName: string;
    emailId: string;
    userName: string;
    password: string;
  };
  isFormValid: boolean;
  errorMessage: string | null;
}

const SignupForm: React.FC<SignupFormProps> = ({ formData, onChange, onSubmit, onLoginClick, onGoogleSignup, formErrors, isFormValid, errorMessage }) => {
  return (
    <div className={styles.coverImage}>
      <div className={styles.signupPage}>
        <img src={`${process.env.PUBLIC_URL}/assets/logo.svg`} alt="Tasty Trails Logo" className={styles.logo}/>
        <h1 className={styles.heading}>Sign Up</h1>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={onSubmit} className={styles.signupForm}>
          <div className={styles.inputContainer}>
            <label htmlFor="firstName" className={styles.inputLabel}>First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={onChange}
              placeholder="Enter your first name"
              required
              className={styles.input}
            />
            <div className={styles.errorMessage}>{formErrors.firstName}</div>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="lastName" className={styles.inputLabel}>Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={onChange}
              placeholder="Enter your last name"
              required
              className={styles.input}
            />
            <div className={styles.errorMessage}>{formErrors.lastName}</div>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="emailId" className={styles.inputLabel}>Email</label>
            <input
              type="email"
              id="emailId"
              name="emailId"
              value={formData.emailId}
              onChange={onChange}
              placeholder="Enter your email"
              required
              className={styles.input}
            />
            <div className={styles.errorMessage}>{formErrors.emailId}</div>
          </div>
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
            <div className={styles.errorMessage}>{formErrors.userName}</div>
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
            <div className={styles.errorMessage}>{formErrors.password}</div>
          </div>
          <button type="submit" className={styles.signupButton} disabled={!isFormValid}>Sign Up</button>
          <hr className={styles.signupDivision}/>
        </form>
        <div className={styles.secondarySignup}>
          <button type="submit" className={styles.secondarySignupButton} onClick={onGoogleSignup}>Sign up with Google
          </button>
        </div>
        <div className={styles.login}>
          <span className={styles.loginText}>Have an account already?</span>
          <button onClick={onLoginClick} className={styles.loginButton}>Log in</button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
