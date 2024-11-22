import { getFirestore, doc, collection, getDocs } from "firebase/firestore";
import VoteDetails from "../model/VoteDetails";
import { auth } from "../utils/FirebaseConfig";

const fetchVoteDetailsByReviewId = async (influencerId: string, reviewId: string) => {
    const db = getFirestore();
    const influencerDocRef = doc(collection(db, "influencers"), influencerId);
    const reviewDocRef = doc(collection(influencerDocRef, "reviews"), reviewId);
    const votesCollectionRef = collection(reviewDocRef, "votes");
    const currentUserId = auth.currentUser?.uid;

    try {
        const votesSnapshot = await getDocs(votesCollectionRef);
        const voteDetails: VoteDetails = {
            upvotes: votesSnapshot.docs.filter((vote) => vote.data().isUpvote).length,
            downvotes: votesSnapshot.docs.filter((vote) => !vote.data().isUpvote).length,
            hasVoted: votesSnapshot.docs.some((vote) => vote.data().userId === currentUserId)   
        };
        console.log("Votes successfully fetched!");
        return voteDetails;
    } catch (error) {
        console.error("Error fetching votes: ", error);
        return null;
    }
}

export default fetchVoteDetailsByReviewId;
