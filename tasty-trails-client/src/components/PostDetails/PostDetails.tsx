import React,{useState} from 'react';
import { PostItemProps } from '../../interfaces/post-interfaces';
import styles from './PostDetails.module.scss';
import { useNavigate } from 'react-router-dom';
import ModifyPostFormContainer from '../../containers/ModifyPostFormContainer.tsx'

const PostDetails: React.FC<PostItemProps> = ({ post, handleDelete, canModify }) => {
  const [isEditable, setIsEditable] = useState(false);
  const date = new Date(post.createdAt);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short', 
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  const formattedDate = date.toLocaleDateString('en-US', options);

  const navigate = useNavigate();
  return (

        <div className={styles.postDetails}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          <img src={`${process.env.PUBLIC_URL}/assets/back-arrow.svg`} alt="Back Button"/>
        </button>
        <div className={styles.card}>
          {canModify && (
          <div>
            <button onClick={()=>{setIsEditable(true)}}>Edit</button>
            <button >Delete</button>
          </div>
          )}
          {!isEditable ? (<>
            <img src={post.image} className={styles.image}/>
            <h3 className={styles.heading}>{post.description}</h3>
            <div className={styles.locationAndStatus}>
              <div className={styles.location}>
                <img src={`${process.env.PUBLIC_URL}/assets/location.svg`} alt="Location" className={styles.locationIcon}/>
                <p className={styles.locationText}>{post.location}</p>
              </div>
              <div className={styles.availabilityStatus}>
                <p>Status: {post.availabilityStatus}</p>
              </div>
            </div>
            <p className={styles.date}>Posted on: {formattedDate}</p>
            </>
          ): (<>
              <ModifyPostFormContainer setIsEditable={setIsEditable} post={post}/>
          </>)}
        </div>
      </div>
  );
};

export default PostDetails;