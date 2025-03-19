
import React, { useState, useEffect } from 'react';

interface ResumeViewerProps {
  file: File;
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({ file }) => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    // Create a URL for the file
    const fileUrl = URL.createObjectURL(file);
    setUrl(fileUrl);

    // Clean up the URL on component unmount
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [file]);

  if (!url) {
    return <div className="w-full h-96 flex items-center justify-center">Loading preview...</div>;
  }

  return (
    <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
      {file.type === 'application/pdf' ? (
        <iframe
          src={url}
          className="w-full h-96"
          title="Resume PDF Viewer"
        />
      ) : (
        <div className="w-full h-96 flex items-center justify-center bg-gray-50 p-4">
          <p className="text-center text-gray-500">
            Preview not available for this file type. <br />
            <a 
              href={url} 
              download={file.name}
              className="text-blue-600 hover:text-blue-800"
            >
              Download the file
            </a>
          </p>
        </div>
      )}
    </div>
  );
};
