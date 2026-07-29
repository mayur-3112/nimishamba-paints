import { Award, CheckCircle, Cpu, ShieldCheck } from 'lucide-react';

const CREDENTIALS = [
  { icon: CheckCircle, tint: 'text-emerald-500', label: '100% Genuine Coating Systems' },
  { icon: Cpu, tint: 'text-accent', label: 'Computerised Precision Tinting' },
  { icon: Award, tint: 'text-gold', label: 'Platinum Certified Partner' },
];

export default function Brands() {
  return (
    <section id="brands" className="py-16 bg-neutral-soft border-y border-neutral-light text-left">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white border border-neutral-light rounded-3xl overflow-hidden shadow-sm grid md:grid-cols-2">
          
          {/* Showroom Counter (Real Storefront Photo) */}
          <div className="relative min-h-[280px] md:min-h-full">
            <img
              src="/images/gallery_google_1.png"
              alt="Sri Nimishamba Paints & Plywoods Storefront in Hinkal, Mysuru"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md border border-neutral-light rounded-full px-4 py-2 font-sans text-[10px] font-extrabold uppercase tracking-widest text-primary shadow-xs">
              Berger Colour World &middot; Hinkal
            </span>
          </div>

          {/* Dealership Credentials */}
          <div className="p-8 md:p-12 flex flex-col justify-center text-left">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/images/logo-mark.png"
                alt="Berger Paints Logo Mark"
                width={48}
                height={48}
                loading="lazy"
                className="w-12 h-12 object-contain"
              />
              <div className="inline-flex items-center gap-2 bg-accent/5 px-3 py-1 rounded-full border border-accent/10">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span className="font-display text-[9px] font-bold uppercase tracking-wider text-accent">
                  Authorised Surface Solutions Partner
                </span>
              </div>
            </div>

            <h2 className="font-display font-black text-primary text-2xl md:text-3xl mb-4 leading-snug">
              Mysuru's authorised Berger Colour World experience centre
            </h2>

            <p className="font-sans text-neutral-mid text-sm leading-relaxed mb-7">
              As an authorised Platinum partner, we stock the complete Berger range &mdash; premium interior emulsions, exterior weather barriers, HomeShield waterproofing, industrial floor coatings, and WoodKeeper finishes. Every product is sourced directly and tinted in-store from official bases.
            </p>

            <ul className="grid sm:grid-cols-2 gap-4 border-t border-neutral-light pt-6">
              {CREDENTIALS.map(({ icon: Icon, tint, label }) => (
                <li key={label} className="flex items-center gap-2.5">
                  <Icon className={`w-4.5 h-4.5 flex-shrink-0 ${tint}`} />
                  <span className="font-sans text-[11px] font-bold text-primary">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
