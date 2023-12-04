// SignupFormContainer.tsx
import React, { useState } from 'react';
import SignupForm from '../components/SignUpForm.tsx';
import { createUser } from '../api/index.js';
import { useNavigate } from "react-router-dom";

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
  
        const response = await createUser({ ...restFormData, fullName });

      if (response.status === 201) {
        console.log('User created successfully!');
        // Add any additional logic after successful user creation
        navigate('/posts');
      } else {

        setErrorMessage('Failed to create user. Please try again.');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setErrorMessage('An error occurred while creating the user. Please try again.');
      // Handle error as needed
    }
  };
  return (
    <div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <SignupForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
};

export default SignupFormContainer;
