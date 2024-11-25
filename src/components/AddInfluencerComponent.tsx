import React, { useState } from 'react';
import TagsInputForm from './TagsInputForm';
import OtherSocialMediaForm from './OtherSocialMediaForm';
import SocialMediaForm from './SocialMediaForm';
import WriteInfluencerData from '../model/WriteInfluencerData';
import addInfluencerToFirestore from '../dataApi/addInfluencerToFirestore';
import { PLATFORMS } from '../utils/Constants';
import convertFieldsToLowercase from '../utils/Normalization';

const AddInfluencerPage: React.FC = () => {
  const [influencerData, setInfluencerData] = useState<WriteInfluencerData>({
    firstName: '',
    lastName: '',
    contact: '',
    starRating: 0,
    otherMediaHandles: [],
    numberOfReviews: 0,
    tags: []
  });

  //function to update Text input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof WriteInfluencerData, index?: number) => {
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
    for (const handle of handles) {
      if (handle.handle !== "" && PLATFORMS.includes(handle.platform)) {
        setInfluencerData((prevData) => ({
            ...prevData,
          [handle.platform.toLowerCase()]: handle.handle
        }));
      }
    }
  }
  // ------- other social media handles
  const updateOtherMediaHandles = (handles: {platform: string, handle: string}[]) => {
    setInfluencerData((prevData) => ({
        ...prevData,
        otherMediaHandles: handles
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
  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    //normalize text fields to make them searchable
    const writeInfluencerData = convertFieldsToLowercase(influencerData);

    await addInfluencerToFirestore(writeInfluencerData).then((newInfluencerId: string) => {
      //navigate to influencer page
      if (newInfluencerId !== "") {
        window.location.href = `/influencer?id=${newInfluencerId}`;
      }
    }).catch((error) => {
      console.error("Error adding influencer to Firestore: ", error);
    });
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
          <button type="submit" className="btn btn-primary">
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInfluencerPage;
