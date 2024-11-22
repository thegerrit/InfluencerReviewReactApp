import React, { useState } from 'react';
import ReviewComponent from './ReviewComponent'; 
import WriteReviewComponent from './WriteReviewComponent';
import InfluencerData from '../model/WriteInfluencerData';
import Review from '../model/Review';
// import Loading from './Loading';

interface InfluencerDetailsProps {
    influencerId: string;
    influencer: InfluencerData;
    reviews: Review[];
    // isLoading: boolean;
}

const InfluencerDetails: React.FC<InfluencerDetailsProps> = ({ influencerId, influencer, reviews }) => {
  const fullName = `${influencer.firstName} ${influencer.lastName}`.trim();
  const [showWriteReview, setShowWriteReview] = useState(false);

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <div className="container py-4">
      <div className="card shadow-sm" style={{ backgroundColor: 'var(--bs-body-bg)', color: 'var(--bs-body-color)' }}>
        <div className="card-body">
          {/* Header Section */}
          <div className="mb-4">
            <h1 className="card-title h3 mb-2">{fullName}</h1>
            <div className="d-flex align-items-center">
              <span className="text-warning fs-4">★</span>
              <span className="ms-2">{influencer.starRating.toFixed(2)}</span>
            </div>
          </div>

          {/* Social Media Handles */}
          <div className="mb-4">
            <h2 className="h5 mb-3">Popular Platforms</h2>
            <div className="row">
              {influencer.popularMediaHandles.map((handle, index) => (
                <div key={index} className="col-md-6 d-flex align-items-center mb-2">
                  <span className="fw-medium text-capitalize">{handle.platform}:</span>
                  <span className="ms-2">{handle.handle}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Other Media Handles */}
          {influencer.otherMediaHandles.length > 0 && (
            <div className="mb-4">
              <h2 className="h5 mb-3">Other Platforms</h2>
              <div className="row">
                {influencer.otherMediaHandles.map((handle, index) => (
                  <div key={index} className="col-md-6 d-flex align-items-center mb-2">
                    <span className="fw-medium text-capitalize">{handle.platform}:</span>
                    <span className="ms-2">{handle.handle}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="mb-4">
            <h2 className="h5 mb-3">Tags</h2>
            <div className="d-flex flex-wrap gap-2">
              {influencer.tags.map((tag, index) => (
                <span
                  key={index}
                  className="badge bg-light text-dark"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Review Button */}
          <div className="mb-4">
            <button 
              onClick={() => setShowWriteReview(true)}
              className="btn btn-primary"
            >
              Write a review
            </button>
          </div>

          {/* Posts Container */}
          {!showWriteReview && (
          <div className="mt-4">
            <h2 className="h5 mb-3">Reviews</h2>
            <div className="p-4 rounded" style={{ backgroundColor: 'var(--bs-body-bg)', color: 'var(--bs-body-color)' }}>
              {reviews.map((review, index) => (
                <ReviewComponent key={index} reviewData={review} />
              ))}
            </div>
          </div>)}

          {showWriteReview && (
            <WriteReviewComponent influencerId={influencerId} influencerName={fullName} cancel={() => setShowWriteReview(false)}/>
          )}
        </div>
      </div>
    </div>
  );
};

export type { InfluencerData };
export default InfluencerDetails;