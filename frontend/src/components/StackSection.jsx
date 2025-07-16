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
    {
      icon: Code,
      name: "Frontend",
      tech: "React, Vue.js",
      iconBg: "from-orange-500 to-red-500"
    },
    {
      icon: Database,
      name: "Database",
      tech: "MongoDB, PostgreSQL",
      iconBg: "from-green-500 to-emerald-500"
    },
    {
      icon: Server,
      name: "Backend",
      tech: "Node.js, Django",
      iconBg: "from-blue-500 to-cyan-500"
    },
    {
      icon: Layout,
      name: "Design",
      tech: "Figma, Tailwind",
      iconBg: "from-purple-500 to-pink-500"
    },
  ];

  return (
    <section id="stack" className="py-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg">
              <Zap className="text-white" size={24} />
            </div>
            <span className="text-cyan-600 dark:text-cyan-400 text-sm font-bold tracking-wide uppercase">Skills</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 dark:from-white dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
            Technical Expertise
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Skills Progress Bars - No Container Background */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">
              Skill Proficiency
            </h3>
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="group"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {skill.name}
                  </h4>
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden shadow-inner">
                  <div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                    style={{
                      width: `${skill.level}%`,
                      transform: hoveredSkill === skill.name ? 'scaleY(1.1)' : 'scaleY(1)'
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack Cards - No Container Background */}
          <div className="grid grid-cols-2 gap-6">
            {techStack.map((item, index) => (
              <div
                key={index}
                className="group relative rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="relative z-10 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${item.iconBg} rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-lg`}>
                    <item.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-slate-800 dark:text-white font-bold text-lg mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                    {item.tech}
                  </p>

                  {/* Animated underline */}
                  <div className="w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-3 group-hover:w-12 transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackSection;