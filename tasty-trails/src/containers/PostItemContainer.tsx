import React, { useEffect, useState } from 'react';
import PostItem from '../components/PostItem.tsx';

const PostItemContainer: React.FC<{ postId: string }> = ({ postId }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        console.error(`Error fetching post with ID ${postId}:`, error);
      });
  }, [postId]);

  return (
    <div>
      {post && <PostItem post={post} />}
    </div>
  );
};

export default PostItemContainer;
