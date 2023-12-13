import React, { useEffect, useState } from 'react';
import PostList from '../components/PostList/PostList.tsx';
import { getAllPosts } from '../api/index.js';
import { Post } from '../interfaces/post-interfaces.tsx';

/**
 * Container component for displaying a list of posts.
 * Fetches posts from the API and provides search functionality.
 */
const PostListContainer: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Handles the search query change.
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Filters posts based on the search query
  const filteredPosts = posts.filter((post: Post) =>
    post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // Fetches posts from the API when the component mounts
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        if (response.status !== 200) {
          throw new Error('Failed to fetch posts.');
        }
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts: ', error);
      }
    };

    // Calls the fetchPosts function
    fetchPosts();
  }, []);

  return <PostList posts={filteredPosts} onSearch={handleSearch} />;
};

export default PostListContainer;