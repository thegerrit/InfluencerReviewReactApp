import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/InfluencerSearchResult.css';
import ReadInfluencerData from '../model/ReadInfluencerData';

interface InfluencerSearchResultProps {
  influencer: ReadInfluencerData;
  searchField: string;
}

const InfluencerSearchResult: React.FC<InfluencerSearchResultProps> = ({ influencer, searchField }) => {
  const [showAllTags, setShowAllTags] = useState(false);
  
  const handleToggleTags = () => setShowAllTags(!showAllTags);

  return (
    <div
      className="container my-3 p-3"
      style={{
        backgroundColor: 'var(--bs-body-bg)',
        color: 'var(--bs-body-color)',
        border: '1px solid var(--bs-border-color)',
        borderRadius: '0.5rem',
      }}
    >
      {/* Main Row */}
      <div className="row row-cols-1 row-cols-md-auto g-3 align-items-center">
        {/* Basic Info Section */}
        <div className="col d-flex flex-column flex-md-row align-items-start align-items-md-center">
          <h5 
            className="mb-0 me-md-2 text-md-start" 
            onClick={() => window.location.href = `/influencer?id=${influencer.influencerId}`}
            style={{ cursor: 'pointer' }}
          >
            {influencer.firstName} {influencer.lastName}
          </h5>
          <span
            className="badge bg-primary mt-1 mt-md-0 me-md-2"
            style={{
              backgroundColor: 'var(--bs-primary)',
              color: 'var(--bs-body-bg)',
              fontSize: '1rem',
              marginBottom: '4px',
            }}
          >
            ⭐ {influencer.starRating.toFixed(2)} 
          </span>
          <small className="text-muted" style={{ fontSize: '1rem' }}>
            {influencer.numberOfReviews}
            {/* <span className="d-inline d-md-none"> reviews</span> */}
            <span className="d-inline"> reviews</span>

          </small>
        </div>

        {/* Popular Media Handles */}
        <div className="col">
            {/* TODO: Implement disappearing-lables properly with a header*/}
          {/* <strong className="disappearing-label">Popular Media:</strong> */}
          <strong >Popular Media:</strong>

          <ul className="list-unstyled mb-0">
            
            <li className="text-muted">
              {(typeof influencer[searchField as keyof ReadInfluencerData] === 'string' || typeof influencer[searchField as keyof ReadInfluencerData] === 'number') ?
               String(influencer[searchField as keyof ReadInfluencerData]) : ''}
            </li>
            
          </ul>
        </div>

        {/* Other Media Handles */}
        <div className="col">
          {/* <strong className="disappearing-label">Other Media:</strong> */}
          <strong >Other Media:</strong>

          <ul className="list-unstyled mb-0">
            {influencer.otherMediaHandles.map((handle, index) => (
              <li key={index} className="text-muted">
                {handle.platform}: @{handle.handle}
              </li>
            ))}
          </ul>
        </div>

        {/* Tags Section with toggle for overflow */}
        <div className="col" style={{ maxWidth: '250px' }}>
          {/* <strong className="disappearing-label">Tags:</strong> */}
          <strong>Tags:</strong>

          <div className="d-flex flex-wrap">
            {influencer.tags.slice(0, showAllTags ? influencer.tags.length : 9).map((tag, index) => (
              <span
                key={index}
                className="badge bg-secondary me-1 mb-1"
                style={{
                  backgroundColor: 'var(--bs-secondary-bg)',
                  color: 'var(--bs-secondary-color)',
                  borderRadius: '0.25rem',
                }}
              >
                {tag}
              </span>
            ))}
            {/* Show "..." badge if there are more than 10 tags */}
            {influencer.tags.length > 10 && !showAllTags && (
              <span
                className="badge bg-secondary me-1 mb-1"
                style={{
                  backgroundColor: 'var(--bs-secondary-bg)',
                  color: 'var(--bs-secondary-color)',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                }}
                onClick={handleToggleTags}
              >
                ...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerSearchResult;
