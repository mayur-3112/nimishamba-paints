import React from 'react';

export default function Services() {
  return (
    <section className="py-24 bg-white border-b border-neutral-light" id="services">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Typographic Header */}
        <div className="text-left mb-20 max-w-xl">
          <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-4">Showroom Offerings</span>
          <h2 className="font-display font-black text-primary text-4xl sm:text-5xl uppercase leading-tight">
            Architectural Services & Consultation
          </h2>
        </div>

        {/* Big Editorial Image Row List */}
        <div className="flex flex-col gap-24">
          
          {/* Service 01 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 overflow-hidden rounded-3xl border border-neutral-light aspect-[16/9] relative group">
              <img 
                src="/images/shop_interior.png" 
                alt="Color mixing studio" 
                className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
            
            <div className="lg:col-span-5 text-left lg:pl-8">
              <span className="text-[9px] font-bold text-accent uppercase tracking-wider block mb-2">01 / Tinting</span>
              <h3 className="font-display font-bold text-primary text-2xl mb-4">Computerized Mixing & Custom Bases</h3>
              <p className="font-sans text-neutral-mid text-xs leading-relaxed">
                We tint custom wall finishes directly in-store using Berger's official automated tinting station. Sourced directly from genuine acrylic bases to ensure matching consistency.
              </p>
            </div>
          </div>

          {/* Service 02 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 lg:order-2 overflow-hidden rounded-3xl border border-neutral-light aspect-[16/9] relative group">
              <img 
                src="/images/color_wall.png" 
                alt="Damp diagnostics" 
                className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
            
            <div className="lg:col-span-5 lg:order-1 text-left lg:pr-8">
              <span className="text-[9px] font-bold text-accent uppercase tracking-wider block mb-2">02 / Technical</span>
              <h3 className="font-display font-bold text-primary text-2xl mb-4">Moisture Diagnosis & Diagnostics</h3>
              <p className="font-sans text-neutral-mid text-xs leading-relaxed">
                We perform site visits utilizing professional moisture meters. By analyzing damp points, wall cracks, and structural leakages, we configure the exact HomeShield waterproofing system required before color coat application.
              </p>
            </div>
          </div>

          {/* Service 03 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 overflow-hidden rounded-3xl border border-neutral-light aspect-[16/9] relative group">
              <img 
                src="/images/painted_rooms.png" 
                alt="Project Logistics" 
                className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
            
            <div className="lg:col-span-5 text-left lg:pl-8">
              <span className="text-[9px] font-bold text-accent uppercase tracking-wider block mb-2">03 / Logistics</span>
              <h3 className="font-display font-bold text-primary text-2xl mb-4">Prompt Site Logistics & Dispatch</h3>
              <p className="font-sans text-neutral-mid text-xs leading-relaxed">
                Coordinated logistics and direct delivery schedules for large-scale painting projects, commercial properties, and residential layouts across Mysuru.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
