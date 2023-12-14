// Import React and necessary hooks and components
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentList from '../components/CommentList/CommentList.tsx';
import NewCommentContainer from './NewCommentContainer.tsx';
import { Comment } from '../interfaces/comment-interfaces';
import { getAllCommentsByPostId, getAllCommentsByUserId, updateCommentById, deleteCommentById } from '../api/index.js';
 
// Define the CommentListContainer component
const CommentListContainer: React.FC = () => {
  // State variables for managing comments and user name
  const [comments, setComments] = useState<Comment[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [userImage, setuserImage] = useState<string>('');
  // Extract postId from URL parameters and userId from Redux store
  const { postId } = useParams<{ postId: string }>();
  const userId = useSelector((state:any) => state.auth.userId);
  // const userId = user ? user.id : '';
//  const userImage = "";

 // useEffect to fetch comments and user data on component mount
  useEffect(() => {
    // Fetch comments related to the post
    const fetchComments = async () => {
      try {
        const response = await getAllCommentsByPostId(postId);
        if(response.status!== 200){
          throw new Error(`Error occured while fetching communities with response : ${response.data}`);
        }
        setComments(response.data);
      } catch (error) {
        throw new Error("Error fetching data: " + error);
      }
    };

    // Fetch user data based on userId
    const fetchUser = async () => {
      try {
        const response = await getAllCommentsByUserId(userId);
        if(response.status!== 200){
          throw new Error(`Error occured while fetching communities with response : ${response.data}`);
        }
        setUserName(response.data.userName);
        setuserImage(response.data.image);
      } catch (error) {
        throw new Error(`Error fetching Comments: ${error}`);
      }
    };

    // Call the fetch functions
    fetchComments();
    fetchUser();
  }, [postId, userId]);
  
  // Function to add a new comment to the state
  const addComment = (newComment: Comment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };
 
  const editComment = async (commentId: { $oid: string; }, editedComment: string) => {
    try {
      const response = await updateCommentById(commentId,{ comment: editedComment }); 
      if(response.status!== 200){
        throw new Error(`Error occured while editing comment`);
      }
        // Update the state with the edited comment
        setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId ? response.data : comment
        )
      );
    }catch (error) {
        console.error('Error updating comment:', error);
        // Handle error accordingly
    };
  };
  
  // Function to delete a comment using an API call
    const deleteComment = async (commentId: { $oid: string }) => {
      try {
        const response = await deleteCommentById(commentId);
        if(response.status!== 200){
          throw new Error(`Error occured while deleting the comment with response : ${response.data}`);
        }
        setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentId)
        );
      } catch (error) {
        throw new Error(`Error Deleting Comments: ${error}`);
      }
    };

    // Implement delete logic
  
  // Render the CommentList and NewCommentContainer components
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
 
// Export the CommentListContainer component
export default CommentListContainer;