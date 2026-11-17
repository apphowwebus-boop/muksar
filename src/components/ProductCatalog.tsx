import { RefObject, useMemo, useState } from 'react';
import { LayoutGrid, Columns3, Search, SlidersHorizontal, X } from 'lucide-react';
import { motion } from 'motion/react';
import {
  Audience,
  PRODUCT_CATEGORIES,
  Product,
  ProductCategory,
} from '../data/catalog';

interface ProductCatalogProps {
  products: Product[];
  selectedAudience: Audience;
  onAudienceChange: (audience: Audience) => void;
  selectedCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  searchInputRef: RefObject<HTMLInputElement | null>;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: string) => void;
}

type SortOption = 'featured' | 'name-asc' | 'moq-asc';

const AUDIENCES: Audience[] = ['All', 'Women', 'Men', 'Unisex'];

export function ProductCatalog({
  products,
  selectedAudience,
  onAudienceChange,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  searchInputRef,
  onSelectProduct,
  onQuickAdd,
}: ProductCatalogProps) {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [addedFeedback, setAddedFeedback] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = products.filter((item) => {
      const matchesAudience =
        selectedAudience === 'All' ||
        item.audience === selectedAudience ||
        (selectedAudience !== 'Unisex' && item.audience === 'Unisex');
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesQuery =
        query === '' ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.colorway.toLowerCase().includes(query) ||
        item.fabric.toLowerCase().includes(query);
      return matchesAudience && matchesCategory && matchesQuery;
    });

    if (sortBy === 'name-asc') {
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortBy === 'moq-asc') {
      return [...list].sort((a, b) => a.moq - b.moq);
    }
    return list;
  }, [products, selectedAudience, selectedCategory, searchQuery, sortBy]);

  const handleQuickSizeAdd = (product: Product, size: string) => {
    onQuickAdd(product, size);
    const key = `${product.id}-${size}`;
    setAddedFeedback(key);
    window.setTimeout(() => {
      setAddedFeedback((current) => (current === key ? null : current));
    }, 1200);
  };

  return (
    <section id="catalog" className="bg-white py-14 sm:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Heading & Audience Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E10600] mb-2">
              Category Lookbook · Direct From Factory
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-950 uppercase tracking-tight">
              Performance &amp; Streetwear Collection
            </h2>
          </div>

          {/* Audience Segmented Filter */}
          <div className="inline-flex items-center p-1 bg-neutral-100 rounded-lg self-start md:self-auto">
            {AUDIENCES.map((aud) => {
              const active = selectedAudience === aud;
              return (
                <button
                  key={aud}
                  type="button"
                  onClick={() => onAudienceChange(aud)}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#0A0A0B] text-white'
                      : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  {aud}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Alay-Inspired Category Tabs + Search + Grid Switcher Toolbar */}
        <div className="py-6 space-y-5">
          {/* Category Filter Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {PRODUCT_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => onCategoryChange(category)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#E10600] border-[#E10600] text-white'
                      : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-900 hover:text-neutral-950'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search, Count, Sort & Grid Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search tracksuits, compression, hoodies..."
                aria-label="Search products"
                className="w-full pl-10 pr-9 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-md text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-900"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4">
              <span className="text-xs font-medium text-neutral-500 tabular-nums whitespace-nowrap">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
              </span>

              <div className="inline-flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" aria-hidden="true" />
                <select
                  aria-label="Sort products"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="text-xs font-semibold text-neutral-900 bg-white border border-neutral-200 rounded-md px-3 py-2 focus:outline-none focus:border-neutral-900 cursor-pointer"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="moq-asc">MOQ: Low to High</option>
                </select>
              </div>

              <div className="hidden lg:inline-flex items-center border border-neutral-200 rounded-md p-0.5 bg-neutral-50">
                <button
                  type="button"
                  onClick={() => setGridCols(3)}
                  aria-label="3 column grid"
                  className={`p-1.5 rounded transition-colors cursor-pointer ${
                    gridCols === 3 ? 'bg-white text-neutral-950 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  <Columns3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setGridCols(4)}
                  aria-label="4 column grid"
                  className={`p-1.5 rounded transition-colors cursor-pointer ${
                    gridCols === 4 ? 'bg-white text-neutral-950 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center border border-neutral-200 rounded-lg bg-neutral-50">
            <p className="text-base font-semibold text-neutral-900 mb-2">
              No sportswear items match your current filter
            </p>
            <p className="text-sm text-neutral-500 mb-5">
              Reset your search or category selection to view all factory drops.
            </p>
            <button
              type="button"
              onClick={() => {
                onAudienceChange('All');
                onCategoryChange('All');
                onSearchChange('');
              }}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0A0A0B] hover:bg-neutral-800 rounded-md cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
            } gap-6 lg:gap-7`}
          >
            {filteredProducts.map((product, idx) => {
              const hasImgError = failedImages[product.id];
              return (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.45,
                    delay: (idx % 4) * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex flex-col bg-white transition-transform duration-300 hover:-translate-y-1"
                >
                  {/* Product Model Image */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 rounded-md border border-neutral-200/80 group-hover:border-neutral-900/40 group-hover:shadow-lg transition-all duration-300 mb-3.5">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="w-full h-full block text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E10600]"
                    >
                      {!hasImgError ? (
                        <img
                          src={product.image}
                          alt={product.imageAlt}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedImages((prev) => ({ ...prev, [product.id]: true }))
                          }
                          className="w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:contrast-[1.04] group-hover:brightness-[1.03]"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
                          <span className="font-display text-xl font-bold uppercase tracking-wide">
                            Muksar Sports
                          </span>
                          <span className="text-xs text-neutral-300 mt-1">{product.name}</span>
                        </div>
                      )}
                    </button>

                    {/* Diagonal light sheen sweep on hover */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                    />

                    {/* Subtle crimson corner indicator on hover */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-[#E10600] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />

                    {/* Quick-Add Size Bar on Hover */}
                    <div className="absolute inset-x-2.5 bottom-2.5 bg-[#0A0A0B]/92 backdrop-blur-xs rounded p-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 focus-within:opacity-100 focus-within:translate-y-0 transition-all duration-200">
                      <div className="flex items-center justify-between mb-1.5 px-0.5">
                        <span className="text-[11px] font-medium text-neutral-300">
                          Quick Add Size
                        </span>
                        <span className="text-[11px] font-medium text-[#E10600] tabular-nums">
                          MOQ {product.moq} pcs
                        </span>
                      </div>
                      <div className="grid grid-cols-5 gap-1">
                        {product.sizes.slice(0, 5).map((size) => {
                          const isJustAdded = addedFeedback === `${product.id}-${size}`;
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => handleQuickSizeAdd(product, size)}
                              className={`py-1.5 text-[11px] font-semibold rounded transition-colors cursor-pointer ${
                                isJustAdded
                                  ? 'bg-[#E10600] text-white'
                                  : 'bg-neutral-800 hover:bg-white hover:text-neutral-950 text-white'
                              }`}
                            >
                              {isJustAdded ? 'Added' : size}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Unboxed Clean Product Metadata */}
                  <div className="flex flex-col flex-1 justify-between gap-2">
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs text-neutral-500 mb-1">
                        <span className="uppercase tracking-wider font-medium truncate">
                          {product.audience} · {product.category}
                        </span>
                        {product.tag && (
                          <span className="text-[#E10600] font-semibold shrink-0">
                            {product.tag}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-semibold text-neutral-950 leading-snug">
                        <button
                          type="button"
                          onClick={() => onSelectProduct(product)}
                          className="text-left hover:text-[#E10600] transition-colors cursor-pointer"
                        >
                          {product.name}
                        </button>
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-xs border border-neutral-300 inline-block shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${product.swatchHex} 55%, ${product.secondaryHex} 55%)`,
                          }}
                          title={product.colorway}
                        />
                        <span className="text-xs text-neutral-600 truncate">
                          {product.colorway}
                        </span>
                      </div>

                      <span className="text-xs font-semibold text-neutral-700 tabular-nums shrink-0">
                        MOQ {product.moq}
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
