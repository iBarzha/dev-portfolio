import {UserCircle, Sparkles, Code, Palette, Zap} from 'lucide-react';

const AboutSection = () => (
  <section id="about" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-cyan-400" size={24} />
            <span className="text-cyan-400 text-sm font-medium tracking-wide uppercase">About Me</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Full-Stack
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Developer
            </span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
            I craft exceptional digital experiences with modern technologies.
            Passionate about creating responsive, user-friendly applications that solve real-world problems.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full">
              <Code className="text-cyan-400" size={16} />
              <span className="text-slate-300 text-sm">Clean Code</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full">
              <Palette className="text-purple-400" size={16} />
              <span className="text-slate-300 text-sm">Modern Design</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full">
              <Zap className="text-yellow-400" size={16} />
              <span className="text-slate-300 text-sm">Performance</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="relative w-80 h-80 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center border border-slate-700">
              <UserCircle size={120} className="text-cyan-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);


export default AboutSection;
