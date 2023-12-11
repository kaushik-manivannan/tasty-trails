import React ,{useState} from "react";
import PostList from '../PostList/PostList';
import {CommunityDetailsProps} from '../../interfaces/community-interfaces';
import styles from './CommunityDetails.module.scss';

const CommunityDetails:React.FC<CommunityDetailsProps> = ({community,postList,isEditable})=>{
    const [editedCommunityName, setEditedCommunityName] = useState(community.communityName);
    const [editedCommunityDescription, setEditedCommunityDescription] = useState(community.description);
    const handleCommunityNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedCommunityName(event.target.value);
    };

    const handleCommunityDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedCommunityDescription(event.target.value);
    };
    return(
        <div className={styles.parentContainer}>
            <div className={styles.communityDetailsContainer}>
                <h2 className={styles.communityDetailsHeading}>Community Details</h2>
                {isEditable ? (
                <div className={styles.inputContainer}>
                    <label htmlFor="communityName" className={styles.inputLabel}>Community Name</label>
                    <input id="communityName" type="text" value={editedCommunityName} onChange={handleCommunityNameChange} className={styles.input}/>
                   
                </div>
                ) : (
                <div className={styles.inputContainer}>
                    <strong>Community Name:</strong> {editedCommunityName}
                </div>
                )}

                {isEditable ? (
                <div className={styles.inputContainer}>
                    <label htmlFor="communityDescription" className={styles.inputLabel}>Community Description</label>
                    <input id="communityDescription" type="text" value={editedCommunityDescription} onChange={handleCommunityDescriptionChange} className={styles.input}/>
                </div>
                ) : (
                <div className={styles.inputContainer}>
                    <strong>Community Description:</strong> {editedCommunityDescription}
                </div>
                )}
                <div className={styles.inputContainer}>
                    <strong className={styles.inputLabel}>Community Members</strong>
                    <p className={styles.memberCount}>{community?community.members.length:""}</p>
                </div>

                {isEditable && (
                    <div>
                        <button className={styles.updateButton}>Update</button>
                    </div>
                )}
            </div>
            <div className={styles.postListContainer}>
                <h2 className={styles.heading}>{`${community.communityName} Posts`}</h2>
                <PostList posts={postList} />
            </div>
        </div>
    )
}
export default CommunityDetails;