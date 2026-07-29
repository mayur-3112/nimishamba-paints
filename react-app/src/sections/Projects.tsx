import { useState } from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import { PROJECTS } from '../data/staticData';
import CompareSlider from '../components/CompareSlider';

interface ProjectsProps {
  openQuoteModal: (category?: string) => void;
}

export default function Projects({ openQuoteModal }: ProjectsProps) {
  const [activeId, setActiveId] = useState(PROJECTS[0].id);
  const active = PROJECTS.find((p) => p.id === activeId) ?? PROJECTS[0];

  return (
    <section id="projects" className="py-16 sm:py-24 bg-neutral-soft border-b border-neutral-light">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* Section heading */}
        <div className="max-w-2xl mb-10 sm:mb-14 text-left">
          <span className="text-[10px] font-extrabold text-accent uppercase tracking-widest block mb-2">
            Featured Schemes
          </span>
          <h2 className="font-display font-black text-primary text-3xl sm:text-4xl leading-tight">
            Room schemes we specify every week
          </h2>
          <p className="font-sans text-neutral-mid text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed">
            Every scheme below is mixed in-store on our computerised tinting machine. Drag the
            handle to see the same room in two different Berger shades.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 sm:gap-10 items-start text-left">
          {/* Comparison viewer */}
          <div>
            {active.compare && (
              <CompareSlider
                image={active.image}
                alt={active.title}
                beforeImage={active.beforeImage}
                fromLabel={active.compare.fromLabel}
                toLabel={active.compare.toLabel}
                fromHex={active.compare.fromHex}
                toHex={active.compare.toHex}
              />
            )}
            <p className="font-sans text-[11px] text-neutral-mid mt-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span>
                Digital preview. Drag handle left/right to compare finishes.
              </span>
            </p>
          </div>

          {/* Scheme detail + selector */}
          <div>
            <div className="bg-white border border-neutral-light/80 rounded-3xl p-6 sm:p-7 shadow-luxury">
              <span className="font-sans text-[10px] font-black text-accent uppercase tracking-widest">
                {active.category}
              </span>
              <h3 className="font-display font-black text-primary text-xl sm:text-2xl mt-1.5 leading-snug">
                {active.title}
              </h3>
              <p className="font-sans text-xs font-semibold text-neutral-mid mt-1">
                {active.scope}
              </p>
              <p className="font-sans text-neutral-mid text-xs sm:text-sm mt-3.5 leading-relaxed">
                {active.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-neutral-light/80">
                {active.products.map((product) => (
                  <span
                    key={product}
                    className="bg-neutral-light font-sans text-[9px] font-black text-primary uppercase tracking-wider px-3 py-1.5 rounded-full"
                  >
                    {product}
                  </span>
                ))}
              </div>

              <button
                onClick={() => openQuoteModal(`${active.category} — ${active.title}`)}
                className="w-full min-h-[50px] mt-6 bg-primary hover:bg-primary-light text-white font-display text-xs font-black uppercase tracking-wider px-6 rounded-2xl shadow-luxury active:scale-[0.98] transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get this scheme quoted</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </button>
            </div>

            {/* Touch-Optimized Scheme Thumbnails */}
            <div className="flex sm:grid sm:grid-cols-4 gap-3 mt-5 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 scrollbar-none">
              {PROJECTS.map((project) => {
                const isActive = project.id === activeId;
                return (
                  <button
                    key={project.id}
                    onClick={() => setActiveId(project.id)}
                    aria-pressed={isActive}
                    aria-label={`Show ${project.title}`}
                    className={`relative min-w-[72px] sm:min-w-0 aspect-square rounded-2xl overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                      isActive
                        ? 'border-[#E31959] shadow-luxury scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
