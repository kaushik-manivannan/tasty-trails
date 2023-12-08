import React from 'react';
import { CommentListProps } from '../../interfaces/comment-interfaces';
import CommentItemContainer from '../../containers/CommentItemContainer.tsx';

const CommentList: React.FC<CommentListProps & { onEdit: (commentId: string, editedComment: string) => void; onDelete: (commentId: string) => void }> = ({ comments, onEdit,
  onDelete}) => {
  return (
    <div>
      {comments.map((comment, idx) => {
        return(
        <CommentItemContainer
          key={`comment-${comment._id}`}
          commentValue={comment}
          onEdit={(editedComment) => onEdit(comment._id, editedComment)}
          onDelete={() => onDelete(comment._id)}
        />)
      })} 
      <p>Total Comments: {comments.length}</p>
    </div>
  );
};

export default CommentList;
