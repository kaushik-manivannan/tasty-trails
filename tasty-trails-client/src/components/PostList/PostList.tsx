import React from 'react';
import PostItem from '../PostItem/PostItem.tsx';
import styles from './PostList.module.scss';
import { PostListProps } from '../../interfaces/post-interfaces.tsx';
import Search from '../Search/Search.tsx';
import { useTranslation } from 'react-i18next';

const PostList: React.FC<PostListProps> = ({ posts, onSearch, isLoading }) => {

  // Check if the posts array is empty
  const isEmpty = posts.length === 0;
  const { t } = useTranslation();
  return (
    <section className={styles.postFeed}>
      {/* Search component */}
      <div className={styles.search}>
        <Search onSearch={onSearch}/>
      </div>

      {/* Render posts or show a message if no posts */}
      {isEmpty ? (
        <p className={styles.noPosts}>{isLoading?"Loading...":t('No Trails Found!')}</p>
      ) : (
        // Map through the posts array and render PostItem for each post
        posts.slice(0).reverse().map((post, idx) => {
          return <PostItem key={`post-${idx + 1}`} post={post} />;
        })
      )}
    </section>
  );
};

export default PostList;