import React, { useEffect, useState } from 'react';
import { getPost } from '../api/index.js';
import PostDetails from '../components/PostDetails/PostDetails.tsx';
import { useParams } from 'react-router-dom';

const PostDetailsContainer: React.FC = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const response = await getPost(postId);
        if(response.status !== 200){
          throw new Error("Failed to fetch post.");
        }
        setPost(response.data);
      } catch(error){
        console.log("Error fetching post: ", error);
      }
    };
    fetchPostById();
  }, [postId]);

  return <>{post && <PostDetails post={post} />}</>;
};

export default PostDetailsContainer;