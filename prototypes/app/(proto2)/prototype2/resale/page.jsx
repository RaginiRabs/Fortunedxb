import { resaleProperties, resaleTypeFacets, resaleStatusFacets } from '@/mock/prototype2/projects';
import ResaleProperties from '@/components/prototype2/ResaleProperties';

export const metadata = { title: 'Resale Properties — Fortune Realty' };

export default function Prototype2ResalePage() {
  return <ResaleProperties properties={resaleProperties} typeFacets={resaleTypeFacets} statusFacets={resaleStatusFacets} />;
}
