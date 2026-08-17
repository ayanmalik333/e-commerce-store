import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown, X, RotateCcw, Filter } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { products, categories, selectedCategorySlug, setSelectedCategorySlug, searchQuery, setSearchQuery } = useStore();

  const [sortOption, setSortOption] = useState<'sequence' | 'price-low' | 'price-high' | 'rating'>('sequence');
  const [selectedCategory, setSelectedCategory] = useState<string>(selectedCategorySlug || 'all');
  const [maxPrice, setMaxPrice] = useState<number>(300);

  // Sync selectedCategory with context state if set from navbar
  React.useEffect(() => {
    if (selectedCategorySlug) {
      setSelectedCategory(selectedCategorySlug);
    }
  }, [selectedCategorySlug]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase();
      
      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q)
      );

      // Price filter
      const matchesPrice = product.price <= maxPrice;

      return matchesCategory && matchesSearch && matchesPrice;
    }).sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      // 'sequence'
      return (a.sequenceOrder || 99) - (b.sequenceOrder || 99);
    });
  }, [products, selectedCategory, searchQuery, maxPrice, sortOption]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedCategorySlug(null);
    setSearchQuery('');
    setMaxPrice(300);
    setSortOption('sequence');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="bg-[#F7F4EE] rounded-3xl p-8 sm:p-12 border border-[#E6E0D8] text-center max-w-4xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#5B6B54] mb-2 block">
          Full Catalog
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C221E] mb-3">
          The Earthy Atelier Collection
        </h1>
        <p className="text-sm text-[#8C827A] font-light max-w-xl mx-auto leading-relaxed">
          Explore our complete collection of handcrafted European flax textiles, terra clay carafes, botanical soy candles, and turned walnut serveware.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#F7F4EE] p-5 rounded-2xl border border-[#E6E0D8] space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-3.5" />
            <input
              id="shop-search-input"
              type="text"
              placeholder="Search catalog by name or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 text-xs bg-[#FDFBF7] border border-[#E6E0D8] rounded-xl focus:outline-none focus:border-[#5B6B54]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-[#8C827A] hover:text-[#2C221E]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Controls: Sort Dropdown & Reset */}
          <div className="flex items-center flex-wrap gap-3 text-xs">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-[#FDFBF7] border border-[#E6E0D8] px-3 py-2 rounded-xl">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#5B6B54]" />
              <label htmlFor="shop-sort-select" className="text-[#8C827A] font-medium hidden sm:inline">
                Sort:
              </label>
              <select
                id="shop-sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="bg-transparent text-[#2C221E] font-semibold focus:outline-none cursor-pointer"
              >
                <option value="sequence">Featured Priority Order</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>

            {/* Max Price Range Slider */}
            <div className="flex items-center gap-2 bg-[#FDFBF7] border border-[#E6E0D8] px-3 py-2 rounded-xl">
              <span className="text-[#8C827A] font-medium">Max Price:</span>
              <span className="font-bold text-[#2C221E]">${maxPrice}</span>
              <input
                id="shop-price-range"
                type="range"
                min="30"
                max="300"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 accent-[#5B6B54] cursor-pointer"
              />
            </div>

            {/* Reset Filters */}
            <button
              id="shop-reset-filters-btn"
              onClick={handleResetFilters}
              className="p-2 text-[#8C827A] hover:text-[#2C221E] hover:bg-[#E6E0D8]/40 rounded-xl transition-colors cursor-pointer flex items-center gap-1 font-medium"
              title="Reset All Filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="pt-2 border-t border-[#E6E0D8] flex items-center gap-2 overflow-x-auto pb-1">
          <button
            id="cat-chip-all"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedCategorySlug(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#2C221E] text-[#FDFBF7]'
                : 'bg-[#FDFBF7] text-[#8C827A] border border-[#E6E0D8] hover:border-[#5B6B54]'
            }`}
          >
            All Collections ({products.length})
          </button>

          {categories.map(cat => (
            <button
              key={cat.id}
              id={`cat-chip-${cat.id}`}
              onClick={() => {
                setSelectedCategory(cat.name);
                setSelectedCategorySlug(cat.name);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory.toLowerCase() === cat.name.toLowerCase()
                  ? 'bg-[#5B6B54] text-white'
                  : 'bg-[#FDFBF7] text-[#8C827A] border border-[#E6E0D8] hover:border-[#5B6B54]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header & Counter */}
      <div className="flex items-center justify-between text-xs text-[#8C827A] px-1">
        <span>
          Showing <strong className="text-[#2C221E] font-semibold">{filteredProducts.length}</strong> of {products.length} products
        </span>
        {selectedCategory !== 'all' && (
          <span className="text-[#5B6B54] font-medium">
            Filtered by: {selectedCategory}
          </span>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#F7F4EE] rounded-3xl p-12 text-center border border-[#E6E0D8] space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#E6E0D8]/50 flex items-center justify-center mx-auto text-[#8C827A]">
            <Filter className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#2C221E]">No products match your criteria</h3>
          <p className="text-xs text-[#8C827A] max-w-sm mx-auto">
            Try adjusting your price range, clearing search terms, or exploring all category collections.
          </p>
          <button
            id="shop-empty-reset-btn"
            onClick={handleResetFilters}
            className="px-6 py-2.5 bg-[#2C221E] text-[#FDFBF7] text-xs font-medium rounded-xl hover:bg-[#5B6B54] transition-colors cursor-pointer"
          >
            Reset Catalog Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
