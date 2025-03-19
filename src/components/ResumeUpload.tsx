
import { useState, useRef } from 'react';
import { Upload, Check, X, FileText, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { parseResume } from '@/utils/resumeParser';
import { toast } from '@/components/ui/use-toast';

interface ResumeUploadProps {
  onResumeProcessed: (resumeData: any) => void;
}

export function ResumeUpload({ onResumeProcessed }: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFileSelect(droppedFile);
    }
  };
  
  const handleFileSelect = (selectedFile: File) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedTypes.includes(selectedFile.type)) {
      toast({
        title: "Invalid file format",
        description: "Please upload a PDF or Word document (.doc, .docx)",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB",
        variant: "destructive",
      });
      return;
    }
    
    setFile(selectedFile);
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };
  
  const handleAnalyzeResume = async () => {
    if (!file) return;
    
    setIsLoading(true);
    setUploadProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 200);
    
    try {
      // Here we would normally upload the file to a server
      // Instead we'll use our local parser for demo purposes
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      
      const resumeData = await parseResume(file);
      onResumeProcessed(resumeData);
      
      toast({
        title: "Resume processed successfully",
        description: "We've analyzed your resume and found matching jobs.",
      });
    } catch (error) {
      console.error('Error processing resume:', error);
      toast({
        title: "Error processing resume",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      clearInterval(progressInterval);
      setUploadProgress(100);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };
  
  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <section id="upload-resume" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Upload Your Resume</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered system will analyze your resume to find the most relevant job opportunities that match your skills and experience.
          </p>
        </div>
        
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {!file ? (
              <div
                className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 ${
                  isDragging
                    ? 'border-primary bg-primary/5 animate-border-pulse'
                    : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">Drag & drop your resume here</h3>
                  <p className="text-muted-foreground mb-4">or click to browse files</p>
                  <p className="text-sm text-muted-foreground mb-6">Supported formats: PDF, Word (.doc, .docx)</p>
                  
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="button-primary"
                  >
                    Select File
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="hidden"
                  />
                </div>
              </div>
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border rounded-xl p-6 bg-white shadow-subtle"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{file.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveFile}
                      className="p-1 hover:bg-secondary rounded-full transition-colors duration-200"
                      aria-label="Remove file"
                    >
                      <X className="h-5 w-5 text-muted-foreground" />
                    </button>
                  </div>
                  
                  {isLoading && (
                    <div className="mb-4">
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-200 rounded-full"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 text-right">
                        {uploadProgress < 100 ? 'Processing...' : 'Complete!'}
                      </p>
                    </div>
                  )}
                  
                  <Button
                    onClick={handleAnalyzeResume}
                    disabled={isLoading}
                    className="w-full button-primary"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing Resume...
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Analyze Resume
                      </>
                    )}
                  </Button>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
