import { getFirestore, collection, getDocs } from 'firebase/firestore';

import { InfluencerData } from '../components/InfluencerDetails';

const queryInfluencers = async (): Promise<InfluencerData[]> => {
  const db = getFirestore();
  const influencersCol = collection(db, 'influencers');
  const influencerSnapshot = await getDocs(influencersCol);
  const influencerList: InfluencerData[] = influencerSnapshot.docs.map(doc => doc.data() as InfluencerData);
  return influencerList;
};

// queryInfluencers().then(influencers => {
//   console.log('Influencers:', influencers);
// }).catch(error => {
//   console.error('Error querying influencers:', error);
// });

export {queryInfluencers};
