import React, { useEffect, useState } from 'react';
import "../styles/common.css";
import getSampleReviews from '../dataApi/getSampleReviews';
import ReviewComponent from './ReviewComponent';
import { Review } from '../model/Review';

const BrowsePage: React.FC = () => {
    const [sampleReviews, setSampleReviews] = useState<Review[]>([]);

    useEffect(() => {
        getSampleReviews().then(sampleReviews => {
            // console.log("SAMPLE REVIEWS: ", sampleReviews);
            setSampleReviews(sampleReviews);
        });
    }, []);
    return (
        <div>
            <h1 className="page-title">Browse Recent Posts</h1>
            {sampleReviews.map((review) => (
                <ReviewComponent {...review} />
            ))}
        </div>
        
    );
  };

export default BrowsePage;