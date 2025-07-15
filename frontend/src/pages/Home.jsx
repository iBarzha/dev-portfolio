import React, { useEffect, useState } from 'react';
import api from '../api/api';
import HeroSection from '../components/HeroSection';
import ProjectCard from '../components/ProjectCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects/')
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-secondary min-h-screen text-white">
      <Header />
      <HeroSection />
      <section id="projects" className="p-10">
        <h2 className="text-3xl font-bold text-center mb-6">Мои проекты</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
