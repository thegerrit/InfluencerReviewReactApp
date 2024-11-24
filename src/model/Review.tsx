interface Review {
  postId: string;
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

export default Review;