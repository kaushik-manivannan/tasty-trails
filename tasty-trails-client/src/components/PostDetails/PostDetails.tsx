import React,{useEffect, useState} from 'react';
import { PostItemProps } from '../../interfaces/post-interfaces';
import styles from './PostDetails.module.scss';
import { useNavigate } from 'react-router-dom';
import ModifyPostFormContainer from '../../containers/ModifyPostFormContainer.tsx'
import CommentListContainer from '../../containers/CommentListContainer';
import TimeAgo from 'react-timeago';

const PostDetails: React.FC<PostItemProps> = ({ post, onDelete, canModify }) => {
  const [isOnEdit, setIsOnEdit] = useState(false);
  const latitude = post.latitude;
  const longitude = post.longitude;
  const isValidLocation = latitude!==0 && longitude!=0;
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const [date, setDate] = useState(new Date(post.createdAt));
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => setDate(date), 60000);
    return () => clearInterval(interval);
  }, []);

  return (

        <div className={styles.postDetails}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          <img src={`${process.env.PUBLIC_URL}/assets/back-arrow.svg`} alt="Back Button"/>
        </button>
        {!isOnEdit ? (<>
        <div className={styles.card}>
          { canModify && (
          <div className={styles.modifyPostButtons}>
            <button onClick={()=>{setIsOnEdit(true)}}>
              <img src={`${process.env.PUBLIC_URL}/assets/edit.svg`} alt="Edit" className={styles.editButton}/>
            </button>
            <button onClick={()=>{onDelete()}}>
              <img src={`${process.env.PUBLIC_URL}/assets/delete.svg`} alt="Delete" className={styles.deleteButton}/>
            </button>
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
                    rel="noopener noreferrer"
                    className={styles.locationLink}>
                      <p className={styles.locationText}>{post.location}</p>
                  </a>):(
                    <p className={styles.locationText}>{post.location}</p>
                    )}
                </div>
                <TimeAgo 
                  date={date} 
                  minPeriod={60} 
                  className={styles.date}
                  formatter={(value, unit) => {
                    if(value === 1) {
                      return `${value} ${unit} ago`;
                    } else {
                      return `${value} ${unit}s ago`;
                    }
                }}/>
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