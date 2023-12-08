import React from 'react';
import { CommunityListProps } from '../../interfaces/community-interfaces.tsx';
import  CommunityItemContainer  from '../../containers/CommunityItemContainer.tsx';
import styles from './CommunityList.module.scss';

const CommunityList : React.FC<CommunityListProps> = ({communities}) => {
    return (
        <>
        <h1>DISCOVER COMMUNITIES</h1>
        <div className={styles.communityListContainer}>
            <ul className={styles.communityList}>
                {communities.map((community, idx) => (
                    <li className={styles.communityItem} key={`community-${idx + 1}`}>
                        <CommunityItemContainer community={community} />
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
}

export default CommunityList;