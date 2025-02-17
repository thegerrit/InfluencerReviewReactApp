import React, { useState, useEffect } from 'react';
import { getReviewsWithPagination } from "../dataApi/GetReviewsByInfluencerId";
import ReviewComponent from "./ReviewComponent";
import { DocumentSnapshot, QuerySnapshot, where } from "firebase/firestore";
import { Review } from '../model/Review';
interface PaginatedReviewsProps {
    queryBy: "influencerId" | "userId";
    queryValue: string;
}
const PAGE_SIZE = 10;
const PaginatedReviews: React.FC<PaginatedReviewsProps> = ({ queryBy, queryValue }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(1);
    const [firstDoc, setFirstDoc] = useState<DocumentSnapshot | null>(null);
    const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
    const [mode, setMode] = useState<"next" | "previous" | "backFromLast" | "initial">("initial");

    useEffect(() => {
        console.log("queryBy: ", queryBy);
        console.log("queryValue: ", queryValue);
        const fetchReviews = async () => {
            let reviewsSnapshot: QuerySnapshot;
            if (mode === "initial") {
                reviewsSnapshot = await getReviewsWithPagination(where(queryBy, "==", queryValue), PAGE_SIZE, null, mode);
            } else if (mode === "next" || mode === "backFromLast") {
                reviewsSnapshot = await getReviewsWithPagination(where(queryBy, "==", queryValue), PAGE_SIZE, lastDoc, mode);
            } else if (mode === "previous") {
                reviewsSnapshot = await getReviewsWithPagination(where(queryBy, "==", queryValue), PAGE_SIZE, firstDoc, mode);
            } else {
                throw new Error("Invalid pagination mode. Use 'next' or 'previous'.");
            }
            const someReviews: Review[] = reviewsSnapshot.docs.map(doc => ({
                postId: doc.id,
                ...doc.data()
            }) as Review);
            setReviews(someReviews);
            console.log("someReviews: ", someReviews);

            if (someReviews.length > 0) {
                // setFirstDoc(lastDoc);
                // } else {
                setFirstDoc(reviewsSnapshot.docs[0]);
                setLastDoc(reviewsSnapshot.docs[reviewsSnapshot.docs.length - 1]);
            }

            // setTotalPages(totalPages);
        };

        fetchReviews();
    }, [currentPage]);

    const handleNextPage = () => {
        // if (currentPage < totalPages) {
        setMode("next");
        setCurrentPage(currentPage + 1);
        // }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            if (currentPage === 1) {
                setMode("initial");
            } else {
                setMode((reviews.length === 0) ? "backFromLast" : "previous");
            }
        }
    };

    return (
        <div>
            {/* {reviews.map((review, index) => (
                <ReviewComponent key={index} reviewData={review} />
            ))} */}
            {reviews.map((review) => (
                <ReviewComponent {...review} />
            ))}
            <div className="d-flex justify-content-between mt-3">
                <button
                    className="btn btn-primary"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>{currentPage}</span>
                <button
                    className="btn btn-primary"
                    onClick={handleNextPage}
                    disabled={reviews.length < PAGE_SIZE}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default PaginatedReviews;