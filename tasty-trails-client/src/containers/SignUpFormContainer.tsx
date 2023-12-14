import React, { useState } from 'react';
import SignupForm from '../components/SignUpForm/SignUpForm.tsx';
import { createUser} from '../api/index.js';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setAuth } from '../auth/authSlice.ts';
import { sendAlert } from '../service/alert-service.ts';
 
const SignupFormContainer: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    userName: '',
    password: '',
  });
 
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    userName: '',
    password: '',
  });
 
  const [isFormValid, setIsFormValid] = useState(false);
 
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
 
    validateField(name, value);
  };
 
  const validateField = (name: string, value: string) => {
    let errorMessage = '';
 
    switch (name) {
      case 'firstName':
        errorMessage = value.trim() === '' ? 'First Name is required' : '';
        break;
      case 'lastName':
        errorMessage = value.trim() === '' ? 'Last Name is required' : '';
        break;
      case 'emailId':
        errorMessage = validateEmail(value);
        break;
      case 'userName':
        errorMessage = value.trim() === '' ? 'Username is required' : '';
        break;
      case 'password':
        errorMessage = validatePassword(value);
        break;
      default:
        break;
    }
 
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
 
    updateFormValidity();
  };
 
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Invalid email address';
  };
 
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password)
      ? ''
      : 'Password must contain one small letter, one uppercase letter, one symbol, one number, and be at least 8 characters long';
  };
 
  const updateFormValidity = () => {
    const isValid = Object.values(formErrors).every((error) => error === '');
    setIsFormValid(isValid);
  };
 
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
 
      try {
          const { firstName, lastName, ...restFormData } = formData;
          const fullName = `${firstName} ${lastName}`;
   
          const response = await createUser({ ...restFormData, fullName });
        
        if(response.data.error) {
          setErrorMessage(response.data.error);
          return;
        }

        if (response.status === 200) {
          
          
          const { userId, token } = {
            userId: response.data.user._id,
            token: response.data.token,
          };
          dispatch(setAuth({ userId, token }));
 
          navigate('/posts', { state: { userId } });
          sendAlert("Signed Up Successfully!", "Success");
          
        } else {
 
          setErrorMessage('Failed to create user. Please try again.');
        }
      } catch (error) {
        console.error('Error creating user:', error);
        setErrorMessage('An error occurred while creating the user. Please try again.');
      }
    }
  };
 
  const handleLoginClick = () => {
    navigate('/login');
  };
 
  const handleGoogleSignup = () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };
 
 
  return (
    <div>
      <SignupForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onLoginClick={handleLoginClick}
        onGoogleSignup = {handleGoogleSignup}
        formErrors={formErrors}
        isFormValid={isFormValid}
        errorMessage={errorMessage}
      />
    </div>
  );
};
 
export default SignupFormContainer;