import React, { useState } from 'react';
import File from './File';

const Folder = ({ folder }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleFolder = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="py-1">
      <div className="flex cursor-pointer" onClick={toggleFolder}>
        <span className="mr-2">{isExpanded ? '📁' : '📂'}</span>
        <span>{folder.name}</span>
        {isExpanded && (
          <span className="ml-2 text-gray-500">({folder.children.length} files)</span>
        )}
      </div>
      {isExpanded && (
        <div className="pl-4">
          {folder.children.map(child =>
            child.type === 'folder' ? (
              <Folder key={child.id} folder={child} />
            ) : (
              <File key={child.id} file={child} />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Folder;
