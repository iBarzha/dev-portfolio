import { useState, useEffect } from 'react';
import { UserCircle, Moon, Sun, Menu, X, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const languages = [
    { code: 'en', name: 'English'},
    { code: 'uk', name: 'Українська'},
    { code: 'pl', name: 'Polski'}
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  useEffect(() => {
    const sections = ['about', 'projects', 'stack', 'contacts'];
    const observers = sections.map(section => {
      const element = document.getElementById(section);
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSection(section);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  const navigationItems = [
    { name: t('nav.about'), id: 'about' },
    { name: t('nav.projects'), id: 'projects' },
    { name: t('nav.skills'), id: 'stack' },
    { name: t('nav.contact'), id: 'contacts' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="relative">
                <UserCircle size={32} className="text-cyan-500" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-slate-900"></div>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                {t('header.portfolio')}
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={`#${item.id}`}
                  className={`text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-200 text-sm font-medium relative group ${
                    activeSection === item.id ? 'text-cyan-500 dark:text-cyan-400' : ''
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-500 transition-all duration-200 ${
                    activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm"
                >
                  <Globe size={16} />
                  <span className="hidden sm:inline">{currentLanguage?.code.toUpperCase()}</span>
                </button>

                {/* Language Dropdown */}
                {isLangMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-3 ${
                          language === lang.code ? 'bg-slate-100 dark:bg-slate-800 text-cyan-500' : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span className="text-lg">{lang.code.toUpperCase()}</span>
                        <span className="text-sm">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-110"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <nav className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={`#${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                >
                  {item.name}
                </a>
              ))}

              {/* Mobile Language Selector */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{t('header.language')}</p>
                <div className="space-y-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full text-left px-2 py-1 rounded transition-colors flex items-center gap-3 ${
                        language === lang.code ? 'bg-slate-100 dark:bg-slate-800 text-cyan-500' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{lang.code.toUpperCase()}</span>
                      <span className="text-sm">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Click outside to close language menu */}
      {isLangMenuOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsLangMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;