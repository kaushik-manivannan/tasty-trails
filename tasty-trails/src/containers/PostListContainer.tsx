import React, { useEffect, useState } from 'react';
import PostList from '../components/PostList.tsx';

const PostListContainer: React.FC = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/posts')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return <PostList posts={posts} />;
};

export default PostListContainer;
