import React,{useState,useEffect} from 'react';
import CommunityList from '../components/CommunityList/CommunityList.tsx';
import { getAllCommunities } from '../api/index.js';
/**
 * 
 * This component is responsible for fetching all communities from the database
 * @returns React.FC
 *  */
const CommunityListContainer: React.FC = () => {
    const  [communities, setCommunities] = useState([]);

    useEffect(() => {
        const fetchCommunities = async () => {
          try {
            const response = await getAllCommunities();
            if(response.status!== 200){
              throw new Error(`Error occured while fetching communities with response : ${response.data}`);
            }
            setCommunities(response.data);
          } catch (error) {
            console.log("Error fetching data: ", error);
          }
        };
        fetchCommunities();
    }, []); //will be called only once

    return <CommunityList communities={communities} />;
}

export default CommunityListContainer;