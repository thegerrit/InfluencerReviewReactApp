import { getFirestore, doc, getDoc, collection, addDoc } from "firebase/firestore";

//TODO: refactor
const voteOnReview = async (influencerId: string, reviewId: string, userId: string, isUpvote: boolean) => {
    const db = getFirestore();
    const influencerDocRef = doc(db, "influencers", influencerId);
    const influencerDocSnap = await getDoc(influencerDocRef);

    if (influencerDocSnap.exists()) {
        const reviewDocRef = doc(collection(influencerDocRef, "reviews"), reviewId);
        const reviewDocSnap = await getDoc(reviewDocRef);
        if (reviewDocSnap.exists()) {
            const votesColRef = collection(reviewDocRef, "votes");
            const vote = {
                userId: userId,
                isUpvote: isUpvote
            };
            await addDoc(votesColRef, vote);
            console.log("Vote added successfully");
        } else {
            console.log("Review document does not exist");
        }
    } else {
        console.log("Influencer document does not exist");
    }
};

export default voteOnReview;
