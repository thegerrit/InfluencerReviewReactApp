import React, { useState } from 'react';
import '../styles/TagsInputForm.css';

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
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        addTag(newTag);
      }
      setTagInput('');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Tags Input Form</h2>
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
          placeholder="Enter tags separated by spaces or press Enter"
        />
      </div>
    </div>
  );
};

export default TagsInputForm;
