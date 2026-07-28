import React from 'react';

export default function Brands() {
  const brands = [
    { name: "Berger Paints", subtitle: "Authorized Platinum Partner" },
    { name: "Asian Paints", subtitle: "Premium Décor Partner" },
    { name: "Nerolac Paints", subtitle: "Genuine Retailer Partner" },
    { name: "Indigo Paints", subtitle: "Specialized Finish Partner" },
    { name: "Dr. Fixit", subtitle: "Waterproofing Expert Partner" }
  ];

  return (
    <section className="py-16 bg-neutral-soft border-y border-neutral-light">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-display text-[10px] font-bold uppercase tracking-wider text-neutral-mid text-center mb-8">
          Authorized Showroom Partner for India's Leading Coating Manufacturers
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center">
          {brands.map((b, i) => (
            <div 
              key={i} 
              className="bg-white border border-neutral-light rounded-2xl p-6 shadow-sm hover:shadow-premium hover:border-primary transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center aspect-[16/10]"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                  <span className="font-display font-bold text-white text-xs">{b.name[0]}</span>
                </div>
                <span className="font-display font-extrabold text-primary text-base tracking-tight">{b.name}</span>
              </div>
              <span className="font-sans text-[8px] font-bold text-accent uppercase tracking-widest leading-none">{b.subtitle}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
