import React, { useEffect, useState } from 'react';
import { PostItemProps } from '../../interfaces/post-interfaces';
import styles from './PostItem.module.scss';
import TimeAgo from 'react-timeago';
import { useNavigate } from 'react-router-dom';

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  // Initializing the navigation hook
  const navigate = useNavigate();

  // Extracting latitude and longitude from the post object
  const latitude = post.latitude;
  const longitude = post.longitude;

  // Checking if the location is valid
  const isValidLocation = latitude !== 0 && longitude !== 0;

  // Constructing the Google Maps URL for the location
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  // State for handling the date of the post
  const [date, setDate] = useState(new Date(post.createdAt));

  // Handling the click event to navigate to the individual post page
  const handleOnClick = () => {
    navigate(`/posts/${post._id}`);
  }

  // Setting up an interval to update the date every minute
  useEffect(() => {
    const interval = setInterval(() => setDate(date), 60000);
    // Clearing the interval on component unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, []);

  return (
    <article className={styles.cardLink} onClick={handleOnClick}>
      <div className={styles.card}>
        {/* Displaying the post image */}
        <img src={post.image} className={styles.image} />
        <div className={styles.content}>
          {/* Displaying the post description */}
          <h3 className={styles.heading}>{post.description}</h3>
          <div className={styles.locationAndDate}>
            <div className={styles.location}>
              {/* Displaying the location icon */}
              <img src={`${process.env.PUBLIC_URL}/assets/location.svg`} alt="Location" className={styles.locationIcon} />
              {isValidLocation ? (
                // If the location is valid, display a link to Google Maps
                <a
                  onClick={(event) => {
                    event.stopPropagation();
                    window.open(mapUrl, '_blank');
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.locationLink}>
                  <p className={styles.locationText}>{post.location}</p>
                </a>
              ) : (
                // If the location is not valid, display the location text
                <p className={styles.locationText}>{post.location}</p>
              )}
            </div>
            {/* Displaying the elapsed time of post creation using the TimeAgo component */}
            <TimeAgo
              date={date}
              minPeriod={60}
              className={styles.date}
              formatter={(value, unit) => {
                // Customizing the elapsed time format
                if (value === 1) {
                  return `${value} ${unit} ago`;
                } else {
                  return `${value} ${unit}s ago`;
                }
              }} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostItem;