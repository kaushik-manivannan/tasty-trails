import React,{useState} from "react";
import { CommunityItemProps } from "../../interfaces/community-interfaces";
import styles from './communityItem.module.scss';
import { useSelector } from 'react-redux';

/**
 * This component is called when you want to render the commynity item
 * 
 */
const defaultImageUrl = `${process.env.PUBLIC_URL}/assets/communities-default.svg`;
const CommunityItem:React.FC<CommunityItemProps> = ({community,toggleJoin,viewDetails}) => {
    const imageUrl:string = community.image || defaultImageUrl; // Use the community image or the default one
    const userId = useSelector((state:any) => state.auth.userId);
    const [isProcessing, setProcessing] = useState(false); // use the satte to disply the Loding while the community is joining/ login
    const isJoined:boolean = community.members.includes(userId);
    const toggleJoinOnClick = async()=>{
        setProcessing(true);
        try{
            await toggleJoin();
        }catch (error) {
            console.error('Error toggling join:', error);
        } finally {
            setProcessing(false);
        }
     }
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
                <p className={styles.communityMembers}>{community.members.length <= 1 ? community.members.length + " member" : community.members.length + " members"}</p>
            </div>
            <div>
                <button onClick={toggleJoinOnClick} className={styles.joinButton}  disabled={isProcessing}>{isProcessing ? <span className={styles.spinner}>&#x21AA;</span> : buttonText}</button>  
                {isJoined && <button onClick={()=>{viewDetails(community._id)}} className={styles.viewCommunityButton}>View Community</button>}  
            </div>
        </div>
        );
}
export default CommunityItem;