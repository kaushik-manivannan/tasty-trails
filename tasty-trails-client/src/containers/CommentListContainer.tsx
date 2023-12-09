import React, { useEffect, useState } from 'react';
import CommentList from '../components/CommentList/CommentList.tsx';
import NewCommentContainer from './NewCommentContainer.tsx';

const CommentListContainer: React.FC = () => {
  const [comments, setComments] = useState([]);
  const postId = '2';
  const userId = 'Vijay';
  useEffect(() => {
    fetch(`http://localhost:8080/comments/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, [postId]);

  const addComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
};

const editComment = (commentId, editedComment) => {
  fetch(`http://localhost:8080/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ comment: editedComment }),
  })
    .then((response) => response.json())
    .then((updatedComment) => {
      // Update the state with the edited comment
      const updatedComments = comments.map((comment) =>
        comment._id === commentId ? updatedComment : comment
      );
      setComments(updatedComments);
    })
    .catch((error) => {
      console.error('Error updating comment:', error);
      // Handle error accordingly
    });
};

const deleteComment = (commentId) => {
  // Implement delete logic
  fetch(`http://localhost:8080/comments/${commentId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);
      });
};
  return (
    <div>
    <CommentList comments={comments} 
        onEdit={(commentId, editedComment) => editComment(commentId, editedComment)}
        onDelete={(commentId) => deleteComment(commentId)}
        />
    <NewCommentContainer userId={userId} postId={postId} addComment={addComment}></NewCommentContainer> 
    </div>
    )
}

export default CommentListContainer;
