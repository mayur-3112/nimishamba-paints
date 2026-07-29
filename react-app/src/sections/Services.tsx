import React from 'react';

export default function Services() {
  return (
    <section className="py-24 bg-white border-b border-neutral-light" id="services">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Typographic Header */}
        <div className="text-left mb-20 max-w-xl">
          <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-4">Project Capabilities</span>
          <h2 className="font-display font-black text-primary text-4xl sm:text-5xl uppercase leading-tight">
            Technical Expertise & Project Support
          </h2>
        </div>

        {/* Big Editorial Image Row List */}
        <div className="flex flex-col gap-24">
          
          {/* Service 01 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 overflow-hidden rounded-3xl border border-neutral-light aspect-[16/9] relative group">
              <img 
                src="/images/shop_interior.png" 
                alt="Computerised colour tinting station" 
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
            
            <div className="lg:col-span-5 text-left lg:pl-8">
              <span className="text-[9px] font-bold text-accent uppercase tracking-wider block mb-2">01 / Precision</span>
              <h3 className="font-display font-bold text-primary text-2xl mb-4">Precision Colour Matching & Custom Tinting</h3>
              <p className="font-sans text-neutral-mid text-xs leading-relaxed">
                In-store computerised tinting from genuine Berger bases. Access to 2,500+ shades with exact formula matching — critical for large-scale projects requiring colour consistency across multiple batches.
              </p>
            </div>
          </div>

          {/* Service 02 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 lg:order-2 overflow-hidden rounded-3xl border border-neutral-light aspect-[16/9] relative group">
              <img 
                src="/images/color_wall.png" 
                alt="Surface assessment and moisture diagnostics" 
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
            
            <div className="lg:col-span-5 lg:order-1 text-left lg:pr-8">
              <span className="text-[9px] font-bold text-accent uppercase tracking-wider block mb-2">02 / Diagnostics</span>
              <h3 className="font-display font-bold text-primary text-2xl mb-4">Surface Assessment & Substrate Diagnostics</h3>
              <p className="font-sans text-neutral-mid text-xs leading-relaxed">
                Professional site visits with electronic moisture meters to diagnose damp points, structural cracks, and substrate conditions. We prescribe the correct treatment system before any coating is specified.
              </p>
            </div>
          </div>

          {/* Service 03 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 overflow-hidden rounded-3xl border border-neutral-light aspect-[16/9] relative group">
              <img 
                src="/images/painted_rooms.png" 
                alt="Project logistics and site delivery" 
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
            
            <div className="lg:col-span-5 text-left lg:pl-8">
              <span className="text-[9px] font-bold text-accent uppercase tracking-wider block mb-2">03 / Logistics</span>
              <h3 className="font-display font-bold text-primary text-2xl mb-4">Project Logistics & Site Delivery</h3>
              <p className="font-sans text-neutral-mid text-xs leading-relaxed">
                Coordinated dispatch to residential, commercial, and industrial project sites across Mysuru. Bulk supply management, phased delivery scheduling, and same-day availability for urgent requirements.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
