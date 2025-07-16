import { useEffect, useState } from 'react';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/projects/')
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <section id="projects" className="flex flex-col gap-6">
      <h2 className="text-3xl md:text-5xl font-semibold mb-4">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-[#1e293b] rounded-xl p-4 shadow-xl hover:scale-105 transition duration-300"
          >
            <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
            <p className="text-[#94a3b8] text-sm mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.stack?.split(',').map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-[#334155] text-xs px-2 py-1 rounded-full"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto text-sm text-[#38bdf8] hover:underline"
            >
              View on GitHub →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
