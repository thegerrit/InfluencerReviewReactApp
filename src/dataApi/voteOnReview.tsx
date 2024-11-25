import { doc, getDoc, collection, increment, runTransaction } from "firebase/firestore";
import { db } from "../utils/FirebaseConfig";

const voteOnReview = async (reviewId: string, userId: string, isUpvote: boolean) => {
    const reviewDocRef = doc(db, "reviews", reviewId);
    await runTransaction(db, async (transaction) => {
        console.log("Checking if user has voted on this review");
        const hasVoted = await hasUserVoted(reviewId, userId);
        if (hasVoted) {
            console.log("User has already voted on this review");
            return;
        } else {
            console.log("writing vote data");
            const reviewDoc = await transaction.get(reviewDocRef);
            if (!reviewDoc.exists()) {
                throw "Review does not exist!";
            }

            const newVotes = isUpvote ? { upvotes: increment(1) } : { downvotes: increment(1) };
            transaction.update(reviewDocRef, newVotes);

            const voteHistoryRef = collection(db, "users", userId, "voteHistory");
            transaction.set(doc(voteHistoryRef, reviewId), { isUpvote: isUpvote });

            console.log("vote data written: ", userId, ">", reviewId);
        }
    }).catch((error) => {
        console.error("Error voting on review: ", error);
    });
};

const hasUserVoted = async (reviewId: string, userId: string): Promise<boolean> => {
    const userDocVoteHistRef = doc(db, "users", userId, "voteHistory", reviewId);
    const userDocVoteHistSnap = await getDoc(userDocVoteHistRef);
    return userDocVoteHistSnap.exists();
};


export { voteOnReview, hasUserVoted };
