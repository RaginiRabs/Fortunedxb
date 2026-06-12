import { distressDeals, dealTypeFacets, discountFacets } from '@/mock/prototype2/projects';
import DistressDeals from '@/components/prototype2/DistressDeals';

export const metadata = { title: 'Distress Deals — Fortune Realty' };

export default function Prototype2DistressDealsPage() {
  return <DistressDeals deals={distressDeals} dealTypes={dealTypeFacets} discounts={discountFacets} />;
}
