import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import AchievementsSection from '../components/AchievementsSection';
import ContactsSection from '../components/ContactsSection';

const Home = () => (
  <div className="bg-dark-gradient min-h-screen text-white">
    <AboutSection />
    <ProjectsSection />
    <AchievementsSection />
    <ContactsSection />
  </div>
);

export default Home;
