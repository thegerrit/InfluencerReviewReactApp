import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import Review from "../model/Review";
import { db } from "../utils/FirebaseConfig";

const getUserReviewHistory = async (userId: string): Promise<Review[]> => {
    const reviewsCollectionRef = collection(db, "reviews");
    const q = query(reviewsCollectionRef, where("userId", "==", userId), orderBy("date", "desc"));
    const reviewsSnapshot = await getDocs(q);
    const reviewsList: Review[] = reviewsSnapshot.docs.map(doc => ({
        ...doc.data()}) as Review);
    return reviewsList;
}

export default getUserReviewHistory;
