import { useState } from 'react';
import { Database, Server, Zap, Code, Palette, Terminal } from 'lucide-react';
import {
  SiPython, SiJavascript, SiRuby, SiDjango, SiRubyonrails, SiReact, SiPostgresql, SiMysql, SiSqlite, SiTailwindcss,
  SiMui, SiBootstrap, SiLinux, SiGit, SiPycharm, SiDocker} from 'react-icons/si';
import { VscVscode } from "react-icons/vsc";
import { useLanguage } from '../contexts/LanguageContext';

const StackSection = () => {
  const { t } = useLanguage();
  const [hoveredItem, setHoveredItem] = useState(null);

  const programmingLanguages = [
    {
      name: 'Python',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      borderColor: 'border-blue-200 dark:border-blue-800',
      icon: SiPython,
      iconColor: '#3776ab'
    },
    {
      name: 'JavaScript',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      icon: SiJavascript,
      iconColor: '#f7df1e'
    },
    {
      name: 'Ruby',
      color: 'from-red-500 to-pink-600',
      bgColor: 'bg-red-50 dark:bg-red-950/30',
      borderColor: 'border-red-200 dark:border-red-800',
      icon: SiRuby,
      iconColor: '#cc342d'
    }
  ];

  const techCategories = [
    {
      icon: Server,
      category: "Backend",
      title: t('skills.categories.backend.title'),
      technologies: [
        { name: "Django", color: "from-green-500 to-emerald-600", icon: SiDjango, iconColor: "#092e20" },
        { name: "Ruby on Rails", color: "from-red-500 to-rose-600", icon: SiRubyonrails, iconColor: "#cc0000" }
      ],
      iconBg: "from-green-500 to-emerald-600",
      description: t('skills.categories.backend.description')
    },
    {
      icon: Code,
      category: "Frontend",
      title: t('skills.categories.frontend.title'),
      technologies: [
        { name: "React", color: "from-blue-500 to-cyan-500", icon: SiReact, iconColor: "#61dafb" }
      ],
      iconBg: "from-blue-500 to-cyan-600",
      description: t('skills.categories.frontend.description')
    },
    {
      icon: Database,
      category: "Database",
      title: t('skills.categories.database.title'),
      technologies: [
        { name: "PostgreSQL", color: "from-blue-600 to-indigo-600", icon: SiPostgresql, iconColor: "#336791" },
        { name: "MySQL", color: "from-orange-500 to-amber-600", icon: SiMysql, iconColor: "#4479a1" },
        { name: "SQLite", color: "from-slate-500 to-slate-600", icon: SiSqlite, iconColor: "#003b57" }
      ],
      iconBg: "from-purple-500 to-indigo-600",
      description: t('skills.categories.database.description')
    },
    {
      icon: Palette,
      category: "Design",
      title: t('skills.categories.design.title'),
      technologies: [
        { name: "Tailwind CSS", color: "from-cyan-500 to-teal-600", icon: SiTailwindcss, iconColor: "#06b6d4" },
        { name: "Material UI", color: "from-blue-500 to-blue-600", icon: SiMui, iconColor: "#007fff" },
        { name: "Bootstrap", color: "from-purple-500 to-indigo-600", icon: SiBootstrap, iconColor: "#7952b3" }
      ],
      iconBg: "from-pink-500 to-rose-600",
      description: t('skills.categories.design.description')
    },
    {
      icon: Terminal,
      category: "System",
      title: t('skills.categories.system.title'),
      technologies: [
        { name: "Linux", color: "from-gray-600 to-gray-800", icon: SiLinux, iconColor: "#fcc624" },
        { name: "Git", color: "from-orange-600 to-red-600", icon: SiGit, iconColor: "#f05032" }
      ],
      iconBg: "from-gray-600 to-gray-800",
      description: t('skills.categories.system.description')
    },
    {
      icon: Code,
      category: "Tools",
      title: t('skills.categories.tools.title'),
      technologies: [
        { name: "PyCharm", color: "from-green-600 to-yellow-500", icon: SiPycharm, iconColor: "#000000" },
        { name: "VS Code", color: "from-blue-600 to-cyan-500", icon: VscVscode, iconColor: "#007acc" },
        { name: "Docker", color: "from-blue-500 to-blue-700", icon: SiDocker, iconColor: "#2496ed" }
      ],
      iconBg: "from-indigo-500 to-purple-600",
      description: t('skills.categories.tools.description')
    }
  ];

  return (
    <section id="stack" className="py-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg">
              <Zap className="text-white" size={24} />
            </div>
            <span className="text-cyan-600 dark:text-cyan-400 text-sm font-bold tracking-wide uppercase">
              {t('skills.label')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 dark:from-white dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
            {t('skills.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            {t('skills.description')}
          </p>
        </div>

        {/* Programming Languages Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 text-center">
            {t('skills.programmingLanguages')}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {programmingLanguages.map((language, index) => (
              <div
                key={language.name}
                className={`group relative p-8 rounded-3xl ${language.bgColor} ${language.borderColor} border-2 hover:shadow-xl transition-all duration-500 hover:scale-105 overflow-hidden`}
                onMouseEnter={() => setHoveredItem(language.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${language.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                <div className="relative z-10 text-center">
                  {/* Real Technology Icon */}
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                    <language.icon size={48} color={language.iconColor} />
                  </div>

                  {/* Language Name */}
                  <h4 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300"
                      style={{
                        backgroundImage: hoveredItem === language.name ? `linear-gradient(to right, var(--tw-gradient-stops))` : 'none'
                      }}>
                    {language.name}
                  </h4>

                  {/* Animated underline */}
                  <div className={`w-0 h-1 bg-gradient-to-r ${language.color} mx-auto mt-4 group-hover:w-20 transition-all duration-500 rounded-full`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Stack Categories */}
        <div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 text-center">
            {t('skills.technicalExpertise')}
          </h3>
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-8">
            {techCategories.map((category, index) => (
              <div
                key={category.category}
                className="group relative p-8 rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden"
                onMouseEnter={() => setHoveredItem(category.category)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Background Effects */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.iconBg} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-500`}></div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${category.iconBg} rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-lg`}>
                      <category.icon size={28} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {t(`skills.categories.${category.category.toLowerCase()}.name`)}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                        {category.title}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Technologies */}
                  <div className="space-y-3">
                    {category.technologies.map((tech, techIndex) => (
                      <div key={tech.name} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-300">
                        <tech.icon size={20} color={tech.iconColor} />
                        <span className="font-semibold text-slate-800 dark:text-white">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom accent line */}
                  <div className={`w-0 h-1 bg-gradient-to-r ${category.iconBg} mt-6 group-hover:w-full transition-all duration-700 rounded-full`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 border border-cyan-200 dark:border-cyan-800">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">3</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{t('skills.summary.languages')}</div>
            </div>
            <div className="w-px h-8 bg-slate-300 dark:bg-slate-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">6</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{t('skills.summary.categories')}</div>
            </div>
            <div className="w-px h-8 bg-slate-300 dark:bg-slate-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">14</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{t('skills.summary.technologies')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackSection;