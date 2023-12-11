import React from 'react';
import { CommentItemProps } from '../../interfaces/comment-interfaces';
import styles from './CommentItem.module.scss';

const userDefault = `${process.env.PUBLIC_URL}/assets/user.png`;

const CommentItem: React.FC<CommentItemProps> = ({
  commentValue,
  showOptions,
  showDelete,
  isEditing,
  editedComment,
  toggleOptions,
  modifyHandler,
  handleEdit,
  handleCancelEdit,
  handleSaveEdit,
  onDelete,
  mouseEnterHandler,
  mouseLeaveHandler,
  editCommentHandler,

}) => {
  return (
    <div className={styles.commentItemContainer}>
      <div className={styles.userImageContainer}>
        <img src={userDefault}
              alt=""
              className={styles.userImage} />
      </div>
      <div className={styles.commentTextContainer}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
       >
      <div className={styles.commentContent}>
    
    {isEditing ? (
    <div>
      <textarea
        value={editedComment}
        onChange={editCommentHandler}
      />
    <button className={styles.saveEditedComment} onClick={handleSaveEdit}>Save</button>
    <button onClick={handleCancelEdit}>Cancel</button>
    </div>
    ) : (
    <>
    <div>
      <div className={styles.commentHeader}>
        <p className={styles.userName}>{commentValue.userName}</p>
      </div>
      <p className={styles.commentText}>{editedComment}</p>
    </div>
    {showOptions && (
      <div className={styles.optionsIndicator} onClick={toggleOptions}>
        <button onClick={modifyHandler}>...</button>
      </div>
    )}
    {showDelete && (
      <div className={styles.optionsDropdown}>
        <button className={styles.editCommentItem} onClick={handleEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    )}
  </>
  )}
    </div>
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
