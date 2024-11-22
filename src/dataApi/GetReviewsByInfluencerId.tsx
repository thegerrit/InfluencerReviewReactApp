import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";
import Review from "../model/Review";
// import { auth } from "../utils/FirebaseConfig";

async function getReviewsByInfluencerId(influencerId: string): Promise<Review[]> {
  const db = getFirestore();
  const influencerDocRef = doc(db, "influencers", influencerId);
  const influencerDocSnap = await getDoc(influencerDocRef);
  // const currentUserId = auth.currentUser?.uid;

  if (influencerDocSnap.exists()) {
    const reviewsColRef = collection(influencerDocRef, "reviews");
    const reviewsSnapshot = await getDocs(reviewsColRef);
    
    const reviewsList: Review[] = reviewsSnapshot.docs.map(doc => ({
      postId: doc.id,
        ...doc.data()}) as Review);
    console.log(reviewsList);
    return reviewsList;
  } else {
    console.log("No such document!");
    return [];
  }
}

export default getReviewsByInfluencerId;
