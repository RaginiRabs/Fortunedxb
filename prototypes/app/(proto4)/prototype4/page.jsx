import Card from '@/components/prototype4/Card';
import { projects } from '@/mock/prototype4/projects';

export default function Prototype4Home() {
  const project = projects[0];
  return (
    <section className="px-6 md:px-12 py-16 flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md">
        <Card project={project} />
      </div>
    </section>
  );
}
