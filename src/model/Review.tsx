interface Review {
    postId: string;
    userId: string;
    influencerId: string;
    influencerName: string;
    isAnonymous: boolean;
    date: string;
    textContent: string;
    starRating: number;
  }

export default Review;