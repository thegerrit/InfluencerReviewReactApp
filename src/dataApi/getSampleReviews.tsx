import { collection, getDocs, limit, query, orderBy, Query } from "firebase/firestore";
import Review from "../model/Review";
import { db } from "../utils/FirebaseConfig";

// todo: restructure data so reviews are not nested in influencers
const getSampleReviews = async (): Promise<Review[]> => {
    const influencersCollectionRef = collection(db, "reviews");
    const q: Query = query(influencersCollectionRef, orderBy("date", "desc"), limit(10));
    const reviewsSnapshot = await getDocs(q);
    const sampleReviews: Review[] = reviewsSnapshot.docs.map(doc => ({
        postId: doc.id,
        ...doc.data()}) as Review);
    return sampleReviews;
};

export default getSampleReviews;


