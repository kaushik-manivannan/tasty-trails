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
  return (
    <div className="comment-item-container">
      <div><p>{commentValue.comment}</p>
      {commentValue.image && (
        <img
          src={`data:image/png;base64,${commentValue.image}`}
          alt="Reload"
          style={{ maxWidth: '100px', maxHeight: '100px' }}
        />
      )}

      </div>
    </div>
  );
};

export default CommentItem;
