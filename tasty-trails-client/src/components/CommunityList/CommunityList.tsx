import React from 'react';
import { CommunityListProps } from '../../interfaces/community-interfaces.tsx';
import  CommunityItemContainer  from '../../containers/CommunityItemContainer.tsx';
import styles from './CommunityList.module.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CommunityList : React.FC<CommunityListProps> = ({communities}) => {

    // Check if the communities array is empty
    const isEmpty = communities.length === 0;
    const { t } = useTranslation();
    return (
        <div className={styles.parentContainer}>
            <div className={styles.communityListWithHeading}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.heading}>{t('Discover Communities')}</h1>
                    <Link to="/new-community" className={styles.createButton}>
                        Create Community
                    </Link>
                </div>
                <div className={styles.communityListContainer}>
                    {isEmpty ? (
                        <p className={styles.noCommunities}>{t('No Communities Found!')}</p>
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