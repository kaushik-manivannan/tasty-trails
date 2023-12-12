import React from 'react';
import { PostItemProps } from '../../interfaces/post-interfaces';
import styles from './PostItem.module.scss';
import { useNavigate } from'react-router-dom';
const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const navigate = useNavigate();
  const latitude = post.latitude;
  const longitude = post.longitude;
  const isValidLocation = latitude!==0 && longitude!=0;
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const date = new Date(post.createdAt);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short', 
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  const formattedDate = date.toLocaleDateString('en-US', options);
  const handleOnClick = () => {
    navigate(`/posts/${post._id}`);
  };
  return (
    <div className={styles.cardLink} onClick={handleOnClick}>
      <div className={styles.card}>
        <img src={post.image} className={styles.image}/>
        <div className={styles.content}>
          <h3 className={styles.heading}>{post.description}</h3>
          <div className={styles.locationAndDate}>
            <div className={styles.location}>
              <img src={`${process.env.PUBLIC_URL}/assets/location.svg`} alt="Location" className={styles.locationIcon}/>
              {isValidLocation?
              (<a
                onClick = {(event) => {
                  event.stopPropagation();
                  window.open(mapUrl, '_blank');
                }}
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
    </div>
  );
};

export default PostItem;