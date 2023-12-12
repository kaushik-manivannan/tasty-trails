import React from 'react';
import NewCommunity from '../components/NewCommunity/NewCommunity';
import {CommunityFormData} from '../interfaces/community-interfaces';
import { useNavigate } from 'react-router-dom';

/**
 * This component is called when you want to create a new community.
 * @returns React.FC
 */
const NewCommunityContaier: React.FC = () => {

  const navigate = useNavigate();

    const postNewCommunity = (payload:CommunityFormData)=>{
        fetch('http://localhost:8080/communities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload) // Convert the payload into a JSON string
      }).then((response) => response.json())
      .then(()=> {navigate("/communities");})
      .catch((error) =>console.log(error));
    }
return (
    <NewCommunity postNewCommunity={postNewCommunity} />
);
}
export default NewCommunityContaier;