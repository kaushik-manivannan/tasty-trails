import React ,{useState} from "react";
import PostList from '../PostList/PostList';
import {CommunityDetailsProps} from '../../interfaces/community-interfaces';
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
        <div>
            <div>
                <h1>Community Details</h1>
                {isEditable ? (
                <div>
                    <label>
                    Community Name:
                    <input type="text" value={editedCommunityName} onChange={handleCommunityNameChange} />
                    </label>
                </div>
                ) : (
                <div>
                    <strong>Community Name:</strong> {editedCommunityName}
                </div>
                )}

                {isEditable ? (
                <div>
                    <label>
                    Community Description:
                    <input type="text" value={editedCommunityDescription} onChange={handleCommunityDescriptionChange} />
                    </label>
                </div>
                ) : (
                <div>
                    <strong>Community Description:</strong> {editedCommunityDescription}
                </div>
                )}
                <div>
                    <strong>Community Members:</strong> {community?community.members.length:""}
                </div>

                {isEditable && (
                    <div>
                        <button>Update</button>
                    </div>
                )}
            </div>
            <div>
                <PostList posts={postList} />
            </div>
        </div>
    )
}
export default CommunityDetails;