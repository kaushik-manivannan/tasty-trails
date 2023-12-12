import React, { useEffect, useState } from 'react';
import { getPost } from '../api/index.js';
import PostDetails from '../components/PostDetails/PostDetails.tsx';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { PostFormData } from "../interfaces/post-interfaces";
import {deletePost} from '../api/index.js';

const PostDetailsContainer: React.FC = () => {
  const [post, setPost] = useState(null);
  const [canModify,setCanModify] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors },getValues,setValue } = useForm<PostFormData>({
    mode: 'onChange',
  });
  const userId = useSelector((state:any) => state.auth.userId);
  const onDelete = async() => {
    try{
    const response = await deletePost(postId);
    if (response.status === 204) {
      navigate(-1);
    }else{
      throw new Error("some error occured while deleting the post");
    }}catch(error){
      throw new Error("some error occured while deleting the post");
    }
  }; 
  useEffect(() => {
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
        console.log("Error fetching post: ", error);
      }
    };
    fetchPostById();
  }, [postId]);

  return <>{post && <PostDetails post={post} onDelete={onDelete} canModify={canModify} />}</>;
};

export default PostDetailsContainer;