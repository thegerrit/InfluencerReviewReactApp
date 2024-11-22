import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Review from '../model/Review';
import { fetchUserDataByUserId } from '../dataApi/fetchUserHandleByUserId';
import voteOnReview from '../dataApi/voteOnReview';
import fetchVoteDetailsByReviewId from '../dataApi/fetchVoteDetailsByReviewId';
import { auth } from '../utils/FirebaseConfig';
// import VoteDetails from '../model/VoteDetails';
interface ReviewProps {
  reviewData: Review;
}

const ReviewComponent: React.FC<ReviewProps> = ({ reviewData }) => {
  const [userName, setUserName] = useState('');
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const currentUserId = auth.currentUser?.uid ?? '';
  
  useEffect(() => {
    //TODO: refactor this so it only fetches user handle and doesn't make lots of calls to db
    fetchUserDataByUserId(reviewData.userId).then(  userData => {
      if (userData) {
        setUserName(userData.userHandle);
      }
    });
    fetchVoteDetailsByReviewId(reviewData.influencerId, reviewData.postId).then((voteDetails) => {
      setDownvotes(voteDetails?.downvotes ?? 0);
      setUpvotes(voteDetails?.upvotes ?? 0);
      setHasVoted(voteDetails?.hasVoted ?? false);
    });
  }, [userName, upvotes, downvotes, hasVoted]);

  const handleUpvote = () => {
    if (!hasVoted) {
      setUpvotes((prev: number) => prev + 1);
      setHasVoted(true);
      voteOnReview(reviewData.influencerId, reviewData.postId, currentUserId, true);
    }
  };

  const handleDownvote = () => {
    if (!hasVoted) {
      setDownvotes((prev: number) => prev + 1);
      setHasVoted(true);
      voteOnReview(reviewData.influencerId, reviewData.postId, currentUserId, false);
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
