import React from "react";
import { CommunityItemProps } from "../../interfaces/community-interfaces";
import styles from './communityItem.module.scss';
import { useSelector } from 'react-redux';

const defaultImageUrl = `${process.env.PUBLIC_URL}/assets/communities-default.svg`;
const CommunityItem:React.FC<CommunityItemProps> = ({community}) => {
    const imageUrl:string = community.image || defaultImageUrl; // Use the community image or the default one
    const data = useSelector((state:any) => state.auth.userId);
    
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
        </div>
        );
}
export default CommunityItem;