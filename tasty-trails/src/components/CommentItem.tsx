import React from 'react'; 

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
    <div style={{ width: '300px', height: 'auto',borderRadius: '8px', backgroundColor: '#f0f0f0', padding: '8px', marginBottom: '8px' }}>
      <div><p>{commentValue.comment}</p></div>
    </div>
  );
};

export default CommentItem;
