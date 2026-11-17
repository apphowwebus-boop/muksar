import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface WorkflowStep {
  number: string;
  title: string;
  timeline: string;
  summary: string;
  deliverables: string[];
}

interface CustomProcessAndReviewsProps {
  onOpenBulkModal: () => void;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    number: '01',
    title: 'Tech Pack & Fabric Spec',
    timeline: 'Days 1 - 2',
    summary:
      'Submit your silhouette selection, custom colorway Pantone codes, and GSM fabric preference—or let our pattern makers grade your tech pack from scratch.',
    deliverables: [
      'Custom GSM knit & woven mill sourcing (155 - 460 GSM)',
      'Digital 2D pattern grading from XS to 4XL',
      'Logo artwork positioning for chest, sleeve, and trims',
    ],
  },
  {
    number: '02',
    title: 'Pre-Production Sample',
    timeline: 'Days 3 - 12',
    summary:
      'We cut, sublimate, embroider, and stitch a physical gold-seal sample with your exact branding so your team can verify fit and stitch tension before bulk runs.',
    deliverables: [
      'Physical prototype shipped via DHL Express',
      'Wash-fastness & 4-way stretch recovery testing',
      'Custom woven neck labels & branded packaging mockup',
    ],
  },
  {
    number: '03',
    title: 'Bulk Line & QC Audit',
    timeline: 'Days 13 - 26',
    summary:
      'Once approved, your order enters our dedicated cut-and-sew lines with multi-point needle detection, seam tension audits, and AQL 2.5 final inspection.',
    deliverables: [
      'Flatlock & bar-tack reinforcement on high-stress seams',
      'Individual polybagging with size & barcode stickers',
      'Photo & video inspection report prior to carton sealing',
    ],
  },
  {
    number: '04',
    title: 'Global Air & Sea Dispatch',
    timeline: 'Days 27 - 32',
    summary:
      'Finished cartons depart directly from our export floor via express air courier or consolidated sea freight with complete commercial invoicing.',
    deliverables: [
      'Door-to-door air freight (4 - 7 business days transit)',
      'Export documentation, HS codes & packing lists included',
      'Dedicated repeat-order pattern archiving for instant restocks',
    ],
  },
];

const TESTIMONIALS = [
  {
    quote:
      'Switching our club tracksuits and sublimated match kits to Muksar Sports cut our unit cost by 28% while eliminating seam splits across a 42-match season.',
    name: 'Tariq Mahmood',
    role: 'Equipment Director',
    organization: 'Northside United FC',
  },
  {
    quote:
      'Their 280 GSM seamless activewear sets passed every squat-proof test on the first sample round. Restock turnaround dropped from 9 weeks to 24 days.',
    name: 'Hannah Lindqvist',
    role: 'Founder & Creative Lead',
    organization: 'Kinetix Studio Apparel',
  },
  {
    quote:
      'We scaled from an initial 100-piece test batch of 460 GSM hoodies to 2,400 units per quarter with zero color variance between dye lots.',
    name: 'Marcus Vance',
    role: 'Head of Merchandising',
    organization: 'Ironworks Performance Gym',
  },
];

export function CustomProcessAndReviews({
  onOpenBulkModal,
}: CustomProcessAndReviewsProps) {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const activeStep = WORKFLOW_STEPS[activeStepIdx];

  return (
    <section className="bg-white py-16 sm:py-24 border-t border-neutral-200 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-20">
        {/* Part 1: Interactive 4-Step OEM Workflow */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E10600] mb-2">
                From Concept To Carton
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-950 uppercase tracking-tight">
                How Custom &amp; Wholesale Orders Work
              </h2>
            </div>

            <button
              type="button"
              onClick={onOpenBulkModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#0A0A0B] hover:bg-[#E10600] rounded-md transition-colors self-start md:self-auto cursor-pointer"
            >
              <span>Start Custom Sample Order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Step Selector List */}
            <div className="lg:col-span-5 flex flex-col gap-2.5">
              {WORKFLOW_STEPS.map((step, idx) => {
                const isActive = idx === activeStepIdx;
                return (
                  <motion.button
                    key={step.number}
                    type="button"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setActiveStepIdx(idx)}
                    className={`w-full text-left p-4 rounded-md border transition-colors cursor-pointer flex items-center justify-between gap-4 ${
                      isActive
                        ? 'bg-[#0A0A0B] border-[#0A0A0B] text-white'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-900 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span
                        className={`font-display text-2xl font-extrabold tabular-nums shrink-0 ${
                          isActive ? 'text-[#E10600]' : 'text-neutral-400'
                        }`}
                      >
                        {step.number}
                      </span>
                      <span className="text-sm sm:text-base font-semibold truncate">
                        {step.title}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-medium tabular-nums shrink-0 ${
                        isActive ? 'text-neutral-300' : 'text-neutral-500'
                      }`}
                    >
                      {step.timeline}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Active Step Detail Card */}
            <div className="lg:col-span-7 p-6 sm:p-10 bg-neutral-50 border border-neutral-200 rounded-md flex flex-col justify-between overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.number}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-neutral-200">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#E10600]">
                      Stage {activeStep.number}
                    </span>
                    <span className="text-xs font-semibold text-neutral-600 tabular-nums">
                      Standard Window: {activeStep.timeline}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-950 uppercase tracking-tight mb-3">
                    {activeStep.title}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-6">
                    {activeStep.summary}
                  </p>

                  <ul className="space-y-3">
                    {activeStep.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-neutral-800">
                        <span className="mt-0.5 w-5 h-5 rounded bg-[#0A0A0B] text-white inline-flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Part 2: Verified Athletic Club & Brand Partners */}
        <div className="pt-14 border-t border-neutral-200">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E10600] mb-2">
              Supply Partner Feedback
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-950 uppercase tracking-tight">
              Trusted By Clubs, Gyms &amp; Activewear Labels
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item, idx) => (
              <motion.blockquote
                key={item.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-7 bg-white border border-neutral-200 hover:border-neutral-400 rounded-md flex flex-col justify-between gap-6 transition-colors duration-300"
              >
                <p className="text-sm text-neutral-700 leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="pt-4 border-t border-neutral-100">
                  <p className="text-sm font-bold text-neutral-950">{item.name}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {item.role} · {item.organization}
                  </p>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
