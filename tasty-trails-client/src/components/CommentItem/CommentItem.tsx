import React from 'react';
import { CommentItemProps } from '../../interfaces/comment-interfaces';
import styles from './CommentItem.module.scss';
import { useTranslation } from 'react-i18next';

// Default user image URL
const userDefault = `${process.env.PUBLIC_URL}/assets/user.png`;

// CommentItem component
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
  const { t } = useTranslation();
  return (
    <div className={styles.commentItemContainer}>
      <div className={styles.userImageContainer}>
        <img src={commentValue.userImage? commentValue.userImage : userDefault}
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
    <button className={styles.saveEditedComment} onClick={handleSaveEdit}>{t('Save')}</button>
    <button onClick={handleCancelEdit}>{t('Cancel')}</button>
    </div>
    ) : (
    <>
    <div className={styles.usernameWithComment}>
      <div className={styles.commentHeader}>
        <p className={styles.userName}>{commentValue.userName}</p>
      </div>
      {editedComment && (
      <p className={styles.commentText}>{editedComment}</p>
      )}
    </div>
    {showOptions && (
      <div className={styles.optionsIndicator} onClick={toggleOptions}>
        <button onClick={modifyHandler}>...</button>
      </div>
    )}
    {showDelete && (
      <div className={styles.optionsDropdown}>
        <button className={styles.editCommentItem} onClick={handleEdit}>{t('Edit')}</button>
        <button onClick={onDelete}>{t('Delete')}</button>
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

// Export the CommentItem component
export default CommentItem;
