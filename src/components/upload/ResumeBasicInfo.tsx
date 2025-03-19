
import React from 'react';

interface ResumeBasicInfoProps {
  resumeData: any;
}

const ResumeBasicInfo: React.FC<ResumeBasicInfoProps> = ({ resumeData }) => {
  return (
    <div className="bg-white/50 backdrop-blur-lg rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-medium">{resumeData.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">
            {resumeData.emails?.[0] || resumeData.email || 'Not provided'}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Contact</p>
          <p className="font-medium">
            {resumeData.phone_numbers?.[0] || resumeData.phone || 'Not provided'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeBasicInfo;
