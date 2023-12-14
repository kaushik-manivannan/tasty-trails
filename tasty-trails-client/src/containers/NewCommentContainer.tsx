import React, { useState } from 'react';
import NewComment from '../components/NewComment/NewComment.tsx';
import { NewCommentContainerProps } from '../interfaces/newComment-interfaces';
import { createComment } from '../api/index.js';

// NewCommentContainer component to manage the state and logic for NewComment
const NewCommentContainer: React.FC<NewCommentContainerProps> = ({ userId, userName, postId, addComment, userImage }) => {
  // State variables to manage the comment text, emoji picker visibility, selected image, and current date and time
  const [comment, setComment] = useState('');
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const dateTime = new Date().toISOString();

  // Handler for updating the comment text as the user types
  const commentChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  // Handler for adding a new comment
  const handleAddComment = (event: React.FormEvent) => {
    event.preventDefault();
    const commentWithEmoji = `${comment}`;
    addCommentHandler(commentWithEmoji, selectedImage);
    setSelectedImage("");
  };

  // Function to toggle the visibility of the emoji picker
  const toggleEmojiPicker = () => {
    setEmojiPickerVisible(!emojiPickerVisible);
  };

  // Function to convert an image file to base64 format
  const imageToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result.toString().split(",")[1] || '');
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Handler for uploading an image
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const base64Image = await imageToBase64(file);
      setSelectedImage(base64Image);
      event.target.value = '';
    }
  };

  // Handler for removing the selected image
  const handleRemoveImage = () => {
    setSelectedImage("");
  };

  // Handler for emoji click event
  const handleEmojiClick = (event: { emoji: any; }) => {
    const emoji = event.emoji;
    setComment(prevComment => prevComment + emoji);
    setEmojiPickerVisible(false);
  };

  // Handler for adding a new comment to the server
  const addCommentHandler = async (commentWithEmoji: string, selectedImage: string) => {
    
    const newComment = {
      userId,
      postId,
      comment: commentWithEmoji,
      dateTime,
      image: selectedImage,
      userName: userName,
      userImage: userImage,
    };
    // Send a POST request to save the new comment
    try {
    const response = await createComment(newComment);

      if (response.status === 201) {
        addComment(response.data);
        setComment('');
      } else {
        throw new Error(`Error adding comment: ${response.data}`);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
}

  // Render the NewComment component with the appropriate props
  return (
    <NewComment
  comment= { comment }
  setComment = { setComment }
  commentChangeHandler = { commentChangeHandler }
  handleAddComment = { handleAddComment }
  handleEmojiClick = { handleEmojiClick }
  toggleEmojiPicker = { toggleEmojiPicker }
  handleImageUpload = { handleImageUpload }
  handleRemoveImage = {handleRemoveImage}
  emojiPickerVisible = { emojiPickerVisible }
  selectedImage = { selectedImage }
  userImage = { userImage }
    />
    );
};

// Export the NewCommentContainer component
export default NewCommentContainer;
