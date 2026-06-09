'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { mockProjects } from '@/mock/person-a/projects';
import AProjectCard from '@/components/person-a/AProjectCard';

// Toggle: true = use my own mock data, false = use the existing backend API.
const USE_MOCK = true;

export default function PersonAHome() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (USE_MOCK) {
      setProjects(mockProjects);
      return;
    }
    // Existing API — DO NOT modify the backend, just consume it.
    api
      .get('/api/projects')
      .then((res) => setProjects(res.data?.data || []))
      .catch(() => setProjects([]));
  }, []);

  return (
    <section className="px-6 md:px-12 py-12">
      <h1 className="text-3xl md:text-4xl tracking-tight">Featured Projects</h1>
      <p className="mt-2 text-white/50 text-sm">Person A layout · sample redesign</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <AProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
