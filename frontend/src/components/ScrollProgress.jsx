import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setProgress(progress);
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 z-50">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 z-40"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
};

export default ScrollProgress;