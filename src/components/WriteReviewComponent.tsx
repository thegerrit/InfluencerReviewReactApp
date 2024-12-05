import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/WriteReviewComponent.css';
import { WriteReview } from '../model/Review';
import writeReviewToFirestore from '../dataApi/WriteReview';
import { auth } from '../utils/FirebaseConfig';

interface WriteReviewProps {
  influencerId: string;
  influencerName: string;
  cancel: () => void;
}

const WriteReviewComponent: React.FC<WriteReviewProps> = ({ influencerId, influencerName, cancel }) => {
  const [starRating, setStarRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');
  const [isGuidelinesChecked, setIsGuidelinesChecked] = useState<boolean>(false);
  // const [minLengthError, setMinLengthError] = useState<string>('');
  // const [maxLengthError, setMaxLengthError] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const reviewValidation = () => {
    
    if (reviewText.length < 15) {
      setErrorMessage('Reviews must have a minimum length of 15 characters');
      return false;
    } 
  
    if (reviewText.length > 1500) {
      setErrorMessage('Review has exceeded maximum length of 1500 characters');
      return false;
    } 

    if (![1, 2, 3, 4, 5].includes(starRating)) {
      setErrorMessage('Star rating must be an integer between 1 and 5');
      return false;
    }

    setErrorMessage('');
    return true;  
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!reviewValidation()) {
      return;
    }

    const formData: WriteReview = {
      userId: auth.currentUser?.uid || "",
      influencerId: influencerId,
      influencerName: influencerName,
      isAnonymous: false,
      date: new Date().toISOString(),
      textContent: reviewText,
      starRating: starRating,
    };
    // console.log(formData);
    await writeReviewToFirestore(formData, influencerId)
      .then(() => {
        window.location.reload();
      }).catch((error) => {
        setErrorMessage('Before writing your review, setup your display name at influencer-review.com/setDisplayName');
        console.error("Error writing review: ", error);
      });
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="p-4 rounded">
        <div className="mb-3">
          <label className="form-label">
            Star Rating (1-5):
            <input
              type="number"
              className="form-control"
              value={starRating}
              onChange={(e) => setStarRating(Number(e.target.value))}
              min="1"
              max="5"
            />
          </label>
        </div>
        <div className="mb-3 w-100">
          <label className="form-label custom-long-textarea">
            Review:
            <textarea
              className="form-control"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </label>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="communityGuidelinesCheck"
            required
            onChange={(e) => setIsGuidelinesChecked(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="communityGuidelinesCheck">
            This review meets the standards of the <a href="/CommunityGuidelines" target="_blank">
            Community Guidelines</a>.
          </label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit} disabled={!isGuidelinesChecked || starRating === 0}>Submit</button>
        <button type="button" className="btn btn-secondary" onClick={cancel}>Cancel</button>
      </form>
    </div>
  );
};

export default WriteReviewComponent;
