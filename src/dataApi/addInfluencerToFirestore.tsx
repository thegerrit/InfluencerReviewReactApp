import { addDoc, collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../utils/FirebaseConfig";
// import ReadInfluencerData from "../model/ReadInfluencerData";
import { PLATFORMS } from "../utils/Constants";
import WriteInfluencerData from "../model/WriteInfluencerData";

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

async function checkHandlesInUse(influencer: WriteInfluencerData): Promise<string[]> {
  const handlesInUse: string[] = [];
  const handleChecks = PLATFORMS.map(async (platform: string) => {
    if (influencer[platform.toLowerCase() as keyof WriteInfluencerData]) {
      const queryRef = query(collection(db, 'influencers'), where(platform.toLowerCase(), '==', influencer[platform.toLowerCase() as keyof WriteInfluencerData]));
      const docs = await getDocs(queryRef);
      if (docs.size > 0) {
        handlesInUse.push(platform.toLowerCase() + ":" + influencer[platform.toLowerCase() as keyof WriteInfluencerData]);
      }
    }
  });

  await Promise.all(handleChecks);

  if (handlesInUse.length > 0) {
    const returnMessage = "The following handles are already in use: " + handlesInUse.join(", ");
    return ["1", returnMessage];
  } else {
    return ["0", "all handles are available."];
  }
}

export { addInfluencerToFirestore, checkHandlesInUse };
