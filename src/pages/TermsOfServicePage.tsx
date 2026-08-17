import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, Scale, ShoppingBag, Truck, AlertCircle, Sparkles, Mail } from 'lucide-react';

export const TermsOfServicePage: React.FC = () => {
  const { setCurrentPage } = useStore();

  useEffect(() => {
    document.title = 'Terms of Service | Terra & Linen Atelier';
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
          id="terms-back-home-btn"
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#5B6B54] hover:text-[#2C221E] transition-colors cursor-pointer group bg-[#F7F4EE] px-4 py-2 rounded-xl border border-[#E6E0D8]"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Home</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#8C827A]">
          <button onClick={() => setCurrentPage('home')} className="hover:text-[#2C221E]">Home</button>
          <span>/</span>
          <span className="font-medium text-[#2C221E]">Terms of Service</span>
        </div>
      </div>

      {/* Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#5B6B54]/10 border border-[#5B6B54]/20 text-xs font-semibold text-[#5B6B54]">
          <Scale className="w-3.5 h-3.5" />
          <span>Atelier Terms & Client Agreement</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C221E]">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-[#8C827A] font-light leading-relaxed max-w-2xl">
          These Terms of Service govern your access to and use of Terra & Linen Atelier. By placing an order or using our store, you agree to these standard client terms.
        </p>
        <p className="text-[11px] text-[#8C827A]/80 font-mono">
          Effective Date: August 2026 • Version 2.4
        </p>
      </header>

      {/* Content Sections */}
      <div className="space-y-8 text-sm text-[#2C221E] font-light leading-relaxed">
        {/* Section 1 */}
        <section className="bg-[#F7F4EE] p-6 sm:p-8 rounded-3xl border border-[#E6E0D8] space-y-3">
          <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#2C221E]">
            <ShoppingBag className="w-5 h-5 text-[#5B6B54]" />
            <h2>1. Atelier Orders & General Scope</h2>
          </div>
          <p>
            By making a purchase at Terra & Linen, you confirm that you are at least 18 years old or possess legal authority to enter into purchasing contracts.
          </p>
          <p>
            All orders placed through our digital storefront are subject to item availability, order verification, and acceptance by our atelier team.
          </p>
        </section>

        {/* Section 2 */}
        <section className="bg-[#F7F4EE] p-6 sm:p-8 rounded-3xl border border-[#E6E0D8] space-y-3">
          <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#2C221E]">
            <Sparkles className="w-5 h-5 text-[#5B6B54]" />
            <h2>2. Handcrafted Uniqueness & Natural Variations</h2>
          </div>
          <p>
            Because our ceramics, textiles, and wooden tableware are individually handcrafted by master artisans using organic flax and native clays:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#2C221E]/90">
            <li>Subtle variations in glaze speckling, dimensions (±5%), and natural linen slubs are inherent characteristics of organic craftsmanship and are not considered defects.</li>
            <li>Colors displayed on digital displays may vary slightly depending on monitor color settings and ambient light conditions.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="bg-[#F7F4EE] p-6 sm:p-8 rounded-3xl border border-[#E6E0D8] space-y-3">
          <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#2C221E]">
            <Truck className="w-5 h-5 text-[#5B6B54]" />
            <h2>3. Pricing, Payments & Shipping</h2>
          </div>
          <p>
            All prices are listed in USD ($) and include applicable European taxes where specified. Shipping costs are calculated transparently during checkout.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#2C221E]/90">
            <li><strong>Supported Payment Methods:</strong> Cash on Delivery (COD), Credit/Debit Card, or direct Bank Transfer.</li>
            <li><strong>Complimentary Shipping:</strong> Orders over $100 automatically qualify for carbon-neutral express courier dispatch.</li>
            <li><strong>30-Day Guarantee:</strong> Items may be returned within 30 days of receipt provided they are unwashed, unused, and in original packaging.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="bg-[#F7F4EE] p-6 sm:p-8 rounded-3xl border border-[#E6E0D8] space-y-3">
          <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#2C221E]">
            <AlertCircle className="w-5 h-5 text-[#5B6B54]" />
            <h2>4. Limitation of Liability & Intellectual Property</h2>
          </div>
          <p>
            All website designs, photographs, journal articles, product catalog images, and trademarks displayed on this domain belong exclusively to Terra & Linen Atelier. Unauthorized reproduction or commercial scraping is strictly prohibited.
          </p>
        </section>

        {/* Contact Banner */}
        <div className="bg-[#2C221E] text-[#FDFBF7] p-8 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 text-[#A2B899] font-serif font-bold text-base">
            <Mail className="w-5 h-5" />
            <h3>Need Order Assistance or Custom Clarification?</h3>
          </div>
          <p className="text-xs text-[#E6E0D8]/80 leading-relaxed max-w-xl">
            Our atelier concierge team is at your disposal to answer questions about wholesale partnerships, order modifications, or product specifications.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <button
              id="terms-contact-concierge-btn"
              onClick={() => setCurrentPage('contact')}
              className="px-5 py-2.5 bg-[#5B6B54] hover:bg-[#6C7E64] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Contact Atelier Concierge
            </button>
            <span className="text-xs font-mono text-[#E6E0D8]/60">legal@terra-linen.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};
