import { getFirestore, collection, doc, updateDoc, addDoc, getDoc, increment } from "firebase/firestore"; 
import Review from "../model/Review";


const runningAverage = (oldAverage: number, starRating: number, numberOfReviews: number) => {
  return ((oldAverage * numberOfReviews) + starRating) / (numberOfReviews + 1);
}

const writeReviewToFirestore = async (review: Review, influencerId: string) => {
  const db = getFirestore();
  const influencerDocRef = doc(collection(db, "influencers"), influencerId);
  const reviewsCollectionRef = collection(influencerDocRef, "reviews");


  try {
    const influencerDocSnapshot = await getDoc(influencerDocRef);
    const influencerData = influencerDocSnapshot.data();
    // create the review
    await addDoc(reviewsCollectionRef, review);

    // update the influencer document with the average rating and number of reviews
    if (influencerData) {
      const result = await updateDoc(influencerDocRef, {
        starRating: runningAverage(influencerData.starRating, review.starRating, influencerData.numberOfReviews),
        numberOfReviews: increment(1)
      });
      console.log("number of reviews updated", result);
    } else {
      console.error("Influencer data is undefined");
    }
    
    console.log("Review successfully written!");
  } catch (error) {
    console.error("Error writing review: ", error);
  }
}

export default writeReviewToFirestore;
