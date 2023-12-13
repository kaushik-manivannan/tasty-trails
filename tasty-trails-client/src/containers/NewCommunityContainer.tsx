import React from 'react';
import NewCommunity from '../components/NewCommunity/NewCommunity';
import { CommunityFormData } from '../interfaces/community-interfaces';
import { useNavigate } from 'react-router-dom';
import { createCommunity } from '../api/index.js';

/**
 * Handles the logic for creating a new community and navigating to the communities page.
 */
const NewCommunityContainer: React.FC = () => {
  const navigate = useNavigate();

  // Handles the submission of the new community form.
  const postNewCommunity = async (payload: CommunityFormData) => {
    try {
      const response = await createCommunity(payload);
      if (response.status === 201) {
        // If the community is created successfully, navigate to the communities page.
        navigate('/communities');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <NewCommunity postNewCommunity={postNewCommunity} />;
};

export default NewCommunityContainer;