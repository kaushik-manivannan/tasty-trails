import React,{useState} from 'react';
import { PostDetailsProps } from '../../interfaces/post-interfaces';
import styles from './PostDetails.module.scss';
import { useNavigate } from 'react-router-dom';
import ModifyPostFormContainer from '../../containers/ModifyPostFormContainer.tsx'
import CommentListContainer from '../../containers/CommentListContainer';

const PostDetails: React.FC<PostDetailsProps> = ({ post, onDelete, canModify }) => {
  const [isOnEdit, setIsOnEdit] = useState(false);
  const latitude = post.latitude;
  const longitude = post.longitude;
  const isValidLocation = latitude!==0 && longitude!=0;
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
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
        {!isOnEdit ? (<>
        <div className={styles.card}>
          { canModify && (
          <div>
            <button onClick={()=>{setIsOnEdit(true)}}>Edit</button>
            <button  onClick={()=>{onDelete()}} >Delete </button>
          </div>
          )}
            <img src={post.image} className={styles.image}/>
            <div className={styles.content}>
              <h3 className={styles.heading}>{post.description}</h3>
              <div className={styles.locationAndDate}>
                <div className={styles.location}>
                  <img src={`${process.env.PUBLIC_URL}/assets/location.svg`} alt="Location" className={styles.locationIcon}/>
                  {isValidLocation?
                  (<a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                      <p className={styles.locationText}>{post.location}</p>
                  </a>):(
                    <p className={styles.locationText}>{post.location}</p>
                    )}
                </div>
                <p className={styles.date}>{formattedDate}</p>
                </div>
            </div>
            </div>
        <div className={styles.commentSection}>
          <CommentListContainer />
        </div>
            </>
          ): (<>
              <ModifyPostFormContainer setIsOnEdit={(isOnEdit:boolean)=>setIsOnEdit(isOnEdit)} post={post}/>
          </>)}

      </div>
  );
};

export default PostDetails;