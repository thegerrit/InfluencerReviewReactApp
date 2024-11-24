import { collection, getDocs, query, getFirestore, limit, orderBy, QuerySnapshot, Query, startAfter, DocumentSnapshot, doc, getDoc, endBefore, limitToLast, endAt} from "firebase/firestore";
import Review from "../model/Review";
// import ReviewHistory from "../model/ReviewHistory";

// Function to fetch reviews with a startAfterDoc
// 
const fetchReviewHistoryByUserId = async (userId: string, docAfter: DocumentSnapshot | null, pageSize: number, mode: string): Promise<QuerySnapshot> => {
    const db = getFirestore();
    const reviewsCollectionRef = collection(db, "users", userId, "reviewHistory");

    let q: Query;
    if (mode === 'initial') {
        q = query(reviewsCollectionRef, orderBy("date"), limit(pageSize));
    } else if (mode === 'forward') {
        q = query(reviewsCollectionRef, orderBy("date"), limit(pageSize), startAfter(docAfter));
    } else if (mode === 'backward') {
        q = query(reviewsCollectionRef, orderBy("date"), limitToLast(pageSize), endBefore(docAfter));
    } else if (mode === 'backFromFinalPage') {
        q = query(reviewsCollectionRef, orderBy("date"), limitToLast(pageSize), endAt(docAfter));
    } else {
        throw new Error("Invalid mode: " + mode);
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



export { fetchReviewHistoryByUserId, fetchReviewsByInfluencerAndPost};
