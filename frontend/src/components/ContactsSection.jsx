const ContactsSection = () => (
  <section id="contacts" className="bg-[#0f172a] text-white py-20">
    <h2 className="text-4xl font-semibold text-center mb-8 text-[#f1f5f9]">Contacts</h2>
    <div className="flex justify-center gap-6">
      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
        <img src="/assets/github.svg" alt="GitHub" className="h-8" />
      </a>
      <a href="https://t.me" target="_blank" rel="noopener noreferrer">
        <img src="/assets/telegram.svg" alt="Telegram" className="h-8" />
      </a>
    </div>
  </section>
);

export default ContactsSection;
