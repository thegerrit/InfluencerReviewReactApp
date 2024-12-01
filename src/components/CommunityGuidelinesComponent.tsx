import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CommunityGuidelinesComponent: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Community Guidelines</h1>
      <ol style={{fontSize: "1.2rem"}}>
        <li >All information posted on Influencer Review should be true.</li>
        <li >No hate speech, slander, or defamation.</li>
        <li >By creating a review you admit that you have worked with, or are currently working with the respective influencer.</li>
        <li >You agree that your reviews will be available to be read by other users of this website.</li>
      </ol>
    </div>
  );
};

export default CommunityGuidelinesComponent;
