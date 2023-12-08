import React from "react";
import { CommunityItemProps } from "../../interfaces/community-interfaces";
import styles from './communityItem.module.scss';
import { useSelector } from 'react-redux';

const defaultImageUrl = `${process.env.PUBLIC_URL}/assets/communities-default.svg`;
const CommunityItem:React.FC<CommunityItemProps> = ({community,toggleJoin}) => {
    const imageUrl:string = community.image || defaultImageUrl; // Use the community image or the default one
    const userId = useSelector((state:any) => state.auth.userId);
    const isJoined:boolean = community.members.includes(userId);
    let buttonText:string = "";
    if (isJoined) {
        buttonText = "Leave";
    }else {
        buttonText = "Join";
    }
    return(
        <div className={styles.communityItem}>
            <div className={styles.communityImage}>
                <img src={imageUrl} alt={community.communityName} />
            </div>
            <div className={styles.communityDetails}>
                <h3 className={styles.communityName}>{community.communityName}</h3>
                <p className={styles.communityDescription}>{community.description}</p>
                <p className={styles.communityMembers}>{community.members.length} members</p>
            </div>
            <div>
                <button onClick={()=>{toggleJoin(community._id)}}>{buttonText}</button>    
            </div>
        </div>
        );
}
export default CommunityItem;