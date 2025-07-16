import { UserCircle } from 'lucide-react';

const Header = () => (
  <header className="flex items-center justify-between py-4 px-6 border-b border-[#1e293b]">
    <div className="flex items-center gap-2">
      <UserCircle size={32} className="text-[#f1f5f9]" />
      <span className="font-semibold text-lg">My Portfolio</span>
    </div>
    <nav className="flex gap-6">
      <a href="#about" className="hover:text-[#23395d]">About</a>
      <a href="#projects" className="hover:text-[#23395d]">Projects</a>
      <a href="#stack" className="hover:text-[#23395d]">Stack</a>
      <a href="#contacts" className="hover:text-[#23395d]">Contacts</a>
    </nav>
  </header>
);

export default Header;
