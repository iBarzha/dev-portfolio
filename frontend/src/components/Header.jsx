import {UserCircle} from 'lucide-react';

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-800/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="relative">
            <UserCircle size={32} className="text-cyan-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"></div>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Portfolio
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {['About', 'Projects', 'Stack', 'Contacts'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 text-sm font-medium relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-200 group-hover:w-full"></span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  </header>
);

export default Header;
