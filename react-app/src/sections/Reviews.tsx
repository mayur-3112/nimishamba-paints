import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { REVIEWS } from '../data/staticData';

/** Initials avatar — avoids inventing customer photographs for real, named people. */
function Avatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <div
      aria-hidden="true"
      className="w-10 h-10 flex-shrink-0 rounded-full bg-primary flex items-center justify-center shadow-sm"
    >
      <span className="font-display font-bold text-white text-xs">{initials}</span>
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-light fill-neutral-light'
          }`}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-white border-b border-neutral-light">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header with Google Badge */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 text-left">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full mb-3">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span className="font-sans text-[10px] font-bold text-amber-900 uppercase tracking-wider">
                Google Customer Reviews &middot; 4.9 ★★★★★
              </span>
            </div>
            <h2 className="font-display font-bold text-primary text-3xl sm:text-4xl leading-tight">
              Trusted by Homeowners, Architects &amp; Builders Across Mysuru
            </h2>
            <p className="font-sans text-neutral-mid text-sm mt-3 leading-relaxed">
              Read authentic feedback directly from our verified Google reviews.
            </p>
          </div>

          <a
            href="https://maps.google.com/?q=Sri+Nimishamba+Paints+and+Plywoods+Mysore"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-neutral-soft border border-neutral-light rounded-2xl px-5 py-3.5 hover:border-primary transition-all flex-shrink-0 group"
          >
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-primary text-base">4.9</span>
                <Stars rating={5} />
              </div>
              <span className="font-sans text-[10px] font-semibold text-neutral-mid mt-0.5 group-hover:text-primary transition-colors">
                View all reviews on Google Maps &rarr;
              </span>
            </div>
          </a>
        </div>

        {/* Scroll-snap horizontal carousel */}
        <ul className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 -mx-6 px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {REVIEWS.map((review) => (
            <li
              key={review.name}
              className="snap-start flex-shrink-0 w-[90%] sm:w-[400px] bg-neutral-soft border border-neutral-light rounded-3xl p-7 flex flex-col hover:shadow-luxury hover:-translate-y-0.5 transition-all duration-300 text-left relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <Quote className="w-7 h-7 text-[#E31959]/20" aria-hidden="true" />
                <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-neutral-light text-[9px] font-bold text-emerald-700 shadow-2xs">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  Verified Google Review
                </span>
              </div>

              <blockquote className="font-sans text-neutral-mid text-xs sm:text-sm leading-relaxed flex-grow">
                "{review.comment}"
              </blockquote>

              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-neutral-light/80">
                <Avatar name={review.name} />
                <div className="min-w-0 flex-1">
                  <p className="font-display font-bold text-primary text-xs truncate">
                    {review.name}
                  </p>
                  <p className="font-sans text-[10px] text-neutral-mid truncate">{review.role}</p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <Stars rating={review.rating} />
                  <span className="font-sans text-[9px] text-neutral-mid">{review.date}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
