import React from 'react';
import InfluencerSearchResult from './InfluencerSearchResult';
import SearchBar from './SearchBar';
import AddInfluencer from './SearchAddInfluencer';
import "../styles/common.css";
import { queryInfluencers } from '../dataApi/SearchInfluencer';
// import { InfluencerData } from './InfluencerDetails';
import ReadInfluencerData from '../model/ReadInfluencerData';
const SearchPage: React.FC = () => {
  const [influencers, setInfluencers] = React.useState<ReadInfluencerData[]>([]);

  const fetchInfluencers = async () => {
      try {
          const influencerList: ReadInfluencerData[] = await queryInfluencers();
          console.log(influencerList);
          setInfluencers(influencerList);
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
                    <InfluencerSearchResult key={index} influencer={influencer} />
                ))}
            </>
        
        <AddInfluencer/>
    </div>
  );
}

export default SearchPage;
