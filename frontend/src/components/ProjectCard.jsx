const ProjectCard = ({ project }) => (
  <div className="bg-[#1e293b] rounded-xl p-4 shadow hover:scale-105 transition w-full md:w-1/3">
    <img src={project.image} alt={project.title} className="rounded mb-3 w-full h-40 object-cover" />
    <h3 className="text-lg font-semibold text-[#f1f5f9]">{project.title}</h3>
    <p className="text-[#94a3b8] text-sm">{project.description}</p>
  </div>
);

export default ProjectCard;
