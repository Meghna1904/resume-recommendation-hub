
/**
 * Utilities for interacting with the NLP resume parsing API
 */

export interface NlpResumeData {
  name: string;
  emails: string[];
  phone_numbers: string[];
  skills: string[];
  experience: string[];
  education: string[];
  certifications: string[];
  projects: string[];
  achievements: string[];
  matched_jobs: any[];
}

export const parseResumeWithNLP = async (file: File): Promise<NlpResumeData> => {
  try {
    // Create FormData object to send file to backend
    const formData = new FormData();
    formData.append('resume', file);
    
    // Send the file to the Flask backend
    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to parse resume');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error in NLP resume parsing:', error);
    throw error;
  }
};

// Function to convert NLP format to our application format
export const convertNlpToAppFormat = (nlpData: NlpResumeData): any => {
  // Create experience entries with structure matching our app format
  const experience = nlpData.experience.map(exp => {
    // Try to extract company, title, dates using regex
    const titleMatch = exp.match(/^([^,|at|\d]+)/);
    const dateMatch = exp.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4}\s*(-|–|to)\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4}|\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4}\s*(-|–|to)\s*Present|\b\d{4}\s*(-|–|to)\s*\d{4}|\b\d{4}\s*(-|–|to)\s*Present/i);
    const companyMatch = exp.match(/at\s+([^,|.]+)|for\s+([^,|.]+)/i);
    
    return {
      title: titleMatch ? titleMatch[0].trim() : "Position",
      company: companyMatch ? (companyMatch[1] || companyMatch[2]).trim() : "Company",
      location: "Location not specified",
      startDate: dateMatch ? dateMatch[0].split(/(-|–|to)/)[0].trim() : "Date not specified",
      endDate: dateMatch ? (dateMatch[0].includes("Present") ? "Present" : dateMatch[0].split(/(-|–|to)/)[2].trim()) : "Date not specified",
      description: exp
    };
  });

  // Create education entries with structure matching our app format
  const education = nlpData.education.map(edu => {
    // Try to extract degree, institution, dates
    const degreeMatch = edu.match(/\b(Bachelor|Master|PhD|B\.S\.|M\.S\.|M\.A\.|B\.A\.|B\.Tech|M\.Tech|BSc|MSc|MBA|Doctorate|Associate)[^,]*\b/i);
    const dateMatch = edu.match(/\b\d{4}\b/g);
    
    return {
      degree: degreeMatch ? degreeMatch[0].trim() : "Degree not specified",
      institution: edu.replace(degreeMatch ? degreeMatch[0] : "", "").split(',')[0].trim(),
      location: "Location not specified",
      graduationDate: dateMatch ? dateMatch[dateMatch.length - 1] : "Date not specified"
    };
  });

  // Return data in our application format
  return {
    name: nlpData.name,
    email: nlpData.emails[0] || "",
    phone: nlpData.phone_numbers[0] || "",
    location: "Location not extracted",
    summary: "Summary not available",
    skills: nlpData.skills,
    experience,
    education,
    certifications: nlpData.certifications,
    projects: nlpData.projects,
    achievements: nlpData.achievements,
    emails: nlpData.emails,
    phone_numbers: nlpData.phone_numbers,
    // Make sure parsedText is included to satisfy the interface
    parsedText: nlpData.experience.join("\n") + "\n" + nlpData.education.join("\n")
  };
};
