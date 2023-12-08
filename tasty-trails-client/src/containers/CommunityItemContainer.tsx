import React,{ useState} from "react";
import {  CommunityItemContainerProps } from "../interfaces/community-interfaces.tsx";
import CommunityItem from "../components/CommunityItem/CommunityItem.tsx";
import { useSelector } from 'react-redux';



const CommunityItemContainer:React.FC<CommunityItemContainerProps> = ({community}) => {
    const [communityState, setCommunity] = useState(community);
    const userId = useSelector((state:any) => state.auth.userId);
    const isJoined:boolean = community.members.includes(userId);
    var payload ={
    ...community
    }
    const toggleJoin = () => {
        if(isJoined) {
            payload.members = payload.members.filter((member) => member!== userId);
        }else {
            payload.members.push(userId);
        }
        fetch(`http://localhost:8080/communities/${community._id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload) // Convert the payload into a JSON string
        }).then( response => response.json())
        .then((data) => {setCommunity(data)})
        .catch((error) =>console.log(error));
        }
    return(
        <CommunityItem community={communityState} toggleJoin = {()=>{toggleJoin()}} />
    );
}

export default CommunityItemContainer;