
import React, { useState } from 'react';
import { FileUp } from 'lucide-react';

interface FileUploadAreaProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({ file, onFileChange }) => {
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileChange(event.target.files[0]);
    }
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ease-in-out
        ${dragActive ? 'border-gray-400 bg-gray-50' : 'border-gray-200'}
        ${!file ? 'hover:border-gray-400 hover:bg-gray-50' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      <div className="text-center">
        <FileUp className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600 mb-2">
          {file ? file.name : 'Drag and drop your resume here'}
        </p>
        <p className="text-sm text-gray-500">
          {!file && 'or click to browse (PDF or DOCX)'}
        </p>
      </div>
    </div>
  );
};

export default FileUploadArea;
