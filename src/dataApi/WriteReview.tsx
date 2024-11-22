import { getFirestore, collection, doc, setDoc, addDoc } from "firebase/firestore"; 
import Review from "../model/Review";
const writeReviewToFirestore = async (review: Review, influencerId: string) => {
  const db = getFirestore();
  const influencerDocRef = doc(collection(db, "influencers"), influencerId);
  const reviewsCollectionRef = collection(influencerDocRef, "reviews");

  try {
    const reviewDocRef = await addDoc(reviewsCollectionRef, review);
    // const reviewDocRef = doc(reviewsCollectionRef, ).;
    // await setDoc(reviewDocRef, review);
    const votesCollectionRef = collection(reviewDocRef, "votes");
    await setDoc(doc(votesCollectionRef), {
      userId: review.userId,
      isUpvote: true
    });
    
    console.log("Review successfully written!");
  } catch (error) {
    console.error("Error writing review: ", error);
  }
}

export default writeReviewToFirestore;
