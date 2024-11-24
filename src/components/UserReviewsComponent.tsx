// import { useEffect } from "react";
// import { useState } from "react";
// import getUserReviewHistory from "../dataApi/getUserReviewHistory";
// import Review from "../model/Review";
// import { auth } from "../utils/FirebaseConfig";
// import ReviewComponent from "./ReviewComponent";
import PaginatedReviews from "./PaginatedReviews";

const UserReviewsComponent: React.FC = () => {
    // const [reviews, setReviews] = useState<Review[]>([]);
    // const userId = useParams().userId;
    const userId = new URLSearchParams(window.location.search).get('userId');

    // useEffect(() => {
    //     const userId = auth.currentUser?.uid;
    //     if (userId) {
    //         getUserReviewHistory(userId).then(reviews => {
    //             console.log("REVIEWS: ", reviews);  
    //             setReviews(reviews);
    //         });
    //     } else {
    //         console.log("USER ID NOT FOUND");
    //         alert("Please login to view your review history.");
    //     }
    // }, []);
    return (
        <div>
            <h1>User Reviews</h1>
            {userId && <PaginatedReviews queryBy="userId" queryValue={userId} />}
        </div>
    );
}

export default UserReviewsComponent;
