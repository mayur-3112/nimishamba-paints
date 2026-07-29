import React, { useState, useEffect } from 'react';
import { X, Send, MessageSquare, Check } from 'lucide-react';

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
        <label htmlFor="quote-name" className="text-[10px] font-bold text-neutral-mid uppercase tracking-wider">
          Full Name
        </label>
        <input
          id="quote-name"
          type="text"
          required
          placeholder="e.g. Mayur Agarwal"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="bg-neutral-soft border border-neutral-light focus:border-primary focus:bg-white rounded-xl px-4 py-3.5 font-sans text-sm font-semibold text-primary outline-none transition-all"
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="quote-phone" className="text-[10px] font-bold text-neutral-mid uppercase tracking-wider">
          Phone Number
        </label>
        <input
          id="quote-phone"
          type="tel"
          required
          placeholder="e.g. +91 94480 84351"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          className="bg-neutral-soft border border-neutral-light focus:border-primary focus:bg-white rounded-xl px-4 py-3.5 font-sans text-sm font-semibold text-primary outline-none transition-all"
        />
      </div>

      {/* Location */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="quote-loc" className="text-[10px] font-bold text-neutral-mid uppercase tracking-wider">
          Project Location / Site
        </label>
        <input
          id="quote-loc"
          type="text"
          required
          placeholder="e.g. Hinkal, Gokulam, Mysuru"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          className="bg-neutral-soft border border-neutral-light focus:border-primary focus:bg-white rounded-xl px-4 py-3.5 font-sans text-sm font-semibold text-primary outline-none transition-all"
        />
      </div>

      {/* Category Selector */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="quote-cat" className="text-[10px] font-bold text-neutral-mid uppercase tracking-wider">
          Solution Category
        </label>
        <select
          id="quote-cat"
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          className="bg-neutral-soft border border-neutral-light focus:border-primary focus:bg-white rounded-xl px-4 py-3.5 font-sans text-sm font-semibold text-primary outline-none transition-all"
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="quote-msg" className="text-[10px] font-bold text-neutral-mid uppercase tracking-wider">
          Project Details (Optional)
        </label>
        <textarea
          id="quote-msg"
          rows={3}
          placeholder="e.g. 3BHK apartment interior repaint, or factory floor epoxy coating for 2,000 sq ft."
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          className="bg-neutral-soft border border-neutral-light focus:border-primary focus:bg-white rounded-xl px-4 py-3.5 font-sans text-sm font-semibold text-primary outline-none resize-none transition-all"
        />
      </div>

      {/* Submit CTA */}
      <button
        type="submit"
        className="mt-2 bg-primary text-white font-display text-xs font-bold uppercase tracking-wider py-4.5 rounded-xl hover:bg-primary-light transition-all shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2"
      >
        <MessageSquare className="w-4 h-4 text-emerald-400" />
        <span>Submit & Connect on WhatsApp</span>
      </button>
    </form>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-primary bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
        <div 
          className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-neutral-light flex flex-col relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 text-primary hover:text-accent p-1.5 rounded-lg hover:bg-neutral-light transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8">
            <div className="text-left mb-6 pr-8">
              <span className="text-[9px] font-bold text-accent uppercase tracking-wider block mb-1">Project Enquiry</span>
              <h3 className="font-display font-extrabold text-primary text-2xl">Request Project Consultation</h3>
              <p className="font-sans text-neutral-mid text-xs mt-1">
                Share your project details and our experts will get back to you with a tailored solution and quotation.
              </p>
            </div>
            {formContent}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-neutral-light rounded-3xl p-8 shadow-premium w-full">
      <div className="text-left mb-6">
        <span className="text-[9px] font-bold text-accent uppercase tracking-wider block mb-1">Project Desk</span>
        <h3 className="font-display font-extrabold text-primary text-2xl">Request Project Consultation</h3>
        <p className="font-sans text-neutral-mid text-xs mt-1">
          Residential, commercial, or industrial — share your requirements and we'll provide expert guidance.
        </p>
      </div>
      {formContent}
    </div>
  );
}
