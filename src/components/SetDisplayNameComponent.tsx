import React, { useState } from 'react';
import { auth } from '../utils/FirebaseConfig';
import createOrUpdateUser from '../dataApi/UpdateUserDetails';
import User from '../model/User';

const SetDisplayNameComponent: React.FC = () => {
  const [displayName, setDisplayName] = useState('');
  const [contactEmail, setContactEmail] = useState(auth.currentUser?.email || '');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await createOrUpdateUser({
        uid: auth.currentUser?.uid,
        userHandle: displayName,
        email: contactEmail
    } as User);
    const [status, message] = response || ["", ""];
    if (status === "0") {
      //redirect to the main page
      window.location.href = '/';
    } else {
      setResponseMessage(message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Select a unique display name </h2>
      <h4 className="text-center mb-4">(in later versions of this website, you will be able to change it)</h4>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
        <div className="form-group mb-3">
          <label htmlFor="displayName">Display Name:</label>
          <input
            type="text"
            id="displayName"
            className="form-control"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="contactEmail">Contact Email (optional):</label>
          <input
            type="email"
            id="contactEmail"
            className="form-control"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>Save Display Name</button>
        <p className="text-center mt-3 text-danger">{responseMessage}</p>
      </form>
    </div>
  );
};

export default SetDisplayNameComponent;