import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Header from '../components/Header';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import StackSection from '../components/StackSection';
import AchievementsSection from '../components/AchievementsSection';
import ContactsSection from '../components/ContactsSection';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';

const Home = () => (
  <ThemeProvider>
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
      <ScrollProgress />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      <Header />

      <main className="flex flex-col gap-24 px-4 md:px-8 max-w-7xl mx-auto mt-8 relative z-10">
        {/* Section dividers with gradient lines */}
        <div className="relative">
          <AboutSection />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent"></div>
        </div>

        <div className="relative">
          <ProjectsSection />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent"></div>
        </div>

        <div className="relative">
          <StackSection />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent"></div>
        </div>

        <div className="relative">
          <AchievementsSection />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent"></div>
        </div>

        <ContactsSection />
      </main>

      <Footer />
    </div>
  </ThemeProvider>
);

export default Home;