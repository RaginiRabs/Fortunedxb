// Project inner / detail page — prototype1 (light, mirrors the reference layout).
// Each section is its own component under components/prototype1/project/.
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { projectsBySlug } from '@/mock/prototype1/projectDetail';

import SectionNav from '@/components/prototype1/project/SectionNav';
import Gallery from '@/components/prototype1/project/Gallery';
import ProjectSummary from '@/components/prototype1/project/ProjectSummary';
import DeveloperCard from '@/components/prototype1/project/DeveloperCard';
import About from '@/components/prototype1/project/About';
import MarketHighlights from '@/components/prototype1/project/MarketHighlights';
import Investment from '@/components/prototype1/project/Investment';
import PaymentPlan from '@/components/prototype1/project/PaymentPlan';
import MortgageCalculator from '@/components/prototype1/project/MortgageCalculator';
import FloorPlans from '@/components/prototype1/project/FloorPlans';
import Location from '@/components/prototype1/project/Location';
import UnitSpecifications from '@/components/prototype1/project/UnitSpecifications';
import Transactions from '@/components/prototype1/project/Transactions';
import Faq from '@/components/prototype1/project/Faq';
// Hidden for now:
// import SimilarProjects from '@/components/prototype1/project/SimilarProjects';
// import MoveCTA from '@/components/prototype1/project/MoveCTA';

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = projectsBySlug[slug];
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-[#1A1A1A]">
      <SectionNav tabs={project.tabs} />

      <div className="mx-auto max-w-6xl px-4 md:px-6 pb-16">
        <Link
          href="/prototype1"
          className="mt-5 inline-flex items-center gap-1.5 text-[13px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
        >
          <ArrowLeft size={15} />
          Back to projects
        </Link>

        {/* Gallery — full width */}
        <section id="overview" className="mt-4 scroll-mt-24">
          <Gallery images={project.gallery} />
        </section>

        {/* Two columns: scrolling content (left) + sticky developer card (right) */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          {/* Main content */}
          <div className="min-w-0 space-y-14">
            <ProjectSummary project={project} />

            {/* developer card inline on mobile (sticky version is in the aside) */}
            <div className="lg:hidden">
              <DeveloperCard project={project} />
            </div>

            <section id="about" className="scroll-mt-24">
              <About about={project.about} />
            </section>

            <MarketHighlights highlights={project.highlights} />
            <Investment investment={project.investment} />
            <PaymentPlan payment={project.payment} />
            <MortgageCalculator mortgage={project.mortgage} />
            <FloorPlans floorPlans={project.floorPlans} />

            <Location
              geo={project.geo}
              projectName={project.name}
              location={project.location}
              projectImage={project.gallery[0]?.src}
              projectImageFallback={project.gallery[0]?.fallback}
              connectivity={project.connectivity}
            />

            <UnitSpecifications distribution={project.specDistribution} specs={project.specs} />
            <Transactions transactions={project.transactions} />
            <Faq faq={project.faq} />
            {/* Hidden for now — un-comment to restore:
            <SimilarProjects projects={project.similar} />
            <MoveCTA projectName={project.name} /> */}
          </div>

          {/* Sticky developer card (desktop) */}
          <aside className="hidden lg:block lg:self-start lg:sticky lg:top-24">
            <DeveloperCard project={project} />
          </aside>
        </div>
      </div>
    </div>
  );
}
