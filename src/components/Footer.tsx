import React, { useState, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { Leaf, ShieldCheck, Truck, RefreshCw, Mail, ArrowRight, Instagram, Facebook, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, setSelectedCategorySlug, categories, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const bannerScrollRef = useRef<HTMLDivElement>(null);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  const brandValues = [
    {
      id: 'organic-flax',
      icon: Leaf,
      title: '100% Organic Flax',
      desc: 'Sourced directly from certified heritage flax mills in France & Belgium.'
    },
    {
      id: 'craftsmanship',
      icon: ShieldCheck,
      title: 'Master Craftsmanship',
      desc: 'Every stoneware ceramic and wooden bowl is individually turned by hand.'
    },
    {
      id: 'express-dispatch',
      icon: Truck,
      title: 'Express Dispatch',
      desc: 'Carbon-neutral plastic-free packaging dispatched within 24 hours.'
    },
    {
      id: 'pure-guarantee',
      icon: RefreshCw,
      title: '30-Day Pure Guarantee',
      desc: 'Complimentary returns on all unwashed home textiles & tableware.'
    }
  ];

  const handleBannerScroll = () => {
    if (!bannerScrollRef.current) return;
    const { scrollLeft, clientWidth } = bannerScrollRef.current;
    if (clientWidth > 0) {
      const idx = Math.round(scrollLeft / (clientWidth * 0.8));
      setActiveBannerIndex(Math.max(0, Math.min(brandValues.length - 1, idx)));
    }
  };

  const scrollBanner = (direction: 'left' | 'right') => {
    if (!bannerScrollRef.current) return;
    const scrollAmount = bannerScrollRef.current.clientWidth * 0.8;
    bannerScrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const scrollToBannerIndex = (idx: number) => {
    if (!bannerScrollRef.current) return;
    const cardWidth = bannerScrollRef.current.clientWidth * 0.8;
    bannerScrollRef.current.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth'
    });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      showToast('Thank you for joining our Journal & Atelier newsletter!');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#2C221E] text-[#FDFBF7] pt-16 pb-12 border-t border-[#2C221E]/10">
      {/* Brand Values Banner Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 pb-12 border-b border-[#E6E0D8]/15">
        {/* Mobile controls */}
        <div className="flex md:hidden items-center justify-between mb-4 pb-2 border-b border-[#E6E0D8]/10">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A2B899]">
            Our Natural Standard
          </span>
          <div className="flex items-center gap-1.5">
            <button
              id="footer-values-prev-btn"
              onClick={() => scrollBanner('left')}
              className="p-1.5 rounded-lg bg-[#FDFBF7]/10 hover:bg-[#FDFBF7]/20 text-[#FDFBF7] transition-all cursor-pointer"
              aria-label="Previous Value"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              id="footer-values-next-btn"
              onClick={() => scrollBanner('right')}
              className="p-1.5 rounded-lg bg-[#FDFBF7]/10 hover:bg-[#FDFBF7]/20 text-[#FDFBF7] transition-all cursor-pointer"
              aria-label="Next Value"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={bannerScrollRef}
          onScroll={handleBannerScroll}
          className="flex md:grid md:grid-cols-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-6 md:gap-8 -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0"
        >
          {brandValues.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="shrink-0 snap-start w-[76vw] sm:w-[260px] md:w-auto flex flex-col items-center md:items-start text-center md:text-left bg-[#FDFBF7]/5 md:bg-transparent p-5 md:p-0 rounded-2xl md:rounded-none border border-[#E6E0D8]/10 md:border-none"
              >
                <div className="w-12 h-12 rounded-full bg-[#5B6B54]/20 flex items-center justify-center text-[#A2B899] mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-medium text-[#FDFBF7] mb-1">{item.title}</h4>
                <p className="text-xs text-[#E6E0D8]/70 leading-relaxed max-w-xs">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile Pagination Indicator Dots */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-4">
          {brandValues.map((_, idx) => (
            <button
              key={idx}
              id={`footer-banner-dot-${idx}`}
              onClick={() => scrollToBannerIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeBannerIndex === idx
                  ? 'w-5 bg-[#A2B899]'
                  : 'w-1.5 bg-[#E6E0D8]/30 hover:bg-[#E6E0D8]/60'
              }`}
              aria-label={`Go to value slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-10 mb-16">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <span className="font-serif text-2xl font-bold tracking-tight text-[#FDFBF7] block">
            TERRA & LINEN
          </span>
          <p className="text-xs text-[#E6E0D8]/80 leading-relaxed max-w-sm">
            Dedicated to slow living, tactile warmth, and natural home curation. We bridge ancient Portuguese ceramic ateliers and European textile weavers with modern interiors.
          </p>

          <form onSubmit={handleSubscribe} className="pt-2 max-w-sm">
            <label htmlFor="newsletter-email" className="block text-xs font-semibold text-[#A2B899] uppercase tracking-wider mb-2">
              Subscribe to Atelier Dispatch
            </label>
            <div className="flex items-center bg-[#2C221E]/80 border border-[#E6E0D8]/20 rounded-lg overflow-hidden focus-within:border-[#A2B899]">
              <Mail className="w-4 h-4 text-[#E6E0D8]/50 ml-3 flex-shrink-0" />
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-transparent px-3 py-2.5 text-xs text-[#FDFBF7] placeholder-[#E6E0D8]/40 focus:outline-none"
              />
              <button
                id="newsletter-submit-btn"
                type="submit"
                className="bg-[#5B6B54] hover:bg-[#6C7E64] text-white px-4 py-2.5 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
                aria-label="Subscribe"
              >
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#A2B899] mb-4">
            Navigation
          </h4>
          <ul className="space-y-2 text-xs text-[#E6E0D8]/80">
            <li>
              <button
                id="footer-nav-home"
                onClick={() => setCurrentPage('home')}
                className="hover:text-[#FDFBF7] hover:underline cursor-pointer transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button
                id="footer-nav-shop"
                onClick={() => setCurrentPage('shop')}
                className="hover:text-[#FDFBF7] hover:underline cursor-pointer transition-colors"
              >
                Full Product Catalog
              </button>
            </li>
            <li>
              <button
                id="footer-nav-about"
                onClick={() => setCurrentPage('about')}
                className="hover:text-[#FDFBF7] hover:underline cursor-pointer transition-colors"
              >
                Our Story & Craft
              </button>
            </li>
            <li>
              <button
                id="footer-nav-blogs"
                onClick={() => setCurrentPage('blogs')}
                className="hover:text-[#FDFBF7] hover:underline cursor-pointer transition-colors"
              >
                Blog & Journal
              </button>
            </li>
            <li>
              <button
                id="footer-nav-contact"
                onClick={() => setCurrentPage('contact')}
                className="hover:text-[#FDFBF7] hover:underline cursor-pointer transition-colors"
              >
                Contact Concierge
              </button>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#A2B899] mb-4">
            Categories
          </h4>
          <ul className="space-y-2 text-xs text-[#E6E0D8]/80">
            {categories.map(cat => (
              <li key={cat.id}>
                <button
                  id={`footer-cat-${cat.id}`}
                  onClick={() => {
                    setSelectedCategorySlug(cat.name);
                    setCurrentPage('shop');
                  }}
                  className="hover:text-[#FDFBF7] hover:underline cursor-pointer transition-colors"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Concierge */}
        <div>
          <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#A2B899] mb-4">
            Atelier Contact
          </h4>
          <div className="space-y-2 text-xs text-[#E6E0D8]/80 leading-relaxed">
            <p>Atelier Studio & Showroom</p>
            <p>148 Sintra Hills Way, Lisbon</p>
            <p className="pt-1 font-mono text-[11px]">concierge@terra-linen.com</p>
            <p className="font-mono text-[11px]">+351 21 890 4422</p>
          </div>
        </div>
      </div>

      {/* Copyright Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#E6E0D8]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E6E0D8]/50 gap-4">
        <p className="flex items-center gap-2 flex-wrap">
          <span>&copy; {new Date().getFullYear()} Terra & Linen Atelier. All rights reserved.</span>
          <span>•</span>
          <button
            id="footer-manager-link"
            onClick={() => setCurrentPage('manager-auth')}
            className="text-[#E6E0D8]/50 hover:text-[#FDFBF7] transition-colors cursor-pointer underline-offset-2 hover:underline"
          >
            Manager
          </button>
        </p>
        <div className="flex items-center space-x-6">
          <button
            id="footer-privacy-policy-link"
            onClick={() => setCurrentPage('privacy-policy')}
            className="text-[#E6E0D8]/50 hover:text-[#FDFBF7] transition-colors cursor-pointer underline-offset-2 hover:underline"
          >
            Privacy Policy
          </button>
          <button
            id="footer-terms-service-link"
            onClick={() => setCurrentPage('terms-of-service')}
            className="text-[#E6E0D8]/50 hover:text-[#FDFBF7] transition-colors cursor-pointer underline-offset-2 hover:underline"
          >
            Terms of Service
          </button>
          <button
            id="footer-ethical-sourcing-link"
            onClick={() => setCurrentPage('ethical-sourcing')}
            className="text-[#E6E0D8]/50 hover:text-[#FDFBF7] transition-colors cursor-pointer underline-offset-2 hover:underline"
          >
            Ethical Sourcing
          </button>
        </div>
      </div>
    </footer>
  );
};
