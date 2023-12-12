import React from 'react';
import styles from './Search.module.scss';

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    onSearch(query);
  };

  return (
    <div className={styles.searchContainer}>
        <img src={`${process.env.PUBLIC_URL}/assets/search.svg`} alt="Search" className={styles.searchIcon} />
        <input
            type="text"
            placeholder="Search trails..."
            onChange={handleSearch}
            className={styles.searchBar}
        />
    </div>
  );
};

export default Search;