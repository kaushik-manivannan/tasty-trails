import React, { useEffect, useState } from 'react';
import PostList from '../components/PostList/PostList.tsx';
import { getAllPosts } from '../api/index.js';
import { Post } from '../interfaces/post-interfaces.tsx';

const PostListContainer: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredPosts = posts.filter((post: Post) =>
    post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
  }, []);

  return <PostList posts={filteredPosts} onSearch={handleSearch}/>;
};

export default PostListContainer;
