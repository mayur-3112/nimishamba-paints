import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, FileText } from 'lucide-react';

interface NavigationProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openQuoteModal: () => void;
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
    { id: 'products', label: 'Products' },
    { id: 'shades', label: 'Colours' },
    { id: 'projects', label: 'Projects' },
    { id: 'estimator', label: 'Estimator' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'social', label: 'Social' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop/Tablet Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white bg-opacity-90 backdrop-blur-md shadow-premium py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo & Brand */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="overflow-hidden w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md border border-neutral-light/10 group-hover:scale-105 transition-transform duration-300">
              <img src="/images/logo.png" alt="Nimishamba Paints Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col leading-none text-left">
              <span className="font-display font-bold text-primary tracking-tight text-base">NIMISHAMBA</span>
              <span className="font-sans text-[9px] font-bold text-neutral-mid tracking-wider uppercase">PAINTS &amp; DÉCOR</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className={`font-display text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer ${
                  currentTab === link.id
                    ? 'text-accent'
                    : 'text-primary hover:text-accent'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+919448084351"
              className="flex items-center gap-2 font-display text-sm font-bold text-primary hover:text-accent transition-colors py-2"
            >
              <Phone className="w-4 h-4 text-accent" />
              <span>+91 94480 84351</span>
            </a>
            <button
              onClick={openQuoteModal}
              className="bg-primary text-white font-display text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-lg hover:bg-primary-light transition-all shadow-premium hover:-translate-y-0.5"
            >
              Get Quote
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-primary p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-primary bg-opacity-40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 bottom-0 w-3/4 max-w-sm bg-white shadow-2xl p-8 flex flex-col gap-6 transition-transform duration-300 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center pb-4 border-b border-neutral-light">
            <span className="font-display font-bold text-primary">Menu</span>
            <button onClick={() => setIsOpen(false)} className="text-primary">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className={`font-display text-lg font-bold transition-colors py-2 ${
                  currentTab === link.id ? 'text-accent' : 'text-primary'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-4 border-t border-neutral-light pt-6">
            <a
              href="tel:+919448084351"
              className="flex items-center gap-3 text-primary font-display font-bold cursor-pointer"
            >
              <Phone className="w-5 h-5 text-accent" />
              <span>Call +91 94480 84351</span>
            </a>
            <a
              href="https://www.instagram.com/nimishamba.paints/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-primary font-display font-bold cursor-pointer"
            >
              <svg className="w-5 h-5 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              <span>Instagram @nimishamba.paints</span>
            </a>
            <button
              onClick={() => {
                setIsOpen(false);
                openQuoteModal();
              }}
              className="bg-primary text-white font-display text-sm font-bold uppercase tracking-wider py-4 rounded-xl text-center hover:bg-primary-light transition-all shadow-md"
            >
              Get Free Estimate
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Footer Bar (Persistent on screens smaller than md) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-neutral-light flex lg:hidden h-16 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <a
          href="tel:+919448084351"
          className="flex-1 flex flex-col justify-center items-center gap-1 text-primary hover:text-accent transition-colors border-r border-neutral-light"
        >
          <Phone className="w-5 h-5 text-accent" />
          <span className="font-sans text-[10px] font-bold uppercase tracking-wider">Call Now</span>
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
          onClick={openQuoteModal}
          className="flex-[1.2] flex flex-col justify-center items-center gap-1 bg-primary text-white hover:bg-primary-light transition-colors"
        >
          <FileText className="w-5 h-5 text-gold-light" />
          <span className="font-display text-[10px] font-bold uppercase tracking-wider">Get Quote</span>
        </button>
      </div>

      {/* Desktop floating WhatsApp. Hidden below lg, where the sticky bar already
          carries the same action. */}
      <a
        href="https://wa.me/919448084351?text=Hi%2C%20I%27d%20like%20a%20paint%20quote%20for%20my%20home."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Nimishamba Paints on WhatsApp"
        className="hidden lg:flex fixed bottom-8 right-8 z-30 items-center gap-3 bg-[#25D366] text-white font-display text-xs font-bold uppercase tracking-wider pl-4 pr-5 py-3.5 rounded-full shadow-luxury hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
      >
        <MessageSquare className="w-5 h-5" />
        <span>Chat on WhatsApp</span>
      </a>
    </>
  );
}
