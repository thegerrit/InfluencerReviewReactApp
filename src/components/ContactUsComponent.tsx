import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from '../utils/FirebaseConfig';
import WriteContactUsMsgToFirestore from '../dataApi/createContactUsMsg';

interface ContactUsMessage {
  userId: string,
  email: string,
  contactReason: string,
  additionalInfo: string,
  date: Date
}

const ContactUsComponent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [contactReason, setContactReason] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const userId = auth.currentUser?.uid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contactReason === '') {
      setErrorMessage('Please select a contact reason.');
      return;
    } else if (userId === undefined) {
      setErrorMessage('Please sign in to contact us.');
      return;
    }

    const contactUsMessage: ContactUsMessage = {
      userId: userId,
      email,
      contactReason,
      additionalInfo,
      date: new Date(),
    };

    // Call the function to write the message to Firestore
    await WriteContactUsMsgToFirestore(contactUsMessage);
    setHasSubmitted(true);
  };


  return (
    <div className="container mt-4">
      <h2>Contact Us</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {hasSubmitted && <p>Your message was submitted successfully.</p>}
      {!hasSubmitted && <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="contactEmail">Contact Email</label>
          <input
            type="email"
            className="form-control"
            id="contactEmail"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="contactReason">Contact Reason</label>
          <select
            className="form-control"
            id="contactReason"
            value={contactReason}
            onChange={(e) => setContactReason(e.target.value)}
          >
            <option value="">Select a reason</option>
            <option value="provideFeedback">Provide feedback</option>
            <option value="reportBug">Report a bug</option>
            <option value="requestInfo">Request collected info</option>
            <option value="updateUserProfile">Update your profile</option>
            <option value="deleteProfile">Delete my profile</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="additionalInfo">Additional Information</label>
          <textarea
            className="form-control"
            id="additionalInfo"
            rows={5}
            placeholder="Provide additional information here"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>}
    </div>
  );
};

export default ContactUsComponent;
