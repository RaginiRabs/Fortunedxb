// Project inner / detail page — prototype1 route now renders prototype4's
// detail design (ProjectDetails) with prototype4 sample data.
import { notFound } from 'next/navigation';
import { projectsBySlug } from '@/mock/prototype1/projectDetail';
import { projects } from '@/mock/prototype4/projects';
import ProjectDetails from '@/components/prototype4/ProjectDetails';

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  if (!projectsBySlug[slug]) notFound();

  // Prototype4 detail design + prototype4 sample data.
  const project = projects[0];
  return <ProjectDetails project={project} navOffsetClass="top-[80px] md:top-[84px]" />;
}
