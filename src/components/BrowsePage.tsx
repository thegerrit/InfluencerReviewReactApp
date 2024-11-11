import React from 'react';
import Review from './Review';
import "../styles/common.css";

const BrowsePage: React.FC = () => {

    const sampleReview = {
        "postId": "98765",
        "userName":"hannable",
        "userId": "12345",
        "influencerId": "67890",
        "influencerName": "pewDiePie",
        "isAnonymous": false,
        "date": "2024-11-08T14:30:00Z",
        "upvotes": 120,
        "downvotes": 5,
        "textContent": "A banana is an elongated, edible fruit – botanically a berry[1] – produced by several kinds of large herbaceous flowering plants in the genus Musa. In some countries, cooking bananas are called plantains, distinguishing them from dessert bananas. The fruit is variable in size, color and firmness, but is usually elongated and curved, with soft flesh rich in starch covered with a peel, which may have a variety of colors when ripe. It grows upward in clusters near the top of the plant. Almost all modern edible seedless (parthenocarp) cultivated bananas come from two wild species – Musa acuminata and Musa balbisiana, or hybrids of them.\n Musa species are native to tropical Indomalaya and Australia; they were probably domesticated in New Guinea. They are grown in 135 countries, primarily for their fruit, and to a lesser extent to make banana paper and textiles, while some are grown as ornamental plants. The world's largest producers of bananas in 2022 were India and China, which together accounted for approximately 26% of total production. Bananas are eaten raw or cooked in recipes varying from curries to banana chips, fritters, fruit preserves, or simply baked or steamed.",
        "starRating":4
      }
    return (
        <div>
            <h1 className="page-title">Browse Recent Posts</h1>
            <Review reviewData={sampleReview} />
        </div>
        
    );
  };

export default BrowsePage;