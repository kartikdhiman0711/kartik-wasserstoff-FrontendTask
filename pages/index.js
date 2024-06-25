import React, { useState } from 'react';
import FileExplorer from '../components/FileExplorer';

const initialStructure = [
  { id: '1', type: 'folder', name: 'Folder 1', children: [] },
  { id: '2', type: '.ed', name: 'example.ed', content: 'Initial text content' },
];

const Home = () => {
  const [structure, setStructure] = useState(initialStructure);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const renderFileComponent = () => {
    if (!selectedFile) return null;

    if (selectedFile.type === '.ed') {
      return (
        <div className="p-4">
          <textarea
            className="w-full h-64 border rounded p-2"
            value={selectedFile.content}
            onChange={(e) => {
              const updatedStructure = structure.map(item =>
                item.id === selectedFile.id ? { ...item, content: e.target.value } : item
              );
              setStructure(updatedStructure);
            }}
          />
        </div>
      );
    } else {
      return <p>File type not supported.</p>;
    }
  };

  return (
    <div className="flex">
      <FileExplorer structure={structure} />
      <div className="flex-1 p-4">
        {renderFileComponent()}
      </div>
    </div>
  );
};

export default Home;
