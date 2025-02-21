import React, { useEffect, useState } from 'react';
import "../styles/common.css";
import getSampleReviews from '../dataApi/getSampleReviews';
import ReviewComponent from './ReviewComponent';
import { Review } from '../model/Review';
import { getUserVoteHistory } from '../dataApi/getUserVoteHistory';
import { auth } from '../utils/FirebaseConfig';

const BrowsePage: React.FC = () => {
    const [sampleReviews, setSampleReviews] = useState<Review[]>([]);

    const [voteHistory, setVoteHistory] = useState<string[]>([]);
    useEffect(() => {
        getSampleReviews().then(sampleReviews => {
            // console.log("SAMPLE REVIEWS: ", sampleReviews);
            setSampleReviews(sampleReviews);
        });
    }, []);

    useEffect(() => {
        getUserVoteHistory(auth.currentUser?.uid || "").then(voteHistory => {
            setVoteHistory(voteHistory);
        });
    }, [sampleReviews]);
    
    return (
        <div>
            <h1 className="page-title">Browse Recent Posts</h1>
            {sampleReviews.map((review) => (
                <ReviewComponent {...review} userVoteHistory={voteHistory} />
            ))}
        </div>
        
    );
  };

export default BrowsePage;