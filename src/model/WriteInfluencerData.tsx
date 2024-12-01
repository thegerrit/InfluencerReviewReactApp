import MediaHandle from './MediaHandle';

interface WriteInfluencerData {
    firstName: string;
    lastName: string;
    starRating: number;
    // popularMediaHandles: MediaHandle[];
    otherMediaHandles: MediaHandle[];
    numberOfReviews: number;
    tags: string[];
    dateCreated: Date;
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
    snapchat?: string;
    x?: string;
    threads?: string;
    linkedin?: string; 
}

export default WriteInfluencerData;
