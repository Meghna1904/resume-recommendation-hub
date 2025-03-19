import { Job } from '@/components/JobCard';
import { ResumeData } from './resumeParser';

// Mock job database
const jobDatabase: Job[] = [
  {
    id: "job-1",
    title: "Senior React Developer",
    company: "TechGiant Inc.",
    location: "San Francisco, CA",
    salary: "$130,000 - $160,000",
    description: "We are looking for an experienced React developer to join our frontend team. You'll be responsible for building and maintaining high-performance web applications, collaborating with designers and backend engineers, and contributing to our component library.",
    requirements: [
      "5+ years of experience with React",
      "Strong TypeScript skills",
      "Experience with state management (Redux, MobX, or similar)",
      "Familiarity with modern CI/CD practices",
      "Understanding of server-side rendering"
    ],
    postedDate: "2 days ago",
    matchScore: 0.95,
    skills: ["React", "TypeScript", "JavaScript", "Redux", "HTML5", "CSS3", "Node.js", "GraphQL", "Responsive Design"]
  },
  {
    id: "job-2",
    title: "Full Stack JavaScript Engineer",
    company: "GrowthStartup",
    location: "Remote",
    salary: "$120,000 - $150,000",
    description: "Join our fast-growing team to build innovative solutions for our SaaS platform. You'll work across the entire stack, from frontend React applications to backend Node.js services and everything in between.",
    requirements: [
      "4+ years of full stack development experience",
      "Strong JavaScript/TypeScript knowledge",
      "Experience with React and Node.js",
      "Familiarity with SQL and NoSQL databases",
      "Bonus: Experience with AWS or other cloud providers"
    ],
    postedDate: "1 week ago",
    matchScore: 0.87,
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "Express", "MongoDB", "AWS", "Git", "REST APIs"]
  },
  {
    id: "job-3",
    title: "Frontend UI/UX Developer",
    company: "DesignMasters Co.",
    location: "New York, NY",
    salary: "$110,000 - $135,000",
    description: "Looking for a frontend developer with a strong eye for design to create beautiful, intuitive interfaces. You'll work closely with our design team to bring wireframes and mockups to life while ensuring optimal performance and accessibility.",
    requirements: [
      "3+ years of frontend development",
      "Strong HTML, CSS, and JavaScript skills",
      "Experience with modern CSS frameworks",
      "Eye for detail and passion for UI/UX",
      "Experience with animation and interactive elements"
    ],
    postedDate: "3 days ago",
    matchScore: 0.82,
    skills: ["HTML5", "CSS3", "JavaScript", "UI/UX", "Responsive Design", "Tailwind CSS", "Figma", "Accessibility"]
  },
  {
    id: "job-4",
    title: "React Native Developer",
    company: "MobileApps Inc.",
    location: "Austin, TX",
    salary: "$125,000 - $145,000",
    description: "Join our mobile app development team to build cross-platform applications using React Native. You'll be responsible for developing new features, improving existing functionality, and ensuring a seamless user experience across iOS and Android platforms.",
    requirements: [
      "3+ years of experience with React Native",
      "Proficiency in JavaScript/TypeScript",
      "Experience with state management in mobile apps",
      "Understanding of native modules and their integration",
      "Familiarity with app store deployment processes"
    ],
    postedDate: "1 week ago",
    matchScore: 0.75,
    skills: ["React Native", "JavaScript", "TypeScript", "Redux", "iOS", "Android", "API Integration", "Mobile UI/UX"]
  },
  {
    id: "job-5",
    title: "Frontend Performance Engineer",
    company: "SpeedyWeb Solutions",
    location: "Chicago, IL",
    salary: "$140,000 - $165,000",
    description: "We're looking for a performance-focused frontend developer to help optimize our web applications. You'll analyze performance metrics, implement optimizations, and ensure our applications load quickly and run smoothly for all users.",
    requirements: [
      "5+ years of frontend development experience",
      "Deep understanding of web performance optimization",
      "Experience with JavaScript performance profiling",
      "Knowledge of code splitting, lazy loading, and caching strategies",
      "Familiarity with Core Web Vitals and performance metrics"
    ],
    postedDate: "2 weeks ago",
    matchScore: 0.73,
    skills: ["JavaScript", "Performance Optimization", "Webpack", "Web Vitals", "Lighthouse", "React", "Browser DevTools", "CDN"]
  },
  {
    id: "job-6",
    title: "JavaScript Testing Specialist",
    company: "QualityCode Ltd.",
    location: "Boston, MA",
    salary: "$115,000 - $140,000",
    description: "Join our quality engineering team to build and maintain our testing infrastructure. You'll develop automated tests, improve testing processes, and ensure code quality across our JavaScript applications.",
    requirements: [
      "4+ years of JavaScript development",
      "Strong experience with testing frameworks",
      "Knowledge of test-driven development practices",
      "Experience with CI/CD integration for tests",
      "Familiarity with mocking and stubbing techniques"
    ],
    postedDate: "3 weeks ago",
    matchScore: 0.68,
    skills: ["JavaScript", "Jest", "Cypress", "Testing", "TDD", "CI/CD", "React", "QA Automation"]
  }
];

/**
 * Calculate how well a job matches a resume
 * In a real application, this would use more sophisticated matching algorithms
 */
const calculateMatchScore = (job: Job, resume: ResumeData): number => {
  // Convert skills to lowercase for case-insensitive matching
  const resumeSkills = resume.skills.map(skill => skill.toLowerCase());
  const jobSkills = job.skills.map(skill => skill.toLowerCase());
  
  // Count matching skills
  let matchingSkills = 0;
  for (const skill of jobSkills) {
    if (resumeSkills.includes(skill)) {
      matchingSkills++;
    }
  }
  
  // Calculate simple match percentage
  const matchPercentage = jobSkills.length > 0 
    ? matchingSkills / jobSkills.length 
    : 0;
  
  // Add some randomness to make results more interesting
  // In a real app, we'd use more sophisticated algorithms
  const randomFactor = 0.1 * (Math.random() - 0.5);
  
  // Ensure score is between 0 and 1
  return Math.min(Math.max(matchPercentage + randomFactor, 0), 1);
};

/**
 * Find jobs that match a resume
 */
export const findMatchingJobs = (resume: ResumeData): Job[] => {
  // Calculate match scores for each job
  const jobsWithScores = jobDatabase.map(job => {
    // In a mock implementation, keep the pre-defined score
    // In a real app, we'd calculate this
    // const score = calculateMatchScore(job, resume);
    return { ...job };
  });
  
  // Sort by match score (highest first)
  return jobsWithScores.sort((a, b) => b.matchScore - a.matchScore);
};

/**
 * Get skills required for a specific job with information about whether they match the resume
 */
export const getJobSkillsAnalysis = (job: Job, resume: ResumeData) => {
  const resumeSkills = resume.skills.map(skill => skill.toLowerCase());
  
  // Create skill objects with match status and importance
  return job.skills.map(skill => {
    // Determine skill importance (just for demonstration)
    let importance: 'high' | 'medium' | 'low' = 'medium';
    
    if (['react', 'javascript', 'typescript'].includes(skill.toLowerCase())) {
      importance = 'high';
    } else if (['html5', 'css3', 'redux', 'node.js'].includes(skill.toLowerCase())) {
      importance = 'medium';
    } else {
      importance = 'low';
    }
    
    return {
      name: skill,
      matched: resumeSkills.includes(skill.toLowerCase()),
      importance
    };
  });
};
