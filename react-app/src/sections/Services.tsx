import React from 'react';
import * as Icons from 'lucide-react';
import { SERVICES } from '../data/staticData';

export default function Services() {
  return (
    <section className="py-24 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-2">Showroom Assistance</span>
          <h2 className="font-display font-bold text-primary text-3xl sm:text-4xl">
            Professional Support Services
          </h2>
          <p className="font-sans text-neutral-mid text-sm mt-3">
            We do more than just sell paint cans. Our showroom specialists assist you throughout the entire planning, selecting, and application lifecycle.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((srv, i) => {
            // Dynamically resolve icon from Lucide
            const IconComponent = (Icons as any)[srv.iconName] || Icons.HelpCircle;
            
            return (
              <div 
                key={i} 
                className="bg-neutral-soft rounded-2xl p-8 border border-neutral-light hover:border-primary transition-all duration-300 flex flex-col text-left group hover:-translate-y-1 hover:shadow-premium"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-premium border border-neutral-light flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <IconComponent className="w-6 h-6 text-accent" />
                </div>
                
                <h3 className="font-display font-bold text-primary text-lg mb-3">
                  {srv.title}
                </h3>
                
                <p className="font-sans text-neutral-mid text-xs leading-relaxed">
                  {srv.description}
                </p>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
