import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, Leaf, Award, Heart, ShieldCheck, Sun, Recycle, MapPin } from 'lucide-react';

export const EthicalSourcingPage: React.FC = () => {
  const { setCurrentPage } = useStore();

  useEffect(() => {
    document.title = 'Ethical Sourcing & Sustainability | Terra & Linen';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      document.title = 'Terra & Linen | Artisanal E-Commerce Store';
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Navigation Breadcrumb & Back Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E6E0D8]">
        <button
          id="ethical-back-home-btn"
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#5B6B54] hover:text-[#2C221E] transition-colors cursor-pointer group bg-[#F7F4EE] px-4 py-2 rounded-xl border border-[#E6E0D8]"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Home</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#8C827A]">
          <button onClick={() => setCurrentPage('home')} className="hover:text-[#2C221E]">Home</button>
          <span>/</span>
          <span className="font-medium text-[#2C221E]">Ethical Sourcing</span>
        </div>
      </div>

      {/* Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#5B6B54]/10 border border-[#5B6B54]/20 text-xs font-semibold text-[#5B6B54]">
          <Leaf className="w-3.5 h-3.5" />
          <span>Sustainability & Material Integrity</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C221E]">
          Ethical Sourcing & Craft Manifesto
        </h1>
        <p className="text-xs sm:text-sm text-[#8C827A] font-light leading-relaxed max-w-2xl">
          We believe true luxury belongs in harmony with nature. Explore how our raw French flax, Portuguese clay, and plastic-free packaging uphold ancient heritage with zero ecological compromise.
        </p>
      </header>

      {/* Hero Image / Banner */}
      <div className="aspect-16/8 rounded-3xl overflow-hidden border border-[#E6E0D8] relative shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=80"
          alt="Natural Raw Linen & Ceramics Atelier"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C221E]/80 via-transparent to-transparent p-6 sm:p-8 flex items-end">
          <div className="text-[#FDFBF7] space-y-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#A2B899] block">
              Direct From Origin
            </span>
            <p className="font-serif text-lg sm:text-2xl font-bold">
              Normandy Flax Fields • Sintra Ceramic Kilns • Master Woodturners
            </p>
          </div>
        </div>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1 */}
        <div className="bg-[#F7F4EE] p-6 sm:p-8 rounded-3xl border border-[#E6E0D8] space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#5B6B54]/15 flex items-center justify-center text-[#5B6B54]">
            <Sun className="w-5 h-5" />
          </div>
          <h2 className="font-serif font-bold text-xl text-[#2C221E]">
            1. Zero-Irrigation European Flax
          </h2>
          <p className="text-xs sm:text-sm text-[#2C221E]/90 leading-relaxed font-light">
            Flax is one of nature's most sustainable crops. Cultivated in Normandy, France and Flanders, Belgium, our flax requires <strong>zero artificial irrigation</strong>—relying solely on natural rainfall and dew-retting methods.
          </p>
          <div className="pt-2 text-xs text-[#5B6B54] font-medium flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            <span>OEKO-TEX® Standard 100 Certified</span>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="bg-[#F7F4EE] p-6 sm:p-8 rounded-3xl border border-[#E6E0D8] space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#5B6B54]/15 flex items-center justify-center text-[#5B6B54]">
            <MapPin className="w-5 h-5" />
          </div>
          <h2 className="font-serif font-bold text-xl text-[#2C221E]">
            2. Native Portuguese Stoneware
          </h2>
          <p className="text-xs sm:text-sm text-[#2C221E]/90 leading-relaxed font-light">
            Our water carafes, teapots, and ceramic dinnerware are shaped from native terra clay in Sintra, Portugal. Fired at 1250°C in energy-efficient kilns, every vessel uses <strong>100% lead-free, food-safe glazes</strong>.
          </p>
          <div className="pt-2 text-xs text-[#5B6B54] font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Non-Toxic & Dishwasher Safe</span>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="bg-[#F7F4EE] p-6 sm:p-8 rounded-3xl border border-[#E6E0D8] space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#5B6B54]/15 flex items-center justify-center text-[#5B6B54]">
            <Heart className="w-5 h-5" />
          </div>
          <h2 className="font-serif font-bold text-xl text-[#2C221E]">
            3. Fair Living Wages & Heritage
          </h2>
          <p className="text-xs sm:text-sm text-[#2C221E]/90 leading-relaxed font-light">
            We partner directly with multi-generational family workshops. Every master weaver, ceramicist, and woodturner receives fair living wages above regional averages, ensuring ancient craft traditions thrive into the future.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="bg-[#F7F4EE] p-6 sm:p-8 rounded-3xl border border-[#E6E0D8] space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#5B6B54]/15 flex items-center justify-center text-[#5B6B54]">
            <Recycle className="w-5 h-5" />
          </div>
          <h2 className="font-serif font-bold text-xl text-[#2C221E]">
            4. 100% Plastic-Free Dispatch
          </h2>
          <p className="text-xs sm:text-sm text-[#2C221E]/90 leading-relaxed font-light">
            Every shipment dispatched from our atelier arrives in 100% recycled unbleached kraft boxes, secured with water-activated plant starch tape and protected by biodegradable tissue paper.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#2C221E] text-[#FDFBF7] p-8 rounded-3xl space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 max-w-lg">
          <h3 className="font-serif text-xl font-bold">Experience Conscious Living</h3>
          <p className="text-xs text-[#E6E0D8]/80 leading-relaxed">
            Explore our curated selection of organic flax home textiles, stoneware ceramics, and handcrafted acacia woodenware.
          </p>
        </div>

        <button
          id="ethical-shop-now-btn"
          onClick={() => setCurrentPage('shop')}
          className="px-6 py-3 bg-[#5B6B54] hover:bg-[#6C7E64] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex-shrink-0 shadow-md"
        >
          Explore Full Catalog &rarr;
        </button>
      </div>
    </div>
  );
};
