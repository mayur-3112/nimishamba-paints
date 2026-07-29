import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function InstagramReels() {
  const InstagramIcon = () => (
    <svg className="w-4 h-4 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );

  const posts = [
    {
      id: 1,
      url: 'https://www.instagram.com/nimishamba.paints/',
      image: '/images/shop_interior.png',
      title: 'Berger Colour World Experience Centre',
      category: 'Showroom Visit'
    },
    {
      id: 2,
      url: 'https://www.instagram.com/nimishamba.paints/',
      image: '/images/sol_texture.jpg',
      title: 'Artisanal Plaster & Decorative Textures',
      category: 'Designer Finishes'
    },
    {
      id: 3,
      url: 'https://www.instagram.com/nimishamba.paints/',
      image: '/images/painted_rooms.png',
      title: 'Residential Interior Coating Work',
      category: 'Project Showcase'
    },
    {
      id: 4,
      url: 'https://www.instagram.com/nimishamba.paints/',
      image: '/images/sol_office_interior.png',
      title: 'Corporate Office Accent Wall Specification',
      category: 'Commercial Solution'
    },
    {
      id: 5,
      url: 'https://www.instagram.com/nimishamba.paints/',
      image: '/images/sol_epoxy_floor.png',
      title: 'High-Gloss Industrial Epoxy Floor Finish',
      category: 'Industrial Coating'
    },
    {
      id: 6,
      url: 'https://www.instagram.com/nimishamba.paints/',
      image: '/images/hero_banner.png',
      title: 'Exterior Facade WeatherShield System',
      category: 'Exterior Protection'
    }
  ];

  return (
    <div className="animate-fade-in pt-24 pb-32 bg-neutral-soft min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-neutral-light pb-12">
          <div className="max-w-2xl">
            <span className="flex items-center gap-2 text-[10px] font-bold text-accent uppercase tracking-widest mb-4">
              <InstagramIcon />
              Official Social Showcase
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-primary leading-tight tracking-tight">
              Follow Us on Instagram
            </h1>
            <p className="font-sans text-neutral-mid text-sm sm:text-base mt-6 max-w-lg leading-relaxed">
              Connect with <strong>@nimishamba.paints</strong> for real project updates, shade inspirations, texture application clips, and behind-the-scenes glimpses at our Mysuru studio.
            </p>
          </div>
          
          <a 
            href="https://www.instagram.com/nimishamba.paints/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-primary text-white px-7 py-4 rounded-full hover:bg-primary-light transition-all duration-300 shadow-premium"
          >
            <InstagramIcon />
            <span className="font-display text-xs font-bold uppercase tracking-wider">Follow @nimishamba.paints</span>
            <ArrowUpRight className="w-4 h-4 text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <a 
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[4/4] rounded-3xl overflow-hidden bg-white border border-neutral-light/80 shadow-sm hover:shadow-luxury transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <img 
                src={post.image} 
                alt={post.title} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />
              
              {/* Content Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                <span className="text-[9px] font-bold text-gold uppercase tracking-widest mb-1">
                  {post.category}
                </span>
                <h3 className="text-white font-display font-bold text-lg leading-tight mb-2">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 text-neutral-light opacity-80 text-xs font-sans group-hover:text-white transition-colors">
                  <InstagramIcon />
                  <span className="text-[11px] font-semibold">View post on Instagram</span>
                  <ArrowUpRight className="w-3 h-3 text-gold ml-auto" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Direct Link Banner */}
        <div className="mt-16 bg-white border border-neutral-light rounded-3xl p-8 text-center flex flex-col items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center">
            <InstagramIcon />
          </div>
          <div>
            <h3 className="font-display font-bold text-primary text-xl">Visit @nimishamba.paints on Instagram</h3>
            <p className="font-sans text-neutral-mid text-xs mt-1 max-w-md mx-auto leading-relaxed">
              See our latest post uploads, customer feedback, store walkthroughs, and decorative texture samples directly on our official Instagram page.
            </p>
          </div>
          <a
            href="https://www.instagram.com/nimishamba.paints/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 bg-primary text-white font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-primary-light transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>Open @nimishamba.paints</span>
            <ArrowUpRight className="w-4 h-4 text-gold" />
          </a>
        </div>

      </div>
    </div>
  );
}
