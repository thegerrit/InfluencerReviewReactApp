import { getFirestore, collection, doc, increment, runTransaction } from "firebase/firestore"; 
import {WriteReview} from "../model/Review";

const runningAverage = (oldAverage: number, starRating: number, numberOfReviews: number) => {
  return ((oldAverage * numberOfReviews) + starRating) / (numberOfReviews + 1);
}

const writeReviewToFirestore = async (review: WriteReview, influencerId: string) => {
  const db = getFirestore();
  const reviewsCollectionRef = collection(db, "reviews");
  const influencerDocRef = doc(db, "influencers", influencerId);

  try {
    await runTransaction(db, async (transaction) => {
      const influencerDocSnapshot = await transaction.get(influencerDocRef);
      const influencerData = influencerDocSnapshot.data();
      // console.log("INFLUENCER DATA: ", influencerData);
      if (influencerData) {
        const userDisplayName = await transaction.get(doc(db, "users", review.userId))
        // create the review
        const reviewDocRef = doc(reviewsCollectionRef);
        transaction.set(reviewDocRef, {
          ...review,
          upvotes: 0,
          downvotes: 0,
          userName: userDisplayName.data()?.userHandle
        });

        // update the influencer document with the average rating and number of reviews
        transaction.update(influencerDocRef, {
          starRating: runningAverage(influencerData.starRating, review.starRating, influencerData.numberOfReviews),
          numberOfReviews: increment(1)
        });

      } else {
        throw new Error("Influencer data is undefined");
      }
    });

    // console.log("Review successfully written!");
  } catch (error) {
    console.error("Error writing review: ", error);
  }
}

export default writeReviewToFirestore;
