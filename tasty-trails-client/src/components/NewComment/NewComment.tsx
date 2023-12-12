import React from 'react';
import styles from './NewComment.module.scss';
import { NewCommentProps } from '../../interfaces/newComment-interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faImage, faSmile, faTimes } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react';
import './NewComment.css';
import { TiAttachment } from "react-icons/ti";
const userDefault = `${process.env.PUBLIC_URL}/assets/user.png`;

const NewComment: React.FC<NewCommentProps> = ({ 
  comment, 
  commentChangeHandler,  
  handleAddComment, 
  handleEmojiClick, 
  toggleEmojiPicker, 
  handleImageUpload ,
  handleRemoveImage,
  emojiPickerVisible, 
  selectedImage, 
  userImage = userDefault,
}) => {
  const isSubmitDisabled = comment.trim() === '' && !selectedImage;
  
  return (
    <form onSubmit={handleAddComment} className={styles.newCommentContainer}>
    <div className={styles.userImageContainer}>
        <img src={userDefault} alt="" className={styles.userImage} />
      </div>
    <div className={styles.newCommentContainerInput}>
      <div className={styles.newCommentInputContainer}>
        <input
          type='text'
          value={comment}
          onChange={commentChangeHandler}
          placeholder="Enter your Comments"
          className={styles.newCommentInput}
        />
        {selectedImage && (
          <div className={styles.newCommentAttachmentContainer}>
          <TiAttachment className={styles.newCommentAttachment} />
          <span className={styles.newCommentAttachmentWord}>Attached</span>
          <FontAwesomeIcon 
            icon={faTimes} 
            className={styles.removeAttachment}
            onClick={handleRemoveImage} />
          </div>
        )}

        <div className={styles.newCommentButtonsContainer}>
          <label className={styles.newCommentButton} htmlFor="imageUpload">
            <FontAwesomeIcon icon={faImage} />
            <input
              type="file"
              id="imageUpload"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
              accept=".jpg, .jpeg, .png"
            />
          </label>
          
          <div className={styles.newCommentButton} onClick={toggleEmojiPicker}>
            {emojiPickerVisible ? (
              <FontAwesomeIcon icon={faSmile} className={styles.emojiPickerIcon}/>
            ) : (
              <FontAwesomeIcon icon={faSmile} />
            )}
          </div>
          <div style={{ flex: '1' }} />
          <button type="submit" disabled={isSubmitDisabled} className={styles.newCommentButton} >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
        {emojiPickerVisible && (
          <EmojiPicker onEmojiClick={handleEmojiClick}/>
        )}
      </div>
    </div>
    </form>
  );
};

export default NewComment;
