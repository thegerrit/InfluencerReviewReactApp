import { getFirestore, collection, getDocs, where, query, orderBy, limit, QuerySnapshot, DocumentSnapshot, Query, startAfter, endBefore, limitToLast, endAt } from 'firebase/firestore';

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

const searchInfluencersByField = async (searchTerm: string, searchField: string): Promise<ReadInfluencerData[]> => {
  const db = getFirestore();
  const influencersCol = collection(db, 'influencers');
  const q = query(influencersCol, where(searchField, '==', searchTerm));
  const influencerSnapshot = await getDocs(q);
  const influencerList: ReadInfluencerData[] = influencerSnapshot.docs.map(doc => {
    const data = doc.data() as ReadInfluencerData;
    data.influencerId = doc.id;
    return data;
  });
  return influencerList;
};

const searchInfluencersWithPagination = async (searchTerm: string, searchField: string, pageSize: number, cursor: DocumentSnapshot | null, mode: "next" | "previous" | "backFromLast" | "initial"): Promise<QuerySnapshot> => {
  const db = getFirestore();
  const influencersCol = collection(db, 'influencers');
  let q: Query;
  if (mode === "initial"){
    q = query(influencersCol, where(searchField, '==', searchTerm), orderBy("dateCreated", "desc"), limit(pageSize));
  } else if (mode === "next"){
    q = query(influencersCol, where(searchField, '==', searchTerm), orderBy("dateCreated", "desc"), startAfter(cursor), limit(pageSize));
  } else if (mode === "previous"){
    q = query(influencersCol, where(searchField, '==', searchTerm), orderBy("dateCreated", "desc"), endBefore(cursor), limitToLast(pageSize));
  } else if (mode === "backFromLast"){
    q = query(influencersCol, where(searchField, '==', searchTerm), orderBy("dateCreated", "desc"), endAt(cursor), limitToLast(pageSize));
  } else {
    throw new Error("Invalid pagination mode.");
  }
  const influencerSnapshot = await getDocs(q);
  return influencerSnapshot;
};

// const searchInfluencerByArrayField = async (searchTerm: string, searchField: string, ): Promise<ReadInfluencerData[]> => {

export {queryInfluencers, searchInfluencersByField, searchInfluencersWithPagination};
