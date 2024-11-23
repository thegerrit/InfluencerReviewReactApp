// import React, { useState, useEffect } from 'react';
// import { fetchReviewHistoryByUserId } from '../dataApi/fetchReviewsByUserId';
import { collection, DocumentSnapshot, getDocs, getFirestore, limit, orderBy, Query, query, startAfter} from 'firebase/firestore';
import ReviewHistory from '../model/ReviewHistory';
import { auth } from '../utils/FirebaseConfig';
import { useState, useEffect } from 'react';
const UserHistoryPageComponent: React.FC = () => {
    const userId = auth.currentUser ? auth.currentUser.uid : '';
    const db = getFirestore();
    const [reviews, setReviews] = useState<ReviewHistory[]>([]);
    const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
    const [pageNumber, setPageNumber] = useState(0);
    
    // Query the first page of docs
    
    useEffect(() => {
        let q: Query;
        if (lastDoc) {
            console.log("Querying with lastDoc: ", lastDoc);
            q = query(collection(db, "users", userId, "reviewHistory"), orderBy("date", "desc"), limit(2), startAfter(lastDoc));
        } else {
            console.log("Querying WITHOUT lastDoc");
            q = query(collection(db, "users", userId, "reviewHistory"), orderBy("date", "desc"), limit(2));
        }
        // if (pageNumber === 0 ) {
        console.log("PAGE NUMBER: ", pageNumber);
        getDocs(q).then((snapshot) => {
            console.log("SNAPSHOT: ", snapshot.docs);
            setReviews((prevReviews) => [...prevReviews, ...snapshot.docs.map((doc) => doc.data() as ReviewHistory)]);
            const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
            setLastDoc(lastVisibleDoc ? lastVisibleDoc : null);
            console.log("LAST DOC: ", lastVisibleDoc);
        });
        // }
    }, [pageNumber]);

    const handleLoadMore = () => {
        setPageNumber(pageNumber + 1);
        // if (lastDoc) {
        //     setClicks(clicks + 1);
        //     console.log("LAST DOC: ", lastDoc);
        //     const next = query(collection(db, "users", userId, "reviewHistory"),
        //         orderBy("date", "desc"),
        //         startAfter(lastDoc),
        //         limit(2));
        //     getDocs(next).then((snapshot) => {
        //         setReviews(snapshot.docs.map((doc) => doc.data() as ReviewHistory));
        //         setLastDoc(snapshot.docs[snapshot.docs.length-1]?.ref || null);
        //     });
        // }
    }

    // Get the last visible document
    // const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
    // console.log("last", lastVisible);

    // Construct a new query starting at this document,
    // get the next 25 cities.
  

    return (
        <div>
            <h1>User Review History</h1>
            <ul>
                {reviews.map((review, index) => (
                    <li key={index}>
                        <p>{index}</p>
                        <p>Date: {review.date.toString()}</p>
                        <p>Influencer: {review.influencerId}</p>
                        <p>Post ID: {review.postId}</p>
                        {/* Add more fields as necessary */}
                    </li>
                ))}
            </ul>
            <button onClick={handleLoadMore}>
                Load More
            </button>
        </div>
    );
};

export default UserHistoryPageComponent;
