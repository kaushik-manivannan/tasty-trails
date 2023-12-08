import React from 'react';
import NewCommunity from '../components/NewCommunity/NewCommunity';
import {CommunityFormData} from '../interfaces/community-interfaces';
import { useSelector } from 'react-redux';

const NewCommunityContaier: React.FC = () => {
    const userId = useSelector((state:any) => state.auth.userId);
    const postNewCommunity = (payload:CommunityFormData)=>{
        payload.communityAdmin = userId;
    fetch('http://localhost:8080/communities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload) // Convert the payload into a JSON string
      }).then((response) => response.json())
      .catch((error) =>console.log(error));
    }
return (
    <NewCommunity postNewCommunity={postNewCommunity} />
);
}
export default NewCommunityContaier;