import { projects, developerFacets } from '@/mock/prototype2/projects';
import ProjectsBrowser from '@/components/prototype2/ProjectsBrowser';

export const metadata = { title: 'Projects — Fortune Realty' };

export default function Prototype2ProjectsPage() {
  return <ProjectsBrowser projects={projects} developers={developerFacets} />;
}
