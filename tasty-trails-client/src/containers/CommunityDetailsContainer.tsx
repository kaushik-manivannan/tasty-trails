import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import CommunityDetails from '../components/CommunityDetails/CommunityDetails.tsx';
import { getAllCommunityDetailsById } from '../api/index.js';
import { useSelector } from 'react-redux';
import { updateCommunityById } from '../api/index.js';
import { sendAlert } from "../service/alert-service.ts";

const CommunityDetailsContainer: React.FC = () => {
    const [community, setCommunity] = useState(null); // Stores the details of the community
    const [postList, setPostList] = useState([]); // Stores the post list of the community
    const [isEditable, setIsEditable] = useState(false); // Stores if the community is editable or not
    const { communityId } = useParams();
    const userId = useSelector((state: any) => state.auth.userId);

    // Function to update community details
    const updateCommunity = async (payload: any) => {
        try {
            const response = await updateCommunityById(communityId, payload);
            if (response.status !== 200) {
                sendAlert("Failed Updating Community!", "Failure");
                throw new Error(`Error occurred while updating community: ${response.data}`);
            }
            setCommunity(response.data);
            sendAlert("Community Updated Successfully!", "Success");
        } catch (error) {
            console.error("Error updating community: ", error);
        }
    };

    // Function to fetch community details and posts
    const fetchPostByCommunityId = async () => {
        try {
            const response = await getAllCommunityDetailsById(communityId);
            if (response.status !== 200) {
                throw new Error("Failed to fetch community details");
            }
            setCommunity(response.data.community);
            setPostList(response.data.posts);
            // Check if the current user is the admin of the community
            if (response.data.community.communityAdmin === userId) {
                setIsEditable(true);
            }
        } catch (error) {
            throw new Error(`Error fetching Community Details: ${error}`);
        }
    };

    useEffect(() => {
        // Fetch community details and posts when communityId changes
        const fetchData = async () => {
            try {
                await fetchPostByCommunityId();
            } catch (error) {
              throw new Error(`Error fetching Post: ${error}`);
            }
        };

        fetchData();
    }, [communityId]);

    return (<>{community && <CommunityDetails community={community} postList={postList} isEditable={isEditable} updateCommunityById={updateCommunity} />}</>);
}

export default CommunityDetailsContainer;