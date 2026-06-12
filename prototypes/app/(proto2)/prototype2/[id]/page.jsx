import { notFound } from 'next/navigation';
import { projects, project as detailTemplate } from '@/mock/prototype2/projects';
import ProjectDetail from '@/components/prototype2/ProjectDetail';

export default async function Prototype2DetailPage({ params }) {
  const { id } = await params;
  const listed = projects.find((p) => String(p.id) === String(id));
  if (!listed) notFound();

  // The rich detail content is a shared template; overlay the selected
  // card's headline fields so each project's page feels distinct.
  const project = {
    ...detailTemplate,
    name: listed.name,
    developer: listed.developer,
    area: listed.area,
    launchPrice: listed.priceFrom,
    heroImage: listed.image || detailTemplate.heroImage,
  };

  return <ProjectDetail project={project} />;
}
