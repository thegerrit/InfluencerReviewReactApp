import React, { useState } from 'react';
import '../../styles/TagsInputForm.css';

interface TagsInputFormProps {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (index: number) => void;
}

const TagsInputForm: React.FC<TagsInputFormProps> = ({ tags, addTag, removeTag }) => {
  const [tagInput, setTagInput] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      // remove invalid characters from newTag
      const validTag = newTag.replace(/[^a-z0-9_ ]/g, '');
      if (validTag && !tags.includes(validTag)) {
        addTag(validTag);
      }
      setTagInput('');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Enter influencer tags* <span style={{opacity: "0.7"}}>(5 minimum)</span></h3>
      <div className="tags-input-container">
        {tags.map((tag, index) => (
          <div className="tag-box" key={index}>
            {tag}
            <button
              type="button"
              className="remove-tag-btn"
              onClick={() => removeTag(index)}
            >
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          className="form-control tag-input"
          value={tagInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your tag and press Enter to add it"
        />
      </div>
    </div>
  );
};

export default TagsInputForm;
