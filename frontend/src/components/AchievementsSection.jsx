import { Award, Star, Trophy, Medal } from 'lucide-react';

const AchievementsSection = () => {
  const achievements = [
    { icon: Award, title: "Excellence", count: "50+", desc: "Projects Completed" },
    { icon: Star, title: "Quality", count: "99%", desc: "Client Satisfaction" },
    { icon: Trophy, title: "Recognition", count: "15+", desc: "Awards Won" },
    { icon: Medal, title: "Experience", count: "5+", desc: "Years in Field" },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="text-cyan-400" size={24} />
            <span className="text-cyan-400 text-sm font-medium tracking-wide uppercase">Achievements</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            My Journey
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group text-center p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-800/80 rounded-2xl flex items-center justify-center group-hover:bg-cyan-400/20 transition-colors">
                <achievement.icon size={32} className="text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{achievement.count}</div>
              <div className="text-slate-400 text-sm">{achievement.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
