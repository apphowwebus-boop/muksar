import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import { motion } from 'motion/react';
import { PRODUCT_CATEGORIES } from '../data/catalog';

interface ManufacturingSectionProps {
  bulkModalOpen: boolean;
  onOpenBulkModal: () => void;
  onCloseBulkModal: () => void;
}

const CAPABILITIES = [
  {
    index: '01.',
    title: 'Cut & Sew Trackwear',
    detail:
      'High-volume interlock, tricot, and fleece production with flatlock reinforcement, custom color-blocking, and private-label woven tags.',
  },
  {
    index: '02.',
    title: 'Full-Bleed Sublimation',
    detail:
      'Permanent Italian-ink dye sublimation for club jerseys, training kits, and compression garments with zero peeling or color washout.',
  },
  {
    index: '03.',
    title: 'Custom Brand Finishing',
    detail:
      '3D silicone heat-transfers, high-density embroidery, reflective crest prints, and branded zipper pulls calibrated to your identity.',
  },
];

const METRICS = [
  { value: '45,000+', label: 'Monthly Garment Capacity' },
  { value: '25 pcs', label: 'Custom Teamwear MOQ' },
  { value: '14 Days', label: 'Prototype Sample Lead Time' },
  { value: '38', label: 'Global Export Destinations' },
];

export function ManufacturingSection({
  bulkModalOpen,
  onOpenBulkModal,
  onCloseBulkModal,
}: ManufacturingSectionProps) {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Tracksuits');
  const [quantityTier, setQuantityTier] = useState('50 - 200 units');
  const [notes, setNotes] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !email.trim()) return;
    const refNumber = `MS-OEM-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(refNumber);
  };

  const resetForm = () => {
    setCompanyName('');
    setEmail('');
    setNotes('');
    setSubmittedRef(null);
    onCloseBulkModal();
  };

  return (
    <>
      <section id="manufacturing" className="bg-[#0A0A0B] text-white py-16 sm:py-24 border-t border-neutral-800 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E10600] mb-3">
                Manufacturer &amp; Global Supplier
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-[1.02] text-balance mb-5">
                Factory-Direct Sportswear Production
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-8">
                Muksar Sports operates vertically integrated knitting, sublimation, and cut-and-sew production lines. Whether you are outfitting a pro athletic club, launching an activewear label, or sourcing wholesale gym stock, every garment ships straight from our floor.
              </p>

              <button
                type="button"
                onClick={onOpenBulkModal}
                className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-white bg-[#E10600] hover:bg-[#C40500] rounded-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
              >
                <span>Request Bulk &amp; OEM Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {CAPABILITIES.map((cap, idx) => (
                <motion.div
                  key={cap.index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 bg-[#141417] border border-neutral-800 hover:border-[#E10600]/60 rounded-md flex flex-col justify-between transition-colors duration-300"
                >
                  <div>
                    <span className="block text-xs font-semibold text-[#E10600] mb-3">
                      {cap.index}
                    </span>
                    <h3 className="text-base font-bold text-white mb-2.5">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {cap.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 4-column quantitative proof strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-14 pt-10 border-t border-neutral-800">
            {METRICS.map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-display text-3xl sm:text-4xl font-extrabold text-white tabular-nums tracking-tight">
                  {metric.value}
                </p>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk / OEM Inquiry Modal */}
      {bulkModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Request Bulk and OEM Quote"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-lg bg-white text-neutral-950 rounded-lg border border-neutral-200 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-[#0A0A0B] text-white">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#E10600]">
                  Direct Factory Desk
                </p>
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight">
                  Bulk &amp; Private Label Inquiry
                </h3>
              </div>
              <button
                type="button"
                onClick={resetForm}
                aria-label="Close bulk quote modal"
                className="p-2 text-neutral-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedRef ? (
              <div className="p-6 sm:p-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-[#E10600] mx-auto mb-4" />
                <h4 className="font-display text-2xl font-bold uppercase text-neutral-950 mb-2">
                  Quote Request Registered
                </h4>
                <p className="text-sm text-neutral-600 mb-4">
                  Reference <span className="font-semibold text-neutral-950 tabular-nums">{submittedRef}</span> has been assigned for <span className="font-semibold">{companyName}</span> ({category}, {quantityTier}). Our export manufacturing team will respond to <span className="font-semibold">{email}</span> within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-[#0A0A0B] hover:bg-neutral-800 rounded-md cursor-pointer"
                >
                  Return to Storefront
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Club / Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Apex Athletics"
                      className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-md focus:outline-none focus:border-neutral-950"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="buyer@company.com"
                      className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-md focus:outline-none focus:border-neutral-950"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Apparel Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-md bg-white focus:outline-none focus:border-neutral-950"
                    >
                      {PRODUCT_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Estimated Quantity
                    </label>
                    <select
                      value={quantityTier}
                      onChange={(e) => setQuantityTier(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-md bg-white focus:outline-none focus:border-neutral-950"
                    >
                      <option value="25 - 50 units">25 - 50 units (Team Kit)</option>
                      <option value="50 - 200 units">50 - 200 units</option>
                      <option value="200 - 1,000 units">200 - 1,000 units</option>
                      <option value="1,000+ units">1,000+ units (OEM Export)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Custom Logo, GSM &amp; Sizing Notes
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Specify custom logo placement, fabric GSM, or private-label packaging requirements..."
                    className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-md focus:outline-none focus:border-neutral-950"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2.5 text-xs font-semibold text-neutral-600 hover:text-neutral-950 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-semibold text-white bg-[#E10600] hover:bg-[#C40500] rounded-md transition-colors cursor-pointer"
                  >
                    Submit Manufacturing Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
