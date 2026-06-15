import { notFound } from 'next/navigation';
import { projects } from '@/mock/prototype2/projects';
import { projects as proto4Projects } from '@/mock/prototype4/projects';
import ProjectDetails from '@/components/prototype4/ProjectDetails';

export default async function Prototype2DetailPage({ params }) {
  const { id } = await params;
  const listed = projects.find((p) => String(p.id) === String(id));
  if (!listed) notFound();

  // Use the finalised prototype4 detail layout for every project page.
  // Rich content comes from the matching prototype4 template (fallback to the
  // first), overlaid with the selected card's headline fields.
  const template = proto4Projects.find((p) => String(p.id) === String(id)) || proto4Projects[0];
  const project = {
    ...template,
    name: listed.name,
    developer: listed.developer,
    area: listed.area,
    priceFrom: listed.priceFrom ?? template.priceFrom,
  };

  return <ProjectDetails project={project} />;
}