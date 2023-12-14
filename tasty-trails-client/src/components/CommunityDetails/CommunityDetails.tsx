import React, { useState, useEffect } from "react";
import PostList from '../PostList/PostList';
import { CommunityDetailsProps } from '../../interfaces/community-interfaces';
import styles from './CommunityDetails.module.scss';
import { useTranslation } from 'react-i18next';
import { Post } from "../../interfaces/post-interfaces";

const CommunityDetails: React.FC<CommunityDetailsProps> = ({ community, postList, isEditable, updateCommunityById }) => {
    const [editedCommunityName, setEditedCommunityName] = useState(community.communityName);
    const [editedCommunityDescription, setEditedCommunityDescription] = useState(community.description); 
    const [updateMessage, setUpdateMessage] = useState("");
    const [isEditClicked, setIsEditClicked] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    const handleCommunityNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedCommunityName(event.target.value);
    };

    const handleCommunityDescriptionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditedCommunityDescription(event.target.value);
    };

    //Function to update search query
    const onSearch = (query: string) => {
        setSearchQuery(query);
    };

    //Filtering posts based on search query 
    const filteredPosts = postList.filter((post: Post) =>
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    //Function to update the community
    const updateCommunity = async () => {
        setIsEditClicked(true);
        if ((editedCommunityName.trim().length === 0 || editedCommunityDescription.trim().length === 0 ||
            (editedCommunityName === community.communityName && editedCommunityDescription === community.description))) {
            setIsEditClicked(false);
            return;
        }
        const updatedCommunity = {
            communityName: editedCommunityName,
            description: editedCommunityDescription
        }
        try {
            await updateCommunityById(updatedCommunity);
            setIsEditClicked(false);
        } catch (error) {
            setUpdateMessage("Community update failed!");
        }
    }

    useEffect(() => {
        const clearUpdateMessage = () => {
            setUpdateMessage("");
        };

        // Attach event listener to clear update message on click
        document.addEventListener("click", clearUpdateMessage);

        // Cleanup the event listener when the component is unmounted
        return () => {
            document.removeEventListener("click", clearUpdateMessage);
        };
    }, []);

    // Get translation function for i18n
    const { t } = useTranslation();

    return (
        <section className={styles.parentContainer}>
            <article className={styles.communityDetailsContainer}>
                <h2 className={styles.communityDetailsHeading}>{t('Community Details')}</h2>
                {updateMessage && (
                    <div className={styles.updateMessage}>
                        {updateMessage}
                    </div>
                )}
                {(isEditable && isEditClicked) ? (<>
                    <div className={styles.inputContainer}>
                        {/* Div for community Name */}
                        <label
                            htmlFor="communityName"
                            className={styles.inputLabel}>
                            {t('Community Name')}
                        </label>
                        <input
                            id="communityName"
                            type="text"
                            value={editedCommunityName}
                            onChange={handleCommunityNameChange}
                            className={styles.input} />
                    </div>
                    <div className={styles.inputContainer}>
                        {/* Div for community Description */}
                        <label
                            htmlFor="communityDescription"
                            className={styles.inputLabel}>
                            {t('Community Description')}
                        </label>
                        <textarea
                            id="communityDescription"
                            value={editedCommunityDescription}
                            onChange={handleCommunityDescriptionChange}
                            className={styles.textarea} 
                            style = {{resize: "none"}}/>
                    </div>
                </>
                ) : (<>
                    <div className={styles.inputContainer}>
                        {/* This block is used when he is not the admin */}
                        <strong className={styles.inputLabel}>{t('Community Name')}</strong> {editedCommunityName}
                    </div>
                    <div className={styles.inputContainer}>
                        <strong className={styles.inputLabel}>{t('Community Description')}</strong> {editedCommunityDescription}
                    </div>
                </>
                )}
                <div className={styles.inputContainer}>
                    <strong className={styles.inputLabel}>{t('Community Members')}</strong>
                    <p className={styles.memberCount}>{community ? community.members.length : ""}</p>
                </div>
                {isEditable && (
                    isEditClicked ? (
                        <div>
                            <button
                                className={styles.updateButton}
                                onClick={updateCommunity}>{t('Update')}</button>
                        </div>
                    ) : (
                        <div>
                            <button
                                className={styles.updateButton}
                                onClick={() => { setIsEditClicked(true) }}>
                                {t('Edit')}
                            </button>
                        </div>
                    )
                )}
            </article>
            <section className={styles.postListContainer}>
                <h2 className={styles.heading}>{`${community.communityName} ${t('Posts')}`}</h2>
                <div className={styles.postList}>
                    <PostList posts={filteredPosts} onSearch={onSearch} />
                </div>
            </section>
        </section>
    )
}

export default CommunityDetails;