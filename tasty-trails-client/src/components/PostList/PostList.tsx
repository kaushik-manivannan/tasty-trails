import React from 'react';
import PostItem from '../PostItem/PostItem.tsx';
import styles from './PostList.module.scss';
import { PostListProps } from '../../interfaces/post-interfaces.tsx';
import Search from '../Search/Search.tsx';
import { useTranslation } from 'react-i18next';

const PostList: React.FC<PostListProps> = ({ posts, onSearch }) => {

  // Check if the posts array is empty
  const isEmpty = posts.length === 0;
  const { t } = useTranslation();
  return (
    <div className={styles.postFeed}>
      <div className={styles.search}>
        <Search onSearch={onSearch}/>
      </div>
      {isEmpty ? (
        <p className={styles.noPosts}>{t('No Trails Found!')}</p>
      ) : (
        posts.slice(0).reverse().map((post, idx) => {
          return <PostItem key={`post-${idx + 1}`} post={post} />;
        })
      )}
    </div>
  );
};

export default PostList;