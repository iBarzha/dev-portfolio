import { Award, Star, Trophy, Medal } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AchievementsSection = () => {
  const { t } = useLanguage();

  const achievements = [
    {
      icon: Award,
      title: "Excellence",
      count: "50+",
      desc: t('achievements.stats.projects'),
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: Star,
      title: "Quality",
      count: "99%",
      desc: t('achievements.stats.satisfaction'),
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      icon: Trophy,
      title: "Recognition",
      count: "15+",
      desc: t('achievements.stats.awards'),
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: Medal,
      title: "Experience",
      count: "5+",
      desc: t('achievements.stats.experience'),
      gradient: "from-green-400 to-emerald-500"
    },
  ];

  return (
    <section className="py-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg">
              <Trophy className="text-white" size={24} />
            </div>
            <span className="text-cyan-600 dark:text-cyan-400 text-sm font-bold tracking-wide uppercase">
              {t('achievements.label')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-800 via-purple-600 to-blue-600 dark:from-white dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
            {t('achievements.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            {t('achievements.description')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group relative text-center p-8 rounded-2xl transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-2xl overflow-hidden"
            >
              <div className="relative z-10">
                <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${achievement.gradient} rounded-2xl flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <achievement.icon size={36} className="text-white" />
                </div>

                <div className={`text-4xl font-bold bg-gradient-to-r ${achievement.gradient} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {achievement.count}
                </div>

                <div className="text-slate-700 dark:text-slate-300 text-sm font-semibold group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
                  {achievement.desc}
                </div>

                {/* Animated underline */}
                <div className={`w-0 h-1 bg-gradient-to-r ${achievement.gradient} mx-auto mt-4 group-hover:w-16 transition-all duration-300 rounded-full`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional stats section - No Background */}
        <div className="mt-16 p-8 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2 group-hover:scale-110 transition-transform">
                200K+
              </div>
              <div className="text-slate-600 dark:text-slate-400 font-medium">
                {t('achievements.stats.linesOfCode')}
              </div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform">
                24/7
              </div>
              <div className="text-slate-600 dark:text-slate-400 font-medium">
                {t('achievements.stats.availability')}
              </div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform">
                100%
              </div>
              <div className="text-slate-600 dark:text-slate-400 font-medium">
                {t('achievements.stats.dedication')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;