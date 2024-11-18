import { getFirestore, collection, doc, setDoc } from "firebase/firestore"; 
import Review from "../model/Review";
const writeReviewToFirestore = async (review: Review, influencerId: string) => {
  const db = getFirestore();
  const influencerDocRef = doc(collection(db, "influencers"), influencerId);
  const reviewsCollectionRef = collection(influencerDocRef, "reviews");

  try {
    await setDoc(doc(reviewsCollectionRef), review);
    console.log("Review successfully written!");
  } catch (error) {
    console.error("Error writing review: ", error);
  }
}

export default writeReviewToFirestore;
