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
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
        
        {/* Left Brand Description */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="overflow-hidden w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-md border border-white/20">
              <img src="/images/logo.png" alt="Nimishamba Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-black text-white tracking-tight text-lg">SRI NIMISHAMBA PAINTS</span>
              <span className="font-sans text-[9px] font-extrabold text-gold tracking-widest uppercase mt-0.5">PREMIUM SURFACE SOLUTIONS</span>
            </div>
          </a>
          
          <p className="font-sans text-xs text-neutral-light/70 leading-relaxed max-w-sm">
            Sri Nimishamba Paints is a premier surface solutions company in Mysuru. We partner with homeowners, architects, contractors, and industrial clients to deliver high-performance coating systems for every scale of project.
          </p>

          {/* Platinum Partner Badge - Clean Dark Glass Accent */}
          <div className="flex items-center gap-3.5 bg-white/5 rounded-2xl p-4 border border-white/10 self-start backdrop-blur-sm">
            <Award className="w-7 h-7 text-gold flex-shrink-0" />
            <div className="flex flex-col leading-snug">
              <span className="font-display text-white text-xs font-bold">Authorised Platinum Partner</span>
              <span className="font-sans text-[9px] text-gold-light uppercase tracking-wider mt-0.5">Berger Paints &amp; Coatings</span>
            </div>
          </div>
        </div>

        {/* Middle Quick Links */}
        <div className="md:col-span-2 flex flex-col gap-5">
          <span className="text-[10px] font-bold text-gold uppercase tracking-widest block">Site Map</span>
          <nav className="flex flex-col gap-3 text-xs font-sans text-neutral-light/80">
            <button onClick={() => handleNavClick('home')} className="hover:text-gold transition-colors self-start cursor-pointer">Home</button>
            <button onClick={() => handleNavClick('solutions')} className="hover:text-gold transition-colors self-start cursor-pointer">Solutions</button>
            <button onClick={() => handleNavClick('shades')} className="hover:text-gold transition-colors self-start cursor-pointer">Colour Studio</button>
            <button onClick={() => handleNavClick('estimator')} className="hover:text-gold transition-colors self-start cursor-pointer">Project Estimator</button>
            <button onClick={() => handleNavClick('services')} className="hover:text-gold transition-colors self-start cursor-pointer">Capabilities</button>
            <button onClick={() => handleNavClick('about')} className="hover:text-gold transition-colors self-start cursor-pointer">About Us</button>
            <button onClick={() => handleNavClick('social')} className="hover:text-gold transition-colors self-start cursor-pointer">Social Showcase</button>
            <button onClick={() => handleNavClick('contact')} className="hover:text-gold transition-colors self-start cursor-pointer">Contact</button>
          </nav>
        </div>

        {/* Middle Solution Areas */}
        <div className="md:col-span-3 flex flex-col gap-5">
          <span className="text-[10px] font-bold text-gold uppercase tracking-widest block">Solution Areas</span>
          <nav className="flex flex-col gap-3 text-xs font-sans text-neutral-light/80">
            <button onClick={() => handleNavClick('solutions')} className="hover:text-gold transition-colors self-start cursor-pointer text-left">Residential Interiors &amp; Exteriors</button>
            <button onClick={() => handleNavClick('solutions')} className="hover:text-gold transition-colors self-start cursor-pointer text-left">Commercial &amp; Corporate Spaces</button>
            <button onClick={() => handleNavClick('solutions')} className="hover:text-gold transition-colors self-start cursor-pointer text-left">Industrial Floor &amp; Protective Coatings</button>
            <button onClick={() => handleNavClick('solutions')} className="hover:text-gold transition-colors self-start cursor-pointer text-left">Waterproofing &amp; Surface Treatment</button>
            <button onClick={() => handleNavClick('solutions')} className="hover:text-gold transition-colors self-start cursor-pointer text-left">Decorative Textures &amp; Luxury Finishes</button>
            <button onClick={() => handleNavClick('solutions')} className="hover:text-gold transition-colors self-start cursor-pointer text-left">Wood &amp; Metal Coatings</button>
          </nav>
        </div>

        {/* Right Details */}
        <div className="md:col-span-3 flex flex-col gap-5">
          <span className="text-[10px] font-bold text-gold uppercase tracking-widest block">Direct Contacts</span>
          <div className="flex flex-col gap-3 text-xs font-sans text-neutral-light/80">
            <div className="flex gap-2.5 items-start">
              <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <span>Hinkal Ring Road Junction, near Outer Ring Road, Mysuru &mdash; 570017</span>
            </div>
            
            <div className="flex flex-col gap-2 pt-1 border-t border-white/10">
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

            <div className="flex gap-2.5 items-center pt-1 border-t border-white/10">
              <Mail className="w-4 h-4 text-gold flex-shrink-0" />
              <a href="mailto:nimimys@gmail.com" className="hover:text-gold transition-colors">nimimys@gmail.com</a>
            </div>

            <div className="flex gap-2.5 items-center">
              <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <a href="https://wa.me/919448084351" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Chat on WhatsApp</a>
            </div>
            <div className="flex gap-2.5 items-center">
              <svg className="w-4 h-4 text-pink-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              <a href="https://www.instagram.com/nimishamba.paints/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">@nimishamba.paints</a>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Area */}
      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-sans text-neutral-light/50 uppercase tracking-widest">
        <span>&copy; {currentYear} Sri Nimishamba Paints &amp; Plywoods. All Rights Reserved.</span>
        <div className="flex gap-6">
          <span>Authorised Berger Partner</span>
          <span>Premium Surface Solutions</span>
        </div>
      </div>
    </footer>
  );
}
