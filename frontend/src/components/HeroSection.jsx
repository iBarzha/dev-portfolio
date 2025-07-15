import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => (
  <section className="bg-secondary text-center text-white py-20">
    <motion.h2
      className="text-4xl md:text-5xl font-bold mb-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      Привет! Я Anton Bardzheiev
    </motion.h2>
    <p className="text-gray-400 mb-6">Fullstack-разработчик • Django + React</p>
    <a href="#projects" className="bg-primary text-white px-6 py-2 rounded hover:bg-accent transition">
      Мои проекты
    </a>
  </section>
);

export default HeroSection;
