import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-8 border-t border-slate-200/60 dark:border-slate-700/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main copyright */}
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
            {t('footer.copyright')}
          </p>

          {/* Status indicators */}
          <div className="flex items-center justify-center gap-6 text-xs mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-slate-500 dark:text-slate-400">
                {t('footer.status.available')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span className="text-slate-500 dark:text-slate-400">
                {t('footer.status.remote')}
              </span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;