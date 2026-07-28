import React from 'react';

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-neutral-soft border-b border-neutral-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Text Block */}
          <div className="lg:col-span-5 text-left sticky top-28">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-4">
              The Showroom Standards
            </span>
            <h2 className="font-display font-black text-primary text-4xl sm:text-5xl uppercase leading-tight">
              A Study in <br />
              Color & Precision<span className="text-gold">.</span>
            </h2>
            <p className="font-sans text-neutral-mid text-sm mt-6 leading-relaxed max-w-sm">
              We do not simply sell paint. We partner with architects, builders, and homeowners to formulate exact atmospheres. Sourced and tint-matched under direct Berger authorization.
            </p>
          </div>

          {/* Right Editorial Blocks - Asymmetrical Scroll */}
          <div className="lg:col-span-7 flex flex-col gap-16">
            
            {/* Pillar 01 */}
            <div className="flex gap-8 items-start border-b border-neutral-light pb-10">
              <span className="font-display font-black text-gold/30 text-5xl sm:text-6xl leading-none">01</span>
              <div className="text-left">
                <h3 className="font-display font-bold text-primary text-xl mb-2">Exclusive Tinting Base Access</h3>
                <p className="font-sans text-neutral-mid text-xs leading-relaxed max-w-md">
                  Direct factory allocation of Berger's premium Silk Glamor bases, WoodKeeper polymers, and architectural membranes. No dilutions, no generic fills.
                </p>
              </div>
            </div>

            {/* Pillar 02 */}
            <div className="flex gap-8 items-start border-b border-neutral-light pb-10">
              <span className="font-display font-black text-gold/30 text-5xl sm:text-6xl leading-none">02</span>
              <div className="text-left">
                <h3 className="font-display font-bold text-primary text-xl mb-2">Moisture & Damp Diagnostics</h3>
                <p className="font-sans text-neutral-mid text-xs leading-relaxed max-w-md">
                  Before a drop of paint is applied, our team checks wall moisture levels using professional electronic meters, prescribing structural HomeShield treatments first.
                </p>
              </div>
            </div>

            {/* Pillar 03 */}
            <div className="flex gap-8 items-start">
              <span className="font-display font-black text-gold/30 text-5xl sm:text-6xl leading-none">03</span>
              <div className="text-left">
                <h3 className="font-display font-bold text-primary text-xl mb-2">Architectural Grade Yields</h3>
                <p className="font-sans text-neutral-mid text-xs leading-relaxed max-w-md">
                  Precise calculations mapping paint solids to coverage index. Get exact quantity guides to eliminate wastage on massive residential build scopes.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
