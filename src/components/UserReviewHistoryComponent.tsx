// import React, { useEffect, useState } from 'react';
// import  {fetchReviewHistoryByUserId}  from '../dataApi/fetchReviewsByUserId';
// // import Review from '../model/Review';
// // import ReviewHistory from '../model/ReviewHistory';
// // import { auth, db } from '../utils/FirebaseConfig';
// import { auth } from '../utils/FirebaseConfig';
// // import ReviewComponent from './ReviewComponent';
// import UserReviewsPagination from './UserReviewsPagination';
// // import { doc, DocumentReference } from 'firebase/firestore';
// import { DocumentSnapshot,  QuerySnapshot } from 'firebase/firestore';

// const pageSize = 3;
// const UserReviewHistoryComponent: React.FC = () => {
//     const userId = auth.currentUser?.uid;
//     console.log("USER ID: ", userId);
//     // const [reviews, setReviews] = useState<Review[]>([]);
//     const [pageNumber, setPageNumber] = useState(1);
//     const [docAfter, setDocAfter] = useState<DocumentSnapshot | null>(null);
//     const [docBefore, setDocBefore] = useState<DocumentSnapshot | null>(null);
//     const [reviewHistoryDocs, setReviewHistoryDocs] = useState<QuerySnapshot | null>(null);
//     const [mode, setMode] = useState<string>("initial");
//     const [finalPage, setFinalPage] = useState(false);
//     // const db = getFirestore();
//     useEffect(() => {
//         if (userId) {
//             // console.log("REVIEWS 21: ", reviews);
//             console.log("PAGE NUMBER: ", pageNumber);
//             console.log("REVIEW HISTORY DOCS 22: ", reviewHistoryDocs);
//             console.log("MODE: ", mode);
//             const docToPass = (mode === "initial") ? null : (mode === "forward" || mode === "backFromFinalPage") ? docAfter : docBefore;
//             fetchReviewHistoryByUserId(userId, docToPass, pageSize, mode)
//                 .then( (reviewHistoryDocs) => {
//                     if (reviewHistoryDocs.docs.length > 0) {
//                         setReviewHistoryDocs(reviewHistoryDocs);
//                         setDocAfter(reviewHistoryDocs.docs[reviewHistoryDocs.docs.length - 1]);
//                         setDocBefore(reviewHistoryDocs.docs[0]);
//                         console.log("DOC AFTER: ", docAfter);
//                         console.log("DOC BEFORE: ", docBefore);
//                     } else {
//                         setFinalPage(true);
//                         // setDocAfter(docBefore);
//                     }
//                 });
//         }
//     }, [pageNumber]);


//     return (
//         <div
//         style={{marginBottom: '100px'}}>
//             <h1>Your Review History {reviewHistoryDocs?.docs.length}</h1>
//             {finalPage && <h3>No more reviews</h3>}
//             {!finalPage && reviewHistoryDocs && <UserReviewsPagination reviewHistoryDocs={reviewHistoryDocs} />}
//             <div>
//                 { (pageNumber > 1) && <button className='btn btn-primary' 
//                     onClick={() => {
//                         setMode(finalPage ? "backFromFinalPage" : (pageNumber === 2) ? "initial" : "backward");
//                         setPageNumber(pageNumber - 1);
//                         setFinalPage(false);
//                     }}>
//                 {/* style={{display: (pageNumber > 1) ? 'inline-block': 'none'}}> */}
//                 {/* style={{display: 'none'}}> */}
//                     Previous Page
//                 </button>}
//                 { !finalPage && (reviewHistoryDocs?.docs.length === pageSize) && <button className='btn btn-primary' 
//                     onClick={() => {
//                         setMode("forward");
//                         setPageNumber(pageNumber + 1);
//                     }}>
//                 {/* style={{display:  (reviews.length === 10) ? 'inline-block': 'none'}}> */}
//                     Next Page
//                 </button>}
//                 {/* <button className='btn btn-primary' 
//                 onClick={() => setDocAfter(null)}>
//                     setDocAfter</button> */}
//             </div>
//         </div>
//     );
// }

// export default UserReviewHistoryComponent;