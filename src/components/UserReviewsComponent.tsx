import PaginatedReviews from "./PaginatedReviews";

const UserReviewsComponent: React.FC = () => {
    const userId = new URLSearchParams(window.location.search).get('userId');
    return (
        <div>
            <h1>User Reviews</h1>
            {userId && <PaginatedReviews queryBy="userId" queryValue={userId} />}
        </div>
    );
}

export default UserReviewsComponent;
