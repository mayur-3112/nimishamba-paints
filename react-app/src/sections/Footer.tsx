import React from 'react';
import { 
  MessageSquare, Phone, MapPin, Award, Mail, Clock, ShieldCheck, 
  ArrowRight, Map, CheckCircle2 
} from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  openQuoteModal: (category?: string) => void;
}

export default function Footer({ setCurrentTab, openQuoteModal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (tab: string) => {
    setCurrentTab(tab === 'products' ? 'solutions' : tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDirectionsClick = () => {
    const mapsUrl = "https://maps.google.com/?q=Sri+Nimishamba+Paints+and+Plywoods+Mysore";
    window.open(mapsUrl, '_blank');
  };

  return (
    <footer className="bg-[#0B111A] text-neutral-light relative z-20 pt-28 pb-32 md:pb-16 text-left border-t border-white/10 overflow-hidden">
      
      {/* Subtle Warm Lighting Blur */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#E31959]/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* ── FIRST SECTION: MAGAZINE STATEMENT BANNER ──────────────── */}
        <div className="pb-20 border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <span className="text-[10px] font-extrabold text-[#E31959] uppercase tracking-widest block mb-4">
              Berger Colour World Experience Centre &middot; Mysuru
            </span>
            <h2 className="font-display font-black text-white text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              Bring Your Vision to Life<br />
              with Berger<span className="text-[#E31959]">.</span>
            </h2>
            <p className="font-sans text-neutral-light/70 text-sm sm:text-base mt-6 max-w-xl leading-relaxed">
              Step into our experience centre at Hinkal Ring Road. Examine large-format textured boards, explore 2,500+ computerised shades, and receive dedicated project guidance from certified colour specialists.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
            <button
              onClick={() => openQuoteModal('Visit Showroom')}
              className="bg-[#E31959] hover:bg-[#C20F4B] text-white font-display text-xs font-bold uppercase tracking-wider py-4 px-8 rounded-xl shadow-luxury hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border border-[#E31959]/30"
            >
              <span>Visit Showroom</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => openQuoteModal('Talk to an Expert')}
              className="border border-white/20 hover:border-gold text-white font-display text-xs font-bold uppercase tracking-wider py-4 px-8 rounded-xl hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Talk to an Expert</span>
            </button>
          </div>
        </div>

        {/* ── FOOTER CONTENT GRID (4 COLUMNS) ───────────────────────── */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 border-b border-white/10">
          
          {/* Column 1: About Berger Experience Centre */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
                <img src="/images/logo.png" alt="Berger Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-black text-white text-base tracking-tight">SRI NIMISHAMBA</span>
                <span className="font-sans text-[8px] font-extrabold text-[#E31959] uppercase tracking-widest mt-0.5">Authorised Berger Partner</span>
              </div>
            </div>

            <p className="font-sans text-xs text-neutral-light/65 leading-relaxed max-w-sm">
              Sri Nimishamba Paints &amp; Plywoods is Mysuru’s premier authorised Berger Colour World Experience Centre. Serving homeowners, architects, builders, and contractors with genuine coating systems since 2005.
            </p>

            {/* Official Badge */}
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 self-start backdrop-blur-sm">
              <Award className="w-7 h-7 text-gold flex-shrink-0" />
              <div className="flex flex-col leading-snug">
                <span className="font-display text-white text-xs font-bold">Platinum Authorised Store</span>
                <span className="font-sans text-[9px] text-neutral-light/60 uppercase tracking-wider">Berger Paints India Ltd.</span>
              </div>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <span className="text-[10px] font-extrabold text-gold uppercase tracking-widest block">Solutions</span>
            <nav className="flex flex-col gap-3 text-xs font-sans text-neutral-light/75">
              <button onClick={() => handleNavClick('solutions')} className="hover:text-gold transition-colors text-left cursor-pointer">Residential Painting</button>
              <button onClick={() => handleNavClick('solutions')} className="hover:text-gold transition-colors text-left cursor-pointer">Exterior Solutions</button>
              <button onClick={() => handleNavClick('solutions')} className="hover:text-gold transition-colors text-left cursor-pointer">Waterproofing Systems</button>
              <button onClick={() => handleNavClick('solutions')} className="hover:text-gold transition-colors text-left cursor-pointer">Texture Finishes &amp; Plasters</button>
              <button onClick={() => handleNavClick('solutions')} className="hover:text-gold transition-colors text-left cursor-pointer">Wood Coatings</button>
              <button onClick={() => handleNavClick('solutions')} className="hover:text-gold transition-colors text-left cursor-pointer">Metal Protection</button>
              <button onClick={() => handleNavClick('solutions')} className="hover:text-gold transition-colors text-left cursor-pointer">Project Consultation</button>
            </nav>
          </div>

          {/* Column 3: Contact & Location */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <span className="text-[10px] font-extrabold text-gold uppercase tracking-widest block">Contact &amp; Location</span>
            <div className="flex flex-col gap-3.5 text-xs font-sans text-neutral-light/80">
              
              <div className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-[#E31959] flex-shrink-0 mt-0.5" />
                <span>Hinkal Ring Road Junction, near Outer Ring Road, Mysuru &mdash; 570017</span>
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <a href="tel:+919986218879" className="hover:text-gold transition-colors font-semibold">Jayanth Kedia: +91 99862 18879</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <a href="tel:+918095474075" className="hover:text-gold transition-colors font-semibold">Kunal Kedia: +91 80954 74075</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <a href="tel:+919448084351" className="hover:text-gold transition-colors">Showroom Desk: +91 94480 84351</a>
                </div>
              </div>

              <div className="flex gap-2.5 items-center pt-2 border-t border-white/10">
                <Mail className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <a href="mailto:nimimys@gmail.com" className="hover:text-gold transition-colors">nimimys@gmail.com</a>
              </div>

              <div className="flex gap-2.5 items-center">
                <Clock className="w-3.5 h-3.5 text-neutral-light/60 flex-shrink-0" />
                <span>Mon &ndash; Sat: 9:00 AM &ndash; 8:30 PM</span>
              </div>

              <button
                onClick={handleDirectionsClick}
                className="mt-2 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-display text-[11px] font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all cursor-pointer self-start border border-white/15"
              >
                <Map className="w-3.5 h-3.5 text-gold" />
                <span>Google Maps Directions</span>
              </button>

            </div>
          </div>

          {/* Column 4: Trust & Dealer Credentials */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <span className="text-[10px] font-extrabold text-gold uppercase tracking-widest block">Trust &amp; Credentials</span>
            <ul className="flex flex-col gap-3 font-sans text-xs text-neutral-light/75">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Authorised Dealer</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Colour Consultation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Genuine Berger Range</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Technical Guidance</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Fast Site Delivery</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Site Diagnostics</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <a
                href="https://www.instagram.com/nimishamba.paints/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#E31959] hover:border-[#E31959] transition-all duration-300 group"
                aria-label="Instagram @nimishamba.paints"
              >
                <svg className="w-4 h-4 text-neutral-light group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a
                href="https://wa.me/919448084351"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-600 transition-all duration-300 group"
                aria-label="Chat on WhatsApp"
              >
                <MessageSquare className="w-4 h-4 text-neutral-light group-hover:text-white transition-colors" />
              </a>
            </div>

          </div>

        </div>

        {/* ── BOTTOM BAR ────────────────────────────────────────────── */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-sans text-neutral-light/50 uppercase tracking-widest">
          <span>&copy; {currentYear} Sri Nimishamba Paints &amp; Plywoods. All Rights Reserved.</span>
          <div className="flex gap-6">
            <button onClick={() => handleNavClick('home')} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
            <button onClick={() => handleNavClick('home')} className="hover:text-white transition-colors cursor-pointer">Terms of Service</button>
            <button onClick={() => handleNavClick('solutions')} className="hover:text-white transition-colors cursor-pointer">Sitemap</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
