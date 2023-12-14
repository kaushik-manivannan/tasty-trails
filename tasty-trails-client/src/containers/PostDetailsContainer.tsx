import React, { useEffect, useState } from 'react';
import { getPost } from '../api/index.js';
import PostDetails from '../components/PostDetails/PostDetails.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
import {deletePost} from '../api/index.js';
import { sendAlert } from '../service/alert-service.ts';

/**
 * This component is called when you want to view the details of a specific post
 */
const PostDetailsContainer: React.FC = () => {
  const [post, setPost] = useState(null);
  const [canModify,setCanModify] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();
  const userId = useSelector((state:any) => state.auth.userId);

  // Function to delete the post
  const onDelete = async() => {
    try{
    const response = await deletePost(postId);
    if (response.status === 204) {
      navigate(-1);
      sendAlert("Post Deleted Successfully!", "Success");
    }else{
      throw new Error("some error occured while deleting the post");
    }}catch(error){
      throw new Error("some error occured while deleting the post");
    }
  }; 


  useEffect(() => {

    // Function to fetch the post by id 
    const fetchPostById = async () => {
      try {
        const response = await getPost(postId);
        if(response.status !== 200){
          throw new Error("Failed to fetch post.");
        }
        setPost(response.data);
        if(response.data.userId === userId)
          setCanModify(true);
      } catch(error){
        throw new Error(`Error fetching post: ${error}`);
      }
    };
    fetchPostById();
  }, [postId]);

  return <>{post && <PostDetails post={post} onDelete={onDelete} canModify={canModify} setPost={(updatedPost:any)=>setPost(updatedPost)} />}</>;
};

export default PostDetailsContainer;