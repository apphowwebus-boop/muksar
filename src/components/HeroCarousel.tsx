import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { Audience, HERO_SLIDES } from '../data/catalog';

interface HeroCarouselProps {
  onSelectSlideAction: (audience: Audience) => void;
  onOpenBulkModal: () => void;
}

export function HeroCarousel({ onSelectSlideAction, onOpenBulkModal }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.55]);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const activeSlide = HERO_SLIDES[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="Muksar Sports Hero Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full bg-[#0A0A0B] overflow-hidden"
    >
      <div className="relative h-[540px] sm:h-[620px] lg:h-[680px] max-w-[1440px] mx-auto">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <motion.div
              key={slide.id}
              aria-hidden={!isActive}
              style={{ y: parallaxY, opacity: isActive ? parallaxOpacity : 0 }}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                isActive ? 'z-10' : 'z-0 pointer-events-none'
              }`}
            >
              <motion.img
                src={slide.image}
                alt={slide.imageAlt}
                referrerPolicy="no-referrer"
                initial={false}
                animate={{ scale: isActive ? 1.06 : 1.0 }}
                transition={{ duration: 6, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full h-full object-cover ${slide.objectPosition}`}
              />
              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B]/90 via-[#0A0A0B]/55 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/85 via-transparent to-[#0A0A0B]/25" />
            </motion.div>
          );
        })}

        {/* Content Overlay */}
        <div className="relative z-20 h-full flex flex-col justify-end sm:justify-center px-5 sm:px-10 lg:px-14 pb-20 sm:pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E10600] mb-3">
                {activeSlide.audienceLabel}
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-[0.98] text-balance mb-4">
                {activeSlide.headline}
              </h1>
              <p className="text-sm sm:text-base text-neutral-200 leading-relaxed max-w-lg mb-7">
                {activeSlide.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onSelectSlideAction(activeSlide.audienceFilter);
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-white bg-[#E10600] hover:bg-[#C40500] rounded-md transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
                >
                  <span>{activeSlide.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onOpenBulkModal}
                  className="inline-flex items-center px-5 py-3 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 rounded-md transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer backdrop-blur-xs focus-visible:outline-2 focus-visible:outline-white"
                >
                  Factory &amp; OEM Inquiry
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Slide Controls & Labels */}
        <div className="absolute bottom-5 left-5 right-5 sm:left-10 sm:right-10 lg:left-14 lg:right-14 z-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-4 flex-1">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`group text-left cursor-pointer py-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-white ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <span className="block text-[11px] sm:text-xs font-semibold tracking-wider uppercase whitespace-nowrap mb-1.5">
                    {slide.indexLabel}
                  </span>
                  <span className="block h-[3px] w-16 sm:w-28 bg-white/25 overflow-hidden rounded-xs">
                    <span
                      className={`block h-full transition-transform duration-300 origin-left ${
                        isActive ? 'bg-[#E10600] scale-x-100' : 'bg-white/0 scale-x-0 group-hover:scale-x-50 group-hover:bg-white/40'
                      }`}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Previous hero slide"
              className="w-10 h-10 inline-flex items-center justify-center rounded-md bg-black/60 hover:bg-black text-white border border-white/20 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next hero slide"
              className="w-10 h-10 inline-flex items-center justify-center rounded-md bg-black/60 hover:bg-black text-white border border-white/20 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
