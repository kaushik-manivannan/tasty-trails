import React , { useState } from 'react'; 
import { CommentItemProps } from '../../interfaces/comment-interfaces';
import styles from './CommentItem.module.scss';
import './CommentItem.css';

const userDefault = `${process.env.PUBLIC_URL}/assets/user.png`;

const CommentItem: React.FC<CommentItemProps & { onEdit: () => void; onDelete: () => void }> = ({ commentValue, onEdit, onDelete }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(commentValue.comment);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const modifyHandler = () => {
    setShowDelete(!showDelete);
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
  // Make API call to update the comment
  const updatedComment = {
    ...commentValue,
    comment: editedComment,
  };

  fetch(`http://localhost:8080/comments/${updatedComment._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedComment),
  })
    .then((response) => response.json())
    .then((data) => {
      // Assuming the response contains the updated comment
      // You may want to add error handling here
      onEdit(data);  // Pass the updated comment to the parent component
      setIsEditing(false);
    })
    .catch((error) => {
      console.error('Error updating comment:', error);
      // Handle error accordingly
    });
};


  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedComment(commentValue.comment); 
  };

  return (
    <div className={styles.commentItemContainer}>
    <div className={styles.userImageContainer}>
        <img src={userDefault} 
             alt="" 
             className={styles.userImage} />
      </div>
      <div className={styles.commentTextContainer}
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => { setShowOptions(false);
                              setShowDelete(false);
                            }}
      >
      <div className={styles.commentContent}>
      {isEditing ? (
        <div>
          <textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          />
          <button className={styles.saveEditedComment} onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <>
          <p className={styles.commentText}>{editedComment}</p>
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
