import React, { useState } from 'react';
import { PLATFORMS } from '../../utils/Constants';

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
    // console.log("Platform update value:", value);
    setHandles(updatedHandles);
    // console.log("Platform update updatedHandles:", handles);
    updateParentMediaHandles(updatedHandles);
  };

  const handleInputChange = (index: number, value: string) => {
    // Remove @ and # symbols from the input value
    const sanitizedValue = value.replace(/[@#]/g, '');
    
    const updatedHandles = [...handles];
    updatedHandles[index].handle = sanitizedValue;
    setHandles(updatedHandles);
    updateParentMediaHandles(updatedHandles);
  };

  const addHandleRow = () => {
    if (handles.length < maxRows) {
      const availablePlatform = PLATFORMS.find(platform => !handles.some(handle => handle.platform === platform)) || PLATFORMS[0];
      setHandles([...handles, { platform: availablePlatform, handle: '' }]);
    }
    updateParentMediaHandles(handles);
  };

  const removeHandleRow = (index: number) => {
    const updatedHandles = handles.filter((_, i) => i !== index);
    setHandles(updatedHandles);
    updateParentMediaHandles(updatedHandles);
  };

  return (
    <div className="container mt-4">
      <h3>Add Social Media Handles* <span style={{opacity: "0.7"}}>(1 minimum)</span></h3>
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
                {PLATFORMS.filter(platform => !handles.some(handle => handle.platform === platform && handle.platform !== item.platform)).map((platform) => (
                  <option key={platform} value={platform}>
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
            <button type="button" className="btn btn-success" onClick={addHandleRow}>
              Add Handle
            </button>
          )}
        </div>
      
      </div>
    </div>
  );
};

export default SocialMediaForm;
