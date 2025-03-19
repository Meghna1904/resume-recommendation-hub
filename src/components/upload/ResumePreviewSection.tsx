
import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { ResumeViewer } from '@/components/ResumeViewer';

interface ResumePreviewSectionProps {
  file: File | null;
  showPdfPreview: boolean;
  setShowPdfPreview: (show: boolean) => void;
}

const ResumePreviewSection: React.FC<ResumePreviewSectionProps> = ({ 
  file, 
  showPdfPreview, 
  setShowPdfPreview 
}) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Resume Preview</h2>
        <button
          onClick={() => setShowPdfPreview(!showPdfPreview)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          {showPdfPreview ? (
            <>
              <EyeOff className="w-5 h-5 mr-2" />
              Hide Preview
            </>
          ) : (
            <>
              <Eye className="w-5 h-5 mr-2" />
              Show Preview
            </>
          )}
        </button>
      </div>

      {showPdfPreview && file && <ResumeViewer file={file} />}
    </>
  );
};

export default ResumePreviewSection;
