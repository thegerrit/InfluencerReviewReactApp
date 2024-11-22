import MediaHandle from './MediaHandle';

interface WriteInfluencerData {
    firstName: string;
    lastName: string;
    contact: string;
    starRating: number;
    popularMediaHandles: MediaHandle[];
    otherMediaHandles: MediaHandle[];
    numberOfReviews: number;
    tags: string[];
}

export default WriteInfluencerData;
