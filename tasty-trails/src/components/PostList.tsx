import React from 'react';
import PostItem from './PostItem.tsx';

interface Post {
  _id: {
    $oid: string;
  };
  postId: string;
  userId: string;
  image: string;
  description: string;
  location: string;
  dateTime: string;
  availabilityStatus: string;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post, idx) => {
        return <PostItem key={`post-${idx + 1}`} post={post} />;
      })}
    </div>
  );
};

export default PostList;
