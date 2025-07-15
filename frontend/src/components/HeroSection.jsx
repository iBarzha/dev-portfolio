import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => (
  <section className="bg-secondary text-white flex flex-col items-center justify-center h-screen text-center">
    <motion.h1
      className="text-4xl md:text-6xl font-bold mb-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      Anton Bardzheiev
    </motion.h1>
    <p className="text-gray-400 mb-6">Fullstack Developer — Django + React</p>
    <a href="#projects" className="bg-primary text-white px-6 py-2 rounded hover:bg-accent transition">
      Смотреть проекты
    </a>
  </section>
);

export default HeroSection;
