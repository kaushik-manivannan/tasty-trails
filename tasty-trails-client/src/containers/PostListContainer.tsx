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
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      try {
        const response = await getAllPosts();
        if (response.status !== 200) {
          setIsLoading(false);
          throw new Error('Failed to fetch posts.');
        }
        setPosts(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching posts: ', error);
      }
    };

    // Calls the fetchPosts function
    fetchPosts();
  }, []);

  return <PostList posts={filteredPosts} onSearch={handleSearch} isLoading={isLoading} />;
};

export default PostListContainer;