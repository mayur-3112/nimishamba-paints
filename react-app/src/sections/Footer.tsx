import React from 'react';
import { MessageSquare, Phone, MapPin, Award, Mail } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  openQuoteModal: () => void;
}

export default function Footer({ setCurrentTab, openQuoteModal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-neutral-light pt-20 pb-28 md:pb-12 text-left relative z-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white border-opacity-5">
        
        {/* Left Brand Description */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="overflow-hidden w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md border border-neutral-light/10">
              <img src="/images/logo.png" alt="Nimishamba Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-white tracking-tight text-base">SRI NIMISHAMBA PAINTS</span>
              <span className="font-sans text-[9px] font-bold text-neutral-light opacity-50 tracking-wider uppercase">PREMIUM SURFACE SOLUTIONS</span>
            </div>
          </a>
          
          <p className="font-sans text-xs text-neutral-light opacity-60 leading-relaxed">
            Sri Nimishamba Paints is a premier surface solutions company in Mysuru. We partner with homeowners, architects, contractors, and industrial clients to deliver the right coating system for every project — from luxury residences to large commercial complexes.
          </p>

          <div className="flex items-center gap-3 bg-white bg-opacity-5 rounded-2xl p-4 border border-white border-opacity-5 self-start">
            <Award className="w-8 h-8 text-gold" />
            <div className="flex flex-col leading-snug">
              <span className="font-display text-white text-xs font-bold">Authorised Platinum Partner</span>
              <span className="font-sans text-[8px] text-neutral-light opacity-50 uppercase tracking-wider">Berger Paints & Coatings</span>
            </div>
          </div>
        </div>

        {/* Middle Quick Links */}
        <div className="md:col-span-2 flex flex-col gap-5">
          <span className="text-[10px] font-bold text-gold uppercase tracking-wider block">Site Map</span>
          <nav className="flex flex-col gap-3 text-xs font-sans text-neutral-light opacity-75">
            <button onClick={() => handleNavClick('home')} className="hover:text-accent transition-colors self-start">Home</button>
            <button onClick={() => handleNavClick('solutions')} className="hover:text-accent transition-colors self-start">Solutions</button>
            <button onClick={() => handleNavClick('shades')} className="hover:text-accent transition-colors self-start">Colour Studio</button>
            <button onClick={() => handleNavClick('estimator')} className="hover:text-accent transition-colors self-start">Project Estimator</button>
            <button onClick={() => handleNavClick('services')} className="hover:text-accent transition-colors self-start">Capabilities</button>
            <button onClick={() => handleNavClick('about')} className="hover:text-accent transition-colors self-start">About Us</button>
            <button onClick={() => handleNavClick('social')} className="hover:text-accent transition-colors self-start">Social Showcase</button>
            <button onClick={() => handleNavClick('contact')} className="hover:text-accent transition-colors self-start">Contact</button>
          </nav>
        </div>

        {/* Middle Solution Areas */}
        <div className="md:col-span-3 flex flex-col gap-5">
          <span className="text-[10px] font-bold text-gold uppercase tracking-wider block">Solution Areas</span>
          <nav className="flex flex-col gap-3 text-xs font-sans text-neutral-light opacity-75">
            <button onClick={() => handleNavClick('solutions')} className="hover:text-accent transition-colors self-start">Residential Interiors & Exteriors</button>
            <button onClick={() => handleNavClick('solutions')} className="hover:text-accent transition-colors self-start">Commercial & Corporate Spaces</button>
            <button onClick={() => handleNavClick('solutions')} className="hover:text-accent transition-colors self-start">Industrial Floor & Protective Coatings</button>
            <button onClick={() => handleNavClick('solutions')} className="hover:text-accent transition-colors self-start">Waterproofing & Surface Treatment</button>
            <button onClick={() => handleNavClick('solutions')} className="hover:text-accent transition-colors self-start">Decorative Textures & Luxury Finishes</button>
            <button onClick={() => handleNavClick('solutions')} className="hover:text-accent transition-colors self-start">Wood & Metal Coatings</button>
          </nav>
        </div>

        {/* Right Details */}
        <div className="md:col-span-3 flex flex-col gap-5">
          <span className="text-[10px] font-bold text-gold uppercase tracking-wider block">Direct Contacts</span>
          <div className="flex flex-col gap-3 text-xs font-sans text-neutral-light opacity-85">
            <div className="flex gap-2.5 items-start">
              <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <span>Hinkal Ring Road Junction, near Outer Ring Road, Mysuru &mdash; 570017</span>
            </div>
            
            <div className="flex flex-col gap-1.5 pt-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <a href="tel:+919986218879" className="hover:text-accent transition-colors font-semibold">Jayanth Kedia: +91 99862 18879</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <a href="tel:+918095474075" className="hover:text-accent transition-colors font-semibold">Kunal Kedia: +91 80954 74075</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                <a href="tel:+919448084351" className="hover:text-accent transition-colors">Showroom Desk: +91 94480 84351</a>
              </div>
            </div>

            <div className="flex gap-2.5 items-center pt-1">
              <Mail className="w-4 h-4 text-gold flex-shrink-0" />
              <a href="mailto:nimimys@gmail.com" className="hover:text-accent transition-colors">nimimys@gmail.com</a>
            </div>

            <div className="flex gap-2.5 items-center">
              <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <a href="https://wa.me/919448084351" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Chat on WhatsApp</a>
            </div>
            <div className="flex gap-2.5 items-center">
              <svg className="w-4 h-4 text-pink-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              <a href="https://www.instagram.com/nimishamba.paints/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">@nimishamba.paints</a>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Area */}
      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-sans text-neutral-light opacity-50 uppercase tracking-widest">
        <span>&copy; {currentYear} Sri Nimishamba Paints &amp; Plywoods. All Rights Reserved.</span>
        <div className="flex gap-6">
          <span>Authorised Berger Partner</span>
          <span>Premium Surface Solutions</span>
        </div>
      </div>
    </footer>
  );
}
