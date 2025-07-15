import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => (
  <motion.div
    className="bg-gray-800 rounded-lg p-4 hover:scale-105 transition cursor-pointer"
    whileHover={{ scale: 1.05 }}
  >
    <img src={project.image} alt={project.title} className="rounded mb-2 h-40 w-full object-cover" />
    <h3 className="text-white text-lg font-semibold">{project.title}</h3>
    <p className="text-gray-400 text-sm">{project.description}</p>
    <div className="mt-2">
      <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="text-primary mr-2">GitHub</a>
      {project.demo_link && (
        <a href={project.demo_link} target="_blank" rel="noopener noreferrer" className="text-accent">Demo</a>
      )}
    </div>
  </motion.div>
);

export default ProjectCard;
