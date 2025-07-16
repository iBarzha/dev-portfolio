import { useEffect, useState } from 'react';
import { Globe, Github, ExternalLink } from 'lucide-react';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/projects/')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(() => {
        // Fallback mock data if API fails
        const mockProjects = [
          {
            id: 1,
            name: "E-Commerce Platform",
            description: "Modern e-commerce solution with real-time inventory management and secure payment processing.",
            stack: "React, Node.js, MongoDB, Stripe",
            github_url: "https://github.com"
          },
          {
            id: 2,
            name: "Task Management App",
            description: "Collaborative task management with real-time updates and team communication features.",
            stack: "Vue.js, Python, PostgreSQL, Redis",
            github_url: "https://github.com"
          },
          {
            id: 3,
            name: "Analytics Dashboard",
            description: "Data visualization dashboard with interactive charts and real-time metrics.",
            stack: "React, D3.js, Django, MySQL",
            github_url: "https://github.com"
          }
        ];
        setProjects(mockProjects);
      });
  }, []);

  return (
    <section id="projects" className="py-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
              <Globe className="text-white" size={24} />
            </div>
            <span className="text-cyan-600 dark:text-cyan-400 text-sm font-bold tracking-wide uppercase">Portfolio</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 dark:from-white dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
            Featured Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            A collection of projects that showcase my skills and passion for development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative rounded-2xl p-6 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-2xl overflow-hidden"
            >
              {/* Glowing border effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {project.name}
                  </h3>
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover:scale-110 transition-transform">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack?.split(',').map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs px-3 py-1.5 rounded-full border border-slate-300/50 dark:border-slate-600/50 font-medium shadow-sm"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-semibold transition-colors group/link"
                >
                  <Github size={18} className="group-hover/link:scale-110 transition-transform" />
                  View Project
                  <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform" />
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