import React from 'react';
import { Award, CheckCircle, Users, Sparkles, Star } from 'lucide-react';
import { REVIEWS } from '../data/staticData';

export default function About() {
  return (
    <div id="pg-about" className="animate-fade-in text-left">
      {/* Inner Hero Header */}
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold bg-opacity-10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="text-[10px] font-bold text-gold uppercase tracking-widest block mb-3">Our Legacy</span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl leading-tight max-w-2xl">
            Trusted since 2005.<br />
            <span className="text-gold-light">Built on quality.</span>
          </h1>
          <p className="font-sans text-neutral-light opacity-60 text-sm sm:text-base max-w-lg mt-4 leading-relaxed">
            For over two decades, we have been the primary retail partner for premium interior decor and paint supplies on Hinkal Ring Road, Mysuru.
          </p>
        </div>
      </div>

      {/* Detail Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Text Column (Left) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-[10px] font-bold text-accent uppercase tracking-wider block">Our Core Principles</span>
            <h2 className="font-display font-bold text-primary text-3xl">
              Mysuru’s Premium Paint Experience Centre
            </h2>
            <p className="font-sans text-neutral-mid text-sm leading-relaxed">
              Founded in 2005, Sri Nimishamba Paints &amp; Plywoods has grown from a local retail supplier into a high-end experience centre. We specialize in computer color mixing tinting systems, texture wall designs, structural waterproofing diagnostics, and premium wood/metal lacquer supplies.
            </p>
            <p className="font-sans text-neutral-mid text-sm leading-relaxed">
              We work directly with India’s leading paint manufacturers, primarily holding the Platinum Dealer authorization from **Berger Paints**. This direct relation ensures our stock is always genuine, fresh, and free from retail shelf-life compromises.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-neutral-soft border border-neutral-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-primary text-sm mb-1">Contractor Relations</h4>
                  <p className="font-sans text-neutral-mid text-xs leading-normal">Specialized pricing structures, trade accounts, and logistics support for local decorators.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-neutral-soft border border-neutral-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-primary text-sm mb-1">Designer Collaborations</h4>
                  <p className="font-sans text-neutral-mid text-xs leading-normal">Assisting architects and interior decorators with customized shade mixing and swatch sample tinting.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Column (Right) */}
          <div className="lg:col-span-5 bg-neutral-soft rounded-3xl p-8 border border-neutral-light shadow-sm flex flex-col gap-8">
            <div className="border-b border-neutral-light pb-6 flex items-center justify-between">
              <div>
                <span className="font-display font-extrabold text-primary text-4xl">20+</span>
                <span className="font-sans text-[10px] font-bold text-neutral-mid uppercase tracking-wider block mt-1">Years Experience</span>
              </div>
              <div>
                <span className="font-display font-extrabold text-primary text-4xl">5,000+</span>
                <span className="font-sans text-[10px] font-bold text-neutral-mid uppercase tracking-wider block mt-1">Happy Clients</span>
              </div>
            </div>
            
            <div className="border-b border-neutral-light pb-6 flex items-center justify-between">
              <div>
                <span className="font-display font-extrabold text-primary text-4xl">2,500+</span>
                <span className="font-sans text-[10px] font-bold text-neutral-mid uppercase tracking-wider block mt-1">Computer Shades</span>
              </div>
              <div>
                <span className="font-display font-extrabold text-primary text-4xl">100%</span>
                <span className="font-sans text-[10px] font-bold text-neutral-mid uppercase tracking-wider block mt-1">Genuine Products</span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-neutral-light">
              <Award className="w-10 h-10 text-gold flex-shrink-0" />
              <div className="flex flex-col leading-snug">
                <strong className="font-display text-primary text-sm font-bold">Berger Platinum Showroom</strong>
                <span className="font-sans text-[10px] text-neutral-mid leading-relaxed">Certified experience store under manufacturer auditing protocols.</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Customer Reviews Slider */}
      <section className="py-24 bg-neutral-soft border-t border-neutral-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-2">Testimonials</span>
            <h2 className="font-display font-bold text-primary text-3xl sm:text-4xl">
              What Our Customers Say
            </h2>
            <p className="font-sans text-neutral-mid text-sm mt-3">
              We are proud to serve homeowners, contractors, and builders. Read reviews from verified showroom visitors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((rev, i) => (
              <div 
                key={i}
                className="bg-white rounded-2xl p-8 border border-neutral-light shadow-sm flex flex-col justify-between hover:border-primary transition-colors duration-300"
              >
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(rev.rating)].map((_, rIdx) => (
                      <Star key={rIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="font-sans text-neutral-dark italic text-xs leading-relaxed mb-6">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="flex flex-col border-t border-neutral-light pt-4 leading-tight">
                  <strong className="font-display text-primary text-sm font-semibold">{rev.name}</strong>
                  <span className="font-sans text-neutral-mid text-[10px] uppercase tracking-wider mt-1">{rev.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
