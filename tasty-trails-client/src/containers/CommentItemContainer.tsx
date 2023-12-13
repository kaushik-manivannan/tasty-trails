import React, { useState } from 'react';
import CommentItem from '../components/CommentItem/CommentItem.tsx';
import { CommentItemProps1 } from '../interfaces/comment-interfaces';
 
// CommentItemContainer component to manage the state and logic for CommentItem
const CommentItemContainer: React.FC<CommentItemProps1> = ({ commentValue, onEdit, onDelete }) => {
  // State variables to manage various states and values
  const [showOptions, setShowOptions] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(commentValue.comment);
 
  // Function to toggle the display of comment options
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
 
  // Function to toggle the display of delete option
  const modifyHandler = () => {
    setShowDelete(!showDelete);
  };
 
  // Function to set the component in edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };
 
  // Function to cancel the edit and reset the edited comment to its original value
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedComment(commentValue.comment);
  };

 // Function to save the edited comment and exit the edit mode
  const handleSaveEdit = () => {
    // Implement your save edit logic here
    setIsEditing(false);
    onEdit(editedComment);
  };
 
  // Handler for mouse enter event to show comment options
  const mouseEnterHandler = () => {
    setShowOptions(true);
    }
   
    // Handler for mouse leave event to hide comment options and delete option
    const mouseLeaveHandler = () => {
    setShowOptions(false);
    setShowDelete(false);
    }
   
    // Handler for editing the comment text
    const editCommentHandler = (event:any) => {
    setEditedComment(event.target.value)
    }
 
 // Render the CommentItem component with the appropriate props
  return (
    <>
    <CommentItem
      commentValue={commentValue}
      showOptions={showOptions}
      showDelete={showDelete}
      isEditing={isEditing}
      editedComment={editedComment}
      toggleOptions={toggleOptions}
      modifyHandler={modifyHandler}
      handleEdit={handleEdit}
      handleCancelEdit={handleCancelEdit}
      handleSaveEdit={handleSaveEdit}
      onDelete={onDelete}
      mouseEnterHandler={mouseEnterHandler}
      mouseLeaveHandler={mouseLeaveHandler}
      editCommentHandler={editCommentHandler}
    />
    </>
  );
};
 
// Export the CommentItemContainer component
export default CommentItemContainer;