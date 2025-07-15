import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import AchievementsSection from '../components/AchievementsSection';
import ContactsSection from '../components/ContactsSection';

const Home = () => (
  <div className="bg-[#0f172a] text-white">
    <AboutSection />
    <ProjectsSection />
    <AchievementsSection />
    <ContactsSection />
  </div>
);

export default Home;
