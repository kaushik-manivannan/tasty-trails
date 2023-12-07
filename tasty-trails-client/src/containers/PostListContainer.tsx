import React, { useEffect, useState } from 'react';
import PostList from '../components/PostList/PostList.tsx';
import { getAllPosts } from '../api/index.js';

const PostListContainer: React.FC = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        if(response.status !== 200){
          throw new Error("Failed to fetch posts.");
        }
        setPosts(response.data);
      } catch(error){
        console.log("Error fetching posts: ", error);
      }
    };
    fetchPosts();
  }, [posts]);

  return <PostList posts={posts} />;
};

export default PostListContainer;
