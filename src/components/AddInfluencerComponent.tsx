import React, { useState } from 'react';
import TagsInputForm from './TagsInputForm';
import OtherSocialMediaForm from './OtherSocialMediaForm';
import SocialMediaForm from './SocialMediaForm';
import { db } from '../FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import InfluencerData from '../model/InfluencerData';

// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, addDoc, connectFirestoreEmulator } from 'firebase/firestore';

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAOUuvFA3c7pII5AYy1GD7f5SYeZTmz1Tw",
//   authDomain: "core-photon-441421-q4.firebaseapp.com",
//   projectId: "core-photon-441421-q4",
//   storageBucket: "core-photon-441421-q4.firebasestorage.app",
//   messagingSenderId: "243546574055",
//   appId: "1:243546574055:web:3c0f5cb99bca7b0282a642",
//   measurementId: "G-CZCF42FPP6"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// // Connect to Firestore emulator
// connectFirestoreEmulator(db, '127.0.0.1', 8080);

// Function to add influencer data to Firestore
async function addInfluencerToFirestore(influencerData: any) {
  try {
    const docRef = await addDoc(collection(db, 'influencers'), influencerData);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
// ... existing code ...

// interface influencerData {
//   firstName: string;
//   lastName: string;
//   contact: string;
//   socialMediaHandles: { platform: string; handle: string }[]
//   otherSocialMediaHandles: { platform: string; handle: string }[];
//   tags: string[];
//   numberOfReviews: number;
//   starRating: number;
// }



const AddInfluencerPage: React.FC = () => {
  const [influencerData, setInfluencerData] = useState<InfluencerData>({
    influencerId: 'place_holder_id',
    firstName: '',
    lastName: '',
    contact: '',
    starRating: -1,
    popularMediaHandles: [],
    otherMediaHandles: [],
    numberOfReviews: 0,
    tags: []
  });

  //function to update Text input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof InfluencerData, index?: number) => {
    if (index !== undefined && Array.isArray(influencerData[field])) {
      const updatedArray = [...(influencerData[field] as string[])];
      updatedArray[index] = e.target.value;
      setInfluencerData({
        ...influencerData,
        [field]: updatedArray,
      });
    } else {
      setInfluencerData({
        ...influencerData,
        [field]: e.target.value,
      });
    }
  };

  

  // Functions to update parent component state from children
  //-------- social media handles
  const updateMediaHandles = (handles: {platform: string, handle: string}[]) => {
    setInfluencerData((prevData) => ({
        ...prevData,
        socialMediaHandles: handles
    }));
  }
  // ------- other social media handles
  const updateOtherMediaHandles = (handles: {platform: string, handle: string}[]) => {
    setInfluencerData((prevData) => ({
        ...prevData,
        otherSocialMediaHandles: handles
    }));
  }

  // -------- tags in influencerData
  const addTag = (tag: string) => {
    setInfluencerData((prevData) => ({
      ...prevData,
      tags: [...prevData.tags, tag],
    }));
  };

  const removeTag = (index: number) => {
    setInfluencerData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form Data:', influencerData);
  };

  return (
    <div className="container mt-4">
      <h1 className="page-title">Enter Influencer Details</h1>
      <form onSubmit={handleSubmit}>

        {/* Basic Fields  */}
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={influencerData.firstName}
            onChange={(e) => handleChange(e, 'firstName')}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={influencerData.lastName}
            onChange={(e) => handleChange(e, 'lastName')}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contact" className="form-label">Contact</label>
          <input
            type="text"
            className="form-control"
            id="contact"
            value={influencerData.contact}
            onChange={(e) => handleChange(e, 'contact')}
          />
        </div>

        {/* Social Media Form Component */}
        < SocialMediaForm 
            updateParentMediaHandles={updateMediaHandles}
        />

        {/* OtherSocialMediaForm Component */}
        <OtherSocialMediaForm
            updateParentOtherMediaHandles={updateOtherMediaHandles}
        />

        {/* TagsInputForm Component */}
        <TagsInputForm tags={influencerData.tags} addTag={addTag} removeTag={removeTag} />

        {/* Submit button */}
        <div className="mt-4">
          <button type="submit" className="btn btn-primary" onClick={() => addInfluencerToFirestore(influencerData)}>
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInfluencerPage;
