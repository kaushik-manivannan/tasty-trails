import React from "react";
import { CommunityItemProps } from "../interfaces/community-interfaces";
const CommunityItem:React.FC<CommunityItemProps> = ({community}) => {
    return(
    <div>
        <h3>{community.communityName}</h3>
        <p>{community.description}</p>
        {(community.image!=="")&&<img src={community.image} alt={community.communityName}/>}

    </div>);
}
export default CommunityItem;