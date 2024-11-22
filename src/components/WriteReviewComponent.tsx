import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/WriteReviewComponent.css';
import Review from '../model/Review';
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData: Review = {
      postId: "", //TODO: remove this field and just read the pk from the firestore
      //TODO: make user context and replace this with userHandle
      userId: auth.currentUser?.uid || "",
      influencerId: influencerId,
      influencerName: influencerName,
      isAnonymous: false,
      date: new Date().toISOString(),
      textContent: reviewText,
      starRating: starRating,
    };
    console.log(formData);
    writeReviewToFirestore(formData, influencerId).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="p-4 rounded">
        <div className="mb-3">
          <label className="form-label">
            Star Rating (0-5):
            <input
              type="number"
              className="form-control"
              value={starRating}
              onChange={(e) => setStarRating(Number(e.target.value))}
              min="0"
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
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        <button type="button" className="btn btn-secondary" onClick={cancel}>Cancel</button>
      </form>
    </div>
  );
};

export default WriteReviewComponent;
