
import React, { useState } from 'react';
import { parseResume } from '../../utils/resumeParser';
import FileUploadArea from './FileUploadArea';
import ResumeBasicInfo from './ResumeBasicInfo';
import ResumeScoreCard from './ResumeScoreCard';
import CourseRecommendations from './CourseRecommendations';
import ResumePreviewSection from './ResumePreviewSection';
import { ResumeDetails } from '../ResumeDetails';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

const UploadResume: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [resumeData, setResumeData] = useState<any>(null);
  const [resumeText, setResumeText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showPdfPreview, setShowPdfPreview] = useState<boolean>(false);

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await parseResume(file);
      setResumeData(data);
      setResumeText(data.parsedText);
    } catch (err) {
      setError('Error processing the resume. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Scoring logic
  const scoreSections = ['Education', 'Experience', 'Skills', 'Certifications'];
  const calculateScore = () => {
    let score = 0;
    scoreSections.forEach(section => {
      if (resumeData && resumeData[section.toLowerCase()] && resumeData[section.toLowerCase()].length > 0) {
        score += 25; // 25 points per section
      }
    });
    return Math.min(score, 100); // Cap at 100
  };

  const currentScore = resumeData ? calculateScore() : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900">
            Smart Resume Analyzer
          </h1>
          <p className="text-gray-600">Upload your resume and get instant insights</p>
        </div>

        {/* File Upload Area */}
        <FileUploadArea 
          file={file} 
          onFileChange={handleFileChange} 
        />

        {file && (
          <Button
            onClick={handleUpload}
            disabled={loading}
            className={`mt-6 w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-800'}`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Upload className="animate-spin -ml-1 mr-3 h-5 w-5" />
                Processing...
              </span>
            ) : 'Analyze Resume'}
          </Button>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {resumeData && (
          <div className="mt-12 space-y-8 animate-fade-in">
            {/* Basic Information */}
            <ResumeBasicInfo resumeData={resumeData} />

            {/* Resume Details */}
            <ResumeDetails resumeData={resumeData} />

            {/* Skills Analysis */}
            <ResumeScoreCard 
              currentScore={currentScore} 
              resumeData={resumeData} 
              scoreSections={scoreSections} 
            />

            {/* Course Recommendations */}
            <CourseRecommendations />

            {/* Resume Preview Section */}
            <ResumePreviewSection 
              file={file} 
              showPdfPreview={showPdfPreview} 
              setShowPdfPreview={setShowPdfPreview} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadResume;
