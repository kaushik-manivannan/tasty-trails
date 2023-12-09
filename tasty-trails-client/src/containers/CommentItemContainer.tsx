// CommentItemContainer.tsx
import React, { useState } from 'react';
import CommentItem from '../components/CommentItem/CommentItem.tsx';
import { CommentItemProps1 } from '../interfaces/comment-interfaces';
 
const CommentItemContainer: React.FC<CommentItemProps1> = ({ commentValue, onEdit, onDelete }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(commentValue.comment);
 
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
 
  const modifyHandler = () => {
    setShowDelete(!showDelete);
  };
 
  const handleEdit = () => {
    setIsEditing(true);
  };
 
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedComment(commentValue.comment);
  };
 
  const handleSaveEdit = () => {
    // Implement your save edit logic here
    setIsEditing(false);
    onEdit(editedComment);
  };
 
  const mouseEnterHandler = () => {
    setShowOptions(true);
    }
   
    const mouseLeaveHandler = () => {
    setShowOptions(false);
    setShowDelete(false);
    }
   
    const editCommentHandler = (event:any) => {
    setEditedComment(event.target.value)
    }
 
 
 
  return (
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
  );
};
 
export default CommentItemContainer;