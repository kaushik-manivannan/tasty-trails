import React, { useEffect, useState } from 'react';
import CommentItem from '../components/CommentItem.tsx';

const CommentItemContainer: React.FC<{ commentId: string }> = ({ commentId }) => {
  const [comment, setComment] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/comments/${commentId}`)
      .then((response) => response.json())
      .then((data) => {
        setComment(data);
      })
      .catch((error) => {
        console.error(`Error fetching comment with ID ${commentId}:`, error);
      });
  }, [commentId]);

  return (
    <div>
      {comment && <CommentItem comment={comment} />}
    </div>
  );
};

export default CommentItemContainer;
