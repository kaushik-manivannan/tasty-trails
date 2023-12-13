import React, { useState, useEffect } from 'react';
import CommunityList from '../components/CommunityList/CommunityList.tsx';
import { getAllCommunities } from '../api/index.js';

/**
 * CommunityListContainer component fetches all communities from the database
 * and renders the CommunityList component with the retrieved data.
 */
const CommunityListContainer: React.FC = () => {
    const [communities, setCommunities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        // Function to fetch communities from the database
        const fetchCommunities = async () => {
            try {
                setIsLoading(true);
                const response = await getAllCommunities();
                
                // Check if the response status is not 200 (OK)
                if (response.status !== 200) {
                    setIsLoading(false);
                    throw new Error(`Error occurred while fetching communities with response: ${response.data}`);
                }
                
                // Set the retrieved communities in the state
                setCommunities(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error("Error fetching communities data:", error);
            }
        };

        // Fetch communities when the component mounts
        fetchCommunities();
    }, []);

    // Render the CommunityList component with the retrieved communities
    return <CommunityList communities={communities} isLoading ={isLoading}/>;
}

export default CommunityListContainer;