import React from 'react';
import { Home, Building2, Factory, GraduationCap, HardHat } from 'lucide-react';

interface WhoWeServeProps {
  openQuoteModal: (category?: string) => void;
}

const SECTORS = [
  {
    icon: Home,
    title: 'Residential',
    tagline: 'Beautiful homes and apartments.',
    description: 'Interior finishes, exterior weatherproofing, luxury textures, waterproofing, wood coatings, and expert colour consultation for homeowners and apartment projects.',
    accent: 'text-accent',
    bg: 'bg-accent/5',
    border: 'border-accent/10'
  },
  {
    icon: Building2,
    title: 'Commercial',
    tagline: 'Professional spaces that inspire confidence.',
    description: 'Durable wall systems for offices, retail stores, hotels, restaurants, shopping centres, and corporate environments — specified for high-traffic durability.',
    accent: 'text-primary',
    bg: 'bg-primary/5',
    border: 'border-primary/10'
  },
  {
    icon: Factory,
    title: 'Industrial',
    tagline: 'Durable coating systems for demanding environments.',
    description: 'Epoxy floors, anti-corrosion systems, chemical-resistant finishes, and protective coatings for factories, warehouses, manufacturing units, and processing plants.',
    accent: 'text-gold-dark',
    bg: 'bg-gold/5',
    border: 'border-gold/10'
  },
  {
    icon: GraduationCap,
    title: 'Institutional',
    tagline: 'Schools, hospitals, and public buildings.',
    description: 'Anti-bacterial, hypoallergenic, and easy-clean coatings formulated for healthcare, educational, and government environments with strict hygiene standards.',
    accent: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100'
  },
  {
    icon: HardHat,
    title: 'Infrastructure',
    tagline: 'Builders and large-scale developments.',
    description: 'Bulk supply partnerships, technical specification support, and project logistics for builders, developers, infrastructure contractors, and facility management companies.',
    accent: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-100'
  }
];

export default function WhoWeServe({ openQuoteModal }: WhoWeServeProps) {
  return (
    <section className="py-24 bg-neutral-soft border-b border-neutral-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Text Block */}
          <div className="lg:col-span-5 text-left lg:sticky lg:top-28">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-4">
              Who We Serve
            </span>
            <h2 className="font-display font-black text-primary text-4xl sm:text-5xl uppercase leading-tight">
              Every Scale<span className="text-gold">.</span><br />
              Every Sector<span className="text-gold">.</span>
            </h2>
            <p className="font-sans text-neutral-mid text-sm mt-6 leading-relaxed max-w-sm">
              We don't just sell coatings. We partner with homeowners, architects, contractors, and industrial clients to deliver the right surface solution for every project — from a single room to a multi-facility complex.
            </p>
            <button
              onClick={() => openQuoteModal('Project Consultation')}
              className="mt-8 bg-primary text-white font-display text-xs font-bold uppercase tracking-wider px-6 py-4 rounded-xl hover:bg-primary-light transition-all shadow-premium inline-flex items-center gap-2 hover:-translate-y-0.5"
            >
              <span>Talk to Our Experts</span>
            </button>
          </div>

          {/* Right Sector Cards */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {SECTORS.map((sector, idx) => {
              const Icon = sector.icon;
              return (
                <div 
                  key={idx} 
                  className={`flex gap-6 items-start ${sector.bg} border ${sector.border} rounded-2xl p-6 hover:shadow-premium transition-all duration-300 group`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-white border border-neutral-light shadow-sm group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-5 h-5 ${sector.accent}`} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-display font-bold text-primary text-xl mb-1">{sector.title}</h3>
                    <p className="font-sans text-neutral-mid text-xs leading-relaxed">{sector.tagline}</p>
                    <p className="font-sans text-neutral-mid text-[11px] leading-relaxed mt-2 opacity-70">
                      {sector.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
