import { Audience, ProductCategory } from '../data/catalog';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onFilterSelect: (audience: Audience, category: ProductCategory) => void;
  onOpenBulkModal: () => void;
}

export function Footer({ onFilterSelect, onOpenBulkModal }: FooterProps) {
  const jumpToCatalog = (audience: Audience, category: ProductCategory = 'All') => {
    onFilterSelect(audience, category);
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0B] text-neutral-300 border-t border-neutral-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-800">
          <div className="md:col-span-2 space-y-4">
            <BrandLogo variant="footer" />
            <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
              Direct manufacturer and global supplier of performance sportswear, compression kits, team jerseys, and heavyweight athletic streetwear. Engineered in-house for clubs, gyms, and retail brands.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white mb-4">
              Apparel Divisions
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => jumpToCatalog('Women', 'All')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Women Performance
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => jumpToCatalog('Men', 'All')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Men Training &amp; Kits
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => jumpToCatalog('All', 'Tracksuits')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tracksuits &amp; Outerwear
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => jumpToCatalog('All', 'Team Kits')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sublimated Team Kits
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white mb-4">
              Export &amp; Wholesale
            </h3>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={onOpenBulkModal}
                  className="text-white font-semibold hover:text-[#E10600] transition-colors cursor-pointer"
                >
                  Request Bulk / OEM Quote
                </button>
              </li>
              <li>orders@muksarsports.com</li>
              <li>export@muksarsports.com</li>
              <li>Worldwide Air &amp; Sea Freight</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} MUKSAR SPORTS. All rights reserved.</p>
          <p>Sportswear Manufacturer &amp; Global Apparel Supplier</p>
        </div>
      </div>
    </footer>
  );
}
