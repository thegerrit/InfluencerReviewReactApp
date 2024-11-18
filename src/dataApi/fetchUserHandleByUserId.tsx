import { getFirestore, doc, getDoc } from "firebase/firestore";

const fetchUserHandleByUserId = async (userId: string) => {
    const db = getFirestore();
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      console.log("user Id exists");
      console.log(userSnap.data());
      return userSnap.data().userHandle;
    } else {
      console.log("user Id does not exist");
      console.log(userId);
      console.log('No such document!');
      return '';
    }
  };

  export default fetchUserHandleByUserId;