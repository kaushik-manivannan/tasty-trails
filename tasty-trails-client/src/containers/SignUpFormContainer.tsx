// SignupFormContainer.tsx
import React, { useState } from 'react';
import SignupForm from '../components/SignUpForm.tsx';
import { createUser } from '../api/index.js';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setAuth } from '../auth/authSlice.ts';

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


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const { firstName, lastName, ...restFormData } = formData;
        const fullName = `${firstName} ${lastName}`;
		console.log('in handle submit');
  
        const response = await createUser({ ...restFormData, fullName });

      if (response.status === 201) {
        console.log('User created successfully!');
        // Add any additional logic after successful user creation
        
        const { userId, token } = {
          userId: response.data.user._id,
          token: response.data.token,
        };
        dispatch(setAuth({ userId, token }));

        navigate('/posts', { state: { userId } });
      } else {

        setErrorMessage('Failed to create user. Please try again.');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setErrorMessage('An error occurred while creating the user. Please try again.');
      // Handle error as needed
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <SignupForm 
        formData={formData} 
        onChange={handleChange} 
        onSubmit={handleSubmit} 
        onLoginClick={handleLoginClick}
      />
    </div>
  );
};

export default SignupFormContainer;
