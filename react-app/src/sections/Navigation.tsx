import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Phone, MessageSquare, Search, ChevronDown, 
  MapPin, Clock, Mail, ArrowRight, Shield, Home, Building2, 
  Factory, GraduationCap, Sparkles, CheckCircle2, PhoneCall
} from 'lucide-react';
import { SOLUTIONS, PROJECTS } from '../data/staticData';

interface NavigationProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openQuoteModal: (category?: string) => void;
}

export default function Navigation({ currentTab, setCurrentTab, openQuoteModal }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const megaMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'solutions', label: 'Solutions', hasMegaMenu: true },
    { id: 'products', label: 'Products' },
    { id: 'brands', label: 'Brands' },
    { id: 'projects', label: 'Projects' },
    { id: 'shades', label: 'Inspiration' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id === 'products' ? 'solutions' : id);
    setIsOpen(false);
    setIsMegaMenuOpen(false);
    setIsSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMouseEnterMegaMenu = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setIsMegaMenuOpen(true);
  };

  const handleMouseLeaveMegaMenu = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 200);
  };

  // Search Results Filtering
  const filteredSolutions = searchQuery.trim() 
    ? SOLUTIONS.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tier.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredProjects = searchQuery.trim() 
    ? PROJECTS.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      {/* ── TOP INFORMATION UTILITY BAR ───────────────────────────── */}
      <div className="bg-primary-dark text-neutral-light/90 border-b border-white/10 hidden lg:block text-left relative z-50">
        <div className="max-w-7xl mx-auto px-6 py-2.5 flex justify-between items-center text-[11px] font-sans">
          
          {/* Left Metadata Strip */}
          <div className="flex items-center gap-7">
            <div className="flex items-center gap-1.5 text-gold font-medium">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>Mysuru &amp; Bengaluru, KA</span>
            </div>
            
            <div className="flex items-center gap-2 border-l border-white/15 pl-6">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <a href="tel:+919986218879" className="hover:text-gold transition-colors">Jayanth: +91 99862 18879</a>
              <span className="text-white/30">|</span>
              <a href="tel:+918095474075" className="hover:text-gold transition-colors">Kunal: +91 80954 74075</a>
            </div>

            <div className="flex items-center gap-1.5 border-l border-white/15 pl-6">
              <Mail className="w-3.5 h-3.5 text-gold" />
              <a href="mailto:nimimys@gmail.com" className="hover:text-gold transition-colors">nimimys@gmail.com</a>
            </div>
          </div>

          {/* Right Utility CTAs */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 opacity-75">
              <Clock className="w-3.5 h-3.5" />
              <span>Mon &ndash; Sat: 9:00 AM &ndash; 8:30 PM</span>
            </div>

            <a
              href="https://wa.me/919448084351"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-white transition-colors font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-emerald-400/20" />
              <span>WhatsApp Desk</span>
            </a>

            <button
              onClick={() => openQuoteModal('Request Callback')}
              className="bg-gold/15 border border-gold/30 text-gold-light hover:bg-gold hover:text-primary font-display text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full transition-all duration-300 flex items-center gap-1 cursor-pointer"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Request Callback</span>
            </button>
          </div>

        </div>
      </div>

      {/* ── MAIN HEADER NAVBAR ────────────────────────────────────── */}
      <header
        className={`fixed top-0 lg:top-[37px] left-0 right-0 z-40 transition-all duration-500 text-left ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-luxury py-3.5 border-b border-neutral-light'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="overflow-hidden w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-md border border-neutral-light/30 group-hover:scale-105 transition-transform duration-300">
              <img src="/images/logo.png" alt="Nimishamba Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-black text-primary tracking-tight text-lg group-hover:text-accent transition-colors">
                SRI NIMISHAMBA
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-sans text-[9px] font-extrabold text-gold-dark tracking-widest uppercase">
                  SURFACE SOLUTIONS
                </span>
                <span className="bg-primary/5 text-primary text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border border-primary/10">
                  EST. 2005
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-8 relative">
            {navLinks.map((link) => (
              <div
                key={link.id}
                onMouseEnter={link.hasMegaMenu ? handleMouseEnterMegaMenu : undefined}
                onMouseLeave={link.hasMegaMenu ? handleMouseLeaveMegaMenu : undefined}
                className="relative py-2"
              >
                <a
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.id);
                  }}
                  className={`font-display text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5 group ${
                    currentTab === link.id || (link.id === 'solutions' && currentTab === 'products')
                      ? 'text-accent font-extrabold'
                      : 'text-primary hover:text-accent'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.hasMegaMenu && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180 text-accent' : 'text-neutral-mid'}`} />
                  )}
                  {/* Hover Underline Microinteraction */}
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-accent transform origin-left transition-transform duration-300 ${currentTab === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </a>

                {/* ── LUXURY 4-COLUMN MEGA MENU ───────────────────────── */}
                {link.hasMegaMenu && isMegaMenuOpen && (
                  <div 
                    onMouseEnter={handleMouseEnterMegaMenu}
                    onMouseLeave={handleMouseLeaveMegaMenu}
                    className="absolute top-full -left-48 w-[920px] bg-white/95 backdrop-blur-2xl rounded-3xl border border-neutral-light shadow-luxury p-8 animate-fade-in z-50 text-left"
                  >
                    <div className="grid grid-cols-4 gap-8">
                      
                      {/* Column 1: Residential */}
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 pb-3 border-b border-neutral-light">
                          <Home className="w-4 h-4 text-accent" />
                          <span className="font-display font-bold text-primary text-xs uppercase tracking-wider">Residential</span>
                        </div>
                        <ul className="flex flex-col gap-3">
                          <li>
                            <button 
                              onClick={() => handleNavClick('solutions')}
                              className="group text-left"
                            >
                              <strong className="font-display text-xs font-bold text-primary group-hover:text-accent transition-colors block">Interior Wall Systems</strong>
                              <span className="font-sans text-[11px] text-neutral-mid leading-tight block mt-0.5">Luxury emulsions &amp; low-VOC finishes</span>
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => handleNavClick('solutions')}
                              className="group text-left"
                            >
                              <strong className="font-display text-xs font-bold text-primary group-hover:text-accent transition-colors block">Exterior Weatherproofing</strong>
                              <span className="font-sans text-[11px] text-neutral-mid leading-tight block mt-0.5">10-Year facade protection against rain &amp; UV</span>
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => handleNavClick('solutions')}
                              className="group text-left"
                            >
                              <strong className="font-display text-xs font-bold text-primary group-hover:text-accent transition-colors block">Structural Waterproofing</strong>
                              <span className="font-sans text-[11px] text-neutral-mid leading-tight block mt-0.5">Elastomeric damp-proofing &amp; crack repair</span>
                            </button>
                          </li>
                        </ul>
                      </div>

                      {/* Column 2: Commercial */}
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 pb-3 border-b border-neutral-light">
                          <Building2 className="w-4 h-4 text-primary" />
                          <span className="font-display font-bold text-primary text-xs uppercase tracking-wider">Commercial</span>
                        </div>
                        <ul className="flex flex-col gap-3">
                          <li>
                            <button 
                              onClick={() => handleNavClick('solutions')}
                              className="group text-left"
                            >
                              <strong className="font-display text-xs font-bold text-primary group-hover:text-accent transition-colors block">Office &amp; Corporate</strong>
                              <span className="font-sans text-[11px] text-neutral-mid leading-tight block mt-0.5">High-traffic scuff-resistant wall coatings</span>
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => handleNavClick('solutions')}
                              className="group text-left"
                            >
                              <strong className="font-display text-xs font-bold text-primary group-hover:text-accent transition-colors block">Hotels &amp; Restaurants</strong>
                              <span className="font-sans text-[11px] text-neutral-mid leading-tight block mt-0.5">Premium decorative dining &amp; lobby finishes</span>
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => handleNavClick('solutions')}
                              className="group text-left"
                            >
                              <strong className="font-display text-xs font-bold text-primary group-hover:text-accent transition-colors block">Retail Showrooms</strong>
                              <span className="font-sans text-[11px] text-neutral-mid leading-tight block mt-0.5">Stain-resistant aesthetic wall systems</span>
                            </button>
                          </li>
                        </ul>
                      </div>

                      {/* Column 3: Industrial */}
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 pb-3 border-b border-neutral-light">
                          <Factory className="w-4 h-4 text-gold-dark" />
                          <span className="font-display font-bold text-primary text-xs uppercase tracking-wider">Industrial</span>
                        </div>
                        <ul className="flex flex-col gap-3">
                          <li>
                            <button 
                              onClick={() => handleNavClick('solutions')}
                              className="group text-left"
                            >
                              <strong className="font-display text-xs font-bold text-primary group-hover:text-accent transition-colors block">Epoxy Floor Systems</strong>
                              <span className="font-sans text-[11px] text-neutral-mid leading-tight block mt-0.5">Seamless heavy-duty warehouse flooring</span>
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => handleNavClick('solutions')}
                              className="group text-left"
                            >
                              <strong className="font-display text-xs font-bold text-primary group-hover:text-accent transition-colors block">Anti-Corrosion Coatings</strong>
                              <span className="font-sans text-[11px] text-neutral-mid leading-tight block mt-0.5">Protective systems for steel &amp; pipelines</span>
                            </button>
                          </li>
                        </ul>
                      </div>

                      {/* Column 4: Institutional */}
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 pb-3 border-b border-neutral-light">
                          <GraduationCap className="w-4 h-4 text-emerald-600" />
                          <span className="font-display font-bold text-primary text-xs uppercase tracking-wider">Institutional</span>
                        </div>
                        <ul className="flex flex-col gap-3">
                          <li>
                            <button 
                              onClick={() => handleNavClick('solutions')}
                              className="group text-left"
                            >
                              <strong className="font-display text-xs font-bold text-primary group-hover:text-accent transition-colors block">Schools &amp; Colleges</strong>
                              <span className="font-sans text-[11px] text-neutral-mid leading-tight block mt-0.5">Hypoallergenic &amp; easy-clean wall systems</span>
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => handleNavClick('solutions')}
                              className="group text-left"
                            >
                              <strong className="font-display text-xs font-bold text-primary group-hover:text-accent transition-colors block">Hospitals &amp; Healthcare</strong>
                              <span className="font-sans text-[11px] text-neutral-mid leading-tight block mt-0.5">Anti-bacterial hygienic surface coatings</span>
                            </button>
                          </li>
                        </ul>
                      </div>

                    </div>

                    {/* Featured Mega Menu Bottom Bar */}
                    <div className="mt-8 pt-6 border-t border-neutral-light flex justify-between items-center bg-neutral-soft -mx-8 -mb-8 p-6 rounded-b-3xl">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-gold" />
                        <span className="font-sans text-xs text-primary font-semibold">
                          Authorised Platinum Partner — Berger Paints &amp; Protective Coatings
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setIsMegaMenuOpen(false);
                          openQuoteModal('Custom Specification Request');
                        }}
                        className="bg-primary text-white font-display text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-primary-light transition-all flex items-center gap-2"
                      >
                        <span>Speak with an Expert</span>
                        <ArrowRight className="w-3.5 h-3.5 text-gold" />
                      </button>
                    </div>

                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Right Controls: Search + Primary CTA */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2.5 text-primary hover:text-accent bg-neutral-soft border border-neutral-light/80 hover:border-primary rounded-xl transition-all shadow-sm"
              aria-label="Expand Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* High-Impact Primary CTA */}
            <button
              onClick={() => openQuoteModal('Project Consultation')}
              className="bg-primary text-white font-display text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl hover:bg-primary-light transition-all shadow-luxury hover:-translate-y-0.5 border border-gold/30 inline-flex items-center gap-2 group cursor-pointer"
            >
              <span>Speak with an Expert</span>
              <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-primary bg-neutral-soft rounded-lg border border-neutral-light"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-primary bg-primary/5 rounded-lg border border-primary/10"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* ── EXPANDABLE LUXURY SEARCH OVERLAY ───────────────────────── */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-md flex items-start justify-center pt-24 px-6 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-neutral-light overflow-hidden p-6 text-left relative">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 right-6 p-2 text-primary hover:text-accent rounded-xl hover:bg-neutral-light transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[9px] font-bold text-accent uppercase tracking-wider block mb-2">Luxury Search</span>
            <div className="relative mb-6">
              <Search className="w-5 h-5 text-neutral-mid absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                placeholder="What are you looking for? (e.g., Waterproofing, Epoxy, Residential, Silk)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-soft border border-neutral-light rounded-2xl pl-12 pr-4 py-4 font-sans text-sm font-semibold text-primary outline-none focus:border-primary transition-all"
              />
            </div>

            {/* Quick Suggestions / Filter Results */}
            {searchQuery.trim() === '' ? (
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-neutral-mid uppercase tracking-wider">Popular Searches</span>
                <div className="flex flex-wrap gap-2">
                  {['Structural Waterproofing', 'Epoxy Floor Coatings', 'Exterior WeatherCoat', 'Silk Glamor', 'Texture Design'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="bg-neutral-soft hover:bg-primary hover:text-white border border-neutral-light font-sans text-xs font-semibold text-primary px-3.5 py-2 rounded-xl transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-h-80 overflow-y-auto flex flex-col gap-4 pr-2">
                {filteredSolutions.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-2">Solutions ({filteredSolutions.length})</span>
                    <div className="flex flex-col gap-2">
                      {filteredSolutions.map((sol) => (
                        <div
                          key={sol.id}
                          onClick={() => {
                            handleNavClick('solutions');
                          }}
                          className="p-3 bg-neutral-soft hover:bg-primary/5 rounded-xl border border-neutral-light cursor-pointer flex justify-between items-center transition-colors"
                        >
                          <div>
                            <strong className="font-display text-xs font-bold text-primary block">{sol.name}</strong>
                            <span className="font-sans text-[10px] text-neutral-mid">{sol.tier} &middot; {sol.category}</span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-accent" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {filteredProjects.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold text-gold uppercase tracking-wider block mb-2">Projects ({filteredProjects.length})</span>
                    <div className="flex flex-col gap-2">
                      {filteredProjects.map((proj) => (
                        <div
                          key={proj.id}
                          onClick={() => handleNavClick('projects')}
                          className="p-3 bg-neutral-soft hover:bg-primary/5 rounded-xl border border-neutral-light cursor-pointer flex justify-between items-center transition-colors"
                        >
                          <div>
                            <strong className="font-display text-xs font-bold text-primary block">{proj.title}</strong>
                            <span className="font-sans text-[10px] text-neutral-mid">{proj.scope}</span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-accent" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {filteredSolutions.length === 0 && filteredProjects.length === 0 && (
                  <p className="font-sans text-xs text-neutral-mid py-4 text-center">
                    No exact match found for "{searchQuery}". Try searching for "Waterproofing", "Residential", or "Epoxy".
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

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
                <span className="font-display font-black text-primary text-base">SRI NIMISHAMBA</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-primary p-2">
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
                  className={`font-display text-xl font-extrabold transition-colors py-1 flex items-center justify-between ${
                    currentTab === link.id ? 'text-accent' : 'text-primary'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-neutral-mid/50" />
                </a>
              ))}
            </nav>
          </div>

          {/* Mobile Leadership Contacts */}
          <div className="mt-auto pt-6 border-t border-neutral-light flex flex-col gap-4">
            <span className="text-[9px] font-bold text-accent uppercase tracking-wider block">Direct Leadership Contacts</span>
            <div className="flex flex-col gap-2 bg-neutral-soft p-3.5 rounded-2xl border border-neutral-light">
              <div className="flex justify-between items-center text-xs">
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
                openQuoteModal('Project Consultation');
              }}
              className="bg-primary text-white font-display text-xs font-bold uppercase tracking-wider py-4 rounded-xl text-center hover:bg-primary-light transition-all shadow-md"
            >
              Speak with an Expert
            </button>
          </div>

        </div>
      </div>

      {/* ── MOBILE STICKY BOTTOM ACTIONS ───────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-neutral-light flex lg:hidden h-16 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <a
          href="tel:+919448084351"
          className="flex-1 flex flex-col justify-center items-center gap-1 text-primary hover:text-accent transition-colors border-r border-neutral-light"
        >
          <Phone className="w-5 h-5 text-accent" />
          <span className="font-sans text-[10px] font-bold uppercase tracking-wider">Call</span>
        </a>
        <a
          href="https://wa.me/919448084351"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col justify-center items-center gap-1 text-primary hover:text-accent transition-colors border-r border-neutral-light"
        >
          <MessageSquare className="w-5 h-5 text-emerald-500" />
          <span className="font-sans text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
        </a>
        <button
          onClick={() => openQuoteModal('Mobile Quick Quote')}
          className="flex-[1.3] flex flex-col justify-center items-center gap-1 bg-primary text-white hover:bg-primary-light transition-colors"
        >
          <Sparkles className="w-5 h-5 text-gold-light" />
          <span className="font-display text-[10px] font-bold uppercase tracking-wider">Get Quote</span>
        </button>
      </div>

    </>
  );
}
