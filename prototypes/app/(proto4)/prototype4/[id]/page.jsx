import { notFound } from 'next/navigation';
import { projects } from '@/mock/prototype4/projects';
import ProjectDetails from '@/components/prototype4/ProjectDetails';

export default async function Prototype4ProjectDetailsPage({ params }) {
  const { id } = await params;
  const project = projects.find((p) => String(p.id) === String(id));
  if (!project) notFound();

  return <ProjectDetails project={project} />;
}
