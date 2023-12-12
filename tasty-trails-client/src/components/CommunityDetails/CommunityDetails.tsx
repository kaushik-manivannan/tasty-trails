import React ,{useState,useEffect} from "react";
import PostList from '../PostList/PostList';
import {CommunityDetailsProps} from '../../interfaces/community-interfaces';
import styles from './CommunityDetails.module.scss';

const CommunityDetails:React.FC<CommunityDetailsProps> = ({community,postList,isEditable,updateCommunityById})=>{
    const [editedCommunityName, setEditedCommunityName] = useState(community.communityName);
    const [editedCommunityDescription, setEditedCommunityDescription] = useState(community.description);
    const [updateMessage, setUpdateMessage] = useState("");
    const [isEditClicked, setIsEditClicked] = useState(false);
    const handleCommunityNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedCommunityName(event.target.value);
    };

    const handleCommunityDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedCommunityDescription(event.target.value);
    };
    const updateCommunity = async ()=>{
        setIsEditClicked(true);
        if( editedCommunityName.trim().length === 0|| editedCommunityDescription.trim().length === 0 || (editedCommunityName==community.communityName&&editedCommunityDescription==community.description)){
            setIsEditClicked(false);
            return;
        }
        const updatedCommunity = {
            communityName:editedCommunityName,
            description:editedCommunityDescription
        }
        try{
            await updateCommunityById(updatedCommunity);
            setUpdateMessage("Community updated successfully!");
            setIsEditClicked(false);
        }catch(error){
            setUpdateMessage("Community updated successfully!");
        }
    }
    const edit =()=>{
        setIsEditClicked(true);
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
    return(
        <div className={styles.parentContainer}>
            <div className={styles.communityDetailsContainer}>
                <h2 className={styles.communityDetailsHeading}>Community Details</h2>
                {updateMessage && (
                    <div className={styles.updateMessage}>
                        {updateMessage}
                    </div>
                )}
                {(isEditable&& isEditClicked)?(<>
                <div className={styles.inputContainer}>
                    <label htmlFor="communityName" className={styles.inputLabel}>Community Name</label>
                    <input id="communityName" type="text" value={editedCommunityName} onChange={handleCommunityNameChange} className={styles.input}/>   
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="communityDescription" className={styles.inputLabel}>Community Description</label>
                    <input id="communityDescription" type="text" value={editedCommunityDescription} onChange={handleCommunityDescriptionChange} className={styles.input}/>
                </div>
                </>
                ):(<>
                <div className={styles.inputContainer}>
                    <strong className={styles.inputLabel}>Community Name</strong> {editedCommunityName}
                </div>
                <div className={styles.inputContainer}>
                    <strong className={styles.inputLabel}>Community Description</strong> {editedCommunityDescription}
                </div>
                </>
                )}
                <div className={styles.inputContainer}>
                    <strong className={styles.inputLabel}>Community Members</strong>
                    <p className={styles.memberCount}>{community?community.members.length:""}</p>
                </div>
                {isEditable && (
                    isEditClicked ? (
                        <div>
                            <button className={styles.updateButton} onClick={updateCommunity}>Update</button>
                        </div>
                    ) : (
                        <div>
                            <button className={styles.updateButton} onClick={edit}>Edit</button>
                        </div>
                    )
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