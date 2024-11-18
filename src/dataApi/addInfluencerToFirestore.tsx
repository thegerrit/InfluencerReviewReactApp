import { addDoc, collection } from "firebase/firestore";
import { db } from "../utils/FirebaseConfig";

async function addInfluencerToFirestore(influencerData: any) {
    try {
      const docRef = await addDoc(collection(db, 'influencers'), influencerData);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  export default addInfluencerToFirestore;
