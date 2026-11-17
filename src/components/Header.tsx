import { useState } from 'react';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { Audience } from '../data/catalog';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectAudience: (audience: Audience) => void;
  onFocusSearch: () => void;
  onOpenBulkModal: () => void;
}

export function Header({
  cartCount,
  onOpenCart,
  onSelectAudience,
  onFocusSearch,
  onOpenBulkModal,
}: HeaderProps) {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string, audience?: Audience) => {
    if (audience) {
      onSelectAudience(audience);
    }
    setMobileMenuOpen(false);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0A0B] border-b border-neutral-800/90">
      {bannerVisible && (
        <div className="bg-[#E10600] text-white text-xs font-medium px-4 h-8 flex items-center justify-center relative">
          <p className="truncate pr-8 text-center tracking-wide">
            Direct Sportswear Manufacturer &amp; Supplier · Custom OEM &amp; Worldwide Export
          </p>
          <button
            type="button"
            onClick={() => setBannerVisible(false)}
            aria-label="Dismiss announcement"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/80 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-white rounded"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand lockup */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="focus-visible:outline-2 focus-visible:outline-[#E10600] rounded shrink-0"
        >
          <BrandLogo variant="header" />
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300"
        >
          <button
            type="button"
            onClick={() => handleNavClick('catalog', 'Women')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b border-transparent hover:border-[#E10600]"
          >
            Women
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('catalog', 'Men')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b border-transparent hover:border-[#E10600]"
          >
            Men
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('catalog', 'All')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b border-transparent hover:border-[#E10600]"
          >
            Categories
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('manufacturing')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b border-transparent hover:border-[#E10600]"
          >
            Manufacturing
          </button>
          <button
            type="button"
            onClick={onOpenBulkModal}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b border-transparent hover:border-[#E10600]"
          >
            Bulk Orders
          </button>
        </nav>

        {/* Zone 3: Single compact action zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              onFocusSearch();
              handleNavClick('catalog');
            }}
            aria-label="Search catalog"
            className="p-2.5 text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-md transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E10600]"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-white bg-[#E10600] hover:bg-[#C40500] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="tabular-nums">Bag ({cartCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden p-2.5 text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-md transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-[#0A0A0B] px-4 py-4 space-y-1">
          <button
            type="button"
            onClick={() => handleNavClick('catalog', 'Women')}
            className="w-full text-left px-3 py-2.5 text-sm font-medium text-neutral-200 hover:bg-neutral-900 rounded"
          >
            Women
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('catalog', 'Men')}
            className="w-full text-left px-3 py-2.5 text-sm font-medium text-neutral-200 hover:bg-neutral-900 rounded"
          >
            Men
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('catalog', 'All')}
            className="w-full text-left px-3 py-2.5 text-sm font-medium text-neutral-200 hover:bg-neutral-900 rounded"
          >
            All Categories
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('manufacturing')}
            className="w-full text-left px-3 py-2.5 text-sm font-medium text-neutral-200 hover:bg-neutral-900 rounded"
          >
            Manufacturing &amp; OEM
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBulkModal();
            }}
            className="w-full text-left px-3 py-2.5 text-sm font-semibold text-[#E10600] hover:bg-neutral-900 rounded"
          >
            Request Bulk Quote
          </button>
        </div>
      )}
    </header>
  );
}
