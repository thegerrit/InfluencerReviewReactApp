import { getFirestore, doc, getDoc } from "firebase/firestore";
import InfluencerData from "../model/InfluencerData";

// interface InfluencerData {
//   id: string;
//   name: string;
//   followers: number;
//   // Add other fields as necessary
// }

async function getInfluencerById(id: string): Promise<InfluencerData | null> {
  const db = getFirestore();
  const docRef = doc(db, "influencers", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const influencerData = docSnap.data() as InfluencerData;
    influencerData.influencerId = id;
    console.log(influencerData);
    return influencerData;
  } else {
    console.log("No such document!");
    return null;
  }
}

export default getInfluencerById;
