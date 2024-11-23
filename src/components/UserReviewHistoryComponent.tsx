import React, { useEffect, useState } from 'react';
import  {fetchReviewHistoryByUserId}  from '../dataApi/fetchReviewsByUserId';
// import Review from '../model/Review';
// import ReviewHistory from '../model/ReviewHistory';
// import { auth, db } from '../utils/FirebaseConfig';
import { auth } from '../utils/FirebaseConfig';
// import ReviewComponent from './ReviewComponent';
import UserReviewsPagination from './UserReviewsPagination';
// import { doc, DocumentReference } from 'firebase/firestore';
import { DocumentSnapshot,  QuerySnapshot } from 'firebase/firestore';

const UserReviewHistoryComponent: React.FC = () => {
    const userId = auth.currentUser?.uid;
    console.log("USER ID: ", userId);
    // const [reviews, setReviews] = useState<Review[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [docAfter, setDocAfter] = useState<DocumentSnapshot | null>(null);
    const [reviewHistoryDocs, setReviewHistoryDocs] = useState<QuerySnapshot | null>(null);
    // const db = getFirestore();
    useEffect(() => {
        if (userId) {
            // console.log("REVIEWS 21: ", reviews);
            console.log("REVIEW HISTORY DOCS 22: ", reviewHistoryDocs);
            fetchReviewHistoryByUserId(userId, (pageNumber === 1) ? null : docAfter, 3)
                .then( (reviewHistoryDocs) => {
                    setReviewHistoryDocs(reviewHistoryDocs);
                    setDocAfter(reviewHistoryDocs.docs[reviewHistoryDocs.docs.length - 1]);
                });
        }
    }, [pageNumber]);


    return (
        <div
        style={{marginBottom: '100px'}}>
            <h1>Your Review History {reviewHistoryDocs?.docs.length}</h1>
            {reviewHistoryDocs && <UserReviewsPagination reviewHistoryDocs={reviewHistoryDocs} />}
            <div>
                <button className='btn btn-primary' 
                    onClick={() => setPageNumber(pageNumber - 1)}>
                {/* style={{display: (pageNumber > 1) ? 'inline-block': 'none'}}> */}
                {/* style={{display: 'none'}}> */}
                    Previous Page
                </button>
                <button className='btn btn-primary' 
                    onClick={() => setPageNumber(pageNumber + 1)}>
                {/* style={{display:  (reviews.length === 10) ? 'inline-block': 'none'}}> */}
                    Next Page
                </button>
                {/* <button className='btn btn-primary' 
                onClick={() => setDocAfter(null)}>
                    setDocAfter</button> */}
            </div>
        </div>
    );
}

export default UserReviewHistoryComponent;