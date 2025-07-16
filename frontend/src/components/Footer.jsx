const Footer = () => (
  <footer className="py-8 border-t border-slate-200/60 dark:border-slate-700/50 transition-all duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        {/* Main copyright */}
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
          © 2025 Bardzheiev Anton. Crafted with passion and modern technologies.
        </p>

        {/* Status indicators */}
        <div className="flex items-center justify-center gap-6 text-xs mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-slate-500 dark:text-slate-400">Available for new projects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <span className="text-slate-500 dark:text-slate-400">Remote work friendly</span>
          </div>
        </div>

        {/* Tech stack mini badges */}
        <div className="flex flex-wrap justify-center gap-2">
          {['React', 'Node.js', 'Python', 'Django', 'MongoDB'].map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded-full border border-slate-300/50 dark:border-slate-600/50 hover:scale-105 transition-transform duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;