import { getFirestore, collection, doc, increment, runTransaction } from "firebase/firestore"; 
import Review from "../model/Review";

const runningAverage = (oldAverage: number, starRating: number, numberOfReviews: number) => {
  return ((oldAverage * numberOfReviews) + starRating) / (numberOfReviews + 1);
}

const writeReviewToFirestore = async (review: Review, influencerId: string) => {
  const db = getFirestore();
  const reviewsCollectionRef = collection(db, "reviews");
  const influencerDocRef = doc(db, "influencers", influencerId);

  try {
    await runTransaction(db, async (transaction) => {
      const influencerDocSnapshot = await transaction.get(influencerDocRef);
      const influencerData = influencerDocSnapshot.data();
      console.log("INFLUENCER DATA: ", influencerData);
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
        // the flat structure for reviews means this is not needed
        // const userReviewHistoryCollectionRef = collection(doc(collection(db, "users"), review.userId), "reviewHistory");
        // const userReviewHistoryDocRef = doc(userReviewHistoryCollectionRef);
        // transaction.set(userReviewHistoryDocRef, {
        //   influencerId: influencerDocRef.id,
        //   postId: reviewDocRef.id,
        //   date: new Date()
        // });
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
