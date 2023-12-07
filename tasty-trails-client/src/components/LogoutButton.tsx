import React from 'react';
import { useDispatch } from 'react-redux';
import { clearAuth } from '../auth/authSlice.ts';
import { useNavigate } from "react-router-dom";

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token and log the user out
    dispatch(clearAuth());
    navigate('/login');
    
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
