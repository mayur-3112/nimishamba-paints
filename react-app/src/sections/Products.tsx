import React, { useState } from 'react';
import { PRODUCTS, Product } from '../data/staticData';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface ProductsProps {
  setCurrentTab: (tab: string) => void;
  openQuoteModal: (category?: string) => void;
}

export default function Products({ setCurrentTab, openQuoteModal }: ProductsProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const categories = ['All', 'Interior Paint', 'Exterior Paint', 'Waterproofing', 'Wood Finishes', 'Primers & Putty', 'Texture Paints'];

  const filteredProducts = activeFilter === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeFilter);

  return (
    <section className="py-24 bg-white" id="products">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-left max-w-xl">
            <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-2">Our Catalogue</span>
            <h2 className="font-display font-bold text-primary text-3xl sm:text-4xl">
              Comprehensive Coating Solutions
            </h2>
            <p className="font-sans text-neutral-mid text-sm mt-3">
              We stock authentic products directly from factory warehouses, offering maximum durability for domestic and architectural applications.
            </p>
          </div>
          
          {/* Quick Calculators CTA */}
          <button 
            onClick={() => setCurrentTab('estimator')}
            className="inline-flex items-center gap-2 text-accent font-display text-sm font-bold uppercase tracking-wider hover:translate-x-1.5 transition-transform mt-4 md:mt-0"
          >
            <span>Estimate Materials Needed</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none border-b border-neutral-light">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`font-display text-xs font-bold uppercase tracking-wider px-5 py-3.5 rounded-lg border whitespace-nowrap transition-all ${
                activeFilter === cat
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-neutral-soft text-neutral-mid border-neutral-light hover:border-neutral-mid'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-neutral-soft rounded-2xl overflow-hidden border border-neutral-light hover:border-primary transition-all duration-300 flex flex-col group hover:-translate-y-1 hover:shadow-premium"
            >
              <div className="aspect-[4/3] overflow-hidden relative bg-neutral-light">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white border-opacity-40">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{product.category}</span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow text-left">
                <h3 className="font-display font-bold text-primary text-lg mb-2">
                  {product.name}
                </h3>
                <p className="font-sans text-neutral-mid text-xs leading-relaxed mb-6 flex-grow">
                  {product.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 border-t border-neutral-light pt-5 mt-auto">
                  <button
                    onClick={() => openQuoteModal(product.category)}
                    className="bg-primary text-white font-display text-xs font-bold uppercase tracking-wider py-3 rounded-lg hover:bg-primary-light transition-colors text-center"
                  >
                    Get Quote
                  </button>
                  <button
                    onClick={() => setCurrentTab('shades')}
                    className="bg-white text-primary border border-neutral-light font-display text-xs font-bold uppercase tracking-wider py-3 rounded-lg hover:border-primary hover:text-accent transition-all text-center"
                  >
                    Select Colors
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
