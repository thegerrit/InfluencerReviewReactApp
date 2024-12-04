import { getFirestore, doc, getDoc } from "firebase/firestore";
import ReadInfluencerData from "../model/ReadInfluencerData";

async function getInfluencerById(id: string): Promise<ReadInfluencerData | null> {
  const db = getFirestore();
  const docRef = doc(db, "influencers", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const influencerData = docSnap.data() as ReadInfluencerData;
    influencerData.influencerId = id;
    // console.log(influencerData);
    return influencerData;
  } else {
    // console.log("No such document!");
    return null;
  }
}

export default getInfluencerById;
