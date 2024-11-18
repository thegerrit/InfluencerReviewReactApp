interface Review {
    postId: string;
    userName: string;
    userId: string;
    influencerId: string;
    influencerName: string;
    isAnonymous: boolean;
    date: string;
    upvotes: number;
    downvotes: number;
    textContent: string;
    starRating: number;
  }

export default Review;