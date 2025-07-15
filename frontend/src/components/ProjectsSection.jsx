import React, { useEffect, useState } from 'react';
import api from '../api/api';
import ProjectCard from './ProjectCard';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects/').then(res => setProjects(res.data));
  }, []);

  return (
    <section id="projects" className="bg-[#0f172a] text-white py-20">
      <h2 className="text-4xl font-semibold text-center mb-10 text-[#f1f5f9]">Projects</h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center max-w-6xl mx-auto px-4">
        {projects.map(p => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
