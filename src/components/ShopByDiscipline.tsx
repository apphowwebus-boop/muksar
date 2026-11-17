import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Audience, ProductCategory } from '../data/catalog';

interface DisciplineCard {
  id: string;
  kicker: string;
  title: string;
  description: string;
  audience: Audience;
  category: ProductCategory;
  image: string;
  imageAlt: string;
  ctaLabel: string;
}

interface ShopByDisciplineProps {
  onSelectDiscipline: (audience: Audience, category: ProductCategory) => void;
}

const DISCIPLINES: DisciplineCard[] = [
  {
    id: 'discipline-street-fleece',
    kicker: 'Street-Sport Fleece',
    title: 'Heavyweight Quarter-Zips & Track Sets',
    description: '460 GSM structured fleece engineered for everyday team travel and off-field layering.',
    audience: 'Unisex',
    category: 'Hoodies',
    image: '/src/assets/images/lookbook_street_fleece_1794936071396.jpg',
    imageAlt:
      'Male athletic model wearing stone sand and black Muksar Sports heavyweight quarter-zip fleece tracksuit',
    ctaLabel: 'Shop Fleece & Hoodies',
  },
  {
    id: 'discipline-running',
    kicker: 'All-Weather Track',
    title: 'Windproof & Reflective Running Shells',
    description: 'DWR-coated ripstop outer layers tailored for sprint intervals and wet-weather mileage.',
    audience: 'Women',
    category: 'Windbreakers',
    image: '/src/assets/images/lookbook_running_outerwear_1794936071487.jpg',
    imageAlt:
      'Female runner model wearing cobalt blue and black Muksar Sports technical running shell jacket',
    ctaLabel: 'Shop Windbreakers',
  },
  {
    id: 'discipline-combat',
    kicker: 'Strength & Combat',
    title: 'High-Output Gym & Fight Training',
    description: 'Breathable sleeveless training layers and moisture-wicking compression builds.',
    audience: 'Men',
    category: 'Compression',
    image: '/src/assets/images/lookbook_combat_gym_1794936072876.jpg',
    imageAlt:
      'Male athlete model wearing oxblood maroon and black Muksar Sports sleeveless training hoodie and shorts',
    ctaLabel: 'Shop Compression & Gym',
  },
];

export function ShopByDiscipline({ onSelectDiscipline }: ShopByDisciplineProps) {
  return (
    <section id="lookbook" className="bg-neutral-50 py-14 sm:py-20 border-b border-neutral-200 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E10600] mb-2">
              Editorial Lookbook
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-950 uppercase tracking-tight">
              Shop By Athletic Discipline
            </h2>
          </div>
          <p className="text-sm text-neutral-600 max-w-md">
            Every silhouette is cut, branded, and quality-inspected in our sportswear factory before dispatch.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {DISCIPLINES.map((item, idx) => (
            <motion.button
              key={item.id}
              type="button"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                onSelectDiscipline(item.audience, item.category);
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative aspect-[3/4] w-full overflow-hidden rounded-md bg-neutral-900 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E10600] shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={item.image}
                alt={item.imageAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.07] group-hover:contrast-[1.06] group-hover:brightness-105"
              />

              {/* Diagonal metallic sheen sweep on hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-20deg]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

              {/* Crimson corner accents on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#E10600] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#E10600] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end transition-transform duration-300 group-hover:-translate-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E10600] mb-1.5">
                  {item.kicker}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight leading-none mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4 line-clamp-2">
                  {item.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white group-hover:text-[#E10600] transition-colors">
                  <span>{item.ctaLabel}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span
                  aria-hidden="true"
                  className="mt-3 block h-[2px] w-full bg-[#E10600] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
