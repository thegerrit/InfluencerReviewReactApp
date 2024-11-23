import { collection, getDocs, query, getFirestore, limit, orderBy, QuerySnapshot, Query, startAfter, DocumentSnapshot, doc, getDoc} from "firebase/firestore";
import Review from "../model/Review";
// import ReviewHistory from "../model/ReviewHistory";

// Function to fetch reviews with a startAfterDoc
// 
const fetchReviewHistoryByUserId = async (userId: string, docAfter: DocumentSnapshot | null, pageSize: number): Promise<QuerySnapshot> => {
    const db = getFirestore();
    const reviewsCollectionRef = collection(db, "users", userId, "reviewHistory");

    let q: Query;
    if (docAfter) {
        q = query(reviewsCollectionRef, orderBy("date"), limit(pageSize), startAfter(docAfter));
    } else {
        q = query(reviewsCollectionRef, orderBy("date"), limit(pageSize));
    }
    const reviewsHistorySnapshot = await getDocs(q);
    console.log("REVIEWS HISTORY SNAPSHOT: ", reviewsHistorySnapshot);
    return reviewsHistorySnapshot;

};

const fetchReviewsByInfluencerAndPost = async (influencerId: string, postId: string): Promise<Review> => {
    const db = getFirestore();
    const reviewDocRef = doc(db, "influencers", influencerId, "reviews", postId);
    const reviewDocSnap = await getDoc(reviewDocRef);
    return reviewDocSnap.data() as Review;
};

// Function to fetch the first 10 reviews
// const fetchFirst10ReviewReferences = async (userId: string): Promise<DocumentReference[]> => {
//     console.log("FETCHING FIRST 10 REVIEWS: ", userId);
//     const db = getFirestore();
//     const reviewsCollectionRef = collection(db, "users", userId, "reviewHistory");

//     const q = query(reviewsCollectionRef, orderBy("date", "desc"), limit(10));
//     const reviewsHistorySnapshot = await getDocs(q) as QuerySnapshot<ReviewHistory>;
//     const reviewHistoryDocs: ReviewHistory[] = reviewsHistorySnapshot.docs.map((doc) => doc.data());

//     const reviewDocRefs = reviewHistoryDocs.map((reviewHist) => 
//         doc(db, "influencers", reviewHist.influencerId, "reviews", reviewHist.postId)
//     );

//     console.log("REVIEW DOC REFERENCES from First 10: ", reviewDocRefs.length);
//     return reviewDocRefs;

//     // const reviewDocs = await Promise.all(reviewDocRefs.map((reviewDocRef) => getDoc(reviewDocRef)));
//     // const reviews: Review[] = reviewDocs.map((doc) => doc.data() as Review);

//     // return reviews;
// };

export { fetchReviewHistoryByUserId, fetchReviewsByInfluencerAndPost};
