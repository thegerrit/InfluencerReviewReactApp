import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import User from "../model/User";

const fetchUserDataByUserId = async (userId: string) => {
    const db = getFirestore();
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        console.log("User ID exists");
        console.log(userSnap.data());
        return userSnap.data() as User;
    } else {
        console.log("User ID does not exist");
        console.log(userId);
        console.log('No such document!');
        return null;
    }
};

const updateUserDataByUserId = async (userId: string, displayName: string, contactEmail: string) => {
    const db = getFirestore();
    const userRef = doc(db, 'users', userId);

    try {
        await updateDoc(userRef, {
            userHandle: displayName,
            email: contactEmail
        });
        console.log("User data updated successfully");
        return ["0", "User data updated successfully"];
    } catch (error) {
        console.error("Error updating user data: ", error);
        return ["1", "Error updating user data"];
    }
};

export { fetchUserDataByUserId, updateUserDataByUserId };