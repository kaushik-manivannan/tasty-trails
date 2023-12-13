import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setAuth } from '../auth/authSlice.ts';

const GoogleOAuthSuccess: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');
  const token = searchParams.get('val');

  useEffect(() => {
    if (userId && token) {
      dispatch(setAuth({ userId, token } as { userId: string; token: string }));
    }

    // Optionally, navigate to '/posts' after dispatching the action
    navigate('/posts');
  }, [dispatch, location.search, navigate, userId, token]);

  // The component doesn't have any content
  return null;
};

export default GoogleOAuthSuccess;
