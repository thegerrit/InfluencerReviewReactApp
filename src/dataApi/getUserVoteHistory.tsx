import { getFirestore, collection, getDocs } from "firebase/firestore";

const getUserVoteHistory = async (userId: string): Promise<string[]> => {    
    if (userId === "") {
        return [];
    }

    const db = getFirestore();
    const voteHistoryRef = collection(db, 'users', userId, "voteHistory");
    const voteHistorySnapshot = await getDocs(voteHistoryRef);

    // console.log("vote history retrieved:");
    if (voteHistorySnapshot.size > 0) {
        return voteHistorySnapshot.docs.map(doc => doc.id);
    } else {
        return [];
    }
}

export { getUserVoteHistory };
