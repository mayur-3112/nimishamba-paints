import React from 'react';
import { Award, CheckCircle, Cpu, ShieldCheck } from 'lucide-react';

export default function Brands() {
  return (
    <section className="py-16 bg-neutral-soft border-y border-neutral-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white border border-neutral-light rounded-3xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center gap-10">
          
          {/* Logo Left */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center shadow-md mb-3 transform hover:rotate-2 transition-transform duration-300">
              <span className="font-display font-black text-white text-4xl">B</span>
            </div>
            <h3 className="font-display font-extrabold text-primary text-2xl leading-none">BERGER PAINTS</h3>
            <span className="font-sans text-[10px] font-bold text-accent uppercase tracking-widest mt-2">PLATINUM PARTNER</span>
          </div>

          {/* Description Right */}
          <div className="flex-grow text-left">
            <div className="inline-flex items-center gap-2 bg-accent bg-opacity-5 px-3 py-1 rounded-full border border-accent border-opacity-10 mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              <span className="font-display text-[9px] font-bold uppercase tracking-wider text-accent">Exclusive Authorized Showroom</span>
            </div>
            
            <h4 className="font-display font-bold text-primary text-xl md:text-2xl mb-3 leading-snug">
              Official Berger Paints Color World Experience Centre
            </h4>
            
            <p className="font-sans text-neutral-mid text-xs leading-relaxed mb-6">
              As Mysuru's authorized Platinum Dealer, we carry the complete catalog of Berger interior emulsions, exterior barriers, HomeShield waterproofing systems, and WoodKeeper finishes. Our computerized tinting station guarantees exact formulation accuracy directly from official paint bases.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-neutral-light pt-5">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
                <span className="font-sans text-[11px] font-bold text-primary">100% Genuine Materials</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4.5 h-4.5 text-accent flex-shrink-0" />
                <span className="font-sans text-[11px] font-bold text-primary">Computerized Tinting mixing</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4.5 h-4.5 text-gold flex-shrink-0" />
                <span className="font-sans text-[11px] font-bold text-primary">Platinum Certified Dealer</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
