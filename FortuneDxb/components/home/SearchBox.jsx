'use client';

import { Search, Filter } from 'lucide-react';

// Constants
const USAGE_TYPES = [
  { value: 'Residential', label: 'Residential' },
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Both', label: 'Both' },
];

const PROJECT_STATUS = [
  { value: 'New Launch', label: 'New Launch' },
  { value: 'Under Construction', label: 'Under Construction' },
  { value: 'Ready', label: 'Ready' },
];

const UNIT_TYPES = [
  'Studio',
  '1 BHK',
  '2 BHK',
  '3 BHK',
  '4 BHK',
  '5 BHK',
  '6 BHK',
  '7+ BHK',
  'Penthouse',
  'Duplex',
  'Triplex',
  'Villa',
  'Townhouse',
  'Office',
  'Retail',
  'Warehouse',
  'Other',
];

const SearchBox = ({
  searchQuery = '',
  setSearchQuery,
  projectStatus = '',
  setProjectStatus,
  usageType = '',
  setUsageType,
  unitType = '',
  setUnitType,
  setFilterDrawerOpen,
  onSearch,
}) => {
  // Handle search - calls parent's onSearch function
  const handleSearch = () => {
    onSearch?.();
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const selectClass =
    'flex-1 sm:flex-none bg-transparent text-[#F5F2ED] text-xs md:text-sm border border-white/[0.08] rounded-none px-3 py-2 outline-none cursor-pointer appearance-none focus:border-[#B0905E] transition-colors';

  return (
    <div className="max-w-3xl rounded-none overflow-hidden bg-[#1b1714] border border-white/[0.08]">

      {/* Search Input */}
      <div className="flex items-center gap-2 p-2 md:p-3">
        <div className="flex items-center flex-1 min-w-0">
          <Search className="w-5 h-5 md:w-6 md:h-6 text-[#B0905E] shrink-0 ml-2 md:ml-4 mr-2" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Search by project, developer, or area..."
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery?.(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full bg-transparent text-[#F5F2ED] placeholder:text-white/40 text-sm md:text-base outline-none border-none py-2 md:py-3 px-1"
          />
        </div>

        {/* Mobile: Icon Button | Desktop: Full Button (responsive via Tailwind, no useMediaQuery) */}
        <button
          type="button"
          onClick={handleSearch}
          aria-label="Search"
          className="shrink-0 flex items-center justify-center gap-2 rounded-none text-[11px] uppercase tracking-[0.14em] text-[#161310] bg-[#B0905E] hover:bg-[#9a7c4f] transition-colors duration-300 w-11 h-11 mr-0.5 md:w-auto md:h-auto md:min-w-[130px] md:px-6 md:py-3 md:mr-1"
        >
          <Search className="w-5 h-5 md:hidden" />
          <span className="hidden md:inline">Search</span>
        </button>
      </div>

      {/* Quick Filters */}
      <div className="border-t border-white/[0.08]" />
      <div className="flex flex-row flex-wrap justify-center items-center gap-2 md:gap-3 p-3 md:p-4 bg-white/[0.02]">

        {/* Project Status */}
        <select
          value={projectStatus || ''}
          onChange={(e) => setProjectStatus?.(e.target.value)}
          aria-label="Status"
          className={`${selectClass} min-w-[90px] sm:min-w-[140px]`}
        >
          <option value="" className="bg-[#1b1714] text-[#F5F2ED]">All Status</option>
          {PROJECT_STATUS.map((status) => (
            <option key={status.value} value={status.value} className="bg-[#1b1714] text-[#F5F2ED]">
              {status.label}
            </option>
          ))}
        </select>

        {/* Usage Type */}
        <select
          value={usageType || ''}
          onChange={(e) => setUsageType?.(e.target.value)}
          aria-label="Usage"
          className={`${selectClass} min-w-[90px] sm:min-w-[140px]`}
        >
          <option value="" className="bg-[#1b1714] text-[#F5F2ED]">All Types</option>
          {USAGE_TYPES.map((type) => (
            <option key={type.value} value={type.value} className="bg-[#1b1714] text-[#F5F2ED]">
              {type.label}
            </option>
          ))}
        </select>

        {/* Unit Type */}
        <select
          value={unitType || ''}
          onChange={(e) => setUnitType?.(e.target.value)}
          aria-label="Unit"
          className={`${selectClass} min-w-[70px] sm:min-w-[120px]`}
        >
          <option value="" className="bg-[#1b1714] text-[#F5F2ED]">Any</option>
          {UNIT_TYPES.map((unit) => (
            <option key={unit} value={unit} className="bg-[#1b1714] text-[#F5F2ED]">
              {unit}
            </option>
          ))}
        </select>

        {/* More Filters Button */}
        <button
          type="button"
          onClick={() => setFilterDrawerOpen?.(true)}
          aria-label="More Filters"
          className="flex items-center justify-center gap-2 rounded-none border border-white/[0.08] px-3 py-2 text-xs md:text-sm text-white/70 hover:text-[#F5F2ED] hover:border-[#B0905E] transition-colors w-10 h-10 sm:w-auto sm:h-auto"
        >
          <Filter className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">More Filters</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
