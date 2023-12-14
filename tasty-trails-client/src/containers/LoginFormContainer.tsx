import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../auth/authSlice.ts';
import LoginForm from '../components/LoginForm/LoginForm.tsx';
import { loginUser } from '../api/index.js';
import { AxiosError } from 'axios';
import { handleAxiosError } from '../service/server-error-handler.ts';
 
 
const LoginFormContainer: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });
 
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
  const validateForm = () => {
    let isValid = true;
 
    if (formData.userName.trim() === '') {
      setUsernameError('Username is required');
      isValid = false;
    } else {
      setUsernameError('');
    }
 
    if (formData.password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }
 
    return isValid;
  };

 
 
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateForm()) {
      setErrorMessage('Please fill in the required fields.');
      return;
    }
  
    try {
      const response = await loginUser(formData);
  
      if (response.status === 200) {
        const { userId, token } = {
          userId: response.data.user._id,
          token: response.data.token,
        };
        dispatch(setAuth({ userId, token }));
  
        navigate('/posts', { state: { userId } });
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error:any) {

      if (error instanceof Error && 'response' in error) {
        // Handle Axios errors
        const errorMessage = handleAxiosError(error as AxiosError<ErrorResponse>);
        setErrorMessage(errorMessage);
      } else {
        // Handle non-Axios errors
        setErrorMessage('An error occurred during login. Please try again.');
      }
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
      <LoginForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleLoginSubmit}
        onSignupClick={handleSignupClick}
        onGoogleLogin = {handleGoogleLogin}
        usernameError={usernameError}
        passwordError={passwordError}
        errorMessage={errorMessage}
      />
    </div>
  );
};
 
export default LoginFormContainer;