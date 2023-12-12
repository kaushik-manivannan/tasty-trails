// LoginFormContainer.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../auth/authSlice.ts';
import LoginForm from '../components/LoginForm/LoginForm.tsx';
import { loginUser } from '../api/index.js';
import GoogleOAuthSuccess from './GoogleOAuthSucsess.tsx';


const LoginFormContainer: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);

      if (response.status === 200) {
        console.log('Login successful!');

        const { userId, token } = {
          userId: response.data.user._id,
          token: response.data.token,
        };
        dispatch(setAuth({ userId, token }));

        
        navigate('/posts', { state: { userId } });
      } else {
        setErrorMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred during login. Please try again.');
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };

  return (
    <div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <LoginForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleLoginSubmit}
        onSignupClick={handleSignupClick}
        onGoogleLogin = {handleGoogleLogin}
      />
    </div>
  );
};

export default LoginFormContainer;
