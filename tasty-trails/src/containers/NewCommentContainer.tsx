import React, { useState } from 'react';
import NewComment from '../components/NewComment.tsx';
import '../components/NewComment.css';

const NewCommentContainer = ({ userId, postId, addComment}) => {
    const [comment, setComment] = useState('');
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const dateTime = new Date().toISOString();

    const commentChangeHandler = (e) => {
        setComment(e.target.value);
    };
    const handleAddComment = () => {
        const commentWithEmoji = `${comment}`;
        addCommentHandler(commentWithEmoji, selectedImage);
        setSelectedImage(null);
      };

      const toggleEmojiPicker = () => {
        setEmojiPickerVisible(!emojiPickerVisible);
      };
    
      const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
      };

      const handleEmojiClick = (event, emojiObject) => {
        const emoji = event.emoji;
        setComment(prevComment => prevComment + emoji);
        setEmojiPickerVisible(false);
      };

    const addCommentHandler = (commentWithEmoji,selectedImage) => {
        const newComment = {
            userId,
            postId,
            comment: commentWithEmoji,
            dateTime,
            image: 'selectedImage',
        };

        // Send a POST request to save the new comment
        fetch('http://localhost:8080/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newComment),
        })
            .then((response) => response.json())
            .then((data) => {
                // Assuming the response contains the newly added comment
                // You may want to add error handling here
                addComment(data);
                setComment('');

            })
            .catch((error) => {
                console.error('Error adding comment:', error);
            });
    };

    return (
        <NewComment
            comment={comment}
            setComment={setComment}
            commentChangeHandler={commentChangeHandler}
            addCommentHandler={addCommentHandler}
            handleAddComment={handleAddComment}
            handleEmojiClick={handleEmojiClick}
            toggleEmojiPicker={toggleEmojiPicker}
            handleImageUpload={handleImageUpload}
            emojiPickerVisible={emojiPickerVisible}
        />
    );
};

export default NewCommentContainer;
