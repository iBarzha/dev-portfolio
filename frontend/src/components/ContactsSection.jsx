import { Github, Linkedin, Mail, Send } from 'lucide-react';

const ContactsSection = () => {
  const contacts = [
    { icon: Github, href: "https://github.com", label: "GitHub", color: "hover:bg-gray-400/20" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:bg-blue-400/20" },
    { icon: Mail, href: "mailto:example@mail.com", label: "Email", color: "hover:bg-red-400/20" },
    { icon: Send, href: "https://t.me", label: "Telegram", color: "hover:bg-cyan-400/20" },
  ];

  return (
    <section id="contacts" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Mail className="text-cyan-400" size={24} />
            <span className="text-cyan-400 text-sm font-medium tracking-wide uppercase">Get in Touch</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Let's Connect
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Ready to collaborate? Let's discuss your next project
          </p>
        </div>

        <div className="flex justify-center gap-6 flex-wrap">
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative w-16 h-16 bg-slate-800/80 rounded-2xl flex items-center justify-center border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-110 ${contact.color}`}
            >
              <contact.icon size={24} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {contact.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
