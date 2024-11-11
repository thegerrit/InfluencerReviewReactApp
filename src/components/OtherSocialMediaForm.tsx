import React, { useState } from 'react';

interface OtherSocialMediaHandle {
  platform: string;
  handle: string;
}

interface OtherSocialMediaFormProps {
    updateParentOtherMediaHandles: (handles: OtherSocialMediaHandle[]) => void;
}

const OtherSocialMediaForm: React.FC<OtherSocialMediaFormProps> = ({updateParentOtherMediaHandles}) => {
  const maxRows = 10;

  const [handles, setHandles] = useState<OtherSocialMediaHandle[]>([
    { platform: '', handle: '' }
  ]);

  const handlePlatformChange = (index: number, value: string) => {
    const updatedHandles = [...handles];
    updatedHandles[index].platform = value;
    setHandles(updatedHandles);
    updateParentOtherMediaHandles(updatedHandles);
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedHandles = [...handles];
    updatedHandles[index].handle = value;
    setHandles(updatedHandles);
    updateParentOtherMediaHandles(updatedHandles);
  };

  const addHandleRow = () => {
    if (handles.length < maxRows) {
      setHandles([...handles, { platform: '', handle: '' }]);
    }
    updateParentOtherMediaHandles(handles);
  };

  const removeHandleRow = (index: number) => {
    setHandles(handles.filter((_, i) => i !== index));
    updateParentOtherMediaHandles(handles);
  };

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     console.log('Submitted Other Handles:', handles);
//   };

  return (
    <div className="container mt-4">
      <h2>Other Social Media Handle Form</h2>
      {/* <form onSubmit={handleSubmit} className="row g-3"> */}
      <div className="row g-3">
        {/* Headers for the columns */}
        <div className="row g-3">
          <div className="col-md-5">
            <h6>Social Media Platform</h6>
          </div>
          <div className="col-md-5">
            <h6>Handle</h6>
          </div>
        </div>

        {handles.map((item, index) => (
          <div className="row g-3 align-items-end" key={index}>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                value={item.platform}
                onChange={(e) => handlePlatformChange(index, e.target.value)}
                placeholder="Enter social media platform"
              />
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
      {/* </form> */}
      </div>
    </div>
  );
};

export default OtherSocialMediaForm;
