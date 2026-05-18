import { useState, useMemo } from "react";
import { SlidersHorizontal, X, Search, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { perfumes, brands, SIZE_OPTIONS, GENDER_OPTIONS, SizeOption, Gender } from "./data";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  darkMode: boolean;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onViewDetail: (id: number) => void;
  initialSearch?: string;
}

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'rating' | 'new';

export function ProductGrid({
  darkMode,
  favorites,
  onToggleFavorite,
  onViewDetail,
  initialSearch = '',
}: ProductGridProps) {
  const [search, setSearch] = useState(initialSearch);
  const [selectedSizes, setSelectedSizes] = useState<SizeOption[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<Gender[]>([]);
  const [showBestSeller, setShowBestSeller] = useState(false);
  const [showNewArrival, setShowNewArrival] = useState(false);
  const [sort, setSort] = useState<SortOption>('popular');
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);

  const toggleSize = (s: SizeOption) =>
    setSelectedSizes((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const toggleBrand = (b: string) =>
    setSelectedBrands((prev) => prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]);

  const toggleGender = (g: Gender) =>
    setSelectedGenders((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]);

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedBrands([]);
    setSelectedGenders([]);
    setShowBestSeller(false);
    setShowNewArrival(false);
    setPriceRange([0, 200]);
    setSearch('');
  };

  const activeFilterCount =
    selectedSizes.length + selectedBrands.length + selectedGenders.length +
    (showBestSeller ? 1 : 0) + (showNewArrival ? 1 : 0);

  const filtered = useMemo(() => {
    let result = [...perfumes];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => selectedSizes.includes(s.label) && s.inStock)
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    if (selectedGenders.length > 0) {
      result = result.filter((p) => selectedGenders.includes(p.gender));
    }

    if (showBestSeller) result = result.filter((p) => p.isBestSeller);
    if (showNewArrival) result = result.filter((p) => p.isNewArrival);

    // Price: check cheapest available size
    result = result.filter((p) => {
      const minPrice = Math.min(...p.sizes.filter((s) => s.inStock).map((s) => s.price));
      return minPrice >= priceRange[0] && minPrice <= priceRange[1];
    });

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => Math.min(...a.sizes.map((s) => s.price)) - Math.min(...b.sizes.map((s) => s.price)));
        break;
      case 'price-desc':
        result.sort((a, b) => Math.min(...b.sizes.map((s) => s.price)) - Math.min(...a.sizes.map((s) => s.price)));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'new':
        result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [search, selectedSizes, selectedBrands, selectedGenders, showBestSeller, showNewArrival, sort, priceRange]);

  const bg = darkMode ? '#12110F' : '#FAF9F7';
  const surface = darkMode ? '#1C1B19' : '#FFFFFF';
  const border = darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const textPrimary = darkMode ? '#FAF9F7' : '#1C1B19';
  const textSecondary = darkMode ? 'rgba(250,249,247,0.5)' : 'rgba(28,27,25,0.5)';

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="flex flex-col gap-3">
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: textSecondary,
        }}
      >
        {title}
      </p>
      {children}
    </div>
  );

  const FilterChip = ({
    label,
    active,
    onClick,
  }: {
    label: string;
    active: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-full transition-all duration-150"
      style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '12px',
        fontWeight: active ? 500 : 400,
        background: active ? '#C4A76B' : darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
        color: active ? '#fff' : textSecondary,
        border: `1px solid ${active ? '#C4A76B' : border}`,
      }}
    >
      {label}
    </button>
  );

  const FilterContent = () => (
    <div className="flex flex-col gap-6">
      {/* Sizes */}
      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((s) => (
            <FilterChip key={s} label={s} active={selectedSizes.includes(s)} onClick={() => toggleSize(s)} />
          ))}
        </div>
      </FilterSection>

      {/* Gender */}
      <FilterSection title="Gender">
        <div className="flex flex-wrap gap-2">
          {GENDER_OPTIONS.map((g) => (
            <FilterChip key={g} label={g} active={selectedGenders.includes(g)} onClick={() => toggleGender(g)} />
          ))}
        </div>
      </FilterSection>

      {/* Brand */}
      <FilterSection title="Brand">
        <div className="flex flex-col gap-2">
          {brands.map((b) => (
            <button
              key={b.name}
              onClick={() => toggleBrand(b.name)}
              className="flex items-center justify-between text-left transition-colors duration-150"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded flex items-center justify-center transition-all"
                  style={{
                    background: selectedBrands.includes(b.name) ? '#C4A76B' : 'transparent',
                    border: `1.5px solid ${selectedBrands.includes(b.name) ? '#C4A76B' : border}`,
                  }}
                >
                  {selectedBrands.includes(b.name) && (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1 4l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: textPrimary }}>
                  {b.name}
                </span>
              </div>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: textSecondary }}>
                {b.count}
              </span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Collections */}
      <FilterSection title="Collection">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setShowBestSeller((v) => !v)}
            className="flex items-center gap-2"
          >
            <div
              className="w-4 h-4 rounded flex items-center justify-center"
              style={{
                background: showBestSeller ? '#C4A76B' : 'transparent',
                border: `1.5px solid ${showBestSeller ? '#C4A76B' : border}`,
              }}
            >
              {showBestSeller && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1 4l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: textPrimary }}>
              Best Sellers
            </span>
          </button>
          <button
            onClick={() => setShowNewArrival((v) => !v)}
            className="flex items-center gap-2"
          >
            <div
              className="w-4 h-4 rounded flex items-center justify-center"
              style={{
                background: showNewArrival ? '#C4A76B' : 'transparent',
                border: `1.5px solid ${showNewArrival ? '#C4A76B' : border}`,
              }}
            >
              {showNewArrival && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1 4l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: textPrimary }}>
              New Arrivals
            </span>
          </button>
        </div>
      </FilterSection>

      {/* Clear */}
      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70"
          style={{ color: '#C4A76B', fontFamily: 'Inter, sans-serif', fontSize: '13px' }}
        >
          <X size={13} />
          Clear all filters ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen pt-20" style={{ background: bg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page Header */}
        <div className="mb-8">
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C4A76B',
              marginBottom: '6px',
            }}
          >
            Our Collection
          </p>
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 400,
              fontSize: 'clamp(28px, 5vw, 48px)',
              color: textPrimary,
              lineHeight: 1.1,
            }}
          >
            All Perfumes
          </h2>
        </div>

        {/* Search + Controls Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Search */}
          <div
            className="flex items-center gap-2 flex-1 px-4 py-3 rounded-xl"
            style={{
              background: surface,
              border: `1px solid ${border}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <Search size={16} style={{ color: textSecondary }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, brand, notes…"
              className="flex-1 outline-none bg-transparent"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: textPrimary,
              }}
            />
            {search && (
              <button onClick={() => setSearch('')}>
                <X size={14} style={{ color: textSecondary }} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="appearance-none px-4 py-3 pr-8 rounded-xl outline-none cursor-pointer"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                background: surface,
                color: textPrimary,
                border: `1px solid ${border}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="new">New Arrivals</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: textSecondary }}
            />
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-xl"
            style={{
              background: surface,
              border: `1px solid ${border}`,
              color: textPrimary,
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
            }}
          >
            <SlidersHorizontal size={15} />
            Filters
            {activeFilterCount > 0 && (
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: '#C4A76B', color: '#fff', fontSize: '10px' }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside
            className="hidden lg:block w-56 flex-shrink-0"
          >
            <div
              className="rounded-2xl p-5 sticky top-24"
              style={{
                background: surface,
                border: `1px solid ${border}`,
                boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <span
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontWeight: 500,
                    fontSize: '18px',
                    color: textPrimary,
                  }}
                >
                  Filters
                </span>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      color: '#C4A76B',
                    }}
                  >
                    Clear ({activeFilterCount})
                  </button>
                )}
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {/* Result count */}
            <p
              className="mb-5"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: textSecondary,
              }}
            >
              {filtered.length} {filtered.length === 1 ? 'perfume' : 'perfumes'} found
            </p>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <span
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '24px',
                    color: textSecondary,
                  }}
                >
                  No perfumes found
                </span>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: textSecondary }}>
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={clearFilters}
                  className="px-5 py-2 rounded-full"
                  style={{
                    background: '#C4A76B',
                    color: '#fff',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                  }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                {filtered.map((perfume) => (
                  <ProductCard
                    key={perfume.id}
                    perfume={perfume}
                    darkMode={darkMode}
                    isFavorite={favorites.includes(perfume.id)}
                    onToggleFavorite={onToggleFavorite}
                    onViewDetail={onViewDetail}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterOpen(false)}
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto"
              style={{ background: surface, boxShadow: '0 -8px 40px rgba(0,0,0,0.2)' }}
            >
              <div className="flex items-center justify-between mb-6">
                <span
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontWeight: 500,
                    fontSize: '22px',
                    color: textPrimary,
                  }}
                >
                  Filters
                </span>
                <button
                  onClick={() => setFilterOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
                >
                  <X size={16} style={{ color: textPrimary }} />
                </button>
              </div>
              <FilterContent />
              <button
                onClick={() => setFilterOpen(false)}
                className="w-full py-3.5 rounded-xl mt-6"
                style={{
                  background: darkMode ? '#FAF9F7' : '#1C1B19',
                  color: darkMode ? '#1C1B19' : '#FAF9F7',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                }}
              >
                Show {filtered.length} results
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
