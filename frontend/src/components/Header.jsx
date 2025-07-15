import React from 'react';

const Header = () => (
  <header className="bg-secondary text-white p-4 flex justify-between items-center shadow-md">
    <h1 className="text-xl font-bold">Anton Bardzheiev</h1>
    <nav className="space-x-4">
      <a href="#about" className="hover:text-primary">Обо мне</a>
      <a href="#projects" className="hover:text-primary">Проекты</a>
      <a href="#contacts" className="hover:text-primary">Контакты</a>
    </nav>
  </header>
);

export default Header;
