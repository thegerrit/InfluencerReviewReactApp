import MediaHandle from './MediaHandle';

interface ReadInfluencerData {
    influencerId: string;
    firstName: string;
    lastName: string;
    contact: string;
    starRating: number;
    // popularMediaHandles: MediaHandle[];
    otherMediaHandles: MediaHandle[];
    numberOfReviews: number;
    tags: string[];
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
    snapchat?: string;
    x?: string;
    threads?: string;
    linkedin?: string; 
}

export default ReadInfluencerData;
