import React from 'react';
import InfluencerSearchResult from './InfluencerSearchResult';
import SearchBar from './SearchBar';
import AddInfluencer from './SearchAddInfluencer';
import "../styles/common.css";
import { queryInfluencers } from '../dataApi/SearchInfluencer';
import { InfluencerData } from './InfluencerDetails';

const SearchPage: React.FC = () => {
  const [influencers, setInfluencers] = React.useState<InfluencerData[]>([]);

  const fetchInfluencers = async () => {
      try {
          const influencerList: InfluencerData[] = await queryInfluencers();
          // return influencerList;
          console.log(influencerList);
          setInfluencers(influencerList);
      } catch (error) {
          console.error('Error fetching influencers:', error);
      }
  };


    // const influencerData = {
    //     influencerId: "insert-unique-uuid-here",
    //     firstName: "Garrett",
    //     lastName: "Van Beek",
    //     starRating: 4.71,
    //     popularMediaHandles: [
    //       {
    //         platform: "instagram",
    //         handle: "bananbreadfred"
    //       },
    //       {
    //         platform: "x",
    //         handle: "bananbreadfred"
    //       }
    //     ],
    //     otherMediaHandles: [
    //       {
    //         platform: "tumblr",
    //         handle: "a_tumbler_account"
    //       }
    //     ],
    //     numberOfReviews: 7,
    //     tags: ["cooking", "sports", "asian", "humor", "humour",
    //         "more", "tags", "than", "i", "can", "count"
    //     ]
    //   };
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
