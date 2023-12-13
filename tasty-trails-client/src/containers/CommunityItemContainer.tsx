import React,{ useState} from "react";
import {  CommunityItemContainerProps } from "../interfaces/community-interfaces.tsx";
import CommunityItem from "../components/CommunityItem/CommunityItem.tsx";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {updateCommunityById} from "../api/index.js";
/**
 * This component is responsible for displaying the details of a community
 * @param community community object to render 
 * @returns 
 */
const CommunityItemContainer:React.FC<CommunityItemContainerProps> = ({community}) => {
    const navigate = useNavigate();
    const [communityState, setCommunity] = useState(community);
    const userId = useSelector((state:any) => state.auth.userId);
    const isJoined:boolean = communityState.members.includes(userId);
    var payload ={
    ...communityState
    }
    // function to view the details of the community. we achive this by navigating to the community details page
    const viewDetails= () => {
        navigate(`/communities/${community._id}`);
    }

    // function to toggle the join status of the community
    const toggleJoin = async () => {
        if(isJoined) {
            payload.members = payload.members.filter((member) => member!== userId);
        }else {
            payload.members.push(userId);
        }
        try{
            const response = await updateCommunityById(community._id, payload);
            if(response.status !==200){
                throw new Error('Error updating community');
            }
            setCommunity(response.data);
        }catch(error){
            throw new Error('Error updating community');

        }
    }
    
    return(
        <CommunityItem community={communityState} toggleJoin = {toggleJoin} viewDetails={viewDetails}/>
    );
}

export default CommunityItemContainer;