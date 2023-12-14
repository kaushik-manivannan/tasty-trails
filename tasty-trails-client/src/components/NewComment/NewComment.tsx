import React from 'react';
import styles from './NewComment.module.scss';
import { NewCommentProps } from '../../interfaces/newComment-interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faImage, faSmile, faTimes } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react';
import { TiAttachment } from "react-icons/ti";
import { useTranslation } from 'react-i18next';

// Default user image URL
const userDefault = `${process.env.PUBLIC_URL}/assets/user.png`;

const NewComment: React.FC<NewCommentProps> = ({
  comment,
  commentChangeHandler,
  handleAddComment,
  handleEmojiClick,
  toggleEmojiPicker,
  handleImageUpload,
  handleRemoveImage,
  emojiPickerVisible,
  selectedImage,
  userImage
}) => {
  // Check if the submit button should be disabled
  const isSubmitDisabled = comment.trim() === '' && !selectedImage;
  const { t } = useTranslation();

  return (
    <form onSubmit={handleAddComment} className={styles.newCommentContainer}>
      {/* Container for the user's image */}
      <div className={styles.userImageContainer}>
        <img src={userImage ? userImage : userDefault} alt="" className={styles.userImage} />
      </div>

      {/* Container for the new comment input */}
      <div className={styles.newCommentContainerInput}>
        <div className={styles.newCommentInputContainer}>
          {/* Input for typing the comment */}
          <input
            type='text'
            value={comment}
            onChange={commentChangeHandler}
            placeholder={t("Enter your Comments")}
            className={styles.newCommentInput}
          />

          {/* Display attached image and remove button if an image is selected */}
          {selectedImage && (
            <div className={styles.newCommentAttachmentContainer}>
              <TiAttachment className={styles.newCommentAttachment} />
              <span className={styles.newCommentAttachmentWord}>{t('Attached')}</span>
              <FontAwesomeIcon
                icon={faTimes}
                className={styles.removeAttachment}
                onClick={handleRemoveImage}
              />
            </div>
          )}

          {/* Container for buttons (Attach Image, Emoji Picker, Submit) */}
          <div className={styles.newCommentButtonsContainer}>
            {/* Attach Image Button */}
            <label className={styles.newCommentButton} htmlFor="imageUpload">
              <FontAwesomeIcon icon={faImage} />
              {/* Input for file upload */}
              <input
                type="file"
                id="imageUpload"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
                accept=".jpg, .jpeg, .png"
              />
            </label>

            {/* Emoji Picker Button */}
            <div className={styles.newCommentButton} onClick={toggleEmojiPicker}>
              {/* Show emoji picker icon or highlighted icon when the picker is visible */}
              {emojiPickerVisible ? (
                <FontAwesomeIcon icon={faSmile} className={styles.emojiPickerIcon} />
              ) : (
                <FontAwesomeIcon icon={faSmile} />
              )}
            </div>

            {/* Spacer */}
            <div style={{ flex: '1' }} />

            {/* Submit Button */}
            <button type="submit" disabled={isSubmitDisabled} className={styles.newCommentButton}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>

          {/* Display Emoji Picker when visible */}
          {emojiPickerVisible && <EmojiPicker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
    </form>
  );
};

export default NewComment;