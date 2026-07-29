import React from 'react';
import { Play, Instagram, ArrowUpRight } from 'lucide-react';

export default function InstagramReels() {
  // We use high-quality proxy images instead of heavy iframes to maintain >95 Performance score.
  // Clicking opens the actual Instagram reel.
  const reels = [
    {
      id: 1,
      url: 'https://www.instagram.com/nimishamba.paints/',
      thumbnail: '/images/living_room_visualizer.png',
      title: 'Trending Living Room Shades for 2026',
      views: '12.4K'
    },
    {
      id: 2,
      url: 'https://www.instagram.com/nimishamba.paints/',
      thumbnail: '/images/hero_minimal.png',
      title: 'Minimalist Textures: Microcement',
      views: '8.9K'
    },
    {
      id: 3,
      url: 'https://www.instagram.com/nimishamba.paints/',
      thumbnail: '/images/color_wall.png',
      title: 'Behind the Scenes: Colour Mixing Lab',
      views: '21.1K'
    },
    {
      id: 4,
      url: 'https://www.instagram.com/nimishamba.paints/',
      thumbnail: '/images/bedroom_visualizer.png',
      title: 'Master Bedroom Makeover Ideas',
      views: '15.3K'
    },
    {
      id: 5,
      url: 'https://www.instagram.com/nimishamba.paints/',
      thumbnail: '/images/painted_rooms.png',
      title: 'Client Spotlight: Villa in Gokulam',
      views: '19.8K'
    },
    {
      id: 6,
      url: 'https://www.instagram.com/nimishamba.paints/',
      thumbnail: '/images/shop_interior.png',
      title: 'Experience Centre Walkthrough',
      views: '34.2K'
    }
  ];

  return (
    <div className="animate-fade-in pt-24 pb-32 bg-neutral-soft min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-neutral-light pb-12">
          <div className="max-w-2xl">
            <span className="flex items-center gap-2 text-[10px] font-bold text-accent uppercase tracking-widest mb-4">
              <Instagram className="w-3.5 h-3.5" />
              Social Showcase
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-primary leading-tight tracking-tight">
              Inspiration in Motion
            </h1>
            <p className="font-sans text-neutral-mid text-sm sm:text-base mt-6 max-w-md leading-relaxed">
              Explore our curated feed of project walkthroughs, texture demonstrations, and behind-the-scenes glimpses at the Nimishamba studio.
            </p>
          </div>
          <a 
            href="https://www.instagram.com/nimishamba.paints/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-white border border-neutral-light px-6 py-4 rounded-full hover:border-primary transition-all duration-300 shadow-sm hover:shadow-premium"
          >
            <span className="font-display text-xs font-bold text-primary uppercase tracking-wider group-hover:text-accent transition-colors">Follow @nimishamba.paints</span>
            <ArrowUpRight className="w-4 h-4 text-neutral-mid group-hover:text-accent transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reels.map((reel) => (
            <a 
              key={reel.id}
              href={reel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-light/50 transform transition-transform duration-500 hover:-translate-y-2 shadow-sm hover:shadow-2xl"
              aria-label={`Watch reel: ${reel.title}`}
            >
              {/* Thumbnail Image */}
              <img 
                src={reel.thumbnail} 
                alt={reel.title} 
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-95 group-hover:scale-100">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                  <Play className="w-6 h-6 text-white ml-1" fill="white" />
                </div>
              </div>
              
              {/* Content Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                <div className="flex items-center gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <Play className="w-3.5 h-3.5 text-white" />
                  <span className="text-white font-sans text-xs font-semibold">{reel.views} views</span>
                </div>
                <h3 className="text-white font-display font-bold text-xl leading-tight">
                  {reel.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
