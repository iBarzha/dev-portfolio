import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ContactsSection = () => {
  const { t } = useLanguage();

  const contacts = [
    {
      icon: Github,
      href: "https://github.com",
      label: t('contact.platforms.github'),
      gradient: "from-gray-600 to-gray-800"
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com",
      label: t('contact.platforms.linkedin'),
      gradient: "from-blue-500 to-blue-700"
    },
    {
      icon: Mail,
      href: "mailto:example@mail.com",
      label: t('contact.platforms.email'),
      gradient: "from-red-500 to-red-700"
    },
    {
      icon: Send,
      href: "https://t.me",
      label: t('contact.platforms.telegram'),
      gradient: "from-cyan-500 to-cyan-700"
    },
  ];

  return (
    <section id="contacts" className="py-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg">
              <Mail className="text-white" size={24} />
            </div>
            <span className="text-cyan-600 dark:text-cyan-400 text-sm font-bold tracking-wide uppercase">
              {t('contact.label')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 dark:from-white dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="flex justify-center gap-6 flex-wrap">
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl p-6 transition-all duration-300 hover:transform hover:scale-110 shadow-lg hover:shadow-2xl overflow-hidden"
            >
              <div className="relative z-10 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${contact.gradient} rounded-2xl flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <contact.icon size={28} className="text-white" />
                </div>

                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
                  {contact.label}
                </span>

                {/* Animated underline */}
                <div className={`w-0 h-0.5 bg-gradient-to-r ${contact.gradient} mx-auto mt-2 group-hover:w-12 transition-all duration-300 rounded-full`}></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;