import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddInfluencer: React.FC = () => {
  return (
    <div className="container d-flex justify-content-center my-4">
      <div className="row w-75">
        <div className="col-8 d-flex align-items-center">
          <p className="mb-0" style={{ fontSize: '1.2rem' }}>
            Can't find who you're looking for?
          </p>
        </div>
        <div className="col-4 d-flex justify-content-end">
          <button className="btn btn-primary" style={{ width: '100%' }}>
            Add Influencer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddInfluencer;
