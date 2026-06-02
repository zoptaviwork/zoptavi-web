import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, SlidersHorizontal, Check, X } from 'lucide-react';
import { products, categoriesList } from '../data/products';
import { useCartStore } from '../store/cartStore';

export const Category: React.FC = () => {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Extract category and search terms from URL query
  const catParam = searchParams.get('cat');
  const searchParam = searchParams.get('search');

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    if (catParam) {
      setSelectedCategory(catParam);
    } else {
      setSelectedCategory('All');
    }
  }, [catParam]);

  // List of unique brands in dataset
  const allBrands = Array.from(new Set(products.map(p => p.brand)));

  // Filter & Sort Logic
  const filteredProducts = products
    .filter(prod => {
      // 1. Category Filter
      if (selectedCategory !== 'All' && prod.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // 2. Search Term Filter
      if (searchParam && !prod.name.toLowerCase().includes(searchParam.toLowerCase()) && !prod.description.toLowerCase().includes(searchParam.toLowerCase())) {
        return false;
      }
      // 3. Brand Filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(prod.brand)) {
        return false;
      }
      // 4. Price Filter
      if (prod.price > maxPrice) {
        return false;
      }
      // 5. Rating Filter
      if (minRating !== null && prod.rating < minRating) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      // Sort configurations
      if (sortBy === 'price-low') {
        return a.price - b.price;
      }
      if (sortBy === 'price-high') {
        return b.price - a.price;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      // Default: popularity/relevance (by rating count desc)
      return b.ratingCount - a.ratingCount;
    });

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Clear URL param to keep UI synchronized
    const newParams = new URLSearchParams(searchParams);
    if (category === 'All') {
      newParams.delete('cat');
    } else {
      newParams.set('cat', category);
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSelectedBrands([]);
    setMaxPrice(50000);
    setMinRating(null);
    setSelectedCategory('All');
    // Clear search and category parameters
    setSearchParams({});
  };

  return (
    <div className="font-sans min-h-screen bg-brand-bg max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Result Banner */}
      {searchParam && (
        <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 mb-6 flex justify-between items-center text-sm font-semibold text-brand-navy">
          <p>
            Showing search results for: <span className="text-brand-teal">"{searchParam}"</span> ({filteredProducts.length} items found)
          </p>
          <button 
            onClick={() => {
              const newParams = new URLSearchParams(searchParams);
              newParams.delete('search');
              setSearchParams(newParams);
            }}
            className="p-1 rounded-full hover:bg-teal-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Sort Control Banner Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm mb-6">
        <div>
          <h1 className="text-xl font-display font-extrabold text-brand-navy">
            {selectedCategory === 'All' ? 'All Products' : `${selectedCategory} Collection`}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Found {filteredProducts.length} premium products</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto self-stretch sm:self-auto justify-between sm:justify-end">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden h-11 px-4 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg flex items-center justify-center gap-2 text-xs font-semibold"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 px-3 border border-slate-200 bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg focus:outline-none focus:border-brand-teal cursor-pointer"
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-6 items-start">
        {/* ================= SIDEBAR FILTERS (DESKTOP) ================= */}
        <aside className="hidden lg:block w-[260px] shrink-0 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-50 pb-4">
            <h3 className="font-display font-extrabold text-brand-navy text-sm uppercase tracking-wide">Filters</h3>
            <button
              onClick={handleResetFilters}
              className="text-[10px] font-bold text-brand-orange hover:text-brand-orange-hover"
            >
              Reset All
            </button>
          </div>

          {/* Categories Filter */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Categories</h4>
            <div className="space-y-1.5 pt-1">
              {categoriesList.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCategorySelect(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                    selectedCategory === cat 
                      ? 'bg-teal-50 text-brand-teal' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                  {selectedCategory === cat && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Max Price (₹)</h4>
            <div className="pt-2">
              <input
                type="range"
                min="0"
                max="50000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-teal"
              />
              <div className="flex justify-between items-center text-xs text-slate-500 font-semibold mt-2">
                <span>₹0</span>
                <span className="text-brand-teal font-extrabold">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Brand Filter */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Brands</h4>
            <div className="max-h-48 overflow-y-auto space-y-2 pr-2 scrollbar-thin">
              {allBrands.map((brand, idx) => (
                <label key={idx} className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-600 hover:text-slate-800">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="w-4 h-4 rounded border-slate-350 text-brand-teal focus:ring-brand-teal/10"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Ratings</h4>
            <div className="space-y-1.5 pt-1">
              {[4, 3].map((starVal) => (
                <button
                  key={starVal}
                  onClick={() => setMinRating(minRating === starVal ? null : starVal)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                    minRating === starVal 
                      ? 'bg-teal-50 text-brand-teal' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {starVal}+ <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </span>
                  {minRating === starVal && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ================= MAIN PRODUCTS GRID ================= */}
        <main className="flex-grow">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-display font-extrabold text-lg text-brand-navy">No products found</h3>
              <p className="text-sm text-slate-400 max-w-xs mx-auto">We couldn't find any products matching your current search criteria. Try relaxing your filters.</p>
              <button
                onClick={handleResetFilters}
                className="h-10 px-6 bg-brand-teal hover:bg-brand-teal-hover text-white text-xs font-bold rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <div 
                  key={prod.id} 
                  className="group border border-gray-100 shadow-sm hover:shadow-md rounded-xl p-4 bg-white flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
                >
                  {prod.discount > 0 && (
                    <span className="absolute top-3 left-3 bg-brand-orange text-white text-[10px] font-extrabold px-2 py-0.5 rounded">
                      {prod.discount}% OFF
                    </span>
                  )}
                  
                  {/* Image Viewport */}
                  <div 
                    className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-50 cursor-pointer"
                    onClick={() => navigate(`/product/${prod.id}`)}
                  >
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-550"
                    />
                  </div>

                  {/* Info details */}
                  <div className="mt-4 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{prod.brand}</span>
                      <h3 
                        className="text-xs sm:text-sm font-semibold text-brand-navy mt-1 truncate hover:text-brand-teal cursor-pointer"
                        onClick={() => navigate(`/product/${prod.id}`)}
                      >
                        {prod.name}
                      </h3>
                      <div className="flex items-center gap-1 mt-1.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-slate-700">{prod.rating}</span>
                        <span className="text-[10px] text-slate-400">({prod.ratingCount})</span>
                      </div>
                    </div>

                    {/* Price and Cart Buttons */}
                    <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-3">
                      <div>
                        <span className="text-sm font-extrabold text-brand-navy">₹{prod.price.toLocaleString('en-IN')}</span>
                        {prod.originalPrice > prod.price && (
                          <span className="text-[10px] text-slate-400 line-through ml-1.5">₹{prod.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                      </div>
                      <button
                        onClick={() => addItem(prod, 1, prod.colors?.[0])}
                        className="h-11 px-3.5 rounded-lg bg-brand-teal hover:bg-brand-teal-hover text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ================= MOBILE FILTERS DRAWER ================= */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-[300px] h-full bg-white p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-50 pb-4 mb-4">
                <h3 className="font-display font-extrabold text-brand-navy text-sm uppercase tracking-wide">Filters</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-bold text-slate-800 uppercase">Categories</h4>
                <div className="space-y-1">
                  {categoriesList.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        handleCategorySelect(cat);
                        setMobileFiltersOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between ${
                        selectedCategory === cat ? 'bg-teal-50 text-brand-teal' : 'text-slate-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price slider */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-bold text-slate-800 uppercase">Max Price (₹)</h4>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-teal"
                />
                <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                  <span>₹0</span>
                  <span className="text-brand-teal font-extrabold">₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Brands */}
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-bold text-slate-800 uppercase">Brands</h4>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {allBrands.map((brand, idx) => (
                    <label key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                        className="w-4 h-4 rounded text-brand-teal focus:ring-brand-teal/10"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-slate-100 mt-auto">
              <button
                onClick={() => {
                  handleResetFilters();
                  setMobileFiltersOpen(false);
                }}
                className="flex-grow py-3 rounded-lg border border-slate-200 text-xs font-bold text-slate-500 hover:bg-slate-50"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-grow py-3 rounded-lg bg-brand-teal text-white text-xs font-bold hover:bg-brand-teal-hover"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Category;
