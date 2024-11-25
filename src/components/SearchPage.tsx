import React from 'react';
import InfluencerSearchResult from './InfluencerSearchResult';
import SearchBar from './SearchBar';
import AddInfluencer from './SearchAddInfluencer';
import "../styles/common.css";
import { searchInfluencersByField } from '../dataApi/SearchInfluencer';
// import { InfluencerData } from './InfluencerDetails';
import ReadInfluencerData from '../model/ReadInfluencerData';
const SearchPage: React.FC = () => {
  const [influencers, setInfluencers] = React.useState<ReadInfluencerData[]>([]);
  const [_searchField, set_SearchField] = React.useState("firstName");

  const fetchInfluencers = async (searchTerm: string, searchField: string) => {
      try {
          const influencerList: ReadInfluencerData[] = await searchInfluencersByField(searchTerm, searchField);
          console.log(influencerList);
          setInfluencers(influencerList);
          set_SearchField(searchField);
      } catch (error) {
          console.error('Error fetching influencers:', error);
      }
  };
  return (
    <div>
        <h1 className="page-title">Search</h1>
        <SearchBar searchFunction={fetchInfluencers}/>
            <>
                {influencers.map((influencer, index) => (
                    <InfluencerSearchResult key={index} influencer={influencer} searchField={_searchField} />
                ))}
            </>
        
        <AddInfluencer/>
    </div>
  );
}

export default SearchPage;
