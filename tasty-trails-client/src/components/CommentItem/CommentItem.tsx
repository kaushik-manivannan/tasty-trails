import React from 'react'; 
import { CommentItemProps } from '../../interfaces/comment-interfaces';
import styles from './CommentItem.module.scss';
import './CommentItem.css';

const userDefault = `${process.env.PUBLIC_URL}/assets/user.png`;

const CommentItem: React.FC<CommentItemProps> = ({ commentValue }) => {
  return (
    <div className={styles.commentItemContainer}>
    <div className={styles.userImageContainer}>
        <img src={userDefault} 
             alt="" 
             className={styles.userImage} />
      </div>
      <div className={styles.commentTextContainer}>
      <p className={styles.commentText}>{commentValue.comment}</p>
      {commentValue.image && (
        <div className={styles.commentImageDisplay}>
        <img
          src={`data:image/png;base64,${commentValue.image}`}
          alt="Reload"
          style={{ maxWidth: '100px', maxHeight: '100px' }}
        />
        </div>
      )}

      </div>
    </div>
  );
};

export default CommentItem;
