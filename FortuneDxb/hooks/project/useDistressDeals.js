import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/axios';
import { formatPrice, getLowestPrice, getUnitTypes, getAreaRange } from '@/lib/utils';

/**
 * Fetch distress deals (projects flagged is_distress_deal = 1, joined with their offer).
 * Returns the raw DB-shaped projects (for ProjectCard) and a carousel-shaped list
 * (for the home ExclusiveOffers ticket carousel).
 */
export function useDistressDeals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDistressDeals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/api/distress-deals');
      if (res.data.success) {
        setDeals(res.data.data || []);
        return res.data.data;
      }
      throw new Error(res.data.message || 'Failed to fetch distress deals');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to fetch distress deals';
      setError(msg);
      console.error('Error fetching distress deals:', msg);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDistressDeals();
  }, [fetchDistressDeals]);

  // Shape for the home ExclusiveOffers ticket carousel
  const carouselDeals = deals.map((d) => {
    const galleryPath = d.gallery?.[0]?.file_path;
    const image = galleryPath
      ? (galleryPath.startsWith('/') ? galleryPath : `/${galleryPath}`)
      : '/asset/placeholderproject.jpg';

    const price = d.booking_amount && d.booking_amount !== '0'
      ? formatPrice(d.booking_amount)
      : formatPrice(getLowestPrice(d.configurations));

    return {
      id: d.project_id,
      project_id: d.project_id,
      name: d.project_name,
      developer: d.developer_name,
      city: d.city || 'Dubai',
      location: d.locality ? `${d.locality}, ${d.city || 'Dubai'}` : (d.city || 'Dubai'),
      image,
      price,
      beds: getUnitTypes(d.configurations),
      area: getAreaRange(d.configurations),
      offer: d.offer || null,
    };
  });

  return { deals, carouselDeals, loading, error, fetchDistressDeals };
}

export default useDistressDeals;
