import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentList from '../components/CommentList/CommentList.tsx';
import NewCommentContainer from './NewCommentContainer.tsx';
import { Comment } from '../interfaces/comment-interfaces';
import { getAllCommentsByPostId, getAllCommentsByUserId } from '../api/index.js';
 
const CommentListContainer: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [userName, setUserName] = useState<string>('');
  const { postId } = useParams<{ postId: string }>();
  const userId = useSelector((state) => state.auth.userId);
  // const userId = user ? user.id : '';
 const userImage = "";
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getAllCommentsByPostId(postId);
        if(response.status!== 200){
          throw new Error(`Error occured while fetching communities with response : ${response.data}`);
        }
        setComments(response.data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await getAllCommentsByUserId(userId);
        if(response.status!== 200){
          throw new Error(`Error occured while fetching communities with response : ${response.data}`);
        }
        setUserName(response.data.userName);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchComments();
    fetchUser();
  }, [postId, userId]);
 
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
<NewCommentContainer userId={userId} userName={userName} postId={postId} addComment={addComment} userImage={userImage}/>
</div>
  );
};
 
export default CommentListContainer;