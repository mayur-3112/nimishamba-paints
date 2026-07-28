import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';

export default function PaintCalculator() {
  const [projectType, setProjectType] = useState<'interior' | 'exterior'>('interior');
  const [carpetArea, setCarpetArea] = useState<number>(1000);
  const [qualityTier, setQualityTier] = useState<'luxury' | 'premium' | 'economy'>('premium');

  const [results, setResults] = useState({
    totalCostMin: 0,
    totalCostMax: 0,
    wallArea: 0,
    paintLitres: 0,
    primerLitres: 0,
    puttyKgs: 0
  });

  // Calculate results on input change
  useEffect(() => {
    // Standard multipliers:
    // Wall area is roughly 3x the carpet area
    const wallArea = Math.round(carpetArea * 3);
    
    // Coverage multipliers:
    // Paint: 1 Litre covers ~60 sq ft (2 coats)
    // Primer: 1 Litre covers ~100 sq ft (1 coat)
    // Putty: 1 Kg covers ~15 sq ft (2 coats)
    const paintLitres = Math.round(wallArea / 60);
    const primerLitres = Math.round(wallArea / 100);
    const puttyKgs = projectType === 'interior' ? Math.round(wallArea / 15) : 0;

    // Rates per sq ft based on quality class (includes labour estimation):
    // Economy: ₹12 - ₹18
    // Premium: ₹22 - ₹30
    // Luxury: ₹38 - ₹55
    let rateMin = 22;
    let rateMax = 30;

    if (qualityTier === 'economy') {
      rateMin = 12;
      rateMax = 18;
    } else if (qualityTier === 'luxury') {
      rateMin = 38;
      rateMax = 55;
    }

    // Exterior doesn't need putty, adjust price slightly down or keep base
    const costMultiplier = projectType === 'exterior' ? 0.9 : 1.0;

    const totalCostMin = Math.round(wallArea * rateMin * costMultiplier);
    const totalCostMax = Math.round(wallArea * rateMax * costMultiplier);

    setResults({
      totalCostMin,
      totalCostMax,
      wallArea,
      paintLitres,
      primerLitres,
      puttyKgs
    });
  }, [projectType, carpetArea, qualityTier]);

  const handleWhatsAppEnquiry = () => {
    const msg = `Hi Nimishamba Paints! 👋

I ran a material calculation on your website:
• Project: ${projectType.toUpperCase()}
• Carpet Area: ${carpetArea} sq ft
• Quality Tier: ${qualityTier.toUpperCase()}

Estimations:
• Estimated Budget: ₹${results.totalCostMin.toLocaleString('en-IN')} - ₹${results.totalCostMax.toLocaleString('en-IN')}
• Wall Area: ~${results.wallArea} sq ft
• Paint Required: ~${results.paintLitres} Litres
• Primer Required: ~${results.primerLitres} Litres
${results.puttyKgs > 0 ? `• Putty Required: ~${results.puttyKgs} Kgs` : ''}

Please share a detailed quote and product availability!`;

    const url = 'https://wa.me/919448084351?text=' + encodeURIComponent(msg);
    window.open(url, '_blank');
  };

  return (
    <section className="py-24 bg-neutral-soft border-b border-neutral-light" id="calculatorCard">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-left mb-16">
          <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-4">Volume II / Yields</span>
          <h2 className="font-display font-black text-primary text-4xl sm:text-5xl uppercase leading-tight">
            The Material Yield Calculator
          </h2>
        </div>

        {/* Narrative Interactive Form */}
        <div className="bg-white border border-neutral-light rounded-3xl p-8 md:p-12 shadow-sm text-left mb-12">
          <p className="font-display text-primary text-xl sm:text-3xl leading-relaxed sm:leading-loose">
            I want to paint a premium{' '}
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value as 'interior' | 'exterior')}
              className="bg-transparent border-b-2 border-accent text-accent font-bold px-1 py-0 cursor-pointer focus:outline-none focus:border-primary transition-colors inline-block"
            >
              <option value="interior" className="text-primary text-sm font-sans">Interior</option>
              <option value="exterior" className="text-primary text-sm font-sans">Exterior</option>
            </select>{' '}
            space. My estimated carpet/floor area is{' '}
            <input
              type="number"
              value={carpetArea || ''}
              min="100"
              max="20000"
              onChange={(e) => setCarpetArea(Math.max(0, parseInt(e.target.value) || 0))}
              className="bg-transparent border-b-2 border-accent text-accent font-bold w-24 text-center py-0 focus:outline-none focus:border-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />{' '}
            square feet. I prefer to use{' '}
            <select
              value={qualityTier}
              onChange={(e) => setQualityTier(e.target.value as 'luxury' | 'premium' | 'economy')}
              className="bg-transparent border-b-2 border-accent text-accent font-bold px-1 py-0 cursor-pointer focus:outline-none focus:border-primary transition-colors inline-block"
            >
              <option value="luxury" className="text-primary text-sm font-sans">Ultra-Luxury</option>
              <option value="premium" className="text-primary text-sm font-sans">Premium Sheen</option>
              <option value="economy" className="text-primary text-sm font-sans">Economy Matte</option>
            </select>{' '}
            Berger finishes.
          </p>
        </div>

        {/* Dynamic Invoice-Style Output Sheet */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch text-left">
          
          {/* Estimated Cost Panel (Left) */}
          <div className="md:col-span-5 bg-primary rounded-3xl p-8 text-white flex flex-col justify-between shadow-luxury">
            <div>
              <span className="text-[9px] font-bold text-neutral-light opacity-50 uppercase tracking-widest block mb-2">Estimated Budget Range</span>
              <h3 className="font-display font-extrabold text-gold text-3xl sm:text-4xl leading-tight">
                ₹{results.totalCostMin.toLocaleString('en-IN')} - ₹{results.totalCostMax.toLocaleString('en-IN')}
              </h3>
              <p className="font-sans text-neutral-light opacity-60 text-[10px] mt-2 leading-relaxed">
                Includes material tinting costs and standard painting contractor labor charges in Mysuru.
              </p>
            </div>

            <button
              onClick={handleWhatsAppEnquiry}
              className="mt-8 bg-white text-primary text-[10px] font-display font-bold uppercase tracking-wider w-full py-4.5 rounded-xl hover:bg-neutral-light transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <MessageSquare className="w-4 h-4 text-accent" />
              <span>Enquire Pricing on WhatsApp</span>
            </button>
          </div>

          {/* Material Yield Table (Right) */}
          <div className="md:col-span-7 bg-white border border-neutral-light rounded-3xl p-8 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-bold text-neutral-mid uppercase tracking-widest block mb-6">Material Quantities Required</span>
              
              <div className="flex flex-col gap-4 font-sans text-xs">
                
                {/* Row 1 */}
                <div className="flex justify-between border-b border-neutral-light pb-3">
                  <span className="text-neutral-mid">Estimated Wall Surface:</span>
                  <strong className="text-primary font-bold">~ {results.wallArea.toLocaleString('en-IN')} sq ft</strong>
                </div>

                {/* Row 2 */}
                <div className="flex justify-between border-b border-neutral-light pb-3">
                  <span className="text-neutral-mid">Berger Base Paint:</span>
                  <strong className="text-primary font-bold">~ {results.paintLitres} Litres</strong>
                </div>

                {/* Row 3 */}
                <div className="flex justify-between border-b border-neutral-light pb-3">
                  <span className="text-neutral-mid">Berger Undercoat Primer:</span>
                  <strong className="text-primary font-bold">~ {results.primerLitres} Litres</strong>
                </div>

                {/* Row 4 */}
                {results.puttyKgs > 0 && (
                  <div className="flex justify-between border-b border-neutral-light pb-3">
                    <span className="text-neutral-mid">Bison Acrylic Wall Putty:</span>
                    <strong className="text-primary font-bold">~ {results.puttyKgs} Kgs</strong>
                  </div>
                )}

              </div>
            </div>

            <div className="flex gap-2 items-center bg-neutral-soft p-3 rounded-xl border border-neutral-light mt-6">
              <span className="text-[10px] text-neutral-mid font-sans leading-normal">
                Yield calculations are based on dual coat coverage indexes under standard dry wall moisture ratings.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
