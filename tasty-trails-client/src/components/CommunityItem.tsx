import React from "react";
import { CommunityItemProps } from "../interfaces/community-interfaces";

const defaultImageUrl = "../../public/images/communities-default.svg";
const CommunityItem:React.FC<CommunityItemProps> = ({community}) => {
    const imageUrl:string = community.image || defaultImageUrl; // Use the community image or the default one
    return(
        <div className="community-item">
            <div className="community-image">
                <img src={imageUrl} alt={community.communityName} />
            </div>
            <div className="community-details">
                <h3 className="community-name">{community.communityName}</h3>
                <p className="community-description">{community.description}</p>
                <p className="community-members">{community.members.length} members</p>
            </div>
        </div>
        );
}
export default CommunityItem;