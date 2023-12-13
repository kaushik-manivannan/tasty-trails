import React from 'react';
import { CommentListProps } from '../../interfaces/comment-interfaces';
import CommentItemContainer from '../../containers/CommentItemContainer.tsx';
import { useTranslation } from 'react-i18next';

const CommentList: React.FC<CommentListProps & { onEdit: (commentId: { $oid: string }, editedComment: string) => void; onDelete: (commentId: { $oid: string }) => void }> = ({ comments, onEdit, onDelete }) => {
  const { t } = useTranslation();

  return (
    <section>
      {/* Loop through comments and render CommentItemContainer for each comment */}
      {comments.map((comment) => (
        <CommentItemContainer
          key={`comment-${comment._id}`}
          commentValue={comment}
          onEdit={(editedComment) => onEdit(comment._id, editedComment)}
          onDelete={() => onDelete(comment._id)}
        />
      ))}

      {/* Display the total number of comments */}
      <p>{t('Total Comments')}: {comments.length}</p>
    </section>
  );
};

export default CommentList;