import React from 'react';
import { useStore } from '../context/StoreContext';
import { Leaf, ShieldCheck, Heart, Award, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="bg-[#F7F4EE] rounded-3xl p-8 sm:p-16 border border-[#E6E0D8] text-center max-w-4xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#5B6B54]">
          Our Craftsmanship Narrative
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C221E] leading-tight">
          Where European Textile Heritage Meets Portugese Clay
        </h1>
        <p className="text-sm sm:text-base text-[#8C827A] font-light max-w-2xl mx-auto leading-relaxed">
          Terra & Linen was founded on a simple realization: the objects we hold, touch, and live with every day shape our quiet moments of daily mindfulness.
        </p>
      </div>

      {/* Story Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#5B6B54]">
            01 / Raw Materials
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C221E]">
            100% French & Belgian Flax Textiles
          </h2>
          <p className="text-sm text-[#8C827A] leading-relaxed font-light">
            Our linen towels, throw blankets, and kitchen aprons are woven exclusively from organic long-staple European flax fibers. Unprocessed with synthetic silicone softeners, our textiles are pumice stone-washed for authentic tactile depth that grows softer with every wash.
          </p>
        </div>
        <div className="relative aspect-4/3 rounded-3xl overflow-hidden border border-[#E6E0D8] shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80"
            alt="Linen Weaving"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-4/3 rounded-3xl overflow-hidden border border-[#E6E0D8] shadow-lg md:order-1">
          <img
            src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80"
            alt="Portuguese Pottery"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-4 md:order-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#5B6B54]">
            02 / Wheel Precision
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C221E]">
            Atelier Pottery Fired at 1,280°C
          </h2>
          <p className="text-sm text-[#8C827A] leading-relaxed font-light">
            In our partner studios in Sintra, Portugal, potters shape native terra clay using centuries-old wheel techniques. Each carafe, teapot, and bowl receives non-toxic, lead-free mineral glazes before enduring high-fire kilns for lasting durability.
          </p>
        </div>
      </div>

      {/* Values Grid */}
      <div className="bg-[#F7F4EE] rounded-3xl p-8 sm:p-12 border border-[#E6E0D8]">
        <h3 className="font-serif text-2xl font-bold text-[#2C221E] text-center mb-8">
          The Four Pillars of Terra & Linen
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="p-5 bg-[#FDFBF7] rounded-2xl border border-[#E6E0D8] space-y-2">
            <Leaf className="w-6 h-6 text-[#5B6B54] mx-auto" />
            <h4 className="font-serif font-bold text-sm text-[#2C221E]">Pure Naturality</h4>
            <p className="text-xs text-[#8C827A]">Zero synthetic dyes or microplastics.</p>
          </div>
          <div className="p-5 bg-[#FDFBF7] rounded-2xl border border-[#E6E0D8] space-y-2">
            <ShieldCheck className="w-6 h-6 text-[#5B6B54] mx-auto" />
            <h4 className="font-serif font-bold text-sm text-[#2C221E]">Ethical Artisanship</h4>
            <p className="text-xs text-[#8C827A]">Fair wages for master European potters.</p>
          </div>
          <div className="p-5 bg-[#FDFBF7] rounded-2xl border border-[#E6E0D8] space-y-2">
            <Heart className="w-6 h-6 text-[#5B6B54] mx-auto" />
            <h4 className="font-serif font-bold text-sm text-[#2C221E]">Heirloom Quality</h4>
            <p className="text-xs text-[#8C827A]">Built to be handed down through generations.</p>
          </div>
          <div className="p-5 bg-[#FDFBF7] rounded-2xl border border-[#E6E0D8] space-y-2">
            <Award className="w-6 h-6 text-[#5B6B54] mx-auto" />
            <h4 className="font-serif font-bold text-sm text-[#2C221E]">Eco Dispatch</h4>
            <p className="text-xs text-[#8C827A]">100% plastic-free recycled packaging.</p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center space-y-4">
        <h3 className="font-serif text-2xl font-bold text-[#2C221E]">Ready to Crate Your Space?</h3>
        <button
          id="about-cta-shop-btn"
          onClick={() => setCurrentPage('shop')}
          className="px-8 py-3.5 bg-[#2C221E] hover:bg-[#5B6B54] text-[#FDFBF7] text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
        >
          <span>Explore Artisanal Collection</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
