import Header from '../components/Header';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import StackSection from '../components/StackSection';
import AchievementsSection from '../components/AchievementsSection';
import ContactsSection from '../components/ContactsSection';
import Footer from '../components/Footer';

const Home = () => (
  <div className="min-h-screen text-white flex flex-col">
    <Header />
    <main className="flex flex-col gap-24 px-4 md:px-8 max-w-7xl mx-auto mt-8">
      <AboutSection />
      <ProjectsSection />
      <StackSection />
      <AchievementsSection />
      <ContactsSection />
    </main>
    <Footer />
  </div>
);

export default Home;
