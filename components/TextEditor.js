// components/TextEditor.js
import React, { useState } from 'react';

const TextEditor = ({ file }) => {
  const [content, setContent] = useState(file.content);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="text-editor">
      <textarea value={content} onChange={handleContentChange} />
    </div>
  );
};

export default TextEditor;
