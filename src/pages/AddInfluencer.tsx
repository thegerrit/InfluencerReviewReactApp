import React, { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  contact: string;
  socialMediaHandles: string[];
  otherSocialMediaHandles: string[];
  tags: string[];
}

const AddInfluencerPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    contact: '',
    socialMediaHandles: [''],
    otherSocialMediaHandles: [''],
    tags: [''],
  });

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

  const handleAddField = (field: keyof FormData) => {
    if (Array.isArray(formData[field])) {
      setFormData({
        ...formData,
        [field]: [...(formData[field] as string[]), ''],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container mt-4" >
        {/* data-bs-theme="light" */}
      <h2>Add Influencer</h2>
      <form onSubmit={handleSubmit}>
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

        <div className="mb-3">
          <label className="form-label">Social Media Handles</label>
          {formData.socialMediaHandles.map((handle, index) => (
            <input
              key={index}
              type="text"
              className="form-control mb-2"
              value={handle}
              onChange={(e) => handleChange(e, 'socialMediaHandles', index)}
              placeholder={`Handle #${index + 1}`}
            />
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => handleAddField('socialMediaHandles')}
          >
            Add Another Social Media Handle
          </button>
        </div>

        <div className="mb-3">
          <label className="form-label">Other Social Media Handles</label>
          {formData.otherSocialMediaHandles.map((handle, index) => (
            <input
              key={index}
              type="text"
              className="form-control mb-2"
              value={handle}
              onChange={(e) => handleChange(e, 'otherSocialMediaHandles', index)}
              placeholder={`Other Handle #${index + 1}`}
            />
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => handleAddField('otherSocialMediaHandles')}
          >
            Add Another Other Social Media Handle
          </button>
        </div>

        <div className="mb-3">
          <label className="form-label">Tags</label>
          {formData.tags.map((tag, index) => (
            <input
              key={index}
              type="text"
              className="form-control mb-2"
              value={tag}
              onChange={(e) => handleChange(e, 'tags', index)}
              placeholder={`Tag #${index + 1}`}
            />
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => handleAddField('tags')}
          >
            Add Another Tag
          </button>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddInfluencerPage;
