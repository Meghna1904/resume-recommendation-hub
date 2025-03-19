
export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string[];
  experience: {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    location: string;
    graduationDate: string;
  }[];
  parsedText: string;
  emails?: string[];
  phone_numbers?: string[];
}

/**
 * This is a mock resume parser that would normally send the file to an API
 * In a real application, this would use a service like Affinda, HireAbility, etc.
 */
export const parseResume = async (file: File): Promise<ResumeData> => {
  // In a real app, we'd send the file to an API and parse the response
  // For demo purposes, we'll just return mock data
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return mock data
  return {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    summary: "Experienced software engineer with 5+ years of experience in frontend development, specializing in React, TypeScript, and responsive web design. Passionate about creating intuitive user experiences and optimizing application performance.",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Redux",
      "Node.js",
      "GraphQL",
      "Responsive Design",
      "UI/UX",
      "Figma",
      "Jest",
      "Cypress",
      "Git",
      "CI/CD",
      "Agile",
    ],
    experience: [
      {
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        startDate: "Jan 2021",
        endDate: "Present",
        description: "Lead frontend development for e-commerce platform serving 500k+ monthly users. Implemented performance optimizations resulting in 40% improvement in load times. Mentored junior developers and established frontend best practices."
      },
      {
        title: "Frontend Developer",
        company: "WebSolutions LLC",
        location: "Oakland, CA",
        startDate: "Mar 2018",
        endDate: "Dec 2020",
        description: "Developed responsive web applications for clients across various industries. Worked with a team of designers and backend developers to deliver full-stack solutions. Specialized in React and state management solutions."
      },
      {
        title: "Junior Web Developer",
        company: "Creative Digital Agency",
        location: "Berkeley, CA",
        startDate: "Jun 2016",
        endDate: "Feb 2018",
        description: "Built and maintained websites for small businesses and startups. Responsible for implementing designs, integrating content management systems, and ensuring cross-browser compatibility."
      }
    ],
    education: [
      {
        degree: "B.S. Computer Science",
        institution: "University of California, Berkeley",
        location: "Berkeley, CA",
        graduationDate: "May 2016"
      },
      {
        degree: "Frontend Web Development Certification",
        institution: "Coding Bootcamp",
        location: "San Francisco, CA",
        graduationDate: "August 2015"
      }
    ],
    parsedText: "Alex Johnson\nSenior Frontend Developer\n\nContact: alex.johnson@example.com | (555) 123-4567\nLocation: San Francisco, CA\n\nSummary\nExperienced software engineer with 5+ years of experience in frontend development, specializing in React, TypeScript, and responsive web design. Passionate about creating intuitive user experiences and optimizing application performance.\n\nExperience\nSenior Frontend Developer - TechCorp Inc., San Francisco, CA (Jan 2021 - Present)\nLead frontend development for e-commerce platform serving 500k+ monthly users. Implemented performance optimizations resulting in 40% improvement in load times. Mentored junior developers and established frontend best practices.\n\nFrontend Developer - WebSolutions LLC, Oakland, CA (Mar 2018 - Dec 2020)\nDeveloped responsive web applications for clients across various industries. Worked with a team of designers and backend developers to deliver full-stack solutions. Specialized in React and state management solutions.\n\nJunior Web Developer - Creative Digital Agency, Berkeley, CA (Jun 2016 - Feb 2018)\nBuilt and maintained websites for small businesses and startups. Responsible for implementing designs, integrating content management systems, and ensuring cross-browser compatibility.\n\nEducation\nB.S. Computer Science - University of California, Berkeley (May 2016)\nFrontend Web Development Certification - Coding Bootcamp, San Francisco, CA (August 2015)",
    emails: ["alex.johnson@example.com"],
    phone_numbers: ["(555) 123-4567"]
  };
};
