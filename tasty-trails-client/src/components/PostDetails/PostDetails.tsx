import React from 'react';
import { PostItemProps } from '../../interfaces/post-interfaces';
import styles from './PostDetails.module.scss';

const PostDetails: React.FC<PostItemProps> = ({ post }) => {

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

  return (
      <div className={styles.card}>
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
      </div>
  );
};

export default PostDetails;