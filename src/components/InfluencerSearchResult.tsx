import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/InfluencerSearchResult.css';
import ReadInfluencerData from '../model/ReadInfluencerData';
import { PLATFORMS } from '../utils/Constants';

interface InfluencerSearchResultProps {
  influencer: ReadInfluencerData;
  // searchField: string;
}

const InfluencerSearchResult: React.FC<InfluencerSearchResultProps> = ({ influencer }) => {
  const [showAllTags, setShowAllTags] = useState(false);
  
  const handleToggleTags = () => setShowAllTags(!showAllTags);

  return (
    <tr>
      <td data-label="Name" onClick={() => window.location.href = `/influencer?id=${influencer.influencerId}`} style={{ cursor: 'pointer' }}>
        {influencer.firstName} {influencer.lastName}
      </td>
      <td data-label="Star Rating">
        <span className="badge bg-primary">
          ⭐ {influencer.starRating.toFixed(2)}
        </span>
      </td>
      <td data-label="Number of Reviews">
        <span >
          {influencer.numberOfReviews}
        </span>
      </td>
      <td data-label="Popular Media">
        <ul className="list-unstyled mb-0">
          {PLATFORMS.map((platform, index) => {
            const key = platform.toLowerCase();
            if (key in influencer) {
              return (
                <li key={index} >
                  {platform}: {String(influencer[key as keyof ReadInfluencerData])}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </td>
      {/* <td data-label="Other Media">
        <ul className="list-unstyled mb-0">
          {influencer.otherMediaHandles.map((handle, index) => (
            <li key={index} className="text-muted">
              {handle.platform}: @{handle.handle}
            </li>
          ))}
        </ul>
      </td> */}
      <td data-label="Tags">
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
      </td>
    </tr>
  );
};

export default InfluencerSearchResult;
