import { useState } from 'react';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Brands from './sections/Brands';
import Products from './sections/Products';
import Projects from './sections/Projects';
import Reviews from './sections/Reviews';
import Services from './sections/Services';
import WhyChooseUs from './sections/WhyChooseUs';
import PaintInspiration from './sections/PaintInspiration';
import ColourTrends from './sections/ColourTrends';
import PaintCalculator from './sections/PaintCalculator';
import QuoteForm from './sections/QuoteForm';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import About from './sections/About';

// Load the Berger colors database statically
import colorsData from './data/berger_colors.json';
import { Shade } from './utils/colorUtils';
import { ArrowRight } from 'lucide-react';

const allShades: Shade[] = (colorsData.shades || []) as Shade[];

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedShade, setSelectedShade] = useState<Shade | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteCategory, setQuoteCategory] = useState('');

  const openQuoteModal = (category: string = '') => {
    setQuoteCategory(category);
    setIsQuoteOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteOpen(false);
    setQuoteCategory('');
  };

  const handleSelectShade = (shade: Shade) => {
    setSelectedShade(shade);
  };

  // Bento Strip sampling for Home Page
  const bentoShades = allShades
    .filter(s => s.hex && s.hex !== '#FFFFFF' && s.hex !== '#000000')
    .filter((_, idx) => idx % Math.max(1, Math.floor(allShades.length / 56)))
    .slice(0, 56);

  // Trending Grid sampling for Home Page
  const trendingShades = allShades
    .filter(s => s.hex && s.hex !== '#FFFFFF' && s.hex !== '#000000')
    .filter((_, idx) => idx % Math.max(1, Math.floor(allShades.length / 12)))
    .slice(0, 12);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Navbar Navigation */}
      <Navigation 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        openQuoteModal={() => openQuoteModal()} 
      />

      {/* Main View Routing */}
      <main id="main-content" className="flex-grow">
        {currentTab === 'home' && (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <Hero setCurrentTab={setCurrentTab} openQuoteModal={() => openQuoteModal()} />
            
            {/* Brands Section */}
            <Brands />

            {/* Curated Color Bento Strip & Trends (Home view) */}
            <section className="py-24 bg-white border-b border-neutral-light">
              <div className="max-w-7xl mx-auto px-6">
                
                <div className="text-center max-w-xl mx-auto mb-16">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-2">Colour Studio</span>
                  <h2 className="font-display font-bold text-primary text-3xl sm:text-4xl">
                    Discover Signature Combinations
                  </h2>
                  <p className="font-sans text-neutral-mid text-sm mt-3">
                    Preview our digital colour studio. Click any shade below to open the Material Mood Board and explore palettes against real interior finishes.
                  </p>
                </div>

                {/* Bento Ribbon */}
                <div className="mb-14">
                  <div className="flex flex-wrap gap-2 justify-center max-w-5xl mx-auto p-4 bg-neutral-soft rounded-3xl border border-neutral-light shadow-sm">
                    {bentoShades.map((s, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          handleSelectShade(s);
                          setCurrentTab('shades');
                        }}
                        style={{ background: s.hex }}
                        title={s.name}
                        className="w-8 h-8 rounded-lg cursor-pointer transform hover:scale-110 active:scale-95 transition-all shadow-inner"
                      />
                    ))}
                  </div>
                </div>

                {/* Curated 12 Swatches Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
                  {trendingShades.map((s, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        handleSelectShade(s);
                        setCurrentTab('shades');
                      }}
                      className="bg-neutral-soft border border-neutral-light hover:border-primary rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium flex flex-col items-center group text-center"
                    >
                      <div 
                        className="w-12 h-12 rounded-xl border shadow-inner mb-3 group-hover:scale-105 transition-transform"
                        style={{ background: s.hex }}
                      />
                      <div className="flex flex-col">
                        <span className="font-sans text-[8px] font-bold text-neutral-mid uppercase tracking-wide">{s.code}</span>
                        <strong className="font-display text-primary text-xs font-semibold mt-0.5 truncate max-w-[100px]">{s.name}</strong>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <button
                    onClick={() => setCurrentTab('shades')}
                    className="bg-primary text-white font-display text-xs font-bold uppercase tracking-wider px-8 py-4.5 rounded-xl hover:bg-primary-light transition-all shadow-premium inline-flex items-center gap-2"
                  >
                    <span>Open Material Mood Board</span>
                    <ArrowRight className="w-4 h-4 text-gold" />
                  </button>
                </div>

              </div>
            </section>

            {/* Why Choose Us Section */}
            <WhyChooseUs />

            {/* Featured Schemes with drag-to-compare shade preview */}
            <Projects openQuoteModal={openQuoteModal} />

            {/* Verified customer reviews */}
            <Reviews />

            {/* Visualizer Promo Band (Glassmorphic) */}
            <section className="py-20 bg-primary text-white text-center relative overflow-hidden border-b border-white border-opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark opacity-90 z-0" />
              <div className="max-w-4xl mx-auto px-6 relative z-10">
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest block mb-3">Onsite Consultation</span>
                <h2 className="font-display font-extrabold text-3xl sm:text-5xl leading-tight mb-4 text-white">
                  Need Professional Colour Advice?
                </h2>
                <p className="font-sans text-neutral-light opacity-65 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
                  Arrange a technical site visit today. Our color specialists will measure your wall areas, diagnose dampness, and help select exact matching shades.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={() => openQuoteModal('Bulk Retail / Contractor Orders')}
                    className="bg-white text-primary font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-neutral-light transition-all shadow-md text-center"
                  >
                    Request Site Inspection
                  </button>
                  <a
                    href="tel:+919448084351"
                    className="border border-white border-opacity-20 text-white font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-white hover:bg-opacity-5 transition-all text-center"
                  >
                    Call Showroom Desk
                  </a>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <Contact />
          </div>
        )}

        {currentTab === 'products' && (
          <Products setCurrentTab={setCurrentTab} openQuoteModal={openQuoteModal} />
        )}

        {currentTab === 'shades' && (
          <div className="animate-fade-in">
            {/* Curated Color visualizer header band */}
            <div className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gold bg-opacity-10 rounded-full filter blur-3xl pointer-events-none" />
              <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest block mb-2">Berger Colour Studio</span>
                <h1 className="font-display font-extrabold text-3xl sm:text-5xl leading-tight max-w-xl text-white">
                  The Material Mood Board Lab
                </h1>
                <p className="font-sans text-neutral-light opacity-65 text-sm max-w-md mt-4 leading-relaxed">
                  Select a shade and see how it converses with timber, stone, linen, and brass — then shift ambient light to test morning, noon, and golden hour.
                </p>
              </div>
            </div>

            {/* Material Mood Board */}
            <PaintInspiration 
              selectedShade={selectedShade} 
              onSelectShade={handleSelectShade} 
              allShades={allShades} 
            />

            {/* Interactive Shade Catalog Grid */}
            <ColourTrends 
              allShades={allShades} 
              selectedShade={selectedShade} 
              onSelectShade={handleSelectShade} 
            />
          </div>
        )}

        {currentTab === 'projects' && (
          <div className="animate-fade-in pt-24">
            <Projects openQuoteModal={openQuoteModal} />
            <Reviews />
          </div>
        )}

        {currentTab === 'estimator' && (
          <PaintCalculator />
        )}

        {currentTab === 'services' && (
          <Services />
        )}

        {currentTab === 'about' && (
          <About />
        )}

        {currentTab === 'contact' && (
          <Contact />
        )}
      </main>

      {/* Showroom Footer */}
      <Footer 
        setCurrentTab={setCurrentTab} 
        openQuoteModal={() => openQuoteModal()} 
      />

      {/* Quote Request Modal overlay */}
      {isQuoteOpen && (
        <QuoteForm 
          isModal={true} 
          onClose={closeQuoteModal} 
          prefilledCategory={quoteCategory} 
        />
      )}
    </div>
  );
}
