import React from 'react';
import { Shield, Sparkles, Truck, Users, Award, Tag } from 'lucide-react';

export default function WhyChooseUs() {
  const perks = [
    {
      title: "Authorized Platinum Dealer",
      desc: "Direct-from-factory sourcing ensures 100% genuine paints. No dilution, no shelf-life tampering.",
      icon: Shield
    },
    {
      title: "Tinting Mixing Machine",
      desc: "Computerized automatic tinting system mixes 2,500+ customized shades in minutes to match any reference swatch.",
      icon: Sparkles
    },
    {
      title: "Contractor Wholesale Rates",
      desc: "Direct wholesale pricing offers significant material savings for architects, builders, and large commercial projects.",
      icon: Tag
    },
    {
      title: "Fast Local Logistics",
      desc: "In-house prompt delivery vehicles supply paint materials directly to sites on the same day in Mysuru.",
      icon: Truck
    },
    {
      title: "20+ Years Trust in Mysuru",
      desc: "Established in 2005, serving thousands of satisfied families and contractors at our Hinkal Ring Road showroom.",
      icon: Award
    },
    {
      title: "Expert Colour Guidance",
      desc: "Technical shade selection advice. We review building substrates and lighting to recommend correct products.",
      icon: Users
    }
  ];

  return (
    <section className="py-24 bg-neutral-soft border-y border-neutral-light">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        {/* Left Banner Column */}
        <div className="lg:col-span-4 flex flex-col justify-center text-left">
          <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-2">Showroom Credibility</span>
          <h2 className="font-display font-bold text-primary text-3xl sm:text-4xl mb-4">
            Built on Trust.<br/>Driven by Quality.
          </h2>
          <p className="font-sans text-neutral-mid text-sm leading-relaxed mb-6">
            Families, interior designers, and painting contractors in Mysuru choose us for our wholesale rates, computer tinting consistency, and genuine brand certifications.
          </p>
          <div className="p-5 glass-panel rounded-2xl border-l-4 border-l-gold text-left">
            <p className="font-display italic text-primary text-sm font-semibold">
              "We maintain 100% shade match consistency across batches. If you order paint today and need a refill in 6 months, our mixing machine matches it exactly."
            </p>
            <span className="font-sans text-[10px] font-bold text-neutral-mid uppercase tracking-wider mt-3 block">&mdash; Store Tinting Specialist</span>
          </div>
        </div>

        {/* Right Perks Grid Column */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {perks.map((p, i) => {
            const Icon = p.icon;
            return (
              <div 
                key={i}
                className="bg-white rounded-2xl p-6 border border-neutral-light shadow-sm flex gap-4 text-left hover:border-primary transition-all duration-300 hover:shadow-premium"
              >
                <div className="w-10 h-10 bg-accent bg-opacity-5 rounded-lg border border-accent border-opacity-10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-display font-bold text-primary text-base mb-1.5">{p.title}</h3>
                  <p className="font-sans text-neutral-mid text-xs leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
