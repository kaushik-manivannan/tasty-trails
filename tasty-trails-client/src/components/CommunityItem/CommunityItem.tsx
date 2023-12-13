import React, { useState } from "react";
import { CommunityItemProps } from "../../interfaces/community-interfaces";
import styles from './CommunityItem.module.scss';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Default image URL for community
const defaultImageUrl = `${process.env.PUBLIC_URL}/assets/communities-default.svg`;

const CommunityItem: React.FC<CommunityItemProps> = ({ community, toggleJoin, viewDetails }) => {
    const imageUrl: string = community.image || defaultImageUrl; // Use the community image or the default one
    const userId = useSelector((state: any) => state.auth.userId);
    const [isProcessing, setProcessing] = useState(false);
    const isJoined: boolean = community.members.includes(userId);

    // Function to handle join/leave button click
    const toggleJoinOnClick = async () => {
        setProcessing(true);
        try {
            // Call the toggleJoin function (joining or leaving the community)
            await toggleJoin();
        } catch (error) {
            console.error('Error toggling join:', error);
        } finally {
            setProcessing(false);
        }
    }

    // Determine the text to display on the join/leave button
    let buttonText: string = isJoined ? "Leave" : "Join";

    // Get translation function for i18n
    const { t } = useTranslation();

    return (
        <article className={styles.communityItem}>
            <div className={styles.communityImage}>
                <img src={imageUrl} alt={community.communityName} />
            </div>
            <div className={styles.communityDetails}>
                <h3 className={styles.communityName}>{community.communityName}</h3>
                <p className={styles.communityDescription}>{community.description}</p>
                <p className={styles.communityMembers}>
                    {/* Display the number of members in the community */}
                    {community.members.length <= 1 ? community.members.length + " member" : community.members.length + " members"}
                </p>
            </div>
            <div>
                {/* Join/Leave button */}
                <button onClick={toggleJoinOnClick} className={styles.joinButton} disabled={isProcessing}>
                    {/* Display loading spinner if processing */}
                    {isProcessing ? <span className={styles.spinner}>&#x21AA;</span> : buttonText}
                </button>
                {isJoined && (
                    // View community details button (visible only if joined)
                    <button onClick={() => { viewDetails(community._id) }} className={styles.viewCommunityButton}>
                        {t('View')}
                    </button>
                )}
            </div>
        </article>
    );
}

export default CommunityItem;