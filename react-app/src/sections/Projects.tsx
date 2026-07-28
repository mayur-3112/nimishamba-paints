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
    <section id="projects" className="py-24 bg-neutral-soft border-b border-neutral-light">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section heading */}
        <div className="max-w-2xl mb-14">
          <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-2">
            Featured Schemes
          </span>
          <h2 className="font-display font-bold text-primary text-3xl sm:text-4xl leading-tight">
            Room schemes we specify every week
          </h2>
          <p className="font-sans text-neutral-mid text-sm mt-3 leading-relaxed">
            Every scheme below is mixed in-store on our computerised tinting machine. Drag the
            handle to see the same room in two different Berger shades — the fastest way to
            settle a colour argument before you buy.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start">
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
                Digital shade preview. On-wall colour varies with lighting and surface —
                ask us for a physical sample before finalising.
              </span>
            </p>
          </div>

          {/* Scheme detail + selector */}
          <div>
            <div className="bg-white border border-neutral-light rounded-3xl p-7 shadow-premium">
              <span className="font-sans text-[10px] font-bold text-accent uppercase tracking-widest">
                {active.category}
              </span>
              <h3 className="font-display font-bold text-primary text-2xl mt-2 leading-snug">
                {active.title}
              </h3>
              <p className="font-sans text-[11px] font-semibold text-neutral-mid mt-1">
                {active.scope}
              </p>
              <p className="font-sans text-neutral-mid text-sm mt-4 leading-relaxed">
                {active.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-neutral-light">
                {active.products.map((product) => (
                  <span
                    key={product}
                    className="bg-neutral-light font-sans text-[10px] font-bold text-primary uppercase tracking-wider px-3 py-1.5 rounded-full"
                  >
                    {product}
                  </span>
                ))}
              </div>

              <button
                onClick={() => openQuoteModal(`${active.category} — ${active.title}`)}
                className="w-full mt-6 bg-primary text-white font-display text-xs font-bold uppercase tracking-wider px-6 py-4 rounded-xl hover:bg-primary-light transition-all shadow-premium inline-flex items-center justify-center gap-2"
              >
                <span>Get this scheme quoted</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </button>
            </div>

            {/* Scheme thumbnails */}
            <div className="grid grid-cols-4 gap-3 mt-5">
              {PROJECTS.map((project) => {
                const isActive = project.id === activeId;
                return (
                  <button
                    key={project.id}
                    onClick={() => setActiveId(project.id)}
                    aria-pressed={isActive}
                    aria-label={`Show ${project.title}`}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      isActive
                        ? 'border-accent shadow-premium'
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
