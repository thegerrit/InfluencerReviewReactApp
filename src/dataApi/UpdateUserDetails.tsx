import { collection, doc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';
import { setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../utils/FirebaseConfig';
// import { updateProfile } from 'firebase/auth';
import User from '../model/User';
import { isUserHandleInUse } from './IsUserHandleInUse';

const createOrUpdateUser = async (FBuser: User) => {
    if (auth.currentUser) {
        if (FBuser.userHandle === null || FBuser.userHandle === '') {
            return ["1", "Please choose a display name."];
        } else if (await isUserHandleInUse(FBuser.userHandle)) {
            return ["1", "This display name is already in use. Please choose another one."];
        }
        //update firebase auth display name
        // await updateProfile(auth.currentUser, { displayName: FBuser.userHandle,
        //     email: FBuser.email
        //  });

        //check if user document exists, if not, create it
        const userDocRef = doc(collection(db, 'users'), auth.currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (!userDocSnapshot.exists()) {
            await setDoc(doc(collection(db, 'users'), auth.currentUser.uid), {
                email: FBuser.email,
                uid: auth.currentUser.uid,
                userHandle: FBuser.userHandle
                // Add any other attributes you want to save here
            });
        } else {
            await updateDoc(userDocRef, {
                email: FBuser.email,
                userHandle: FBuser.userHandle
                // Add any other attributes you want to save here
            });
        }
        return ["0", "User details updated successfully."];
    }
}

export default createOrUpdateUser;
