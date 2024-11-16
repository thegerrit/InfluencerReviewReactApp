import MediaHandle from './MediaHandle';

interface InfluencerData {
    influencerId: string;
    firstName: string;
    lastName: string;
    contact: string;
    starRating: number;
    popularMediaHandles: MediaHandle[];
    otherMediaHandles: MediaHandle[];
    numberOfReviews: number;
    tags: string[];
}

export default InfluencerData;
