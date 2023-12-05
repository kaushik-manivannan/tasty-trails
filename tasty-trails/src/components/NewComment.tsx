import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faImage, faSmile } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react';
import './NewComment.css';



const NewComment = ({ comment, setComment, commentChangeHandler, addCommentHandler }) => {
    const isSubmitDisabled = comment.trim() === '';
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState('');
    
      const handleEmojiClick = (event, emojiObject) => {
        const emoji  = event.emoji;
        const updatedComment = comment + emoji;
        setSelectedEmoji(emoji);
        setComment(updatedComment);
        setEmojiPickerVisible(false);
      };
    
      const toggleEmojiPicker = () => {
        setEmojiPickerVisible(!emojiPickerVisible);
      };

      const handleAddComment = () => {
        const commentWithEmoji = `${comment} ${selectedEmoji}`;
        addCommentHandler(commentWithEmoji);
        setSelectedEmoji('');
      };

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
            <div className="new-comment-buttons-container">
            <button className="new-comment-button">
                <FontAwesomeIcon icon={faImage} />
              </button>
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
