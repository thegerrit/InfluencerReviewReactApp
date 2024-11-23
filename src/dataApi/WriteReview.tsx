import { getFirestore, collection, doc, increment, runTransaction } from "firebase/firestore"; 
import Review from "../model/Review";

const runningAverage = (oldAverage: number, starRating: number, numberOfReviews: number) => {
  return ((oldAverage * numberOfReviews) + starRating) / (numberOfReviews + 1);
}

const writeReviewToFirestore = async (review: Review, influencerId: string) => {
  const db = getFirestore();
  const influencerDocRef = doc(collection(db, "influencers"), influencerId);
  const reviewsCollectionRef = collection(influencerDocRef, "reviews");

  try {
    await runTransaction(db, async (transaction) => {
      const influencerDocSnapshot = await transaction.get(influencerDocRef);
      const influencerData = influencerDocSnapshot.data();

      if (influencerData) {
        // create the review
        const reviewDocRef = doc(reviewsCollectionRef);
        transaction.set(reviewDocRef, review);

        // update the influencer document with the average rating and number of reviews
        transaction.update(influencerDocRef, {
          starRating: runningAverage(influencerData.starRating, review.starRating, influencerData.numberOfReviews),
          numberOfReviews: increment(1)
        });

        // add a record of the review to the user's reviewHistoryCollection
        const userReviewHistoryCollectionRef = collection(doc(collection(db, "users"), review.userId), "reviewHistory");
        const userReviewHistoryDocRef = doc(userReviewHistoryCollectionRef);
        transaction.set(userReviewHistoryDocRef, {
          influencerId: influencerDocRef.id,
          postId: reviewDocRef.id,
          date: new Date()
        });
      } else {
        throw new Error("Influencer data is undefined");
      }
    });

    console.log("Review successfully written!");
  } catch (error) {
    console.error("Error writing review: ", error);
  }
}

export default writeReviewToFirestore;
