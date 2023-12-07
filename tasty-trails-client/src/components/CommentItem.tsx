import React from 'react'; 
import './CommentItem.css';
import userDefault from '../assets/user.png';

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
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ commentValue }) => {
  return (
    <div className="comment-item-container">
    <div className="user-image-container">
        <img src={userDefault} alt="" className="user-image" />
      </div>
      <div className="comment-text-container">
      <p className="comment-text">{commentValue.comment}</p>
      {commentValue.image && (
        <div className="comment-image-display">
        <img
          src={`data:image/png;base64,${commentValue.image}`}
          alt="Reload"
          style={{ maxWidth: '100px', maxHeight: '100px' }}
        />
        </div>
      )}

      </div>
    </div>
  );
};

export default CommentItem;
