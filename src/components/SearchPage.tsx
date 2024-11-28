import React, { useState } from 'react';
import InfluencerSearchResult from './InfluencerSearchResult';
import SearchBar from './SearchBar';
import AddInfluencer from './SearchAddInfluencer';
import "../styles/common.css";
import { searchInfluencersWithPagination } from '../dataApi/SearchInfluencer';
// import { InfluencerData } from './InfluencerDetails';
import ReadInfluencerData from '../model/ReadInfluencerData';
import "../styles/InfluencerSearchResult.css";
import { DocumentSnapshot, QuerySnapshot } from 'firebase/firestore';
const PAGE_SIZE = 3;
const SearchPage: React.FC = () => {
  const [influencers, setInfluencers] = useState<ReadInfluencerData[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [firstDoc, setFirstDoc] = useState<DocumentSnapshot | null>(null);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [mode, setMode] = useState<"next" | "previous" | "backFromLast" | "initial">("initial");
  const [_searchField, set_SearchField] = useState("firstName");

  const fetchInfluencers = async (searchTerm: string, searchField: string) => {
      try {
        let influencerSnapshot: QuerySnapshot | null = null;
        if (mode === "initial"){
            console.log("search on initial page");
          influencerSnapshot = await searchInfluencersWithPagination(searchTerm, searchField, PAGE_SIZE, null, "initial");
          setCurrentPage(1);
        } else if (mode === "next"){
          influencerSnapshot = await searchInfluencersWithPagination(searchTerm, searchField, PAGE_SIZE, lastDoc, mode);
        } else if (mode === "previous"){
          influencerSnapshot = await searchInfluencersWithPagination(searchTerm, searchField, PAGE_SIZE, firstDoc, mode);
        } else if (mode == "backFromLast") {
          influencerSnapshot = await searchInfluencersWithPagination(searchTerm, searchField, PAGE_SIZE, lastDoc, mode);
        }else {
          throw new Error("Invalid pagination mode. Use 'next' or 'previous'.");
        }
        //   const influencerList: ReadInfluencerData[] = await searchInfluencersByField(searchTerm, searchField);
        //   console.log(influencerList);
        const influencerList: ReadInfluencerData[] = influencerSnapshot.docs.map(doc => ({
          influencerId: doc.id,
          ...doc.data()}) as ReadInfluencerData);
          setInfluencers(influencerList);
          set_SearchField(searchField);
          setFirstDoc(influencerSnapshot.docs[0]);
          setLastDoc(influencerSnapshot.docs[influencerSnapshot.docs.length - 1]);
        //   setCurrentPage(currentPage + 1);
      } catch (error) {
          console.error('Error fetching influencer data:', error);
      }
  };
  return (
    <div>
        <h1 className="page-title">Search</h1>
        {/* <SearchBar searchFunction={fetchInfluencers}/> */}
        <SearchBar />
        {/* <table className="table">
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
            {influencers.map((influencer, index) => (
              <InfluencerSearchResult key={index} influencer={influencer} searchField={_searchField} />
            ))}
          </tbody>
        </table>
        {currentPage > 0 && 
        <div>
          {currentPage > 1 && <button onClick={() => handlePreviousPage()}>Previous</button>}
          {influencers.length < PAGE_SIZE && <button onClick={() => handleNextPage()}>Next</button>}
        </div>} */}
        <AddInfluencer/>
    </div>
  );
}

export default SearchPage;
