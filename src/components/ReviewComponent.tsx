import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/review.css';
// import { Review } from '../model/Review';
// import { fetchUserDataByUserId } from '../dataApi/fetchUserHandleByUserId';
import { voteOnReview, hasUserVoted } from '../dataApi/voteOnReview';
// import fetchVoteDetailsByReviewId from '../dataApi/fetchVoteDetailsByReviewId';
import { auth } from '../utils/FirebaseConfig';
import { useTheme } from '../context/ThemeContext';
// import VoteDetails from '../model/VoteDetails';
interface ReviewProps {
  userId: string;
  postId: string;
  userName: string;
  influencerId: string;
  influencerName: string;
  date: string;
  textContent: string;
  starRating: number;
  upvotes: number;
  downvotes: number;
}

const ReviewComponent: React.FC<ReviewProps> = ({ postId, userName, userId, influencerId, influencerName, date, textContent, starRating, upvotes, downvotes }) => {
  const [_upvotes, set_Upvotes] = useState(upvotes);
  const [_downvotes, set_Downvotes] = useState(downvotes);
  const [hasVoted, setHasVoted] = useState(false);
  const currentUserId = auth.currentUser?.uid ?? '';

  useEffect(() => {
    hasUserVoted(postId, currentUserId).then(
      (_hasVoted: boolean) => {
        setHasVoted(_hasVoted);
        // console.log("has voted", _hasVoted);
      }
    );
    set_Upvotes(upvotes);
    set_Downvotes(downvotes);
    // console.log("review component rerendered");
  }, [postId]);

  useEffect(() => {
    // console.log("review component rerendered");
    set_Upvotes(upvotes);
    set_Downvotes(downvotes);
  }, [upvotes, downvotes]);


  useEffect(() => {
    // console.log("HAS VOTED: ", hasVoted);
  }, [hasVoted]);

  const handleVote = (isUpvote: boolean) => {
    if (!auth.currentUser) {
      alert("Please login to vote on this review");
      return;
    }
    if (!hasVoted) {
      isUpvote ? set_Upvotes((prev: number) => prev + 1) : set_Downvotes((prev: number) => prev + 1);
      voteOnReview(postId, currentUserId, isUpvote).then(() => setHasVoted(true));
    }
  };

  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <div className="review-container">
      <div
        className={`review-header ${useTheme() === 'dark' ? '' : 'light'}`}
      >
        <h5 className="mb-0">
          <a className="review-user-link"
            href={`/userProfile?userId=${userId}`}
          >{userName}</a> <span style={{ fontWeight: "lighter", opacity: "60%" }}>reviewed </span> 
          <a className="review-influencer-link" href={`/influencer?id=${influencerId}`}>{influencerName}</a> <br />
          <span className="ms-2 text-warning review-star-rating">{"⭐".repeat(starRating)}</span>
        </h5>
        <span className="text-muted">{formattedDate}</span>
      </div>

      <p className="review-text">{textContent}</p>

      {/* Upvotes and Downvotes */}
      <div className="d-flex gap-3 align-items-center">
        <div className="d-flex align-items-center">
          <span
            role="button"
            aria-label="thumbs up"
            className={`me-1 vote-button ${hasVoted ? 'disabled' : ''}`}
            onClick={() => handleVote(true)}
          >
            👍 {_upvotes}
          </span>
        </div>
        <div className="d-flex align-items-center">
          <span
            role="button"
            aria-label="thumbs down"
            className={`me-1 downvote-button ${hasVoted ? 'disabled' : ''}`}
            onClick={() => handleVote(false)}
          >
            👎 {_downvotes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
