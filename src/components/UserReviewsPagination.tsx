import { QuerySnapshot } from "firebase/firestore";
// import { doc, getDoc, getFirestore, QuerySnapshot } from "firebase/firestore";
import Review from "../model/Review";
import { useEffect, useState } from "react";
import ReviewComponent from "./ReviewComponent";
import { fetchReviewsByInfluencerAndPost } from "../dataApi/fetchReviewsByUserId";


interface UserReviewsPaginationProps {
    reviewHistoryDocs: QuerySnapshot | null;
}
const UserReviewsPagination: React.FC<UserReviewsPaginationProps> = ({ reviewHistoryDocs }) => {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            let tempReviews: Review[] = [];
            // console.log("reviewHistoryDocs: ", reviewHistoryDocs);
            if (reviewHistoryDocs) {
                
                await Promise.all(reviewHistoryDocs.docs.map(async (reviewHistDoc) => {
                    // console.log("reviewHistDoc: ", reviewHistDoc.data());
                    await fetchReviewsByInfluencerAndPost(reviewHistDoc.data().influencerId, reviewHistDoc.data().postId)
                        .then((review) => {
                            tempReviews.push(review);
                        });
                })).then(() => setReviews(tempReviews))
                .finally(() => {
                    console.log("final reviews array: ", reviews);
                    // console.log("reviews800: ", reviews);
                });
                // console.log("reviewsArray77: ", reviews);
            } else {
                console.log("No review history docs");
            }
            // console.log("tempREVIEWS: ", tempReviews);
            // console.log("reviews: ", reviews);
        }
        fetchReviews();
        // console.log("reviews part 2: ", reviews);
    }, [reviewHistoryDocs]);

    return (
        <div>
            
            <h3>User Reviews Pagination</h3>
            <p>reviews: {reviews.length}</p>
            {reviews.map((review) => (
                <ReviewComponent reviewData={review} />
            ))}
        </div>
    );
}

export default UserReviewsPagination;
