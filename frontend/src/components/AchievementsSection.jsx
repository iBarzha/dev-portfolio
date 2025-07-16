import { Award, Star, Trophy, Medal } from 'lucide-react';

const AchievementsSection = () => (
  <section className="text-white py-20">
    <h2 className="text-4xl font-semibold text-center mb-8 text-[#f1f5f9]">Achievements</h2>
    <div className="flex justify-center gap-4 flex-wrap">
        <Award size={24} className="text-[#f1f5f9]" />
        <Star size={24} className="text-[#f1f5f9]" />
        <Trophy size={24} className="text-[#f1f5f9]" />
        <Medal size={24} className="text-[#f1f5f9]" />
    </div>
  </section>
);

export default AchievementsSection;
