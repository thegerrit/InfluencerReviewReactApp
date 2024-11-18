import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Review from '../model/Review';
import fetchUserHandleByUserId from '../dataApi/fetchUserHandleByUserId';

interface ReviewProps {
  reviewData: Review;
}

const ReviewComponent: React.FC<ReviewProps> = ({ reviewData }) => {
  const [userName, setUserName] = useState('');
  const [upvotes, setUpvotes] = useState(reviewData.upvotes);
  const [downvotes, setDownvotes] = useState(reviewData.downvotes);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    fetchUserHandleByUserId(reviewData.userId).then(handle => setUserName(handle));
  }, [userName]);

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

  const formattedDate = new Date(reviewData.date).toLocaleDateString();

  return (
    <div className="p-3 border-bottom">
      <div 
        className="d-flex justify-content-between align-items-center p-2"
        style={{ backgroundColor: 'var(--bs-primary-bg-subtle)', color: 'var(--bs-primary-text)' }}
      >
        <h5 className="mb-0">
          {userName} <span style={{
            fontWeight:"lighter",
            opacity: "60%"
          }}>reviewed</span> {reviewData.influencerName} <br/>
          <span className="ms-2 text-warning" style={{
            paddingTop: "0.3rem",
            paddingBottom: "0.3rem",
            fontSize: "0.8rem"
          }}>{"⭐".repeat(reviewData.starRating)}</span>
        </h5>
        <span className="text-muted">{formattedDate}</span>
      </div>

      <p>{reviewData.textContent}</p>

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

export default ReviewComponent;
