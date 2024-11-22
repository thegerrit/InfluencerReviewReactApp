import { getFirestore, collection, getDocs } from 'firebase/firestore';

// import { ReadInfluencerData } from '../components/InfluencerDetails';
import ReadInfluencerData from '../model/ReadInfluencerData';

const queryInfluencers = async (): Promise<ReadInfluencerData[]> => {
  const db = getFirestore();
  const influencersCol = collection(db, 'influencers');
  const influencerSnapshot = await getDocs(influencersCol);
  const influencerList: ReadInfluencerData[] = influencerSnapshot.docs.map(doc => {
    const data = doc.data() as ReadInfluencerData;
    data.influencerId = doc.id;
    return data;
  });
  return influencerList;
};

export {queryInfluencers};
