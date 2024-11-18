import { collection, query, where, getDocs, limit, getDoc, doc } from 'firebase/firestore';
import { db } from '../utils/FirebaseConfig';

async function isUserHandleInUse(userHandle: string): Promise<boolean> {
    try {
        // const usersRef = db.collection('users');
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('userHandle', '==', userHandle), limit(1));
        const querySnapshot = await getDocs(q);
        // const querySnapshot = await usersRef.where('userHandle', '==', userHandle).limit(1).get();
        
        return !querySnapshot.empty;
    } catch (error) {
        console.error("Error checking user handle:", error);
        return true; // or handle the error as needed
    }
}

async function getUserHandleByUID(userId: string): Promise<string | null> {
    const userDocRef = doc(collection(db, 'users'), userId);
    const userDocSnapshot = await getDoc(userDocRef);
    return userDocSnapshot.exists() ? (userDocSnapshot.data().userHandle as string) : null;
}
export { isUserHandleInUse, getUserHandleByUID };
