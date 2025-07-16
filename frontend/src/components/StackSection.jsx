import {Bitcoin , Database, Server, Layout } from 'lucide-react';

const StackSection = () => (
  <section id="stack" className="flex flex-col items-center gap-6">
    <h2 className="text-3xl font-semibold mb-4">Tech Stack</h2>
    <div className="flex justify-center gap-6 flex-wrap">
      <Bitcoin size={32} />
      <Database size={32} />
      <Server size={32} />
      <Layout size={32} />
    </div>
  </section>
);

export default StackSection;
