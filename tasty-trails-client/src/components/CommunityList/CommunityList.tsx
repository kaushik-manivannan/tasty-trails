import React from 'react';
import { CommunityListProps } from '../../interfaces/community-interfaces.tsx';
import  CommunityItemContainer  from '../../containers/CommunityItemContainer.tsx';
import styles from './CommunityList.module.scss';
import { Link } from 'react-router-dom';
/**
 * 
 * This component is responsible for displaying all communities fetch from the database
 * @param communities List of communities
 * @returns 
 */
const CommunityList : React.FC<CommunityListProps> = ({communities}) => {

    // Check if the communities array is empty
    const isEmpty = communities.length === 0;

    return (
        <div className={styles.parentContainer}>
            <div className={styles.communityListWithHeading}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.heading}>Discover Communities</h1>
                    {/*  Link to redirect for creating a new community*/}
                    <Link to="/new-community" className={styles.createButton}>
                        Create Community
                    </Link>
                </div>
                <div className={styles.communityListContainer}>
                    {isEmpty ? (
                        <p className={styles.noCommunities}>No Communities Found!</p>
                    ) : (
                    <ul className={styles.communityList}>
                        {communities.map((community, idx) => (
                            <li className={styles.communityItem} key={`community-${idx + 1}`}>
                                <CommunityItemContainer community={community} />
                            </li>
                        ))}
                    </ul>
                )}
                </div>
            </div>
        </div>
    );
}

export default CommunityList;