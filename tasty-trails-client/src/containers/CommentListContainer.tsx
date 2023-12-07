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
    // Update the state with the newly added comment
    setComments((prevComments) => [...prevComments, newComment]);
};

  return (
    <div>
    <CommentList comments={comments} />
    <NewCommentContainer userId={userId} postId={postId} addComment={addComment}></NewCommentContainer> 
    </div>
    )
}

export default CommentListContainer;
