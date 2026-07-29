import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'products', label: 'Products' },
    { id: 'shades', label: 'Colour Inspiration' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id === 'products' ? 'solutions' : id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ── TOP BAR (ELEGANT MINIMAL STRIP) ───────────────────────── */}
      <div className="bg-[#0B111A] text-neutral-light/80 border-b border-white/10 hidden lg:block text-left relative z-50">
        <div className="max-w-7xl mx-auto px-8 py-2 flex justify-between items-center text-[11px] font-sans">
          
          {/* Left info */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-1.5 text-neutral-light/90">
              <MapPin className="w-3.5 h-3.5 text-gold" />
              <span>📍 Mysuru &amp; Bengaluru, KA</span>
            </div>

            <div className="flex items-center gap-2 border-l border-white/15 pl-6">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <a href="tel:+919448084351" className="hover:text-white transition-colors font-bold text-white">Ajay (Owner): +91 94480 84351</a>
              <span className="text-white/20">|</span>
              <a href="tel:+919986218879" className="hover:text-white transition-colors">Jayanth: +91 99862 18879</a>
              <span className="text-white/20">|</span>
              <a href="tel:+918095474075" className="hover:text-white transition-colors">Kunal: +91 80954 74075</a>
            </div>
          </div>

          {/* Right info */}
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

      {/* ── MAIN GLASSMORPHISM STICKY HEADER ─────────────────────── */}
      <header
        className={`fixed top-0 lg:top-[33px] left-0 right-0 z-40 transition-all duration-300 text-left ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-2xl shadow-luxury py-3.5 border-b border-neutral-light'
            : 'bg-white/80 backdrop-blur-xl shadow-xs py-4.5 border-b border-neutral-light/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          
          {/* Brand Identity: Official Berger Experience Centre */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="overflow-hidden w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-neutral-light/80 group-hover:scale-105 transition-transform duration-300">
              <img src="/images/logo.png" alt="Berger Colour World" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-primary tracking-tight text-lg group-hover:text-[#E31959] transition-colors">
                  SRI NIMISHAMBA
                </span>
                <span className="bg-[#E31959]/10 text-[#E31959] text-[8px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full border border-[#E31959]/20 flex items-center gap-1">
                  <ShieldCheck className="w-2.5 h-2.5 text-[#E31959]" />
                  Authorised Berger Partner
                </span>
              </div>
              <span className="font-sans text-[9px] font-bold text-neutral-mid tracking-widest uppercase mt-1">
                BERGER COLOUR WORLD EXPERIENCE CENTRE
              </span>
            </div>
          </a>

          {/* Quiet, Minimal, Calm Desktop Navigation */}
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
                    isActive
                      ? 'text-[#E31959] font-bold'
                      : 'text-primary hover:text-[#E31959]'
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

          {/* Primary CTA (Using Berger Red ONLY for this CTA) */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => openQuoteModal('Book Colour Consultation')}
              className="bg-[#E31959] hover:bg-[#C20F4B] text-white font-display text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-luxury hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer border border-[#E31959]/30"
            >
              <span>Book Colour Consultation</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-primary p-2 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* ── INDEPENDENT FULL-SCREEN MOBILE DRAWER ─────────────────────── */}
      <div
        className={`fixed inset-0 z-50 bg-primary/60 backdrop-blur-md transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 bottom-0 w-4/5 max-w-md bg-white shadow-2xl p-8 flex flex-col justify-between transition-transform duration-500 ease-out text-left ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Drawer Header */}
          <div>
            <div className="flex justify-between items-center pb-6 border-b border-neutral-light">
              <div className="flex items-center gap-3">
                <img src="/images/logo.png" alt="Nimishamba" className="w-8 h-8 rounded-lg object-cover" />
                <div className="flex flex-col">
                  <span className="font-display font-black text-primary text-base">SRI NIMISHAMBA</span>
                  <span className="font-sans text-[8px] font-bold text-[#E31959] uppercase tracking-wider">Berger Experience Centre</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-primary p-2 cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.id);
                  }}
                  className={`font-display text-xl font-bold transition-colors py-1 flex items-center justify-between ${
                    currentTab === link.id ? 'text-[#E31959]' : 'text-primary'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-neutral-mid/40" />
                </a>
              ))}
            </nav>
          </div>

          {/* Mobile Direct Contacts */}
          <div className="mt-auto pt-6 border-t border-neutral-light flex flex-col gap-4">
            <div className="flex flex-col gap-2 bg-neutral-soft p-3.5 rounded-2xl border border-neutral-light">
              <div className="flex justify-between items-center text-xs">
                <span className="font-display font-bold text-primary">Ajay Kedia (Owner)</span>
                <a href="tel:+919448084351" className="font-display font-bold text-[#E31959]">+91 94480 84351</a>
              </div>
              <div className="flex justify-between items-center text-xs pt-2 border-t border-neutral-light/60">
                <span className="font-display font-bold text-primary">Jayanth Kedia</span>
                <a href="tel:+919986218879" className="font-display font-bold text-accent">+91 99862 18879</a>
              </div>
              <div className="flex justify-between items-center text-xs pt-2 border-t border-neutral-light/60">
                <span className="font-display font-bold text-primary">Kunal Kedia</span>
                <a href="tel:+918095474075" className="font-display font-bold text-accent">+91 80954 74075</a>
              </div>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                openQuoteModal('Book Colour Consultation');
              }}
              className="bg-[#E31959] text-white font-display text-xs font-bold uppercase tracking-wider py-4 rounded-xl text-center hover:bg-[#C20F4B] transition-all shadow-md cursor-pointer"
            >
              Book Colour Consultation
            </button>
          </div>

        </div>
      </div>

      {/* ── MOBILE STICKY BOTTOM ACTIONS ───────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-neutral-light flex lg:hidden h-16 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <a
          href="tel:+919448084351"
          className="flex-1 flex flex-col justify-center items-center gap-1 text-primary hover:text-[#E31959] transition-colors border-r border-neutral-light"
        >
          <Phone className="w-5 h-5 text-primary" />
          <span className="font-sans text-[10px] font-bold uppercase tracking-wider">Call Ajay</span>
        </a>
        <a
          href="https://wa.me/919448084351"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col justify-center items-center gap-1 text-primary hover:text-emerald-600 transition-colors border-r border-neutral-light"
        >
          <MessageSquare className="w-5 h-5 text-emerald-500" />
          <span className="font-sans text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
        </a>
        <button
          onClick={() => openQuoteModal('Book Consultation')}
          className="flex-[1.4] flex flex-col justify-center items-center gap-1 bg-[#E31959] text-white hover:bg-[#C20F4B] transition-colors cursor-pointer"
        >
          <span className="font-display text-[10px] font-bold uppercase tracking-wider">Book Consultation</span>
        </button>
      </div>

    </>
  );
}
