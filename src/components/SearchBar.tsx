import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { InfluencerData } from './InfluencerDetails';
import { PLATFORMS } from '../utils/Constants';


const SearchBar: React.FC<{ searchFunction: (searchTerm: string, searchField: string) => void }> = ({ searchFunction }) => {
  const [searchText, setSearchText] = useState('');
  const [searchField, setSearchField] = useState('firstName');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearchClick = () => {
    console.log(searchText);
    searchFunction(searchText.toLowerCase(), searchField);
  };

  const handleSearchFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchField(event.target.value);
  };

  return (
    <div className="container my-3">
      <form className="d-flex flex-column align-items-start">
        <select className="form-select mb-2" value={searchField} onChange={handleSearchFieldChange} style={{ maxWidth: '12rem' }}>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          {PLATFORMS.map((platform: string) => (
            <option value={platform.toLowerCase()}>{platform}</option>
          ))}
        </select>
        <div className="d-flex w-100">
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
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
