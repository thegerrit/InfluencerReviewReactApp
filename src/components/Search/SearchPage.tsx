import React from 'react';
import SearchBar from './SearchBar';
import AddInfluencer from './SearchAddInfluencer';
import "../../styles/common.css";
import "../../styles/InfluencerSearchResult.css";

const SearchPage: React.FC = () => {

  return (
    <div>
        <h1 className="page-title">Search</h1>
        <SearchBar />
        <AddInfluencer/>
        <div className="help-icon-container">
          
        </div>
        
    </div>
  );
}

export default SearchPage;
