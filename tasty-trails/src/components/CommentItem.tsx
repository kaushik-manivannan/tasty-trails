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
    <>
      <h2>{commentValue.comment}</h2>
    </>
  );
};

export default CommentItem;
