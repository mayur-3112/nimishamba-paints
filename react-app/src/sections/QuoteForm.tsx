import React, { useState, useEffect } from 'react';
import { X, MessageSquare } from 'lucide-react';

interface QuoteFormProps {
  isModal?: boolean;
  onClose?: () => void;
  prefilledCategory?: string;
}

export default function QuoteForm({ isModal = false, onClose, prefilledCategory = '' }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    category: 'Residential — Interior & Exterior',
    message: ''
  });

  useEffect(() => {
    if (prefilledCategory) {
      setFormData(prev => ({ ...prev, category: prefilledCategory }));
    }
  }, [prefilledCategory]);

  const categories = [
    'Residential — Interior & Exterior',
    'Commercial — Office & Retail Spaces',
    'Industrial — Protective & Floor Coatings',
    'Waterproofing & Surface Treatment',
    'Luxury Finishes & Decorative Textures',
    'Bulk Supply & Contractor Partnership',
    'Project Consultation & Site Visit'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const msg = `Hi Nimishamba! 👋

I would like to request a project consultation:
• Name: ${formData.name}
• Contact: ${formData.phone}
• Project Location: ${formData.location}
• Solution Category: ${formData.category}
${formData.message ? `• Project Details: ${formData.message}` : ''}

Please contact me to discuss requirements and arrange a site assessment. Thanks!`;

    const url = 'https://wa.me/919448084351?text=' + encodeURIComponent(msg);
    window.open(url, '_blank');

    if (onClose) onClose();
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="quote-name" className="text-[10px] font-extrabold text-neutral-mid uppercase tracking-widest">
          Full Name
        </label>
        <input
          id="quote-name"
          type="text"
          required
          autoComplete="name"
          placeholder="e.g. Mayur Agarwal"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="bg-neutral-soft border border-neutral-light/80 focus:border-[#E31959] focus:bg-white rounded-2xl px-4 py-3.5 min-h-[50px] font-sans text-sm font-semibold text-primary outline-none transition-all"
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="quote-phone" className="text-[10px] font-extrabold text-neutral-mid uppercase tracking-widest">
          Phone Number
        </label>
        <input
          id="quote-phone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          placeholder="e.g. +91 94480 84351"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          className="bg-neutral-soft border border-neutral-light/80 focus:border-[#E31959] focus:bg-white rounded-2xl px-4 py-3.5 min-h-[50px] font-sans text-sm font-semibold text-primary outline-none transition-all"
        />
      </div>

      {/* Location */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="quote-loc" className="text-[10px] font-extrabold text-neutral-mid uppercase tracking-widest">
          Project Location / Site
        </label>
        <input
          id="quote-loc"
          type="text"
          required
          autoComplete="street-address"
          placeholder="e.g. Hinkal, Gokulam, Mysuru"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          className="bg-neutral-soft border border-neutral-light/80 focus:border-[#E31959] focus:bg-white rounded-2xl px-4 py-3.5 min-h-[50px] font-sans text-sm font-semibold text-primary outline-none transition-all"
        />
      </div>

      {/* Category Selector */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="quote-cat" className="text-[10px] font-extrabold text-neutral-mid uppercase tracking-widest">
          Solution Category
        </label>
        <select
          id="quote-cat"
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          className="bg-neutral-soft border border-neutral-light/80 focus:border-[#E31959] focus:bg-white rounded-2xl px-4 py-3.5 min-h-[50px] font-sans text-sm font-semibold text-primary outline-none transition-all"
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="quote-msg" className="text-[10px] font-extrabold text-neutral-mid uppercase tracking-widest">
          Project Details (Optional)
        </label>
        <textarea
          id="quote-msg"
          rows={3}
          placeholder="e.g. 3BHK apartment interior repaint, or factory floor epoxy coating."
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          className="bg-neutral-soft border border-neutral-light/80 focus:border-[#E31959] focus:bg-white rounded-2xl px-4 py-3.5 font-sans text-sm font-semibold text-primary outline-none resize-none transition-all"
        />
      </div>

      {/* Mobile-Friendly Submit CTA */}
      <button
        type="submit"
        className="mt-2 min-h-[52px] bg-[#E31959] hover:bg-[#C20F4B] active:scale-[0.98] text-white font-display text-xs font-black uppercase tracking-wider py-4 rounded-2xl transition-all shadow-luxury flex items-center justify-center gap-2 cursor-pointer"
      >
        <MessageSquare className="w-4 h-4 text-emerald-400" />
        <span>Submit &amp; Connect on WhatsApp</span>
      </button>
    </form>
  );

  if (isModal) {
    return (
      <div 
        className="fixed inset-0 z-50 bg-[#0B111A]/70 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6 animate-fade-in"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-light flex flex-col relative p-6 sm:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 text-primary hover:text-accent w-10 h-10 rounded-full bg-neutral-soft flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-left mb-6 pr-8">
            <span className="text-[9px] font-extrabold text-[#E31959] uppercase tracking-widest block mb-1">Project Enquiry</span>
            <h3 className="font-display font-black text-primary text-2xl">Request Consultation</h3>
            <p className="font-sans text-neutral-mid text-xs mt-1">
              Share your requirements and our team will provide expert guidance and quotation.
            </p>
          </div>
          {formContent}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-neutral-light/80 rounded-3xl p-6 sm:p-8 shadow-luxury w-full">
      <div className="text-left mb-6">
        <span className="text-[9px] font-extrabold text-[#E31959] uppercase tracking-widest block mb-1">Project Desk</span>
        <h3 className="font-display font-black text-primary text-2xl">Request Consultation</h3>
        <p className="font-sans text-neutral-mid text-xs mt-1">
          Residential, commercial, or industrial — share your requirements and we'll provide expert guidance.
        </p>
      </div>
      {formContent}
    </div>
  );
}
