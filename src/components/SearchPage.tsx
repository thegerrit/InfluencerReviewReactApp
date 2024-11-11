import React from 'react';
import InfluencerSearchResult from './InfluencerSearchResult';
import SearchBar from './SearchBar';
import AddInfluencer from './SearchAddInfluencer';
import "../styles/common.css";

const SearchPage: React.FC = () => {
    const influencerData = {
        influencerId: "insert-unique-uuid-here",
        firstName: "Garrett",
        lastName: "Van Beek",
        starRating: 4.71,
        popularMediaHandles: [
          {
            platform: "instagram",
            handle: "bananbreadfred"
          },
          {
            platform: "x",
            handle: "bananbreadfred"
          }
        ],
        otherMediaHandles: [
          {
            platform: "tumblr",
            handle: "a_tumbler_account"
          }
        ],
        numberOfReviews: 7,
        tags: ["cooking", "sports", "asian", "humor", "humour",
            "more", "tags", "than", "i", "can", "count"
        ]
      };

  return (
    <div>
        <h1 className="page-title">Search</h1>
        <SearchBar />
        <InfluencerSearchResult influencer={influencerData}/>
        {/* <InfluencerSearchResult influencer={influencerData}/>
        <InfluencerSearchResult influencer={influencerData}/>
        <InfluencerSearchResult influencer={influencerData}/>
        <InfluencerSearchResult influencer={influencerData}/>
        <InfluencerSearchResult influencer={influencerData}/>
        <InfluencerSearchResult influencer={influencerData}/>
        <InfluencerSearchResult influencer={influencerData}/>
        <InfluencerSearchResult influencer={influencerData}/>
        <InfluencerSearchResult influencer={influencerData}/>
        <InfluencerSearchResult influencer={influencerData}/> */}
        <AddInfluencer/>
    </div>
  );
}

export default SearchPage;
