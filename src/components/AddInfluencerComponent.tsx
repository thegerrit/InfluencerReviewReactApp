import React, { useState } from 'react';
import TagsInputForm from './TagsInputForm';
import OtherSocialMediaForm from './OtherSocialMediaForm';
import SocialMediaForm from './SocialMediaForm';

interface FormData {
  firstName: string;
  lastName: string;
  contact: string;
  socialMediaHandles: { platform: string; handle: string }[]
  otherSocialMediaHandles: { platform: string; handle: string }[];
  tags: string[];
}

const AddInfluencerPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    contact: '',
    socialMediaHandles: [],
    otherSocialMediaHandles: [],
    tags: []
  });

  //function to update Text input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormData, index?: number) => {
    if (index !== undefined && Array.isArray(formData[field])) {
      const updatedArray = [...(formData[field] as string[])];
      updatedArray[index] = e.target.value;
      setFormData({
        ...formData,
        [field]: updatedArray,
      });
    } else {
      setFormData({
        ...formData,
        [field]: e.target.value,
      });
    }
  };

  

  // Functions to update parent component state from children
  //-------- social media handles
  const updateMediaHandles = (handles: {platform: string, handle: string}[]) => {
    setFormData((prevData) => ({
        ...prevData,
        socialMediaHandles: handles
    }));
  }
  // ------- other social media handles
  const updateOtherMediaHandles = (handles: {platform: string, handle: string}[]) => {
    setFormData((prevData) => ({
        ...prevData,
        otherSocialMediaHandles: handles
    }));
  }

  // -------- tags in formData
  const addTag = (tag: string) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: [...prevData.tags, tag],
    }));
  };

  const removeTag = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form Data:', formData);
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
            value={formData.firstName}
            onChange={(e) => handleChange(e, 'firstName')}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange(e, 'lastName')}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contact" className="form-label">Contact</label>
          <input
            type="text"
            className="form-control"
            id="contact"
            value={formData.contact}
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
        <TagsInputForm tags={formData.tags} addTag={addTag} removeTag={removeTag} />

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
