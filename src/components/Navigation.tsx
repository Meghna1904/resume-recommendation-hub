
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-subtle' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-semibold tracking-tight transition-all duration-300 hover:text-primary"
        >
          CareerMatch
        </Link>
        
        {isMobile ? (
          <>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {menuOpen && (
              <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-md py-4 animate-fade-in">
                <div className="container mx-auto px-6 flex flex-col space-y-4">
                  <Link to="/" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200" onClick={() => setMenuOpen(false)}>
                    Home
                  </Link>
                  <Link to="/about" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200" onClick={() => setMenuOpen(false)}>
                    About
                  </Link>
                  <Link to="/contact" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200" onClick={() => setMenuOpen(false)}>
                    Contact
                  </Link>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center space-x-8">
            <Link to="/" className="font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200">
              Home
            </Link>
            <Link to="/about" className="font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200">
              About
            </Link>
            <Link to="/contact" className="font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
