import { useState, useEffect, useRef } from 'react';
import { Cat, Sparkles, Code, Palette, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Typing Animation Component
const TypingAnimation = ({ words, className = "" }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(word.substring(0, currentText.length + 1));
        if (currentText === word) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        setCurrentText(word.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const AboutSection = () => {
  const { t } = useLanguage();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();

    const particles = [];
    const particleCount = 50;

    // Create particles with theme-aware colors
    const createParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };

    createParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Check if dark mode is active
      const isDark = document.documentElement.classList.contains('dark');

      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

        // Theme-aware particle colors
        if (isDark) {
          ctx.fillStyle = `rgba(56, 189, 248, ${particle.opacity})`;
        } else {
          ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity * 0.6})`;
        }

        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      updateCanvasSize();
      createParticles();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="about" className="relative min-h-screen flex items-start justify-center overflow-hidden theme-transition pt-[20vh]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="text-cyan-500 animate-pulse" size={24} />
              <span className="text-cyan-500 text-sm font-medium tracking-wide uppercase">
                {t('about.welcome')}
              </span>
            </div>

            {/* Fixed height for header to avoid movement */}
            <div className="min-h-[120px] sm:min-h-[140px] lg:min-h-[160px] flex flex-col justify-start">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight theme-transition">
                {t('about.title')}{' '}
                <TypingAnimation
                  words={t('about.roles')}
                  className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent"
                />
              </h1>
            </div>

            {/* Increased spacing between header and description */}
            <div>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-2xl theme-transition">
                {t('about.description')}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 light-surface px-4 py-2 rounded-full shadow-lg backdrop-blur-sm theme-transition">
                  <Code className="text-cyan-500" size={16} />
                  <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                    {t('about.badges.learning')}
                  </span>
                </div>
                <div className="flex items-center gap-2 light-surface px-4 py-2 rounded-full shadow-lg backdrop-blur-sm theme-transition">
                  <Palette className="text-purple-500" size={16} />
                  <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                    {t('about.badges.creative')}
                  </span>
                </div>
                <div className="flex items-center gap-2 light-surface px-4 py-2 rounded-full shadow-lg backdrop-blur-sm theme-transition">
                  <Zap className="text-yellow-500" size={16} />
                  <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                    {t('about.badges.motivated')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-80 h-80 mx-auto group">
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 dark:from-cyan-400/30 dark:to-blue-400/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>

              {/* Rotating border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 p-1 animate-spin" style={{ animationDuration: '3s' }}>
                <div className="w-full h-full bg-gradient-to-br from-slate-50 dark:from-slate-800 to-slate-100 dark:to-slate-900 rounded-full"></div>
              </div>

              {/* Main avatar container */}
              <div className="relative w-full h-full bg-gradient-to-br from-slate-50/90 dark:from-slate-800/90 to-slate-100/90 dark:to-slate-900/90 rounded-full flex items-center justify-center border-2 border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm theme-transition">
                <Cat size={120} className="text-cyan-500 group-hover:scale-110 transition-transform duration-500" />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-8 -left-8 w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
