'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, RotateCcw, Search } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useFilters } from '@/hooks/Filter/useFiltersHook';

const PRICE_MIN = 500000;
const PRICE_MAX = 50000000;
const PRICE_STEP = 500000;

const FilterDrawer = ({
  open,
  onClose,
  // SearchBox states (for combined search)
  searchQuery = '',
  projectStatus = '',
  usageType = '',
  unitType = '',
  // Advanced filter states
  priceRange = [500000, 10000000],
  setPriceRange,
  selectedDeveloper = '',
  setSelectedDeveloper,
  completionYear = '',
  setCompletionYear,
  paymentPlan = '',
  setPaymentPlan,
  selectedLocality = '',
  setSelectedLocality,
  selectedHighlights = [],
  setSelectedHighlights,
  developers = [],
  developersLoading = false,
  // Reset callback
  onReset,
}) => {
  const router = useRouter();

  // Fetch filter options
  const { localities, highlights, loading: filtersLoading, fetchFilters } = useFilters();

  useEffect(() => {
    if (open) {
      fetchFilters();
    }
  }, [open, fetchFilters]);

  const handleHighlightToggle = (highlight) => {
    if (!setSelectedHighlights) return;
    const currentHighlights = selectedHighlights || [];
    if (currentHighlights.includes(highlight)) {
      setSelectedHighlights(currentHighlights.filter((h) => h !== highlight));
    } else {
      setSelectedHighlights([...currentHighlights, highlight]);
    }
  };

  const handleReset = () => {
    setPriceRange?.([500000, 10000000]);
    setSelectedDeveloper?.('');
    setCompletionYear?.('');
    setPaymentPlan?.('');
    setSelectedLocality?.('');
    setSelectedHighlights?.([]);
    onReset?.();
  };

  // Dual-thumb price range handlers (prevent thumbs crossing)
  const handlePriceMin = (e) => {
    const value = Math.min(Number(e.target.value), priceRange[1] - PRICE_STEP);
    setPriceRange?.([value, priceRange[1]]);
  };
  const handlePriceMax = (e) => {
    const value = Math.max(Number(e.target.value), priceRange[0] + PRICE_STEP);
    setPriceRange?.([priceRange[0], value]);
  };

  const minPct = ((priceRange[0] - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const maxPct = ((priceRange[1] - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  // ============ APPLY FILTERS - DIRECT NAVIGATION ============
  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    // SearchBox filters
    if (searchQuery?.trim()) params.set('search', searchQuery.trim());
    if (projectStatus) params.set('status', projectStatus);
    if (usageType) params.set('usage', usageType);
    if (unitType) params.set('unit', unitType);

    // Advanced filters
    if (priceRange[0] !== 500000) params.set('price_min', priceRange[0]);
    if (priceRange[1] !== 10000000) params.set('price_max', priceRange[1]);
    if (selectedDeveloper) params.set('developer', selectedDeveloper);
    if (selectedLocality) params.set('locality', selectedLocality);
    if (completionYear) params.set('completion', completionYear);
    if (paymentPlan) params.set('payment', paymentPlan);
    if (selectedHighlights?.length > 0) {
      params.set('highlights', selectedHighlights.join(','));
    }

    const queryString = params.toString();

    onClose?.();
    router.push(`/projects${queryString ? `?${queryString}` : ''}`);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (priceRange[0] !== 500000 || priceRange[1] !== 10000000) count++;
    if (selectedDeveloper) count++;
    if (selectedLocality) count++;
    if (completionYear) count++;
    if (paymentPlan) count++;
    if (selectedHighlights?.length > 0) count += selectedHighlights.length;
    return count;
  };

  const activeCount = getActiveFilterCount();

  const selectClass =
    'w-full bg-[#1b1714] text-[#F5F2ED] text-sm font-medium border border-white/[0.08] rounded-sm px-3 py-2.5 outline-none cursor-pointer appearance-none focus:border-primary/60 transition-colors disabled:opacity-50';
  const labelClass = 'block text-xs font-semibold text-white/50 mb-1.5';

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-[1200] bg-black/50 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Panel (right anchor) */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Advanced Filters"
        className={`fixed top-0 right-0 z-[1300] flex h-full w-full sm:w-[400px] flex-col bg-[#1b1714] border-l border-white/[0.08] transform transition-transform duration-300 sm:rounded-l-sm overflow-y-auto p-6 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-[#F5F2ED]">Advanced Filters</h2>
            {activeCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded-full bg-primary text-navy text-xs font-bold">
                {activeCount}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="flex items-center justify-center w-9 h-9 rounded-sm bg-black/5 hover:bg-black/10 text-[#F5F2ED] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#F5F2ED] mb-4">Price Range</p>
          <div className="px-1">
            <div className="relative h-6 flex items-center">
              <div className="absolute left-0 right-0 h-1.5 rounded-full bg-border" />
              <div
                className="absolute h-1.5 rounded-full bg-primary"
                style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
              />
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={priceRange[0]}
                onChange={handlePriceMin}
                aria-label="Minimum price"
                className="range-thumb"
              />
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={priceRange[1]}
                onChange={handlePriceMax}
                aria-label="Maximum price"
                className="range-thumb"
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-white/50">{formatPrice(priceRange[0])}</span>
              <span className="text-xs text-white/50">{formatPrice(priceRange[1])}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.08] my-2" />

        {/* Developer */}
        <div className="mb-4">
          <label className={labelClass}>Developer</label>
          <select
            value={selectedDeveloper}
            onChange={(e) => setSelectedDeveloper?.(e.target.value)}
            disabled={developersLoading}
            className={selectClass}
          >
            <option value="">All Developers</option>
            {developers?.map((dev) => (
              <option key={dev.developer_id} value={dev.developer_id}>
                {dev.name}
              </option>
            ))}
          </select>
        </div>

        {/* Locality */}
        <div className="mb-4">
          <label className={labelClass}>Locality</label>
          <select
            value={selectedLocality}
            onChange={(e) => setSelectedLocality?.(e.target.value)}
            disabled={filtersLoading}
            className={selectClass}
          >
            <option value="">All Localities</option>
            {localities?.map((locality) => (
              <option key={locality} value={locality}>
                {locality}
              </option>
            ))}
          </select>
        </div>

        {/* Completion Year */}
        <div className="mb-4">
          <label className={labelClass}>Completion Year</label>
          <select
            value={completionYear}
            onChange={(e) => setCompletionYear?.(e.target.value)}
            className={selectClass}
          >
            <option value="">Any</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028+</option>
          </select>
        </div>

        {/* Payment Plan */}
        <div className="mb-4">
          <label className={labelClass}>Payment Plan</label>
          <select
            value={paymentPlan}
            onChange={(e) => setPaymentPlan?.(e.target.value)}
            className={selectClass}
          >
            <option value="">Any</option>
            <option value="80/20">80/20</option>
            <option value="70/30">70/30</option>
            <option value="60/40">60/40</option>
            <option value="50/50">50/50</option>
            <option value="post-handover">Post-Handover</option>
          </select>
        </div>

        <div className="border-t border-white/[0.08] my-2" />

        {/* Highlights */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-[#F5F2ED] mb-3">Highlights</p>
          <div className="flex flex-wrap gap-2">
            {filtersLoading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="w-20 h-8 rounded-sm bg-border animate-pulse" />
              ))
            ) : highlights?.length > 0 ? (
              highlights.map((highlight) => {
                const active = (selectedHighlights || []).includes(highlight);
                return (
                  <button
                    key={highlight}
                    type="button"
                    onClick={() => handleHighlightToggle(highlight)}
                    className={`px-3 py-1.5 rounded-sm text-xs font-medium border transition-colors ${
                      active
                        ? 'bg-primary text-navy border-primary'
                        : 'bg-black/5 text-[#F5F2ED] border-white/[0.08] hover:border-primary/60'
                    }`}
                  >
                    {highlight}
                  </button>
                );
              })
            ) : (
              <p className="text-sm text-white/50">No highlights available</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex gap-3 pt-6">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-sm border border-white/[0.08] text-white/50 font-semibold hover:bg-black/5 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
          <button
            type="button"
            onClick={handleApplyFilters}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-sm font-semibold text-navy bg-gradient-to-br from-primary to-primary-dark hover:from-primary-light hover:to-primary transition-all shadow-lg shadow-primary/30"
          >
            <Search className="w-4 h-4" /> Apply Filters
          </button>
        </div>
      </aside>
    </>
  );
};

export default FilterDrawer;
