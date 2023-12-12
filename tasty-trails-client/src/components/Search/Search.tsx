import React from 'react';
import styles from './Search.module.scss';

// Defining the props interface for the Search component
interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  // Event handler for changes in the search input
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    onSearch(query);
  };

  return (
    <div className={styles.searchContainer}>
      {/* Search icon */}
      <img src={`${process.env.PUBLIC_URL}/assets/search.svg`} alt="Search" className={styles.searchIcon} />
      
      {/* Input field for the search query */}
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