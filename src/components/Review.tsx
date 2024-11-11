import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ReviewProps {
  reviewData: {
    postId: string;
    userName: string;
    userId: string;
    influencerId: string;
    influencerName: string;
    isAnonymous: boolean;
    date: string;
    upvotes: number;
    downvotes: number;
    textContent: string;
    starRating: number;
  };
}

const Review: React.FC<ReviewProps> = ({ reviewData }) => {
  const {
    userName,
    influencerName,
    date,
    textContent,
    starRating,
  } = reviewData;

  // Local state for upvotes, downvotes, and click status
  const [upvotes, setUpvotes] = useState(reviewData.upvotes);
  const [downvotes, setDownvotes] = useState(reviewData.downvotes);
  const [hasVoted, setHasVoted] = useState(false);

  // Handlers to increment upvotes and downvotes
  const handleUpvote = () => {
    if (!hasVoted) {
      setUpvotes(prev => prev + 1);
      setHasVoted(true);
    }
  };

  const handleDownvote = () => {
    if (!hasVoted) {
      setDownvotes(prev => prev + 1);
      setHasVoted(true);
    }
  };

  // Format the date to a readable format
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <div className="p-3 border-bottom">
      {/* Heading with Username, Influencer, Star Rating, and Date */}
      <div 
        className="d-flex justify-content-between align-items-center p-2"
        style={{ backgroundColor: 'var(--bs-primary-bg-subtle)', color: 'var(--bs-primary-text)' }}
      >
        <h5 className="mb-0">
          {userName} <span style={{fontWeight:"lighter"}}>reviewed</span> {influencerName} <br/>
          <span className="ms-2 text-warning" style={{
            paddingTop: "0.3rem",
            paddingBottom: "0.3rem",
            fontSize: "0.8rem"
          }}>{"⭐".repeat(starRating)}</span>
        </h5>
        <span className="text-muted">{formattedDate}</span>
      </div>

      {/* Review Text */}
      <p>{textContent}</p>

      {/* Upvotes and Downvotes */}
      <div className="d-flex gap-3 align-items-center">
        <div className="d-flex align-items-center">
          <span 
            role="button" 
            aria-label="thumbs up" 
            className="me-1" 
            onClick={handleUpvote}
            style={{ cursor: hasVoted ? 'default' : 'pointer', opacity: hasVoted ? 0.5 : 1 }}
          >
            👍
          </span>
          <span>{upvotes}</span>
        </div>
        <div className="d-flex align-items-center">
          <span 
            role="button" 
            aria-label="thumbs down" 
            className="me-1" 
            onClick={handleDownvote}
            style={{ cursor: hasVoted ? 'default' : 'pointer', opacity: hasVoted ? 0.5 : 1 }}
          >
            👎
          </span>
          <span>{downvotes}</span>
        </div>
      </div>
    </div>
  );
};

export default Review;
