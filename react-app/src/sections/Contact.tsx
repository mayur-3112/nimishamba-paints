import React from 'react';
import { MapPin, Phone, MessageSquare, Mail, Clock, ShieldCheck, Map } from 'lucide-react';

export default function Contact() {
  const handleDirectionsClick = () => {
    const mapsUrl = "https://maps.google.com/?q=Sri+Nimishamba+Paints+and+Plywoods+Mysore";
    window.open(mapsUrl, '_blank');
  };

  return (
    <section className="py-24 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-2">Location &amp; Showroom</span>
          <h2 className="font-display font-bold text-primary text-3xl sm:text-4xl">
            Visit Our Experience Centre
          </h2>
          <p className="font-sans text-neutral-mid text-sm mt-3">
            Walk in today to examine textured boards, scan through our shade catalogs, and talk directly with color consultants.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Information Column (Left) */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left gap-8">
            
            {/* Address and Contacts */}
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-accent bg-opacity-5 rounded-lg border border-accent border-opacity-10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div className="flex flex-col leading-snug">
                  <span className="text-[10px] font-bold text-neutral-mid uppercase tracking-wider mb-1">Showroom Address</span>
                  <strong className="font-display text-primary text-base font-bold">Sri Nimishamba Paints &amp; Plywoods</strong>
                  <p className="font-sans text-neutral-mid text-xs mt-1 leading-relaxed">
                    Hinkal Ring Road Junction, near Outer Ring Road,<br />
                    Mysuru, Karnataka &mdash; 570017
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-primary bg-opacity-5 rounded-lg border border-primary border-opacity-10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col leading-snug">
                  <span className="text-[10px] font-bold text-neutral-mid uppercase tracking-wider mb-1">Phone Enquiries</span>
                  <a href="tel:+919448084351" className="font-display text-primary text-base font-bold hover:text-accent transition-colors">
                    +91 94480 84351
                  </a>
                  <span className="font-sans text-[10px] text-neutral-mid mt-0.5">Showroom manager direct desk</span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex flex-col leading-snug">
                  <span className="text-[10px] font-bold text-neutral-mid uppercase tracking-wider mb-1">WhatsApp Integration</span>
                  <a href="https://wa.me/919448084351" target="_blank" rel="noopener noreferrer" className="font-display text-primary text-base font-bold hover:text-accent transition-colors">
                    +91 94480 84351
                  </a>
                  <span className="font-sans text-[10px] text-neutral-mid mt-0.5">Instant shade catalogue &amp; price lists</span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gold bg-opacity-5 rounded-lg border border-gold border-opacity-10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-gold-dark" />
                </div>
                <div className="flex flex-col leading-snug">
                  <span className="text-[10px] font-bold text-neutral-mid uppercase tracking-wider mb-1">Email Desk</span>
                  <a href="mailto:nimishambapaints@gmail.com" className="font-sans text-neutral-mid text-xs font-semibold hover:text-primary transition-colors mt-0.5">
                    nimishambapaints@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Hours and Perks */}
            <div className="border-t border-neutral-light pt-6 flex flex-col gap-5">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-neutral-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-neutral-mid" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold text-neutral-mid uppercase tracking-wider mb-1">Business Hours</span>
                  <div className="font-sans text-xs text-primary flex flex-col gap-1">
                    <div className="flex justify-between w-64">
                      <span>Monday &ndash; Saturday:</span>
                      <strong className="font-semibold text-neutral-dark">9:00 AM &ndash; 8:30 PM</strong>
                    </div>
                    <div className="flex justify-between w-64">
                      <span>Sunday:</span>
                      <strong className="font-semibold text-accent">9:30 AM &ndash; 2:00 PM</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Perks tags */}
              <div className="flex flex-wrap gap-2.5">
                <span className="bg-neutral-light text-neutral-mid font-sans text-[9px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-lg border border-neutral-light">
                  🚗 Free Customer Parking
                </span>
                <span className="bg-neutral-light text-neutral-mid font-sans text-[9px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-lg border border-neutral-light">
                  💻 Computer shade Tinting
                </span>
                <span className="bg-neutral-light text-neutral-mid font-sans text-[9px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-lg border border-neutral-light">
                  💳 Cards &amp; UPI Accepted
                </span>
              </div>
            </div>

            {/* Navigation Button */}
            <button
              onClick={handleDirectionsClick}
              className="bg-primary text-white font-display text-xs font-bold uppercase tracking-wider py-4.5 rounded-xl hover:bg-primary-light transition-all shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Map className="w-4 h-4 text-gold-light" />
              <span>Get Directions on Google Maps</span>
            </button>
          </div>

          {/* Maps Column (Right) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-neutral-light shadow-luxury relative min-h-[350px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3897.6698650630713!2d76.59868777598858!3d12.33795642878426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf7a8647b561df%3A0xe54d80a13ab051cb!2sSri%20Nimishamba%20Paints%20and%20Plywoods!5e0!3m2!1sen!2sin!4v1717548000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sri Nimishamba Paints Google Maps Location"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
