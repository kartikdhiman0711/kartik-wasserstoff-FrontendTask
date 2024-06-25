import React, { useState } from 'react';
import Folder from './Folder';
import File from './File';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating unique IDs

const FileExplorer = () => {
  const [structure, setStructure] = useState([]); // State to store folder and file structure
  const [newItemType, setNewItemType] = useState(null); // State to track new item type ('folder' or 'file')
  const [newItemName, setNewItemName] = useState(''); // State to track new item name
  const [selectedFileId, setSelectedFileId] = useState(null); // State to track selected file ID for editing
  const [fileContent, setFileContent] = useState(''); // State to track file content for editing

  const createNewFolder = () => {
    const newFolder = {
      id: uuidv4(),
      type: 'folder',
      name: newItemName || 'New Folder',
      children: [],
    };
    setStructure([...structure, newFolder]);
    resetNewItemState();
  };

  const createNewFile = () => {
    // Check if there is at least one folder available
    const hasFolder = structure.some(item => item.type === 'folder');

    if (!hasFolder) {
      alert('Please create a folder first.');
      return;
    }

    const newFile = {
      id: uuidv4(),
      type: '.ed',
      name: newItemName || 'example.ed',
      content: '', // Empty content initially
    };

    // Find the first folder and add the new file inside it
    const updatedStructure = structure.map(item => {
      if (item.type === 'folder') {
        return {
          ...item,
          children: [...item.children, newFile],
        };
      }
      return item;
    });

    setStructure(updatedStructure);
    resetNewItemState();
  };

  const openFileEditor = (fileId) => {
    // Find the file with the given ID and set it as selected
    const selectedFile = structure.reduce((foundFile, folder) => {
      if (!foundFile) {
        const file = folder.children.find(file => file.id === fileId);
        if (file) return file;
      }
      return foundFile;
    }, null);

    setSelectedFileId(fileId);
    setFileContent(selectedFile.content);
  };

  const closeFileEditor = () => {
    setSelectedFileId(null);
    setFileContent('');
  };

  const handleFileContentChange = (e) => {
    setFileContent(e.target.value);
  };

  const saveFileContent = () => {
    const updatedStructure = structure.map(item => {
      if (item.type === 'folder') {
        return {
          ...item,
          children: item.children.map(file => {
            if (file.id === selectedFileId) {
              return {
                ...file,
                content: fileContent,
              };
            }
            return file;
          }),
        };
      }
      return item;
    });

    setStructure(updatedStructure);
    closeFileEditor();
  };

  const resetNewItemState = () => {
    setNewItemType(null);
    setNewItemName('');
  };

  return (
    <div className="bg-gray-100 w-1/4 min-h-screen p-4">
      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => setNewItemType('folder')}
        >
          Create Folder
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setNewItemType('file')}
        >
          Create File
        </button>
        {newItemType && (
          <div className="mt-2">
            <input
              type="text"
              placeholder={newItemType === 'folder' ? 'Folder Name' : 'File Name'}
              className="border p-1 mr-2"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <button
              className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded"
              onClick={newItemType === 'folder' ? createNewFolder : createNewFile}
            >
              Create
            </button>
          </div>
        )}
      </div>
      {structure.length > 0 && (
        <div className="file-explorer">
          {structure.map(item =>
            item.type === 'folder' ? (
              <Folder key={item.id} folder={item} />
            ) : (
              item.children.map(file => (
                <File
                  key={file.id}
                  file={file}
                  onFileClick={() => openFileEditor(file.id)}
                  onCloseClick={closeFileEditor}
                />
              ))
            )
          )}
        </div>
      )}
      {selectedFileId && (
        <div className="text-editor mt-4">
          <textarea
            className="w-full h-64 border p-2"
            value={fileContent}
            onChange={handleFileContentChange}
          />
          <div className="flex justify-end mt-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={saveFileContent}
            >
              Save
            </button>
            <button
              className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              onClick={closeFileEditor}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
