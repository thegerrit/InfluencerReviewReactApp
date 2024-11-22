import { addDoc, collection } from "firebase/firestore";
import { db } from "../utils/FirebaseConfig";

async function addInfluencerToFirestore(influencerData: any): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'influencers'), influencerData);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
      return "";
    }
  }

  export default addInfluencerToFirestore;
