'use client';
import { use } from 'react';
import DeveloperView from '@/components/admin/DeveloperView';

export default function ViewDeveloperPage({ params }) {
  const { id } = use(params);

  return <DeveloperView developerId={id} />;
}