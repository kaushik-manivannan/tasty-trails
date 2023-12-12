import React, { useEffect, useState } from 'react';
import { PostItemProps } from '../../interfaces/post-interfaces';
import styles from './PostItem.module.scss';
import TimeAgo from 'react-timeago';

import { useNavigate } from'react-router-dom';
const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const navigate = useNavigate();
  const latitude = post.latitude;
  const longitude = post.longitude;
  const isValidLocation = latitude!==0 && longitude!=0;
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const [date, setDate] = useState(new Date(post.createdAt));

  const handleOnClick = () => {
    navigate(`/posts/${post._id}`);
  }

  useEffect(() => {
    const interval = setInterval(() => setDate(date), 60000);
    return () => clearInterval(interval);
  }, []);


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
    </div>
  );
};

export default PostItem;