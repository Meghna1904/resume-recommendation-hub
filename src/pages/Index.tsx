import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { ResumeUpload } from '@/components/ResumeUpload';
import { JobCard, Job } from '@/components/JobCard';
import { SkillMatch } from '@/components/SkillMatch';
import { Footer } from '@/components/Footer';
import { ResumeData } from '@/utils/resumeParser';
import { getJobMatches, getJobAnalysis } from '@/utils/api';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BriefcaseIcon, ChevronDownIcon, FilterIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [matchingJobs, setMatchingJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleResumeProcessed = async (data: ResumeData) => {
    setResumeData(data);
    setIsLoading(true);
    
    try {
      const jobs = await getJobMatches(data);
      setMatchingJobs(jobs);
      
      if (jobs.length > 0) {
        setSelectedJob(jobs[0]);
      }
      
      setTimeout(() => {
        document.getElementById('job-matches')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } catch (error) {
      console.error('Error fetching job matches:', error);
      toast({
        title: "Error finding job matches",
        description: "Something went wrong while finding matching jobs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleJobSelection = async (job: Job) => {
    if (!resumeData) return;
    
    setSelectedJob(job);
    
    try {
      const jobAnalysis = await getJobAnalysis(job.id, resumeData);
      
      // Update the job with additional analysis if needed
      // This might depend on your backend implementation
    } catch (error) {
      console.error('Error fetching job analysis:', error);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main>
        <Hero />
        <ResumeUpload onResumeProcessed={handleResumeProcessed} />
        
        {resumeData && matchingJobs.length > 0 && (
          <section id="job-matches" className="py-20 bg-secondary/30">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-block">
                    <span className="chip mb-4">Perfect Matches Found</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">
                    We Found {matchingJobs.length} Job Matches for You
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Based on your skills and experience, we've identified these job opportunities that align with your profile.
                  </p>
                </motion.div>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-2/3">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Job Matches</h3>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <FilterIcon size={16} />
                      <span>Filter</span>
                    </Button>
                  </div>
                  
                  {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span className="ml-2 text-lg">Finding matching jobs...</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {matchingJobs.map((job, index) => (
                        <div 
                          key={job.id}
                          onClick={() => handleJobSelection(job)}
                          className={`cursor-pointer transition-all duration-200 ${
                            selectedJob?.id === job.id ? 'ring-2 ring-primary ring-offset-2' : ''
                          }`}
                        >
                          <JobCard job={job} index={index} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="lg:w-1/3">
                  {selectedJob && (
                    <motion.div
                      key={selectedJob.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white dark:bg-gray-900 rounded-xl shadow-subtle sticky top-24"
                    >
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-1">{selectedJob.title}</h3>
                        <p className="text-lg text-foreground/80 mb-4">{selectedJob.company}</p>
                        
                        <Tabs defaultValue="match">
                          <TabsList className="w-full mb-6">
                            <TabsTrigger value="match" className="flex-1">Skill Match</TabsTrigger>
                            <TabsTrigger value="details" className="flex-1">Job Details</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="match">
                            {resumeData && (
                              <SkillMatch 
                                skills={selectedJob.skillAnalysis || []} 
                                resumeSkills={resumeData.skills}
                              />
                            )}
                          </TabsContent>
                          
                          <TabsContent value="details">
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-sm font-medium mb-2">Job Description</h4>
                                <p className="text-muted-foreground">{selectedJob.description}</p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium mb-2">Requirements</h4>
                                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                                  {selectedJob.requirements.map((req, i) => (
                                    <li key={i}>{req}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                        
                        <div className="mt-6 flex flex-col gap-3">
                          <Button className="w-full button-primary">
                            Apply Now
                          </Button>
                          <Button variant="outline" className="w-full">
                            Save for Later
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
        
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our advanced matching algorithm analyzes your resume and finds the best job opportunities for your skills and experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BriefcaseIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload Your Resume</h3>
                <p className="text-muted-foreground">
                  Simply upload your resume in PDF or Word format. Our system will automatically extract your skills, experience, and qualifications.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our AI algorithm analyzes your profile and matches it against thousands of job listings to find the best opportunities for you.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Apply with Confidence</h3>
                <p className="text-muted-foreground">
                  Apply to jobs knowing exactly how well your skills match the requirements, giving you a competitive edge in your job search.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
