import React, { useState } from 'react';
import Review from './Review'; 
import WriteReviewComponent from './WriteReviewComponent';
interface MediaHandle {
  platform: string;
  handle: string;
}

interface InfluencerData {
  influencerId: string;
  firstName: string;
  lastName: string;
  starRating: number;
  popularMediaHandles: MediaHandle[];
  otherMediaHandles: MediaHandle[];
  listOfPosts: string[];
  tags: string[];
}

interface InfluencerDetailsProps {
  influencer: InfluencerData;
}

const InfluencerDetails: React.FC<InfluencerDetailsProps> = ({ influencer }) => {
  const fullName = `${influencer.firstName} ${influencer.lastName}`.trim();

  // Function to return hardcoded review objects
  const getSampleReviews = () => {
    const sampleReview = {
      postId: "98765",
      userName: "hannable",
      userId: "12345",
      influencerId: influencer.influencerId,
      influencerName: fullName,
      isAnonymous: false,
      date: "2024-11-08T14:30:00Z",
      upvotes: 120,
      downvotes: 5,
      textContent: "A banana is an elongated, edible fruit – botanically a berry[1] – produced by several kinds of large herbaceous flowering plants in the genus Musa...A banana is an elongated, edible fruit – botanically a berry[1] – produced by several kinds of large herbaceous flowering plants in the genus Musa...A banana is an elongated, edible fruit – botanically a berry[1] – produced by several kinds of large herbaceous flowering plants in the genus Musa...A banana is an elongated, edible fruit – botanically a berry[1] – produced by several kinds of large herbaceous flowering plants in the genus Musa...A banana is an elongated, edible fruit – botanically a berry[1] – produced by several kinds of large herbaceous flowering plants in the genus Musa...A banana is an elongated, edible fruit – botanically a berry[1] – produced by several kinds of large herbaceous flowering plants in the genus Musa...A banana is an elongated, edible fruit – botanically a berry[1] – produced by several kinds of large herbaceous flowering plants in the genus Musa...A banana is an elongated, edible fruit – botanically a berry[1] – produced by several kinds of large herbaceous flowering plants in the genus Musa...A banana is an elongated, edible fruit – botanically a berry[1] – produced by several kinds of large herbaceous flowering plants in the genus Musa...A banana is an elongated, edible fruit – botanically a berry[1] – produced by several kinds of large herbaceous flowering plants in the genus Musa...A banana is an elongated, edible fruit – botanically a berry[1] – produced by several kinds of large herbaceous flowering plants in the genus Musa...A banana is an elongated, edible fruit – botanically a berry[1] – produced by several kinds of large herbaceous flowering plants in the genus Musa...A banana is an elongated, edible fruit – botanically a berry[1] – produced by several kinds of large herbaceous flowering plants in the genus Musa...A banana is an elongated, edible fruit – botanically a berry[1] – produced by several kinds of large herbaceous flowering plants in the genus Musa...A banana is an elongated, edible fruit – botanically a berry[1] – produced by several kinds of large herbaceous flowering plants in the genus Musa...A banana is an elongated, edible fruit – botanically a berry[1] – produced by several kinds of large herbaceous flowering plants in the genus Musa...",
      starRating: 4
    };
    return [sampleReview, sampleReview];
  };

  const reviews = getSampleReviews();

  const [showWriteReview, setShowWriteReview] = useState(false);

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
                <Review key={index} reviewData={review} />
              ))}
            </div>
          </div>)}

          {showWriteReview && (
            <WriteReviewComponent influencerId={influencer.influencerId} cancel={() => setShowWriteReview(false)}/>
          )}
        </div>
      </div>
    </div>
  );
};

export type { InfluencerData };
export default InfluencerDetails;