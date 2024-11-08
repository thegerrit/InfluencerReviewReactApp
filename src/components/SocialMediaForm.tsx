import React, { useState } from 'react';
import '../styles/themes.css';

interface SocialMediaHandles {
  instagram: string;
  facebook: string;
  tiktok: string;
  youtube: string;
  snapchat: string;
  x: string;
  threads: string;
  linkedin: string;
}

const SocialMediaForm: React.FC = () => {
  const [handles, setHandles] = useState<SocialMediaHandles>({
    instagram: '',
    facebook: '',
    tiktok: '',
    youtube: '',
    snapchat: '',
    x: '',
    threads: '',
    linkedin: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, platform: keyof SocialMediaHandles) => {
    setHandles({
      ...handles,
      [platform]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(handles);
  };

  return (
    <div className="container mt-4">
      <h3>Enter Your Social Media Handles</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="instagram" className="form-label">Instagram</label>
          <input
            type="text"
            className="form-control"
            id="instagram"
            value={handles.instagram}
            onChange={(e) => handleChange(e, 'instagram')}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="facebook" className="form-label">Facebook</label>
          <input data
            type="text"
            className="form-control"
            id="facebook"
            value={handles.facebook}
            onChange={(e) => handleChange(e, 'facebook')}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tiktok" className="form-label">TikTok</label>
          <input
            type="text"
            className="form-control"
            id="tiktok"
            value={handles.tiktok}
            onChange={(e) => handleChange(e, 'tiktok')}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="youtube" className="form-label">YouTube</label>
          <input
            type="text"
            className="form-control"
            id="youtube"
            value={handles.youtube}
            onChange={(e) => handleChange(e, 'youtube')}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="snapchat" className="form-label">Snapchat</label>
          <input
            type="text"
            className="form-control"
            id="snapchat"
            value={handles.snapchat}
            onChange={(e) => handleChange(e, 'snapchat')}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="x" className="form-label">X (formerly Twitter)</label>
          <input
            type="text"
            className="form-control"
            id="x"
            value={handles.x}
            onChange={(e) => handleChange(e, 'x')}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="threads" className="form-label">Threads</label>
          <input
            type="text"
            className="form-control"
            id="threads"
            value={handles.threads}
            onChange={(e) => handleChange(e, 'threads')}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="linkedin" className="form-label">LinkedIn</label>
          <input
            type="text"
            className="form-control"
            id="linkedin"
            value={handles.linkedin}
            onChange={(e) => handleChange(e, 'linkedin')}
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default SocialMediaForm;
