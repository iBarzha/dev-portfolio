import { useState, useEffect, useRef } from 'react';
import { Search, X, Command } from 'lucide-react';

const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const commands = [
    { name: 'About', action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
    { name: 'Projects', action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
    { name: 'Stack', action: () => document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' }) },
    { name: 'Contacts', action: () => document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' }) },
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-md mx-4 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 p-4 border-b border-slate-200 dark:border-slate-700">
          <Search size={20} className="text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search commands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose();
              if (e.key === 'Enter' && filteredCommands.length > 0) {
                filteredCommands[0].action();
                onClose();
              }
            }}
          />
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="p-2 max-h-60 overflow-y-auto">
          {filteredCommands.map((cmd, index) => (
            <button
              key={cmd.name}
              onClick={() => {
                cmd.action();
                onClose();
              }}
              className="w-full text-left p-3 rounded-md text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-3"
            >
              <Command size={16} className="text-slate-400" />
              {cmd.name}
            </button>
          ))}
          {filteredCommands.length === 0 && (
            <div className="p-3 text-slate-400 text-center">
              No commands found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;