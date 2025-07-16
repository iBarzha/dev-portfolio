import {Bitcoin , Database, Server, Layout, Zap} from 'lucide-react';

const StackSection = () => {
  const techStack = [
    { icon: Bitcoin, name: "Frontend", color: "text-orange-400" },
    { icon: Database, name: "Database", color: "text-green-400" },
    { icon: Server, name: "Backend", color: "text-blue-400" },
    { icon: Layout, name: "Design", color: "text-purple-400" },
  ];

  return (
    <section id="stack" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="text-cyan-400" size={24} />
            <span className="text-cyan-400 text-sm font-medium tracking-wide uppercase">Technologies</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Tech Stack
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {techStack.map((tech, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105 text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-800/80 rounded-2xl flex items-center justify-center group-hover:bg-slate-700/80 transition-colors">
                  <tech.icon size={32} className={`${tech.color} group-hover:scale-110 transition-transform`} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{tech.name}</h3>
                <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackSection;
