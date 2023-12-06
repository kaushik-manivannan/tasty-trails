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
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  console.log(comment);
  return (
    <>
      <h2>{comment.comment}</h2>
    </>
  );
};

export default CommentItem;
