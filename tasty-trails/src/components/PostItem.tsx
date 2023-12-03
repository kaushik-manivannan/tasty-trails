import React from 'react';

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

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { _id, postId, userId, image, description, location, dateTime, availabilityStatus } = post;

  return (
    <>
      <h2>{description}</h2>
      <p>User ID: {userId}</p>
      <p>Location: {location}</p>
      {/* Render other details */}
    </>
  );
};

export default PostItem;
