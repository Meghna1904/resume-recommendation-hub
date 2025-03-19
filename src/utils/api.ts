
/**
 * This file contains functions for interacting with the backend API
 */

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Upload and parse a resume file
 * @param file The resume file to upload
 * @returns Parsed resume data
 */
export const parseResumeWithAPI = async (file: File) => {
  const formData = new FormData();
  formData.append('resume', file);
  
  const response = await fetch(`${API_BASE_URL}/parse-resume`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error(`Server responded with status: ${response.status}`);
  }
  
  return response.json();
};

/**
 * Get job matches based on resume data
 * @param resumeData Parsed resume data
 * @returns List of matching jobs
 */
export const getJobMatches = async (resumeData: any) => {
  const response = await fetch(`${API_BASE_URL}/job-matches`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ resumeData }),
  });
  
  if (!response.ok) {
    throw new Error(`Server responded with status: ${response.status}`);
  }
  
  return response.json();
};

/**
 * Get detailed job analysis including skill match
 * @param jobId The ID of the job to analyze
 * @param resumeData Parsed resume data
 * @returns Job analysis with skill match
 */
export const getJobAnalysis = async (jobId: string, resumeData: any) => {
  const response = await fetch(`${API_BASE_URL}/job-analysis`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ jobId, resumeData }),
  });
  
  if (!response.ok) {
    throw new Error(`Server responded with status: ${response.status}`);
  }
  
  return response.json();
};
