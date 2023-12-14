import React, { useState, useEffect } from 'react';
import { PostDetailsProps } from '../../interfaces/post-interfaces';
import styles from './PostDetails.module.scss';
import { useNavigate } from 'react-router-dom';
import ModifyPostFormContainer from '../../containers/ModifyPostFormContainer.tsx';
import CommentListContainer from '../../containers/CommentListContainer';
import TimeAgo from 'react-timeago';

// Functional component for displaying post details
const PostDetails: React.FC<PostDetailsProps> = ({ post, onDelete, canModify,setPost }) => {
  // State to track whether the post is in edit mode
  const [isOnEdit, setIsOnEdit] = useState(false);

  // Extracting latitude and longitude from the post
  const latitude = post.latitude;
  const longitude = post.longitude;

  // Checking if the location is valid
  const isValidLocation = latitude !== 0 && longitude !== 0;

  // Generating Google Maps URL based on latitude and longitude
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  // State for tracking the post creation date
  const [date, setDate] = useState(new Date(post.createdAt));

  // React Router's navigation hook
  const navigate = useNavigate();

  // Effect to update the date every minute
  useEffect(() => {
    const interval = setInterval(() => setDate(date), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.postDetails}>
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        <img src={`${process.env.PUBLIC_URL}/assets/back-arrow.svg`} alt="Back Button" />
      </button>

      {/* Conditional Rendering: Displaying post details or edit form */}
      {!isOnEdit ? (
        <>
          <div className={styles.card}>
            {/* Modify Post Buttons (if user can modify the post) */}
            {canModify && (
              <div className={styles.modifyPostButtons}>
                {/* Edit Button */}
                <button onClick={() => setIsOnEdit(true)}>
                  <img src={`${process.env.PUBLIC_URL}/assets/edit.svg`} alt="Edit" className={styles.editButton} />
                </button>
                {/* Delete Button */}
                <button onClick={() => onDelete()}>
                  <img src={`${process.env.PUBLIC_URL}/assets/delete.svg`} alt="Delete" className={styles.deleteButton} />
                </button>
              </div>
            )}

            {/* Post Image */}
            <img src={post.image} className={styles.image} />

            {/* Post Content */}
            <div className={styles.content}>
              <h3 className={styles.heading}>{post.description}</h3>
              <div className={styles.locationAndDate}>
                {/* Location Information */}
                <div className={styles.location}>
                  <img src={`${process.env.PUBLIC_URL}/assets/location.svg`} alt="Location" className={styles.locationIcon} />
                  {isValidLocation ? (
                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.locationLink}>
                      <p className={styles.locationText}>{post.location}</p>
                    </a>
                  ) : (
                    <p className={styles.locationText}>{post.location}</p>
                  )}
                </div>

                {/* Post Date */}
                <TimeAgo
                  date={date}
                  minPeriod={60}
                  className={styles.date}
                  formatter={(value, unit) => {
                    if (value === 1) {
                      return `${value} ${unit} ago`;
                    } else {
                      return `${value} ${unit}s ago`;
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Comment Section */}
          <div className={styles.commentSection}>
            <CommentListContainer />
          </div>
        </>
      ) : (
        <>
          {/* Displaying ModifyPostFormContainer when in edit mode */}
          <ModifyPostFormContainer setIsOnEdit={(isOnEdit: boolean) => setIsOnEdit(isOnEdit)} post={post} setPost={setPost}/>
        </>
      )}
    </section>
  );
};

export default PostDetails;