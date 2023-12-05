import React from 'react'; 
import './CommentItem.css';

interface Comment {
  _id: {
    $oid: string;
  };
  userId: string;
  postId: string;
  comment: string;
  dateTime: string;
  image: string;
}

interface CommentItemProps {
  commentValue: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ commentValue }) => {
  console.log(commentValue);
  return (
    <div className="comment-item-container">
      <div><p>{commentValue.comment}</p></div>
    </div>
  );
};

export default CommentItem;
