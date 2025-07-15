const AchievementsSection = () => (
  <section className="bg-[#0f172a] text-white py-20">
    <h2 className="text-4xl font-semibold text-center mb-8 text-[#f1f5f9]">Achievements</h2>
    <div className="flex justify-center gap-4 flex-wrap">
      {/* Подставь настоящие иконки или изображения сертификатов */}
      <div className="bg-[#1e293b] rounded-full p-4"><img src="/assets/icon1.svg" alt="" className="h-6" /></div>
      <div className="bg-[#1e293b] rounded-full p-4"><img src="/assets/icon2.svg" alt="" className="h-6" /></div>
      <div className="bg-[#1e293b] rounded-full p-4"><img src="/assets/icon3.svg" alt="" className="h-6" /></div>
      {/* и т.д. */}
    </div>
  </section>
);

export default AchievementsSection;
