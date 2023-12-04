import React, { useEffect, useState } from 'react';
import CommentList from '../components/CommentList.tsx';

const CommentListContainer: React.FC = () => {
  const [comments, setComments] = useState([]);
  console.log(comments);
  useEffect(() => {
    fetch('http://localhost:8080/comments/2')
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return <CommentList comments={comments} />;
};

export default CommentListContainer;
