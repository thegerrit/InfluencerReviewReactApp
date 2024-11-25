import React, { useState } from 'react';
import { PLATFORMS } from '../utils/Constants';

interface SocialMediaHandle {
  platform: string;
  handle: string;
}

interface SocialMediaFormProps {
    updateParentMediaHandles: (handles: SocialMediaHandle[]) => void;
}

const SocialMediaForm: React.FC<SocialMediaFormProps> = ({updateParentMediaHandles}) => {
  const maxRows = 8;

  const [handles, setHandles] = useState<SocialMediaHandle[]>([
    { platform: PLATFORMS[0], handle: '' }
  ]);

  const handlePlatformChange = (index: number, value: string) => {
    const updatedHandles = [...handles];
    updatedHandles[index].platform = value;
    setHandles(updatedHandles);
    updateParentMediaHandles(updatedHandles);
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedHandles = [...handles];
    updatedHandles[index].handle = value;
    setHandles(updatedHandles);
    updateParentMediaHandles(updatedHandles);
  };

  const addHandleRow = () => {
    if (handles.length < maxRows) {
      setHandles([...handles, { platform: PLATFORMS[0], handle: '' }]);
    }
    updateParentMediaHandles(handles);
  };

  const removeHandleRow = (index: number) => {
    setHandles(handles.filter((_, i) => i !== index));
    updateParentMediaHandles(handles);
  };

  return (
    <div className="container mt-4">
      <h3>Add Social Media Handles</h3>
      <div className="row g-3">
        {/* Headers for the columns */}
        <div className="row g-3">
          <div className="col-md-5">
            <h6>Media Platform</h6>
          </div>
          <div className="col-md-5">
            <h6>Handle</h6>
          </div>
        </div>

        {handles.map((item, index) => (
          <div className="row g-3 align-items-end" key={index}>
            <div className="col-md-5">
              <select
                className="form-select"
                value={item.platform}
                onChange={(e) => handlePlatformChange(index, e.target.value)}
              >
                {PLATFORMS.map((platform) => (
                  <option value={platform.toLowerCase()}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                value={item.handle}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder="Enter your handle"
              />
            </div>

            {index > 0 && (
              <div className="col-md-2">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeHandleRow(index)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}

        <div className="col-12 mt-3">
          {/* <button type="submit" className="btn btn-primary me-2">Submit</button> */}
          {handles.length < maxRows && (
            <button type="button" className="btn btn-secondary" onClick={addHandleRow}>
              Add Handle
            </button>
          )}
        </div>
      
      </div>
    </div>
  );
};

export default SocialMediaForm;
