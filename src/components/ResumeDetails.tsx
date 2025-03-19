
import React from 'react';

interface ResumeDetailsProps {
  resumeData: any;
}

export const ResumeDetails: React.FC<ResumeDetailsProps> = ({ resumeData }) => {
  return (
    <div className="bg-white/50 backdrop-blur-lg rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Resume Details</h2>
      
      {/* Experience Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Work Experience</h3>
        {resumeData.experience && resumeData.experience.length > 0 ? (
          <div className="space-y-4">
            {resumeData.experience.map((exp: any, index: number) => (
              <div key={index} className="border-l-2 border-gray-300 pl-4 py-1">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <p className="font-medium">{exp.title}</p>
                  <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                </div>
                <p className="text-gray-700">{exp.company}, {exp.location}</p>
                <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No experience data available</p>
        )}
      </div>
      
      {/* Education Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Education</h3>
        {resumeData.education && resumeData.education.length > 0 ? (
          <div className="space-y-4">
            {resumeData.education.map((edu: any, index: number) => (
              <div key={index} className="border-l-2 border-gray-300 pl-4 py-1">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <p className="font-medium">{edu.degree}</p>
                  <p className="text-sm text-gray-500">{edu.graduationDate}</p>
                </div>
                <p className="text-gray-700">{edu.institution}, {edu.location}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No education data available</p>
        )}
      </div>
      
      {/* Skills Section */}
      <div>
        <h3 className="text-lg font-medium mb-3">Skills</h3>
        {resumeData.skills && resumeData.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill: string, index: number) => (
              <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No skills data available</p>
        )}
      </div>
    </div>
  );
};
