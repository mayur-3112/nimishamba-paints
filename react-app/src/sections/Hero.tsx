import React from 'react';
import { Phone, MessageSquare, Award, CheckCircle, Calculator, Palette } from 'lucide-react';

interface HeroProps {
  setCurrentTab: (tab: string) => void;
  openQuoteModal: () => void;
}

export default function Hero({ setCurrentTab, openQuoteModal }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:py-40 bg-gradient-to-br from-neutral-soft via-white to-accent-light overflow-hidden">
      {/* Background subtle paint splatters or circles */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gold bg-opacity-5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-accent bg-opacity-5 rounded-full filter blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text & Content Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-neutral-light shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-display text-[10px] font-bold uppercase tracking-wider text-primary">Authorized Premium Showroom</span>
          </div>

          <h1 className="font-display font-bold leading-tight text-primary text-4xl sm:text-5xl lg:text-6xl mb-6">
            Transform Your Space with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-gold">Premium Paint &amp; Décor</span>
          </h1>

          <p className="font-sans text-neutral-mid text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
            Sri Nimishamba Paints is Mysuru’s premier destination for genuine paints, primers, waterproofing, and structural coatings. Experience luxury home aesthetics with 2,500+ customized computer-tinted shades.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
            <button
              onClick={openQuoteModal}
              className="bg-primary text-white font-display text-sm font-bold uppercase tracking-wider px-8 py-4.5 rounded-xl hover:bg-primary-light hover:shadow-luxury transform hover:-translate-y-0.5 transition-all text-center flex items-center justify-center"
            >
              Get Free Quote
            </button>
            <button
              onClick={() => setCurrentTab('estimator')}
              className="bg-white text-primary border border-neutral-light font-display text-sm font-bold uppercase tracking-wider px-8 py-4.5 rounded-xl hover:border-primary transform hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-2 shadow-sm"
            >
              <Calculator className="w-4 h-4 text-accent" />
              <span>Try Paint Estimator</span>
            </button>
            <a
              href="https://wa.me/919448084351"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-display text-sm font-bold uppercase tracking-wider px-8 py-4.5 rounded-xl hover:bg-emerald-100 transform hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <span>WhatsApp Chat</span>
            </a>
          </div>

          {/* Trust Badges (Desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-neutral-light pt-8 w-full">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white shadow-premium flex items-center justify-center">
                <Award className="w-5 h-5 text-gold" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold text-sm text-primary">20+ Years</span>
                <span className="text-[10px] text-neutral-mid font-semibold uppercase tracking-wider">Trusted Dealer</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white shadow-premium flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-accent" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold text-sm text-primary">100% Genuine</span>
                <span className="text-[10px] text-neutral-mid font-semibold uppercase tracking-wider">Direct Brands</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white shadow-premium flex items-center justify-center">
                <Palette className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold text-sm text-primary">2500+ Shades</span>
                <span className="text-[10px] text-neutral-mid font-semibold uppercase tracking-wider">tinting options</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white shadow-premium flex items-center justify-center">
                <Calculator className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold text-sm text-primary">Auto Tinting</span>
                <span className="text-[10px] text-neutral-mid font-semibold uppercase tracking-wider">Instant Mixing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Media Column */}
        <div className="lg:col-span-5 relative flex justify-center z-10">
          <div className="relative w-full max-w-[450px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-luxury border-4 border-white border-opacity-60 bg-neutral-light transform hover:rotate-1 hover:scale-[1.02] transition-all duration-500">
            {/* Showroom Interior Image */}
            <img
              src="/images/shop_interior.png"
              alt="Sri Nimishamba Paints Showroom Hinkal"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
            
            {/* Absolute floating cards */}
            <div className="absolute bottom-6 left-6 right-6 p-5 glass-panel rounded-2xl flex flex-col gap-1.5 leading-snug">
              <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Hinkal Ring Road, Mysuru</span>
              <h3 className="font-display font-bold text-primary text-base">Flagship Experience Centre</h3>
              <p className="font-sans text-neutral-mid text-xs">
                Walk in today to consult with color tinting specialists and view real textured wall panel samples.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
