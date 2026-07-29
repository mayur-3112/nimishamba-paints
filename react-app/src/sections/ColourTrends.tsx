import React, { useState, useEffect } from 'react';
import { Shade } from '../utils/colorUtils';
import { Search, Grid, Compass, Sparkles } from 'lucide-react';

interface ColourTrendsProps {
  allShades: Shade[];
  selectedShade: Shade | null;
  onSelectShade: (shade: Shade) => void;
}

export default function ColourTrends({ allShades, selectedShade, onSelectShade }: ColourTrendsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [shownCount, setShownCount] = useState(120);

  const categories = ['All', 'Light', 'Pastel', 'Warm', 'Cool', 'Vibrant', 'Dark', 'Neutrals', 'Earthtones'];

  // Reset pagination on search/filter change
  useEffect(() => {
    setShownCount(120);
  }, [searchQuery, activeCategory]);

  const filteredShades = allShades.filter(shade => {
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query || 
      shade.name.toLowerCase().includes(query) || 
      shade.code.toLowerCase().includes(query);
    
    const matchesCategory = activeCategory === 'All' || 
      (shade.category && shade.category === activeCategory);

    return matchesQuery && matchesCategory;
  });

  const visibleShades = filteredShades.slice(0, shownCount);

  const handleShadeSelect = (shade: Shade) => {
    onSelectShade(shade);
    
    // Smooth scroll back to visualizer
    const visualizerEl = document.getElementById('visualizerCard');
    if (visualizerEl) {
      visualizerEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <section className="py-24 bg-white" id="shades">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left max-w-xl">
            <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-2">Berger Color Explorer</span>
            <h2 className="font-display font-bold text-primary text-3xl sm:text-4xl">
              Find Your Perfect Colour
            </h2>
            <p className="font-sans text-neutral-mid text-sm mt-3">
              Explore 2,500+ shades in our automated mixing library. Click any shade card to see it applied directly onto the rooms in the visualizer.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:max-w-xs flex-shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-neutral-mid" />
            </div>
            <input
              type="text"
              placeholder="Search name or shade code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-soft border border-neutral-light focus:border-primary focus:bg-white rounded-xl py-3.5 pl-10 pr-4 font-sans text-sm font-semibold text-primary outline-none transition-all"
            />
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-neutral-light">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-display text-xs font-bold uppercase tracking-wider px-5 py-3.5 rounded-lg border whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-neutral-soft text-neutral-mid border-neutral-light hover:border-neutral-mid'
              }`}
            >
              {cat} Shades
            </button>
          ))}
        </div>

        {/* Meta Results Text */}
        <div className="text-left font-sans text-[10px] text-neutral-mid font-semibold uppercase tracking-wider mb-6">
          Showing {visibleShades.length} of {filteredShades.length} matched shades
        </div>

        {/* Swatch Tiles Grid */}
        {filteredShades.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {visibleShades.map((shade) => {
              const isSelected = selectedShade?.code === shade.code;
              return (
                <div
                  key={shade.code}
                  onClick={() => handleShadeSelect(shade)}
                  className={`bg-neutral-soft rounded-2xl p-3 border cursor-pointer transition-all duration-200 flex flex-col items-stretch hover:shadow-premium hover:-translate-y-0.5 group text-left ${
                    isSelected
                      ? 'border-accent bg-white shadow-premium ring-2 ring-accent ring-opacity-25'
                      : 'border-neutral-light hover:border-neutral-mid'
                  }`}
                >
                  <div 
                    className="w-full aspect-square rounded-xl border border-black border-opacity-5 shadow-inner mb-3 group-hover:scale-[1.02] transition-transform"
                    style={{ background: shade.hex }}
                  />
                  <div className="flex flex-col gap-0.5 leading-tight">
                    <span className="font-sans text-[9px] font-bold text-neutral-mid uppercase tracking-wide">{shade.code}</span>
                    <strong className="font-display text-primary text-xs font-semibold truncate">{shade.name}</strong>
                    {shade.category && (
                      <span className="font-sans text-[8px] font-bold text-accent uppercase tracking-wider mt-1">{shade.category}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center text-neutral-mid border border-dashed border-neutral-light rounded-3xl bg-neutral-soft">
            <Compass className="w-8 h-8 text-neutral-mid mx-auto mb-3 animate-spin" />
            <p className="font-display font-semibold text-primary">No matching shades found</p>
            <p className="font-sans text-xs mt-1">Try entering another keyword or clearing search filters.</p>
          </div>
        )}

        {/* Load More CTA */}
        {filteredShades.length > visibleShades.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShownCount(prev => prev + 120)}
              className="bg-white border border-neutral-light text-primary font-display text-xs font-bold uppercase tracking-wider px-8 py-4.5 rounded-xl hover:border-primary hover:text-accent shadow-sm transition-all"
            >
              Load More Shades
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
