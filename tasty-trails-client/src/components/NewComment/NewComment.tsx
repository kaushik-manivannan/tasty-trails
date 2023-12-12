// Import React and required styles/icons
import React from 'react';
import styles from './NewComment.module.scss';
import { NewCommentProps } from '../../interfaces/newComment-interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faImage, faSmile, faTimes } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react';
import './NewComment.css';
import { TiAttachment } from "react-icons/ti";
import { useTranslation } from 'react-i18next';

// Default user image URL
const userDefault = `${process.env.PUBLIC_URL}/assets/user.png`;

// NewComment component
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
  userImage,
}) => {
  // Check if the submit button should be disabled
  const isSubmitDisabled = comment.trim() === '' && !selectedImage;
  const { t } = useTranslation();
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
          placeholder={t("Enter your Comments")}
          className={styles.newCommentInput}
        />
        {selectedImage && (
          <div className={styles.newCommentAttachmentContainer}>
          <TiAttachment className={styles.newCommentAttachment} />
          <span className={styles.newCommentAttachmentWord}>{t('Attached')}</span>
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
// Export the NewComment component
export default NewComment;
