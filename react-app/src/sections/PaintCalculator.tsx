import React, { useState } from 'react';
import { Calculator, ArrowRight, ArrowLeft, MessageSquare, Check, Sparkles } from 'lucide-react';

export default function PaintCalculator() {
  const [step, setStep] = useState(1);
  
  // Calculator Variables
  const [projectType, setProjectType] = useState<'interior' | 'exterior' | 'woodmetal'>('interior');
  const [areaSize, setAreaSize] = useState(1200);
  const [activePreset, setActivePreset] = useState('2bhk');
  const [showCustomArea, setShowCustomArea] = useState(false);
  const [condition, setCondition] = useState<'fresh' | 'repaint'>('repaint');
  const [quality, setQuality] = useState<'economy' | 'premium' | 'luxury'>('premium');

  const [estimates, setEstimates] = useState({
    paintLtrs: 0,
    primerLtrs: 0,
    puttyKg: 0,
    minCost: 0,
    maxCost: 0
  });

  const progressSteps = [
    { label: 'Project Type', step: 1 },
    { label: 'Size & Area', step: 2 },
    { label: 'Quality Grade', step: 3 },
    { label: 'Results', step: 4 },
  ];

  const handleStepNav = (targetStep: number) => {
    if (targetStep < 1 || targetStep > 4) return;
    if (targetStep > step && targetStep > step + 1) return; // limit skip-forward
    setStep(targetStep);
  };

  const handlePresetSelect = (size: number, presetId: string) => {
    setAreaSize(size);
    setActivePreset(presetId);
    setShowCustomArea(false);
  };

  const handleCustomAreaToggle = () => {
    setActivePreset('custom');
    setShowCustomArea(true);
  };

  const calculateResults = () => {
    let paintLtrs = 0;
    let primerLtrs = 0;
    let puttyKg = 0;

    // Calculation formulas
    if (projectType === 'interior' || projectType === 'exterior') {
      paintLtrs = Math.ceil(areaSize / 65);
      primerLtrs = Math.ceil(areaSize / 130);
      if (condition === 'fresh') {
        puttyKg = Math.ceil(areaSize / 10);
        primerLtrs = Math.ceil(areaSize / 80); // higher absorption after putty
      }
    } else {
      // Wood & Metal
      paintLtrs = Math.ceil(areaSize / 75);
      primerLtrs = Math.ceil(areaSize / 110);
    }

    // Cost calculations
    let minRate = 12;
    let maxRate = 15;

    if (quality === 'premium') {
      minRate = 18;
      maxRate = 24;
    } else if (quality === 'luxury') {
      minRate = 28;
      maxRate = 36;
    }

    if (projectType === 'exterior') {
      minRate += 2;
      maxRate += 3;
    } else if (projectType === 'woodmetal') {
      minRate += 5;
      maxRate += 8;
    }

    // Repainting is cheaper (takes less putty / undercoats)
    if (condition === 'repaint') {
      minRate = Math.round(minRate * 0.75);
      maxRate = Math.round(maxRate * 0.75);
    }

    setEstimates({
      paintLtrs,
      primerLtrs,
      puttyKg,
      minCost: areaSize * minRate,
      maxCost: areaSize * maxRate
    });

    setStep(4);
  };

  const handleWhatsAppQuoteShare = () => {
    const pTypeLabel = projectType === 'interior' ? 'Interior Walls' : projectType === 'exterior' ? 'Exterior Walls' : 'Wood & Metal';
    const qualityLabel = quality === 'economy' ? 'Economy (Tractor Distemper)' : quality === 'premium' ? 'Premium (Easy Clean)' : 'Luxury (Silk/AllGuard)';
    const conditionLabel = condition === 'fresh' ? 'Fresh Painting (New)' : 'Repainting';
    
    const msg = `Hi Nimishamba Paints! 👋

I calculated a paint estimate on your website calculator:
• Project: ${pTypeLabel} (${areaSize} sq ft)
• Condition: ${conditionLabel}
• Quality: ${qualityLabel}
• Estimated Cost: ₹${estimates.minCost.toLocaleString('en-IN')} - ₹${estimates.maxCost.toLocaleString('en-IN')}

Estimated Materials Required:
- Wall Emulsion: ${estimates.paintLtrs} Liters
${estimates.primerLtrs > 0 ? `- Primer: ${estimates.primerLtrs} Liters\n` : ''}${estimates.puttyKg > 0 ? `- Putty: ${estimates.puttyKg} KG\n` : ''}
Please contact me to arrange a detailed site inspection and final quote. Thank you!`;

    const url = 'https://wa.me/919448084351?text=' + encodeURIComponent(msg);
    window.open(url, '_blank');
  };

  return (
    <section className="py-24 bg-neutral-soft border-b border-neutral-light" id="pg-estimator">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-2">Cost &amp; Material Calculator</span>
          <h2 className="font-display font-bold text-primary text-3xl sm:text-4xl">
            Paint Quantity &amp; Price Estimator
          </h2>
          <p className="font-sans text-neutral-mid text-sm mt-3">
            Estimate material liters and labor pricing for your paint project. Calculate budget ranges based on quality choices.
          </p>
        </div>

        {/* Calculator Stepper Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-neutral-light shadow-luxury p-8 sm:p-12 min-h-[480px] flex flex-col justify-between">
          
          {/* Stepper Progress Header */}
          <div className="relative flex justify-between items-center mb-10 pb-4 border-b border-neutral-light">
            {progressSteps.map((s) => (
              <button
                key={s.step}
                onClick={() => handleStepNav(s.step)}
                disabled={s.step > step && s.step > step + 1}
                className={`font-display text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors relative z-10 ${
                  step === s.step
                    ? 'text-accent'
                    : step > s.step
                    ? 'text-primary hover:text-accent cursor-pointer'
                    : 'text-neutral-mid opacity-50 cursor-default'
                }`}
              >
                {s.step}. {s.label}
                {step === s.step && (
                  <span className="absolute bottom-[-18px] left-0 right-0 h-0.5 bg-accent" />
                )}
              </button>
            ))}
          </div>

          {/* STEP 1: Project Type */}
          {step === 1 && (
            <div className="flex-grow flex flex-col justify-center animate-fade-in">
              <h3 className="font-display font-bold text-primary text-xl mb-1 text-left">What kind of painting project is this?</h3>
              <p className="font-sans text-neutral-mid text-xs text-left mb-6">Select the surface area to apply correct paint coverage coefficients.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div
                  onClick={() => setProjectType('interior')}
                  className={`bg-neutral-soft border-2 rounded-2xl p-6 cursor-pointer text-left transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between min-h-[160px] ${
                    projectType === 'interior'
                      ? 'border-primary bg-primary bg-opacity-[0.01] shadow-premium'
                      : 'border-neutral-light hover:border-primary'
                  }`}
                >
                  <span className="text-3xl mb-4 block">🏠</span>
                  <div>
                    <h4 className="font-display font-bold text-primary text-base mb-1">Interior Walls</h4>
                    <p className="font-sans text-neutral-mid text-[11px] leading-normal">Living spaces, bedrooms, ceilings, and kitchens.</p>
                  </div>
                </div>

                <div
                  onClick={() => setProjectType('exterior')}
                  className={`bg-neutral-soft border-2 rounded-2xl p-6 cursor-pointer text-left transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between min-h-[160px] ${
                    projectType === 'exterior'
                      ? 'border-primary bg-primary bg-opacity-[0.01] shadow-premium'
                      : 'border-neutral-light hover:border-primary'
                  }`}
                >
                  <span className="text-3xl mb-4 block">🏡</span>
                  <div>
                    <h4 className="font-display font-bold text-primary text-base mb-1">Exterior Walls</h4>
                    <p className="font-sans text-neutral-mid text-[11px] leading-normal">Outer facades, compound walls, and elevations.</p>
                  </div>
                </div>

                <div
                  onClick={() => setProjectType('woodmetal')}
                  className={`bg-neutral-soft border-2 rounded-2xl p-6 cursor-pointer text-left transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between min-h-[160px] ${
                    projectType === 'woodmetal'
                      ? 'border-primary bg-primary bg-opacity-[0.01] shadow-premium'
                      : 'border-neutral-light hover:border-primary'
                  }`}
                >
                  <span className="text-3xl mb-4 block">🚪</span>
                  <div>
                    <h4 className="font-display font-bold text-primary text-base mb-1">Wood &amp; Metal</h4>
                    <p className="font-sans text-neutral-mid text-[11px] leading-normal">Doors, cabinets, window grilles, and furniture coatings.</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8 border-t border-neutral-light pt-6">
                <button
                  onClick={() => setStep(2)}
                  className="bg-primary text-white font-display text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg hover:bg-primary-light transition-colors flex items-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Size & Scope */}
          {step === 2 && (
            <div className="flex-grow flex flex-col justify-center animate-fade-in text-left">
              <h3 className="font-display font-bold text-primary text-xl mb-1">How large is the space?</h3>
              <p className="font-sans text-neutral-mid text-xs mb-6">Select a preset size configuration or enter custom wall measurements.</p>
              
              <div className="flex flex-col gap-6">
                {/* Size Presets */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-neutral-mid uppercase tracking-wider">Area Presets</span>
                  <div className="flex bg-neutral-light p-1.5 rounded-xl border border-neutral-light gap-2">
                    {projectType === 'woodmetal' ? (
                      <>
                        <button
                          onClick={() => handlePresetSelect(150, 'small')}
                          className={`flex-1 py-3 text-xs font-display font-semibold uppercase tracking-wider rounded-lg transition-colors ${
                            activePreset === 'small' ? 'bg-white text-primary shadow-sm' : 'text-neutral-mid hover:text-primary'
                          }`}
                        >
                          Small (Doors/Windows)
                        </button>
                        <button
                          onClick={() => handlePresetSelect(450, 'medium')}
                          className={`flex-1 py-3 text-xs font-display font-semibold uppercase tracking-wider rounded-lg transition-colors ${
                            activePreset === 'medium' ? 'bg-white text-primary shadow-sm' : 'text-neutral-mid hover:text-primary'
                          }`}
                        >
                          Medium (Cabinets)
                        </button>
                        <button
                          onClick={() => handleCustomAreaToggle()}
                          className={`flex-1 py-3 text-xs font-display font-semibold uppercase tracking-wider rounded-lg transition-colors ${
                            activePreset === 'custom' ? 'bg-white text-primary shadow-sm' : 'text-neutral-mid hover:text-primary'
                          }`}
                        >
                          Custom Area
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handlePresetSelect(700, '1bhk')}
                          className={`flex-1 py-3 text-xs font-display font-semibold uppercase tracking-wider rounded-lg transition-colors ${
                            activePreset === '1bhk' ? 'bg-white text-primary shadow-sm' : 'text-neutral-mid hover:text-primary'
                          }`}
                        >
                          1 BHK (~700 sq ft)
                        </button>
                        <button
                          onClick={() => handlePresetSelect(1200, '2bhk')}
                          className={`flex-1 py-3 text-xs font-display font-semibold uppercase tracking-wider rounded-lg transition-colors ${
                            activePreset === '2bhk' ? 'bg-white text-primary shadow-sm' : 'text-neutral-mid hover:text-primary'
                          }`}
                        >
                          2 BHK (~1200 sq ft)
                        </button>
                        <button
                          onClick={() => handlePresetSelect(1800, '3bhk')}
                          className={`flex-1 py-3 text-xs font-display font-semibold uppercase tracking-wider rounded-lg transition-colors ${
                            activePreset === '3bhk' ? 'bg-white text-primary shadow-sm' : 'text-neutral-mid hover:text-primary'
                          }`}
                        >
                          3 BHK (~1800 sq ft)
                        </button>
                        <button
                          onClick={() => handleCustomAreaToggle()}
                          className={`flex-1 py-3 text-xs font-display font-semibold uppercase tracking-wider rounded-lg transition-colors ${
                            activePreset === 'custom' ? 'bg-white text-primary shadow-sm' : 'text-neutral-mid hover:text-primary'
                          }`}
                        >
                          Custom Area
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Custom Area Input (collapsible) */}
                {showCustomArea && (
                  <div className="bg-neutral-soft p-5 rounded-2xl border border-neutral-light animate-fade-in flex flex-col gap-2">
                    <label htmlFor="custom-area-val" className="text-[10px] font-bold text-neutral-mid uppercase tracking-wider">
                      Enter Total Wall Surface Area (sq. ft.)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        id="custom-area-val"
                        type="number"
                        min="50"
                        max="50000"
                        value={areaSize}
                        onChange={(e) => setAreaSize(parseInt(e.target.value) || 0)}
                        className="bg-white border border-neutral-light focus:border-primary rounded-xl px-4 py-3 font-sans text-sm font-semibold text-primary outline-none max-w-[200px]"
                      />
                      <span className="font-display font-bold text-primary text-sm">sq. ft.</span>
                    </div>
                    <span className="font-sans text-[10px] text-neutral-mid leading-relaxed block mt-1">
                      💡 Tip: Total wall area is roughly 3.5 to 4 times the carpet floor area.
                    </span>
                  </div>
                )}

                {/* Condition Options */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-neutral-mid uppercase tracking-wider">Project Base Condition</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => setCondition('repaint')}
                      className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${
                        condition === 'repaint'
                          ? 'border-primary bg-primary bg-opacity-[0.01] shadow-sm'
                          : 'border-neutral-light hover:border-neutral-mid'
                      }`}
                    >
                      <strong className="font-display text-primary text-sm font-bold block mb-1">Repainting Project</strong>
                      <span className="font-sans text-neutral-mid text-[10px] leading-normal block">
                        Minor touch-ups and primer followed by 2 coats of emulsion. Cost-effective budget rates.
                      </span>
                    </div>
                    <div
                      onClick={() => setCondition('fresh')}
                      className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${
                        condition === 'fresh'
                          ? 'border-primary bg-primary bg-opacity-[0.01] shadow-sm'
                          : 'border-neutral-light hover:border-neutral-mid'
                      }`}
                    >
                      <strong className="font-display text-primary text-sm font-bold block mb-1">Fresh Painting (New Build)</strong>
                      <span className="font-sans text-neutral-mid text-[10px] leading-normal block">
                        Requires double coat wall putty prep, dedicated base primer, and 2 coats of finish emulsion.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between mt-8 border-t border-neutral-light pt-6">
                <button
                  onClick={() => setStep(1)}
                  className="border border-neutral-light text-primary font-display text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg hover:border-neutral-mid transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="bg-primary text-white font-display text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg hover:bg-primary-light transition-colors flex items-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Quality Grade */}
          {step === 3 && (
            <div className="flex-grow flex flex-col justify-center animate-fade-in text-left">
              <h3 className="font-display font-bold text-primary text-xl mb-1">Choose paint quality &amp; finish</h3>
              <p className="font-sans text-neutral-mid text-xs mb-6">Select a paint grade matching your aesthetic expectations and budget allocations.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Economy */}
                <div
                  onClick={() => setQuality('economy')}
                  className={`bg-neutral-soft border-2 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between min-h-[220px] relative ${
                    quality === 'economy'
                      ? 'border-primary bg-primary bg-opacity-[0.01] shadow-premium'
                      : 'border-neutral-light hover:border-primary'
                  }`}
                >
                  <div className="bg-neutral-light border border-neutral-mid border-opacity-10 text-[8px] font-bold text-neutral-mid uppercase tracking-widest px-2 py-0.5 rounded-full self-start mb-4">
                    Budget Friendly
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-primary text-base mb-0.5">Economy Quality</h4>
                    <span className="font-display font-extrabold text-accent text-lg block mb-3">₹12 - ₹15 / sq ft</span>
                    <p className="font-sans text-neutral-mid text-[10px] leading-relaxed">
                      Uses standard Berger Bison or Tractor Distemper. Standard clean finish, ideal for rental properties and ceilings.
                    </p>
                  </div>
                </div>

                {/* Premium */}
                <div
                  onClick={() => setQuality('premium')}
                  className={`bg-neutral-soft border-2 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between min-h-[220px] relative ${
                    quality === 'premium'
                      ? 'border-primary bg-primary bg-opacity-[0.01] shadow-premium'
                      : 'border-neutral-light hover:border-primary'
                  }`}
                >
                  <div className="bg-primary text-white text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full self-start mb-4 shadow-sm">
                    Most Popular
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-primary text-base mb-0.5">Premium Quality</h4>
                    <span className="font-display font-extrabold text-accent text-lg block mb-3">₹18 - ₹24 / sq ft</span>
                    <p className="font-sans text-neutral-mid text-[10px] leading-relaxed">
                      Uses washable internal emulsions (Berger Easy Clean / Walmasta). Rich matte look, stain resistant.
                    </p>
                  </div>
                </div>

                {/* Luxury */}
                <div
                  onClick={() => setQuality('luxury')}
                  className={`bg-neutral-soft border-2 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between min-h-[220px] relative ${
                    quality === 'luxury'
                      ? 'border-primary bg-primary bg-opacity-[0.01] shadow-premium'
                      : 'border-neutral-light hover:border-primary'
                  }`}
                >
                  <div className="bg-gold text-white text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full self-start mb-4 shadow-sm">
                    Luxury Look
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-primary text-base mb-0.5">Luxury Quality</h4>
                    <span className="font-display font-extrabold text-accent text-lg block mb-3">₹28 - ₹36 / sq ft</span>
                    <p className="font-sans text-neutral-mid text-[10px] leading-relaxed">
                      Uses luxury high-sheen emulsions (Silk Glamor / WeatherCoat AllGuard). Stain-shield protection, 7+ years durability.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between mt-8 border-t border-neutral-light pt-6">
                <button
                  onClick={() => setStep(2)}
                  className="border border-neutral-light text-primary font-display text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg hover:border-neutral-mid transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={calculateResults}
                  className="bg-primary text-white font-display text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg hover:bg-primary-light transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Calculator className="w-4 h-4 text-gold-light" />
                  <span>Calculate Estimates</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Results Display */}
          {step === 4 && (
            <div className="flex-grow flex flex-col justify-center animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
                
                {/* Cost Summary (Left Column) */}
                <div className="md:col-span-5 flex flex-col justify-between bg-primary rounded-2xl p-6 text-white shadow-luxury">
                  <div>
                    <span className="text-[9px] font-bold text-neutral-light opacity-60 uppercase tracking-widest block mb-2">Estimated Budget Range</span>
                    <h2 className="font-display font-extrabold text-gold text-3xl sm:text-4xl leading-tight">
                      ₹{estimates.minCost.toLocaleString('en-IN')} - ₹{estimates.maxCost.toLocaleString('en-IN')}
                    </h2>
                    <span className="font-sans text-[9px] text-neutral-light opacity-40 block mt-2">
                      *Price includes raw materials and standard labor charges in Mysuru.
                    </span>
                  </div>

                  <div className="mt-8 border-t border-white border-opacity-10 pt-6 flex flex-col gap-2.5 text-xs font-sans text-neutral-light opacity-90">
                    <div className="flex justify-between">
                      <span>Project:</span>
                      <strong className="font-display text-white capitalize">{projectType === 'woodmetal' ? 'Wood & Metal' : projectType + ' Walls'}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Area size:</span>
                      <strong className="text-white">{areaSize} sq. ft.</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Scope:</span>
                      <strong className="text-white capitalize">{condition === 'fresh' ? 'Fresh Painting' : 'Repainting'}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Quality:</span>
                      <strong className="text-white capitalize">{quality}</strong>
                    </div>
                  </div>
                </div>

                {/* Materials Required (Right Column) */}
                <div className="md:col-span-7 flex flex-col gap-6">
                  <div>
                    <h3 className="font-display font-bold text-primary text-lg mb-1">Recommended Material Checklist</h3>
                    <p className="font-sans text-neutral-mid text-[11px]">Bill of quantities based on professional coverage standards.</p>
                  </div>

                  <div className="flex flex-col border border-neutral-light rounded-2xl overflow-hidden divide-y divide-neutral-light">
                    {/* Paint */}
                    <div className="flex items-center gap-4 p-4 bg-neutral-soft">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-neutral-light flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">🎨</span>
                      </div>
                      <div className="flex flex-col text-left">
                        <h4 className="font-display font-bold text-primary text-xs">Wall Emulsion Paint (2 coats)</h4>
                        <span className="font-sans text-[10px] text-neutral-mid">
                          {projectType === 'woodmetal' ? 'Premium Enamel Finish' : 'Base Wall Top-Coat'}
                        </span>
                      </div>
                      <div className="ml-auto font-display font-extrabold text-primary text-lg">
                        {estimates.paintLtrs} <small className="font-sans text-xs text-neutral-mid font-semibold">Ltrs</small>
                      </div>
                    </div>

                    {/* Primer */}
                    {estimates.primerLtrs > 0 && (
                      <div className="flex items-center gap-4 p-4 bg-neutral-soft">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-neutral-light flex items-center justify-center flex-shrink-0">
                          <span className="text-xl">🛢️</span>
                        </div>
                        <div className="flex flex-col text-left">
                          <h4 className="font-display font-bold text-primary text-xs">Undercoat Primer</h4>
                          <span className="font-sans text-[10px] text-neutral-mid">
                            {projectType === 'woodmetal' ? 'Metal / Wood Primer' : 'Wall Primer (1 coat)'}
                          </span>
                        </div>
                        <div className="ml-auto font-display font-extrabold text-primary text-lg">
                          {estimates.primerLtrs} <small className="font-sans text-xs text-neutral-mid font-semibold">Ltrs</small>
                        </div>
                      </div>
                    )}

                    {/* Putty */}
                    {estimates.puttyKg > 0 && (
                      <div className="flex items-center gap-4 p-4 bg-neutral-soft">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-neutral-light flex items-center justify-center flex-shrink-0">
                          <span className="text-xl">📦</span>
                        </div>
                        <div className="flex flex-col text-left">
                          <h4 className="font-display font-bold text-primary text-xs">Acrylic Wall Putty</h4>
                          <span className="font-sans text-[10px] text-neutral-mid">For smooth, flat wall surfaces (2 coats)</span>
                        </div>
                        <div className="ml-auto font-display font-extrabold text-primary text-lg">
                          {estimates.puttyKg} <small className="font-sans text-xs text-neutral-mid font-semibold">KG</small>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-10 border-t border-neutral-light pt-6">
                <button
                  onClick={() => setStep(3)}
                  className="border border-neutral-light text-primary font-display text-xs font-bold uppercase tracking-wider py-4 rounded-xl hover:border-neutral-mid transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Edit Parameters</span>
                </button>
                <button
                  onClick={handleWhatsAppQuoteShare}
                  className="flex-grow bg-primary text-white font-display text-xs font-bold uppercase tracking-wider py-4.5 rounded-xl hover:bg-primary-light transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Share Estimate on WhatsApp</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
