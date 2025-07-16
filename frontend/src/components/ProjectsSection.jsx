import { useEffect, useState } from 'react';
import { Globe, Github, ExternalLink } from 'lucide-react';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
     fetch('http://127.0.0.1:8000/api/projects/')
       .then((res) => res.json())
       .then((data) => setProjects(data));
  }, []);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="text-cyan-400" size={24} />
            <span className="text-cyan-400 text-sm font-medium tracking-wide uppercase">Portfolio</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A collection of projects that showcase my skills and passion for development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.name}
                  </h3>
                  <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-cyan-400/20 group-hover:text-cyan-400 transition-all">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                <p className="text-slate-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack?.split(',').map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-800/80 text-slate-300 text-xs px-3 py-1 rounded-full border border-slate-700"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                >
                  <Github size={16} />
                  View Project
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default ProjectsSection;
