
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 z-0" />
      
      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-50" />
      </div>
      
      <div className="container mx-auto px-6 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-block">
              <span className="chip mb-4">Smart Career Matching</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Find Your <span className="text-primary">Perfect Job Match</span> With AI Precision
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Upload your resume and let our intelligent matching system find the ideal job opportunities that align with your skills and experience.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#upload-resume" className="button-primary">
                Upload Resume
              </a>
              <a href="#how-it-works" className="button-secondary">
                How It Works
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2">Scroll down</span>
        <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}
