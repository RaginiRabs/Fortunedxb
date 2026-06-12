// Marina Vista detail page — prototype3. Follows fixed route: /prototype3/marina-vista
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
  return (
    <div className="bg-white">
      <TopBar project={marinaVista} />
      <HeroGallery project={marinaVista} />
      <QuickFacts facts={marinaVista.quickFacts} />
      <ConstructionStatus construction={marinaVista.construction} />
      <SalesMetrics sales={marinaVista.sales} />
      <Overview project={marinaVista} />
      <Amenities amenities={marinaVista.amenities} />
      <FloorPlans plans={marinaVista.floorPlans} />
      <AvailableUnits units={marinaVista.units} />
      <PaymentPlan payment={marinaVista.payment} />
      <Location project={marinaVista} />
      <Developer developer={marinaVista.developer} />
      <FAQ faq={marinaVista.faq} />
      <div className="h-20" />
      <StickyCtaBar project={marinaVista} />

      {/* Footer */}
      <footer className="border-t border-black/10 px-6 py-8 text-center text-slate-600 bg-slate-50">
        <div className="font-serif text-xl text-black">Marina Vista Residences</div>
        <small className="block text-xs mt-2">Off-plan · Dubai Marina · Meridian Developments</small>
        <small className="block text-xs mt-4 opacity-70">Indicative imagery & figures. Prices subject to availability. RERA registered.</small>
      </footer>
    </div>
  );
}
