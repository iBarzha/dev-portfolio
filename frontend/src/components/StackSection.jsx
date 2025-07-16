import { useState } from 'react';
import { Bitcoin, Database, Server, Layout, Zap, Code } from 'lucide-react';

const StackSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skills = [
    { name: 'JavaScript', level: 90, color: 'from-yellow-400 to-orange-500' },
    { name: 'React', level: 85, color: 'from-blue-400 to-blue-600' },
    { name: 'Node.js', level: 80, color: 'from-green-400 to-green-600' },
    { name: 'Python', level: 75, color: 'from-purple-400 to-purple-600' },
    { name: 'Django', level: 70, color: 'from-emerald-400 to-emerald-600' },
    { name: 'MongoDB', level: 85, color: 'from-green-500 to-green-700' }
  ];

  const techStack = [
    { icon: Code, name: "Frontend", tech: "React, Vue.js", color: "text-orange-400" },
    { icon: Database, name: "Database", tech: "MongoDB, PostgreSQL", color: "text-green-400" },
    { icon: Server, name: "Backend", tech: "Node.js, Django", color: "text-blue-400" },
    { icon: Layout, name: "Design", tech: "Figma, Tailwind", color: "text-purple-400" },
  ];

  return (
    <section id="stack" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="text-cyan-500" size={24} />
            <span className="text-cyan-500 text-sm font-medium tracking-wide uppercase">Skills</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Technical Expertise
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Skills Progress Bars */}
          <div className="space-y-8">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="group"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                    {skill.name}
                  </h3>
                  <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-cyan-500 transition-colors">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{
                      width: `${skill.level}%`,
                      transform: hoveredSkill === skill.name ? 'scaleY(1.2)' : 'scaleY(1)'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack Cards */}
          <div className="grid grid-cols-2 gap-8">
            {techStack.map((item, index) => (
              <div
                key={index}
                className="group relative bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-slate-200 dark:border-slate-700"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                  <item.icon size={32} className="text-white" />
                </div>
                <h3 className="text-slate-900 dark:text-white font-semibold text-lg mb-2 text-center">
                  {item.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm text-center">
                  {item.tech}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackSection;