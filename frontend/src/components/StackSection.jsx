const StackSection = () => (
  <section className="bg-secondary text-white py-20 text-center">
    <h2 className="text-3xl font-bold mb-8">Мой стек</h2>
    <div className="flex justify-center flex-wrap gap-6">
      <img src="/assets/react.svg" alt="React" className="h-16" />
      <img src="/assets/django.svg" alt="Django" className="h-16" />
      <img src="/assets/tailwind.svg" alt="Tailwind" className="h-16" />
      {/* добавь другие */}
    </div>
  </section>
);

export default StackSection;
