import React from 'react';
import { CommunityListProps } from '../../interfaces/community-interfaces.tsx';
import  CommunityItemContainer  from '../../containers/CommunityItemContainer.tsx';
import styles from './CommunityList.module.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * CommunityList component displays all communities fetched from the database.
 * 
 * @param {CommunityListProps} communities - List of communities.
 * @returns {React.FC} - React functional component.
 */
const CommunityList: React.FC<CommunityListProps> = ({ communities ,isLoading}) => {

    // Check if the communities array is empty
    const isEmpty = communities.length === 0;
    
    // Translation hook
    const { t } = useTranslation();

    return (
        <section className={styles.parentContainer}>
            <div className={styles.communityListWithHeading}>

                <div className={styles.titleContainer}>
                    {/* Heading and link to create a new community */}
                    <h1 className={styles.heading}>{t('Discover Communities')}</h1>
                    <Link to="/new-community" className={styles.createButton}>
                        {t('Create Community')}
                    </Link>
                </div>

                <div className={styles.communityListContainer}>
                    {/* Display communities or a message if empty */}
                    {isEmpty ? (
                        <p className={styles.noCommunities}>{isLoading?"Loading...":t('No Communities Found!')}</p>
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
        </section>
    );
}

export default CommunityList;