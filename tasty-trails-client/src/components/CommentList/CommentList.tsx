import React from 'react';
import CommentItem from '../CommentItem/CommentItem.tsx';
import { CommentListProps } from '../../interfaces/comment-interfaces';

const CommentList: React.FC<CommentListProps & { onEdit: (commentId: string, editedComment: string) => void; onDelete: (commentId: string) => void }> = ({ comments, onEdit,
  onDelete}) => {
  return (
    <div>
      {comments.map((comment, idx) => {
        return ( 
          <CommentItem key={`comment-${comment._id}`} commentValue={comment} 
          onEdit={(editedComment) => onEdit(comment._id, editedComment)}
            onDelete={() => onDelete(comment._id)}
        / >);
      })} 
      <p>Total Comments: {comments.length}</p>
    </div>
  );
};

export default CommentList;
