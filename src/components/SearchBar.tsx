import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { InfluencerData } from './InfluencerDetails';
import { PLATFORMS } from '../utils/Constants';
import { searchInfluencersWithPagination } from '../dataApi/SearchInfluencer';
import { DocumentSnapshot, QuerySnapshot } from 'firebase/firestore';
import ReadInfluencerData from '../model/ReadInfluencerData';
import InfluencerSearchResult from './InfluencerSearchResult';

const PAGE_SIZE = 3;
// const SearchBar: React.FC<{ searchFunction: (searchTerm: string, searchField: string) => void}> = ({ searchFunction }) => {
const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchField, setSearchField] = useState('firstName');
  const [influencers, setInfluencers] = useState<ReadInfluencerData[]>([]);
  const [mode, setMode] = useState<"initial" | "next" | "previous" | "backFromLast">("initial");
  const [currentPage, setCurrentPage] = useState(0);
  const [firstDoc, setFirstDoc] = useState<DocumentSnapshot | null>(null);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setMode("initial");
    // setCurrentPage(1);
  };

  const handleSearchClick = () => {
    fetchInfluencers(searchText.toLowerCase(), searchField);
    setMode("next");
    setCurrentPage(1);
  };

  const handleSearchFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchField(event.target.value);
    // setCurrentPage(1);
  };

  // const handlePreviousPage = () => {
  //   setMode("previous");
  //   setCurrentPage(currentPage - 1);
  // };

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
      // if (mode === "initial"){
      console.log("search on initial page");
      influencerSnapshot = await searchInfluencersWithPagination(searchTerm, searchField, PAGE_SIZE, null, "initial");
      // } else if (mode === "next"){
      //   influencerSnapshot = await searchInfluencersWithPagination(searchTerm, searchField, PAGE_SIZE, lastDoc, mode);
      // } else if (mode === "previous"){
      //   influencerSnapshot = await searchInfluencersWithPagination(searchTerm, searchField, PAGE_SIZE, firstDoc, mode);
      // } else if (mode == "backFromLast") {
      //   influencerSnapshot = await searchInfluencersWithPagination(searchTerm, searchField, PAGE_SIZE, lastDoc, mode);
      // }else {
      //   throw new Error("Invalid pagination mode. Use 'next' or 'previous'.");
      // }
      //   const influencerList: ReadInfluencerData[] = await searchInfluencersByField(searchTerm, searchField);
      //   console.log(influencerList);
      const influencerList: ReadInfluencerData[] = influencerSnapshot.docs.map(doc => ({
        influencerId: doc.id,
        ...doc.data()
      }) as ReadInfluencerData);
      setInfluencers(influencerList);
      // set_SearchField(searchField);
      // setFirstDoc(influencerSnapshot.docs[0]);
      setLastDoc(influencerSnapshot.docs[influencerSnapshot.docs.length - 1]);
      //   setCurrentPage(currentPage + 1);
    } catch (error) {
      console.error('Error fetching influencer data:', error);
    }
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
      {(influencers.length > 0 || currentPage > 0) &&
        <div>
          <table className="table">
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
          </table>
          <div className="d-flex justify-content-center">
            {currentPage > 1 && <div className="d-flex justify-content-start">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => {
                  (influencers.length > 0) ? handlePagination("previous") : handlePagination("backFromLast")
                }
                }
              // disabled={currentPage <= 1}
              >
                Previous
              </button>
            </div>}
            {influencers.length === PAGE_SIZE && <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handlePagination("next")}
              // disabled={influencers.length < PAGE_SIZE}
              >
                Next
              </button>
            </div>}
          </div>
        </div>}
    </div>
  );
};

export default SearchBar;
