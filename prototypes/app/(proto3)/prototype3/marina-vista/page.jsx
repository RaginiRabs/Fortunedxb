// Marina Vista detail page — prototype3. Fixed route: /prototype3/marina-vista
// Desktop (lg+): two columns — scrolling content on the left, a sticky rail on
// the right (Developer + The Address/video). Mobile: single column, same order
// as before (Address after Sales, Developer before FAQ) via lg:hidden clones.
import { marinaVista } from '@/mock/prototype3/marinaVista';
import TopBar from '@/components/prototype3/project/TopBar';
import HeroGallery from '@/components/prototype3/project/HeroGallery';
import QuickFacts from '@/components/prototype3/project/QuickFacts';
import ConstructionStatus from '@/components/prototype3/project/ConstructionStatus';
import SalesMetrics from '@/components/prototype3/project/SalesMetrics';
import Overview from '@/components/prototype3/project/Overview';
import Amenities from '@/components/prototype3/project/Amenities';
import FloorPlans from '@/components/prototype3/project/FloorPlans';
import AvailableUnits from '@/components/prototype3/project/AvailableUnits';
import PaymentPlan from '@/components/prototype3/project/PaymentPlan';
import Location from '@/components/prototype3/project/Location';
import Developer from '@/components/prototype3/project/Developer';
import FAQ from '@/components/prototype3/project/FAQ';
import StickyCtaBar from '@/components/prototype3/project/StickyCtaBar';

export const metadata = {
  title: `${marinaVista.name} — Off-Plan · Dubai`,
  description: `${marinaVista.name} — premium off-plan waterfront living in Dubai Marina. Floor plans, payment plans, construction status, amenities and more.`,
};

export default function MarinaVistaPage() {
  const p = marinaVista;

  return (
    <div className="bg-white">
      <TopBar project={p} />
      <HeroGallery project={p} />

      <div className="mx-auto max-w-[1140px] px-4 sm:px-6">
        <div className="mt-6 sm:mt-8">
          <QuickFacts facts={p.quickFacts} />
        </div>

        {/* Content + sticky rail */}
        <div className="pb-24 lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-x-10">
          {/* LEFT — main scrolling content */}
          <div className="lg:min-w-0">
            <ConstructionStatus construction={p.construction} />
            <SalesMetrics sales={p.sales} />
            {/* mobile-only: The Address sits here (after Sales) */}
            <div className="lg:hidden">
              <Overview project={p} />
            </div>
            <Amenities amenities={p.amenities} />
            <FloorPlans plans={p.floorPlans} />
            <AvailableUnits units={p.units} />
            <PaymentPlan payment={p.payment} />
            <Location project={p} />
            {/* mobile-only: Developer sits here (before FAQ) */}
            <div className="lg:hidden">
              <Developer developer={p.developer} />
            </div>
            <FAQ faq={p.faq} />
          </div>

          {/* RIGHT — sticky rail (desktop only): Developer on top, Address below */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6 pt-8">
              <Developer developer={p.developer} />
              <Overview project={p} />
            </div>
          </aside>
        </div>
      </div>

      <StickyCtaBar project={p} />

      {/* Footer */}
      <footer className="border-t border-black/10 bg-slate-50 px-6 py-8 text-center text-slate-600">
        <div className="text-xl font-semibold text-black font-[family-name:var(--font-heading)]">Marina Vista Residences</div>
        <small className="mt-2 block text-xs">Off-plan · Dubai Marina · Meridian Developments</small>
        <small className="mt-4 block text-xs opacity-70">Indicative imagery &amp; figures. Prices subject to availability. RERA registered.</small>
      </footer>
    </div>
  );
}
