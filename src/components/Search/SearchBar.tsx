import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { InfluencerData } from './InfluencerDetails';
import { PLATFORMS } from '../../utils/Constants';
import { searchInfluencersWithPagination } from '../../dataApi/SearchInfluencer';
import { DocumentSnapshot, QuerySnapshot } from 'firebase/firestore';
import ReadInfluencerData from '../../model/ReadInfluencerData';
import InfluencerSearchResult from './InfluencerSearchResult';
import '../../styles/search.css';

const PAGE_SIZE = 5;
const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchField, setSearchField] = useState('firstName');
  const [influencers, setInfluencers] = useState<ReadInfluencerData[]>([]);
  const [mode, setMode] = useState<"initial" | "next" | "previous" | "backFromLast">("initial");
  const [currentPage, setCurrentPage] = useState(0);
  const [firstDoc, setFirstDoc] = useState<DocumentSnapshot | null>(null);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [lastSearchText, setLastSearchText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setMode("initial");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearchClick();
    }
  };

  const handleSearchClick = () => {
    if (searchText !== lastSearchText) {  
      setLastSearchText(searchText);
      fetchInfluencers(searchText.toLowerCase(), searchField);
      setMode("next");
      setCurrentPage(0);
    }
  };

  const handleSearchFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchField(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };


  const handlePagination = async (direction: "next" | "previous" | "backFromLast") => {
    setMode(direction);
    let influencerSnapshot: QuerySnapshot;
    if (direction === "next") {
      setCurrentPage(currentPage + 1);
      influencerSnapshot = await searchInfluencersWithPagination(searchText.toLowerCase(), searchField, PAGE_SIZE, lastDoc, direction);
    } else if (direction === "previous") {
      setCurrentPage(currentPage - 1);
      influencerSnapshot = await searchInfluencersWithPagination(searchText.toLowerCase(), searchField, PAGE_SIZE, firstDoc, direction);
    } else if (direction === "backFromLast") {
      setCurrentPage(currentPage - 1);
      influencerSnapshot = await searchInfluencersWithPagination(searchText.toLowerCase(), searchField, PAGE_SIZE, lastDoc, direction);
    } else {
      throw new Error("Invalid pagination mode. Use 'next' or 'previous'.");
    }
    if (influencerSnapshot.docs.length > 0) {
      setFirstDoc(influencerSnapshot.docs[0]);
      setLastDoc(influencerSnapshot.docs[influencerSnapshot.docs.length - 1]);
    }
    setInfluencers(influencerSnapshot.docs.map(doc => ({
      influencerId: doc.id,
      ...doc.data()
    }) as ReadInfluencerData));
  };

  const fetchInfluencers = async (searchTerm: string, searchField: string) => {
    try {
      let influencerSnapshot: QuerySnapshot;
      // console.log("search on initial page");
      influencerSnapshot = await searchInfluencersWithPagination(searchTerm, searchField, PAGE_SIZE, null, mode);

      const influencerList: ReadInfluencerData[] = influencerSnapshot.docs.map(doc => ({
        influencerId: doc.id,
        ...doc.data()
      }) as ReadInfluencerData);
      setInfluencers(influencerList);
      setLastDoc(influencerSnapshot.docs[influencerSnapshot.docs.length - 1]);
    } catch (error) {
      console.error('Error fetching influencer data:', error);
    }
  };
  return (
    <div className="container my-3">
      <button className="btn btn-secondary instructions-button" data-bs-toggle="collapse" data-bs-target="#help-popup">
        Instructions 
      </button>
        <div id="help-popup" className="collapse help-popup">
          <div className="help-popup-content"> 
            <p className="help-text">This is a temporary search page. Better search is coming soon! In the meantime, use the dropdown menu to search by first name, last name, or social media platform. <br/>
            <strong>Note:</strong> you must enter the exact search term as it appears on the influencer's profile (case insensitive).</p>
          </div>
        </div>
      <form className="d-flex flex-column align-items-start search-form" onSubmit={handleFormSubmit}>
        <span> Search by: </span>
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
            onKeyDown={handleKeyDown}
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
      
        <div>
        {(influencers.length > 0) &&<table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Star Rating</th>
                <th>Number of Reviews</th>
                <th>Popular Media</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              {influencers.map((influencer) => (
                <InfluencerSearchResult influencer={influencer} />
              ))}
            </tbody>
          </table>}
          <div className="d-flex justify-content-center">
            {currentPage > 0 && <div className="d-flex justify-content-start">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => {
                  (influencers.length > 0) ? handlePagination("previous") : handlePagination("backFromLast")
                }
                }
              >
                Previous
              </button>
            </div>}
            {/* <p>Page {currentPage}</p> */}
            {influencers.length === PAGE_SIZE && <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handlePagination("next")}
              >
                Next
              </button>
            </div>}
          </div>
        </div>
    </div>
  );
};

export default SearchBar;
