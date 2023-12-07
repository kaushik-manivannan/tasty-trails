import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faImage, faSmile, faTimes } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react';
import './NewComment.css';
import { TiAttachment } from "react-icons/ti";
const userDefault = `${process.env.PUBLIC_URL}/assets/user.png`;

interface NewCommentProps {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  commentChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addCommentHandler: () => void;
  handleEmojiClick: (event: any, emojiObject: any) => void;
  toggleEmojiPicker: () => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
  emojiPickerVisible: boolean;
  selectedImage: string;
  userImage?: string; 
}

const NewComment: React.FC<NewCommentProps> = ({ 
  comment, 
  setComment, 
  commentChangeHandler, 
  addCommentHandler, 
  handleAddComment, 
  handleEmojiClick, 
  toggleEmojiPicker, 
  handleImageUpload ,
  handleRemoveImage,
  emojiPickerVisible, 
  selectedImage, 
  userImage = userDefault,
}) => {
  const isSubmitDisabled = comment.trim() === '';
  
  return (
    <form onSubmit={addCommentHandler} className="new-comment-container">
    <div className="user-image-container">
        <img src={userImage} alt="" className="user-image" />
      </div>
    <div className="new-comment-container-input">
      <div className="new-comment-input-container">
        <input
          type='text'
          value={comment}
          onChange={commentChangeHandler}
          placeholder="Enter your Comments"
          className="new-comment-input"
        />
        {selectedImage && (
          <div className="new-comment-attachment-container">
          <TiAttachment className='new-comment-attachment' />
          <span className="new-comment-attachment-word">Attached</span>
          <FontAwesomeIcon 
            icon={faTimes} 
            className="remove-attachment" 
            onClick={handleRemoveImage} />
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
              accept=".jpg, .jpeg, .png"
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
          <button type="submit" disabled={isSubmitDisabled} className="new-comment-button">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
        {emojiPickerVisible && (
          <EmojiPicker onEmojiClick={handleEmojiClick} pickerStyle={{ position: 'absolute', bottom: '60px' }} />
        )}
      </div>
    </div>
    </form>
  );
};

export default NewComment;
