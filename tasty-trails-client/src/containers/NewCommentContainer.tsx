import React, { useState } from 'react';
import NewComment from '../components/NewComment/NewComment.tsx';
import '../components/NewComment/NewComment.css';
import { NewCommentContainerProps } from '../interfaces/newComment-interfaces';

const NewCommentContainer: React.FC<NewCommentContainerProps> = ({ userId, postId, addComment, userImage }) => {
  const [comment, setComment] = useState('');
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const dateTime = new Date().toISOString();

  const commentChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };
  const handleAddComment = (event: React.FormEvent) => {
    event.preventDefault();
    const commentWithEmoji = `${comment}`;
    addCommentHandler(commentWithEmoji, selectedImage);
    setSelectedImage("");
  };

  const toggleEmojiPicker = () => {
    setEmojiPickerVisible(!emojiPickerVisible);
  };

  const imageToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result.toString().split(",")[1] || '');
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const base64Image = await imageToBase64(file);
      setSelectedImage(base64Image);
      event.target.value = '';
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage("");
  };

  const handleEmojiClick = (event: async) => {
    const emoji = event.emoji;
    setComment(prevComment => prevComment + emoji);
    setEmojiPickerVisible(false);
  };

  const addCommentHandler = (commentWithEmoji: string, selectedImage: string) => {
    const newComment = {
      userId,
      postId,
      comment: commentWithEmoji,
      dateTime,
      image: selectedImage,
    };
    console.log("New comment befor fetch", newComment);
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

export default NewCommentContainer;
