import React from 'react';

const File = ({ file }) => {
  return (
    <div className="py-1 cursor-pointer">{file.name}</div>
  );
};

export default File;
