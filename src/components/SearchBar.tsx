import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearchClick = () => {
    console.log(searchText);
  };

  return (
    <div className="container my-3">
      <form className="d-flex align-items-center">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search..."
          value={searchText}
          onChange={handleInputChange}
          style={{ flex: 1 }}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
