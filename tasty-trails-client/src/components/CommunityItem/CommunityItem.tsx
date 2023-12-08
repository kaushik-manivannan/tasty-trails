import React from "react";
import { CommunityItemProps } from "../../interfaces/community-interfaces";
import styles from './communityItem.module.scss';
import { useSelector } from 'react-redux';

const defaultImageUrl = `${process.env.PUBLIC_URL}/assets/communities-default.svg`;
const CommunityItem:React.FC<CommunityItemProps> = ({community}) => {
    const imageUrl:string = community.image || defaultImageUrl; // Use the community image or the default one
    const data = useSelector((state:any) => state.auth.userId);
    
    return(
        
        );
}
export default CommunityItem;