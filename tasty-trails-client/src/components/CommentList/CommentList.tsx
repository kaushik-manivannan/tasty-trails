import React from 'react';
import { CommentListProps } from '../../interfaces/comment-interfaces';
import CommentItemContainer from '../../containers/CommentItemContainer.tsx';
import { useTranslation } from 'react-i18next';
 
// CommentList component
const CommentList: React.FC<CommentListProps & { onEdit: (commentId: { $oid: string }, editedComment: string) => void; onDelete: (commentId: { $oid: string }) => void }> = ({ comments, onEdit, onDelete }) => {
  const { t } = useTranslation();
  return (
    <div>
      {comments.map((comment, idx) => (
      <CommentItemContainer
        key={`comment-${comment._id}`}
        commentValue={comment}
        onEdit={(editedComment) => onEdit(comment._id, editedComment)}
        onDelete={() => onDelete(comment._id)}
      />
      ))}
      <p>{t('Total Comments')}: {comments.length}</p>
    </div>
  );
};
 
// Export the CommentList component
export default CommentList;