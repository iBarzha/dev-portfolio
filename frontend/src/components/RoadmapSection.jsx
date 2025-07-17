import { BookOpen, Code, Briefcase, GraduationCap, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const RoadmapSection = () => {
  const { t } = useLanguage();

  const roadmapItems = [
    {
      year: t('roadmap.timeline.python.date'),
      title: t('roadmap.timeline.python.title'),
      description: t('roadmap.timeline.python.description'),
      icon: BookOpen,
      color: 'from-blue-400 to-blue-600'
    },
    {
      year: t('roadmap.timeline.rails.date'),
      title: t('roadmap.timeline.rails.title'),
      description: t('roadmap.timeline.rails.description'),
      icon: Code,
      color: 'from-red-400 to-red-600'
    },
    {
      year: t('roadmap.timeline.firstProjects.date'),
      title: t('roadmap.timeline.firstProjects.title'),
      description: t('roadmap.timeline.firstProjects.description'),
      icon: Briefcase,
      color: 'from-green-400 to-green-600'
    },
    {
      year: t('roadmap.timeline.django.date'),
      title: t('roadmap.timeline.django.title'),
      description: t('roadmap.timeline.django.description'),
      icon: Code,
      color: 'from-emerald-400 to-emerald-600'
    },
    {
      year: t('roadmap.timeline.javascript.date'),
      title: t('roadmap.timeline.javascript.title'),
      description: t('roadmap.timeline.javascript.description'),
      icon: Code,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      year: t('roadmap.timeline.react.date'),
      title: t('roadmap.timeline.react.title'),
      description: t('roadmap.timeline.react.description'),
      icon: Code,
      color: 'from-cyan-400 to-blue-500'
    },
    {
      year: t('roadmap.timeline.degree.date'),
      title: t('roadmap.timeline.degree.title'),
      description: t('roadmap.timeline.degree.description'),
      icon: GraduationCap,
      color: 'from-purple-400 to-pink-500'
    }
  ];

  return (
    <section className="py-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg">
              <Calendar className="text-white" size={24} />
            </div>
            <span className="text-cyan-600 dark:text-cyan-400 text-sm font-bold tracking-wide uppercase">
              {t('roadmap.label')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-800 via-purple-600 to-blue-600 dark:from-white dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
            {t('roadmap.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            {t('roadmap.description')}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central timeline line */}
          <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 rounded-full"></div>

          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8`}
              >
                {/* Content Card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="group relative p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    {/* Year Badge */}
                    <div className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                      {item.year}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>

                    {/* Connector line */}
                    <div className={`absolute top-1/2 transform -translate-y-1/2 ${index % 2 === 0 ? '-right-8' : '-left-8'} w-8 h-0.5 bg-gradient-to-r ${item.color}`}></div>
                  </div>
                </div>

                {/* Central Icon */}
                <div className="w-2/12 flex justify-center">
                  <div className={`relative w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300`}>
                    <item.icon size={28} className="text-white" />
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="group p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
            <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2 group-hover:scale-110 transition-transform">
              5+
            </div>
            <div className="text-slate-600 dark:text-slate-400 font-medium">
              {t('roadmap.stats.yearsOfLearning')}
            </div>
          </div>
          <div className="group p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform">
              3
            </div>
            <div className="text-slate-600 dark:text-slate-400 font-medium">
              {t('roadmap.stats.programmingLanguages')}
            </div>
          </div>
          <div className="group p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform">
              7
            </div>
            <div className="text-slate-600 dark:text-slate-400 font-medium">
              {t('roadmap.stats.majorMilestones')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;