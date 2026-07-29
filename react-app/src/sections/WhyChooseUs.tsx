import React from 'react';

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-neutral-soft border-b border-neutral-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Text Block */}
          <div className="lg:col-span-5 text-left sticky top-28">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-4">
              Why Nimishamba
            </span>
            <h2 className="font-display font-black text-primary text-4xl sm:text-5xl uppercase leading-tight">
              Technical Precision<span className="text-gold">.</span><br />
              Proven Expertise<span className="text-gold">.</span>
            </h2>
            <p className="font-sans text-neutral-mid text-sm mt-6 leading-relaxed max-w-sm">
              We don't simply supply coatings. We partner with architects, builders, contractors, and homeowners to engineer the right surface solution for every project — backed by 20 years of technical expertise and Berger's authorised product portfolio.
            </p>
          </div>

          {/* Right Editorial Blocks */}
          <div className="lg:col-span-7 flex flex-col gap-16">
            
            {/* Pillar 01 */}
            <div className="flex gap-8 items-start border-b border-neutral-light pb-10">
              <span className="font-display font-black text-gold/30 text-5xl sm:text-6xl leading-none">01</span>
              <div className="text-left">
                <h3 className="font-display font-bold text-primary text-xl mb-2">Authorised Product Portfolio</h3>
                <p className="font-sans text-neutral-mid text-xs leading-relaxed max-w-md">
                  Direct factory allocation of Berger's complete range — premium emulsions, industrial coatings, waterproofing membranes, and speciality finishes. Every product is genuine, factory-fresh, and backed by manufacturer warranties.
                </p>
              </div>
            </div>

            {/* Pillar 02 */}
            <div className="flex gap-8 items-start border-b border-neutral-light pb-10">
              <span className="font-display font-black text-gold/30 text-5xl sm:text-6xl leading-none">02</span>
              <div className="text-left">
                <h3 className="font-display font-bold text-primary text-xl mb-2">Surface Assessment & Diagnostics</h3>
                <p className="font-sans text-neutral-mid text-xs leading-relaxed max-w-md">
                  Before any coating is specified, our team assesses wall moisture levels, substrate conditions, and structural integrity using professional electronic instruments — ensuring the right system is prescribed from the start.
                </p>
              </div>
            </div>

            {/* Pillar 03 */}
            <div className="flex gap-8 items-start">
              <span className="font-display font-black text-gold/30 text-5xl sm:text-6xl leading-none">03</span>
              <div className="text-left">
                <h3 className="font-display font-bold text-primary text-xl mb-2">Project-Scale Logistics</h3>
                <p className="font-sans text-neutral-mid text-xs leading-relaxed max-w-md">
                  Precise coverage calculations, phased delivery scheduling, and coordinated dispatch to residential, commercial, and industrial project sites across Mysuru. Eliminates waste and prevents mid-project shortfalls.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
