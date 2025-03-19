
import React from 'react';
import { FiCheck, FiX } from "react-icons/fi";
import { Progress } from '@/components/ui/progress';

interface ResumeScoreCardProps {
  currentScore: number;
  resumeData: any;
  scoreSections: string[];
}

const ResumeScoreCard: React.FC<ResumeScoreCardProps> = ({ 
  currentScore, 
  resumeData, 
  scoreSections 
}) => {
  return (
    <div className="bg-white/50 backdrop-blur-lg rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Skills Analysis</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">Resume Score</p>
          <p className="text-lg font-semibold">{currentScore}/100</p>
        </div>
        <Progress value={currentScore} className="h-2.5" />
        <div className="space-y-2">
          <p className="text-gray-600">Suggestions to improve your resume:</p>
          <ul className="space-y-2">
            {scoreSections.map(section => (
              <li key={section} className={`flex items-center ${resumeData[section.toLowerCase()] && resumeData[section.toLowerCase()].length > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {resumeData[section.toLowerCase()] && resumeData[section.toLowerCase()].length > 0 ? 
                  <FiCheck className="w-4 h-4 mr-2" /> : <FiX className="w-4 h-4 mr-2" />}
                {section} {resumeData[section.toLowerCase()] && resumeData[section.toLowerCase()].length > 0 ? 'included' : 'missing'}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResumeScoreCard;
