import React from 'react';
import NewCommunity from '../components/NewCommunity/NewCommunity';
import {CommunityFormData} from '../interfaces/community-interfaces';
import { useNavigate } from 'react-router-dom';
import {createCommunity} from '../api/index.js';

/**
 * This component is called when you want to create a new community.
 * @returns React.FC
 */
const NewCommunityContaier: React.FC = () => {

  const navigate = useNavigate();

    const postNewCommunity = async(payload:CommunityFormData)=>{
      try{
        const response = await createCommunity(payload);
        if(response.status === 201){
          navigate('/communities');
        }
      }catch(error){
        console.log(error);
      }
    }
return (
    <NewCommunity postNewCommunity={postNewCommunity} />
);
}
export default NewCommunityContaier;