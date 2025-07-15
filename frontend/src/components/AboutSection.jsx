const AboutSection = () => (
  <section className="bg-[#0f172a] text-white py-20 flex flex-col md:flex-row items-center max-w-6xl mx-auto px-4">
    <div className="md:w-2/3 mb-6 md:mb-0">
      <h2 className="text-4xl font-semibold mb-4 text-[#f1f5f9]">About Me</h2>
      <p className="text-[#94a3b8]">
        I’m a full-stack developer specializing in building exceptional digital experiences.
        Currently, I’m focused on creating responsive web applications.
      </p>
    </div>
    <img src="/assets/profile.svg" alt="profile" className="md:w-1/4 rounded-lg shadow-lg" />
  </section>
);


export default AboutSection;
