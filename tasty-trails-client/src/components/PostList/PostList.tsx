import React from 'react';
import PostItem from '../PostItem/PostItem.tsx';
import styles from './PostList.module.scss';
import { PostListProps } from '../../interfaces/post-interfaces.tsx';

const PostList: React.FC<PostListProps> = ({ posts }) => {

  return (
    <div className={styles.postFeed}>
      {posts.slice(0).reverse().map((post, idx) => {
        return <PostItem key={`post-${idx + 1}`} post={post} />;
      })}
    </div>
  );
};

export default PostList;