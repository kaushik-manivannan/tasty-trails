import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faImage, faSmile } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react';
import './NewComment.css';
import { TiAttachment } from "react-icons/ti";

const NewComment = ({ comment, setComment, commentChangeHandler, addCommentHandler, handleAddComment, handleEmojiClick, toggleEmojiPicker, handleImageUpload ,emojiPickerVisible, selectedImage}) => {
  const isSubmitDisabled = comment.trim() === '';
  
  return (
    <div className="new-comment-container">
      <div className="new-comment-input-container">
        <input
          type='text'
          value={comment}
          onChange={commentChangeHandler}
          placeholder="Enter your Comments"
          className="new-comment-input"
        />
        {selectedImage && (
          <div>
          <TiAttachment className='new-comment-attachment' />
          <span className="new-comment-attachment-word">Attached</span>
          </div>
        )}

        <div className="new-comment-buttons-container">
          <label className="new-comment-button" htmlFor="imageUpload">
            <FontAwesomeIcon icon={faImage} />
            <input
              type="file"
              id="imageUpload"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
          </label>
          
          <button className="new-comment-button" onClick={toggleEmojiPicker}>
            {emojiPickerVisible ? (
              <FontAwesomeIcon icon={faSmile} className="emoji-picker-icon" />
            ) : (
              <FontAwesomeIcon icon={faSmile} />
            )}
          </button>
          <div style={{ flex: '1' }} />
          <button onClick={handleAddComment} disabled={isSubmitDisabled} className="new-comment-button">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
        {emojiPickerVisible && (
          <EmojiPicker onEmojiClick={handleEmojiClick} pickerStyle={{ position: 'absolute', bottom: '60px' }} />
        )}
      </div>
    </div>
  );
};

export default NewComment;
