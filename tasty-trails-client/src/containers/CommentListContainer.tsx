import React, { useEffect, useState } from 'react';
import CommentList from '../components/CommentList/CommentList.tsx';
import NewCommentContainer from './NewCommentContainer.tsx';
import { Comment } from '../interfaces/comment-interfaces';
 
const CommentListContainer: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const postId = '2';
  const userId = 'Vijay';
 const userImage = "";
  useEffect(() => {
    fetch(`http://localhost:8080/comments/${postId}`)
      .then((response) => response.json())
      .then((data: Comment[]) => {
        setComments(data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, [postId]);
 
  const addComment = (newComment: Comment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };
 
  const editComment = (commentId: { $oid: string; }, editedComment: string) => {
    fetch(`http://localhost:8080/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment: editedComment }),
    })
      .then((response) => response.json())
      .then((updatedComment: Comment) => {
        // Update the state with the edited comment
        setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId ? updatedComment : comment
        )
      );
      console.log('Updated comment:', comment);
    })
      .catch((error) => {
        console.error('Error updating comment:', error);
        // Handle error accordingly
      });
  };
 
  const deleteComment = (commentId: { $oid: string; }) => {
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
<CommentList
        comments={comments}
        onEdit={(commentId, editedComment) => editComment(commentId, editedComment)}
        onDelete={(commentId) => deleteComment(commentId)}
      />
<NewCommentContainer userId={userId} postId={postId} addComment={addComment} userImage={userImage}/>
</div>
  );
};
 
export default CommentListContainer;