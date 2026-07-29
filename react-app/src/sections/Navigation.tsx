import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, MapPin, ArrowRight, ShieldCheck, FileText, Compass, Clock, Sparkles } from 'lucide-react';
import ColorMyWorldWebGL from '../components/ColorMyWorldWebGL';

interface NavigationProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openQuoteModal: (category?: string) => void;
}

export default function Navigation({ currentTab, setCurrentTab, openQuoteModal }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', badge: 'Main' },
    { id: 'solutions', label: 'Solutions', badge: 'Systems' },
    { id: 'shades', label: 'Colour Studio', badge: '2,500+ Shades' },
    { id: 'projects', label: 'Projects', badge: 'Gallery' },
    { id: 'about', label: 'About Experience Centre', badge: '20+ Yrs' },
    { id: 'contact', label: 'Contact & Location', badge: 'Hinkal' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id === 'products' ? 'solutions' : id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const googleMapsUrl = "https://maps.google.com/?q=Sri+Nimishamba+Paints+Plywoods+Hinkal+Mysuru";

  return (
    <>
      {/* ── DESKTOP TOP UTILITY BAR (Hidden on Mobile) ───────────────── */}
      <div className="bg-[#0B111A] text-neutral-light/80 border-b border-white/10 hidden lg:block text-left relative z-50">
        <div className="max-w-7xl mx-auto px-8 py-2 flex justify-between items-center text-[11px] font-sans">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-1.5 text-neutral-light/90">
              <MapPin className="w-3.5 h-3.5 text-gold" />
              <span>📍 Hinkal Ring Road, Mysuru, KA</span>
            </div>

            <div className="flex items-center gap-2 border-l border-white/15 pl-6">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <a href="tel:+919448084351" className="hover:text-white transition-colors font-bold text-white">Ajay Kedia (Owner): +91 94480 84351</a>
              <span className="text-white/20">|</span>
              <a href="tel:+919986218879" className="hover:text-white transition-colors">Jayanth: +91 99862 18879</a>
              <span className="text-white/20">|</span>
              <a href="tel:+918095474075" className="hover:text-white transition-colors">Kunal: +91 80954 74075</a>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-1.5 opacity-75">
              <Clock className="w-3.5 h-3.5" />
              <span>🕘 Mon &ndash; Sat: 9:00 AM &ndash; 8:30 PM</span>
            </div>

            <a
              href="https://wa.me/919448084351"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-white transition-colors font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── GLASSMORPHIC STICKY HEADER (Mobile-Optimized Touch Targets) ────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 text-left ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-2xl shadow-luxury py-3 border-b border-neutral-light'
            : 'bg-white/85 backdrop-blur-xl py-3.5 border-b border-neutral-light/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex justify-between items-center">
          
          {/* Brand Identity: Official Berger Experience Centre */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-3 cursor-pointer group py-1 min-h-[48px]"
          >
            <div className="overflow-hidden w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-xl flex items-center justify-center shadow-xs border border-neutral-light group-hover:scale-105 transition-transform">
              <img src="/images/logo.png" alt="Berger Colour World" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-primary text-base sm:text-lg tracking-tight">
                  SRI NIMISHAMBA
                </span>
                <span className="bg-[#E31959]/10 text-[#E31959] text-[7px] sm:text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md border border-[#E31959]/20">
                  Berger
                </span>
              </div>
              <span className="font-sans text-[8px] sm:text-[9px] font-bold text-neutral-mid tracking-widest uppercase mt-0.5">
                EXPERIENCE CENTRE &middot; MYSURU
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id || (link.id === 'solutions' && currentTab === 'products');
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.id);
                  }}
                  className={`font-display text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer relative group ${
                    isActive ? 'text-[#E31959] font-bold' : 'text-primary hover:text-[#E31959]'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-[#E31959] rounded-full transform origin-left transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </a>
              );
            })}
          </nav>

          {/* Desktop Action Buttons: Color My World & Consultation */}
          <div className="hidden lg:flex items-center gap-3">
            <ColorMyWorldWebGL 
              buttonClassName="bg-[#E31959]/10 hover:bg-[#E31959]/20 text-[#E31959] border border-[#E31959]/30 font-display text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all cursor-pointer inline-flex items-center gap-2"
            />

            <button
              onClick={() => openQuoteModal('Book Colour Consultation')}
              className="bg-[#E31959] hover:bg-[#C20F4B] text-white font-display text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-luxury transition-all cursor-pointer border border-[#E31959]/30"
            >
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Menu Trigger (48px Touch Target) */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden text-primary w-12 h-12 flex items-center justify-center rounded-xl bg-neutral-soft border border-neutral-light/80 active:scale-95 transition-all cursor-pointer"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-6 h-6 text-primary" />
          </button>

        </div>
      </header>

      {/* ── APPLE-STORE STYLE FULL-SCREEN MOBILE MENU ───────────────── */}
      <div
        className={`fixed inset-0 z-50 bg-[#0B111A]/80 backdrop-blur-xl transition-all duration-400 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-white flex flex-col justify-between p-6 sm:p-8 transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) overflow-y-auto ${
            isOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          {/* Header Bar */}
          <div>
            <div className="flex justify-between items-center pb-6 border-b border-neutral-light">
              <div className="flex items-center gap-3">
                <img src="/images/logo.png" alt="Berger Logo" className="w-9 h-9 rounded-xl object-cover" />
                <div className="flex flex-col text-left">
                  <span className="font-display font-black text-primary text-base">SRI NIMISHAMBA</span>
                  <span className="font-sans text-[8px] font-bold text-[#E31959] uppercase tracking-wider">Authorised Berger Experience Centre &middot; Mysuru</span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-11 h-11 rounded-full bg-neutral-soft border border-neutral-light flex items-center justify-center text-primary active:scale-90 transition-all cursor-pointer"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Large Editorial Nav Links */}
            <nav className="flex flex-col gap-2 mt-6 text-left">
              {navLinks.map((link) => {
                const isActive = currentTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full py-3.5 px-4 rounded-2xl flex items-center justify-between text-left transition-all active:scale-[0.98] ${
                      isActive 
                        ? 'bg-[#E31959]/5 border border-[#E31959]/20 text-[#E31959]' 
                        : 'hover:bg-neutral-soft text-primary'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-display font-extrabold text-xl tracking-tight">{link.label}</span>
                      <span className="font-sans text-[8px] font-bold uppercase tracking-widest text-neutral-mid/70 mt-0.5">{link.badge}</span>
                    </div>
                    <ArrowRight className={`w-5 h-5 ${isActive ? 'text-[#E31959]' : 'text-neutral-mid/40'}`} />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Direct Leadership Contacts & Color My World Trigger in Mobile Menu */}
          <div className="mt-6 pt-5 border-t border-neutral-light text-left space-y-3">
            
            {/* Color My World Signature Button inside Mobile Menu */}
            <ColorMyWorldWebGL 
              buttonClassName="w-full min-h-[48px] bg-gradient-to-r from-primary to-[#0B111A] text-white font-display text-xs font-black uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-luxury active:scale-[0.98] transition-all cursor-pointer border border-white/20"
              onComplete={() => setIsOpen(false)}
            />

            <div className="bg-neutral-soft p-3.5 rounded-2xl border border-neutral-light space-y-2.5">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-display text-xs font-bold text-primary">Ajay Kedia</span>
                  <span className="font-sans text-[8px] text-neutral-mid">Owner &amp; Founder</span>
                </div>
                <a href="tel:+919448084351" className="font-display text-xs font-black text-[#E31959] bg-[#E31959]/10 px-3 py-1 rounded-lg border border-[#E31959]/20">
                  +91 94480 84351
                </a>
              </div>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                openQuoteModal('Book Colour Consultation');
              }}
              className="w-full min-h-[48px] bg-[#E31959] hover:bg-[#C20F4B] text-white font-display text-xs font-black uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-luxury active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Book Colour Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* ── STICKY BOTTOM ACTION BAR (iPhone & Android Safe Areas) ─────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/92 backdrop-blur-2xl border-t border-neutral-light flex lg:hidden shadow-[0_-8px_30px_rgba(0,0,0,0.08)] pb-[env(safe-area-inset-bottom,0px)]">
        
        {/* Call Ajay */}
        <a
          href="tel:+919448084351"
          className="flex-1 min-h-[60px] flex flex-col justify-center items-center gap-1 text-primary hover:text-[#E31959] transition-colors border-r border-neutral-light/70 active:bg-neutral-soft"
          aria-label="Call Owner Ajay Kedia"
        >
          <Phone className="w-5 h-5 text-primary" />
          <span className="font-display text-[10px] font-black uppercase tracking-wider">Call</span>
        </a>

        {/* WhatsApp Desk */}
        <a
          href="https://wa.me/919448084351"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[60px] flex flex-col justify-center items-center gap-1 text-primary hover:text-emerald-600 transition-colors border-r border-neutral-light/70 active:bg-neutral-soft"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-5 h-5 text-emerald-500" />
          <span className="font-display text-[10px] font-black uppercase tracking-wider">WhatsApp</span>
        </a>

        {/* Directions to Hinkal Showroom */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[60px] flex flex-col justify-center items-center gap-1 text-primary hover:text-accent transition-colors border-r border-neutral-light/70 active:bg-neutral-soft"
          aria-label="Get Directions on Google Maps"
        >
          <Compass className="w-5 h-5 text-accent" />
          <span className="font-display text-[10px] font-black uppercase tracking-wider">Directions</span>
        </a>

        {/* Get Quote */}
        <button
          onClick={() => openQuoteModal('Mobile Sticky Quote')}
          className="flex-[1.2] min-h-[60px] flex flex-col justify-center items-center gap-1 bg-[#E31959] text-white hover:bg-[#C20F4B] active:bg-[#A00B3B] transition-colors cursor-pointer"
          aria-label="Get Project Quote"
        >
          <FileText className="w-5 h-5 text-white" />
          <span className="font-display text-[10px] font-black uppercase tracking-wider">Get Quote</span>
        </button>

      </div>
    </>
  );
}
