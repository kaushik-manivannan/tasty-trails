import React from 'react';
import CommentItem from './CommentItem.tsx';

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

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div>
      {comments.map((comment, idx) => {
        return <CommentItem key={`comment-${idx + 1}`} comment={comment} />;
      })}
    </div>
  );
};

export default CommentList;
