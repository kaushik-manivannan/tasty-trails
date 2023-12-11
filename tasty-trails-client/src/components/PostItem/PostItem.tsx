import React from 'react';
import { PostItemProps } from '../../interfaces/post-interfaces';
import { Link } from 'react-router-dom';
import styles from './PostItem.module.scss';

const PostItem: React.FC<PostItemProps> = ({ post }) => {

  const date = new Date(post.createdAt);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short', 
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  const formattedDate = date.toLocaleDateString('en-US', options);
  
  return (
    <Link to={`/posts/${post._id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <img src={post.image} className={styles.image}/>
        <div className={styles.content}>
          <h3 className={styles.heading}>{post.description}</h3>
          <div className={styles.locationAndDate}>
            <div className={styles.location}>
              <img src={`${process.env.PUBLIC_URL}/assets/location.svg`} alt="Location" className={styles.locationIcon}/>
              <p className={styles.locationText}>{post.location}</p>
            </div>
            <p className={styles.date}>{formattedDate}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostItem;