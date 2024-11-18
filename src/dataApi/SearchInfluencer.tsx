import { getFirestore, collection, getDocs } from 'firebase/firestore';

import { InfluencerData } from '../components/InfluencerDetails';

const queryInfluencers = async (): Promise<InfluencerData[]> => {
  const db = getFirestore();
  const influencersCol = collection(db, 'influencers');
  const influencerSnapshot = await getDocs(influencersCol);
  const influencerList: InfluencerData[] = influencerSnapshot.docs.map(doc => {
    const data = doc.data() as InfluencerData;
    data.influencerId = doc.id;
    return data;
  });
  return influencerList;
};

export {queryInfluencers};
