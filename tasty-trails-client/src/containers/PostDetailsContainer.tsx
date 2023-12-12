import React, { useEffect, useState } from 'react';
import { getPost } from '../api/index.js';
import PostDetails from '../components/PostDetails/PostDetails.tsx';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { PostFormData } from "../interfaces/post-interfaces";

const PostDetailsContainer: React.FC = () => {
  const [post, setPost] = useState(null);
  const [canModify,setCanModify] = useState(false);
  const { postId } = useParams();
  const { register, handleSubmit, formState: { errors },getValues,setValue } = useForm<PostFormData>({
    mode: 'onChange',
  });
  const userId = useSelector((state:any) => state.auth.userId);
  const handleDelete = () => {};
  const handleEdit = () => {};   
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

  return <>{post && <PostDetails post={post} handleDelete={handleDelete} handleEdit={handleEdit} canModify={canModify} />}</>;
};

export default PostDetailsContainer;