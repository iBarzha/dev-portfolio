import { Github, Linkedin, Mail, Send } from 'lucide-react';

const ContactsSection = () => (
  <section id="contacts" className="text-white py-20">
    <h2 className="text-4xl font-semibold text-center mb-8 text-[#f1f5f9]">Contacts</h2>
    <div className="flex justify-center gap-6">
      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
        <Github size={28} className="hover:text-[#23395d] transition" />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <Linkedin size={28} className="hover:text-[#23395d] transition" />
      </a>
      <a href="mailto:example@mail.com">
        <Mail size={28} className="hover:text-[#23395d] transition" />
      </a>
      <a href="https://t.me" target="_blank" rel="noopener noreferrer">
        <Send size={28} className="hover:text-[#23395d] transition" />
      </a>
    </div>

  </section>
);

export default ContactsSection;
