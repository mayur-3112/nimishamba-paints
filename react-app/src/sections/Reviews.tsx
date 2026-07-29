import { Star, Quote } from 'lucide-react';
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
      className="w-11 h-11 flex-shrink-0 rounded-full bg-primary flex items-center justify-center"
    >
      <span className="font-display font-bold text-white text-sm">{initials}</span>
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
            i < rating ? 'text-gold fill-gold' : 'text-neutral-light fill-neutral-light'
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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-2">
              Client Reviews
            </span>
            <h2 className="font-display font-bold text-primary text-3xl sm:text-4xl leading-tight">
              What our clients and project partners say
            </h2>
            <p className="font-sans text-neutral-mid text-sm mt-3 leading-relaxed">
              Verified reviews from homeowners, contractors, and architects who trust Nimishamba for their surface coating projects.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-neutral-soft border border-neutral-light rounded-2xl px-5 py-4 flex-shrink-0">
            <div className="flex flex-col">
              <Stars rating={5} />
              <span className="font-sans text-[10px] font-semibold text-neutral-mid mt-1.5">
                {REVIEWS.length} verified reviews
              </span>
            </div>
          </div>
        </div>

        {/* Scroll-snap carousel: a plain overflow list, so it stays keyboard and
            touch scrollable without carousel JS. */}
        <ul className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {REVIEWS.map((review) => (
            <li
              key={review.name}
              className="snap-start flex-shrink-0 w-[88%] sm:w-[420px] bg-neutral-soft border border-neutral-light rounded-3xl p-7 flex flex-col hover:shadow-luxury hover:-translate-y-0.5 transition-all duration-300"
            >
              <Quote className="w-7 h-7 text-gold/40 mb-4" aria-hidden="true" />
              <blockquote className="font-sans text-neutral-mid text-sm leading-relaxed flex-grow">
                {review.comment}
              </blockquote>
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-neutral-light">
                <Avatar name={review.name} />
                <div className="min-w-0">
                  <p className="font-display font-bold text-primary text-sm truncate">
                    {review.name}
                  </p>
                  <p className="font-sans text-[10px] text-neutral-mid truncate">{review.role}</p>
                </div>
                <div className="ml-auto flex flex-col items-end gap-1 flex-shrink-0">
                  <Stars rating={review.rating} />
                  <span className="font-sans text-[10px] text-neutral-mid">{review.date}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
