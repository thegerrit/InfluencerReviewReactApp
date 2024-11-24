interface WriteReview {
  // postId: string;
  userId: string;
  // userName: string;
  influencerId: string;
  influencerName: string;
  isAnonymous: boolean;
  date: string;
  textContent: string;
  starRating: number;
  // upvotes: number;
  // downvotes: number;
}

interface Review extends WriteReview {
  postId: string;
  userName: string;
  upvotes: number; 
  downvotes: number;
}

export type{ WriteReview, Review };