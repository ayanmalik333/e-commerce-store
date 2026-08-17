import React, { useRef, useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, Sparkles, Clock, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export const HomePage: React.FC = () => {
  const { products, categories, blogs, setCurrentPage, setSelectedCategorySlug, setSelectedBlogSlug } = useStore();

  // Featured Products (Sorted by sequence or priority)
  const featuredProducts = products
    .filter(p => p.isFeatured)
    .sort((a, b) => (a.sequenceOrder || 99) - (b.sequenceOrder || 99));

  // Published Blogs for Carousel
  const featuredBlogs = blogs;

  // Carousel Refs & States
  const productsScrollRef = useRef<HTMLDivElement>(null);
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  const blogsScrollRef = useRef<HTMLDivElement>(null);
  const [activeBlogIndex, setActiveBlogIndex] = useState(0);

  const categoriesScrollRef = useRef<HTMLDivElement>(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const handleScroll = (ref: React.RefObject<HTMLDivElement | null>, setIndex: (idx: number) => void) => {
    if (!ref.current) return;
    const { scrollLeft, clientWidth } = ref.current;
    if (clientWidth > 0) {
      const idx = Math.round(scrollLeft / (clientWidth * 0.82));
      setIndex(Math.max(0, idx));
    }
  };

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (!ref.current) return;
    const scrollAmount = ref.current.clientWidth * 0.85;
    ref.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const scrollToIndex = (ref: React.RefObject<HTMLDivElement | null>, index: number) => {
    if (!ref.current) return;
    const cardWidth = ref.current.clientWidth * 0.82;
    ref.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section id="hero-section" className="relative bg-[#F7F4EE] border-b border-[#E6E0D8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left z-10"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5B6B54]/10 border border-[#5B6B54]/20 text-[#5B6B54] text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#5B6B54]" />
              Artisanal French Flax & Portuguese Stoneware
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2C221E] leading-[1.12]">
              Natural Living, Crafted for Mindfulness & Tactile Warmth
            </h1>

            <p className="text-base sm:text-lg text-[#8C827A] font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Curated home essentials made with raw European flax, unglazed Portuguese clay, and solid walnut. Designed to bring serenity to modern sanctuaries.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                id="hero-primary-cta-btn"
                onClick={() => setCurrentPage('shop')}
                className="w-full sm:w-auto px-8 py-4 bg-[#2C221E] hover:bg-[#5B6B54] text-[#FDFBF7] font-medium text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-secondary-cta-btn"
                onClick={() => setCurrentPage('about')}
                className="w-full sm:w-auto px-7 py-4 bg-[#FDFBF7] hover:bg-[#E6E0D8]/50 text-[#2C221E] border border-[#E6E0D8] font-medium text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Read Our Story</span>
              </button>
            </div>

            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#E6E0D8] text-xs text-[#8C827A]">
              <div>
                <span className="font-bold text-sm text-[#2C221E] block font-serif">100% Pure</span>
                <span>Organic Linen & Clay</span>
              </div>
              <div>
                <span className="font-bold text-sm text-[#2C221E] block font-serif">Zero Plastic</span>
                <span>Eco Shipping & Box</span>
              </div>
              <div>
                <span className="font-bold text-sm text-[#2C221E] block font-serif">4.9 / 5 Stars</span>
                <span>Trusted Home Curation</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Banner Image - Hidden on mobile and tablet views, visible on laptop/desktop (lg) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden lg:block lg:col-span-5 relative"
          >
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FDFBF7]">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
                alt="Terra & Linen Lifestyle Showcase"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C221E]/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#FDFBF7]/90 backdrop-blur-md rounded-2xl border border-[#E6E0D8] text-xs space-y-1">
                <span className="font-serif font-bold text-sm text-[#2C221E] block">
                  Sintra Hand-Wheeled Clay Carafe Set
                </span>
                <p className="text-[#8C827A]">Featured in European Architecture Digest 2026</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURED PRODUCTS SECTION */}
      <section id="featured-products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E6E0D8] gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#5B6B54] mb-1">
              Top Ranked Selection
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C221E]">
              Featured Artisanal Goods
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-1.5 bg-[#F7F4EE] p-1 rounded-xl border border-[#E6E0D8]">
              <button
                id="featured-products-prev-btn"
                onClick={() => scrollContainer(productsScrollRef, 'left')}
                className="p-2 rounded-lg hover:bg-[#FDFBF7] text-[#2C221E] transition-all cursor-pointer shadow-xs disabled:opacity-30"
                aria-label="Previous Products"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                id="featured-products-next-btn"
                onClick={() => scrollContainer(productsScrollRef, 'right')}
                className="p-2 rounded-lg hover:bg-[#FDFBF7] text-[#2C221E] transition-all cursor-pointer shadow-xs disabled:opacity-30"
                aria-label="Next Products"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              id="see-more-products-btn"
              onClick={() => setCurrentPage('shop')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#5B6B54] hover:text-[#2C221E] transition-colors cursor-pointer group"
            >
              <span className="hidden sm:inline">See More Products ({products.length} Items)</span>
              <span className="sm:hidden">All ({products.length})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Carousel Slider */}
        <div
          ref={productsScrollRef}
          onScroll={() => handleScroll(productsScrollRef, setActiveProductIndex)}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-5 sm:gap-6 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {featuredProducts.map(product => (
            <div
              key={product.id}
              className="shrink-0 snap-start w-[85vw] sm:w-[320px] md:w-[350px] lg:w-[380px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile / Desktop Pagination Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {featuredProducts.map((_, idx) => (
            <button
              key={idx}
              id={`featured-products-dot-${idx}`}
              onClick={() => scrollToIndex(productsScrollRef, idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeProductIndex === idx
                  ? 'w-6 bg-[#5B6B54]'
                  : 'w-2 bg-[#E6E0D8] hover:bg-[#8C827A]'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            id="featured-section-view-catalog-btn"
            onClick={() => setCurrentPage('shop')}
            className="px-8 py-3.5 bg-[#2C221E] hover:bg-[#5B6B54] text-[#FDFBF7] text-sm font-semibold rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md group"
          >
            <span>See More Products ({products.length} Items)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* 2.5 FEATURED BLOGS SECTION */}
      <section id="featured-blogs-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E6E0D8] gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#5B6B54] mb-1">
              Earthy Insights & Journal
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C221E]">
              Featured Articles & Stories
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-1.5 bg-[#F7F4EE] p-1 rounded-xl border border-[#E6E0D8]">
              <button
                id="featured-blogs-prev-btn"
                onClick={() => scrollContainer(blogsScrollRef, 'left')}
                className="p-2 rounded-lg hover:bg-[#FDFBF7] text-[#2C221E] transition-all cursor-pointer shadow-xs"
                aria-label="Previous Articles"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                id="featured-blogs-next-btn"
                onClick={() => scrollContainer(blogsScrollRef, 'right')}
                className="p-2 rounded-lg hover:bg-[#FDFBF7] text-[#2C221E] transition-all cursor-pointer shadow-xs"
                aria-label="Next Articles"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              id="see-more-blogs-header-btn"
              onClick={() => setCurrentPage('blogs')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#5B6B54] hover:text-[#2C221E] transition-colors cursor-pointer group"
            >
              <span className="hidden sm:inline">See More Articles ({blogs.length} Published)</span>
              <span className="sm:hidden">All ({blogs.length})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Carousel Slider for Blogs */}
        <div
          ref={blogsScrollRef}
          onScroll={() => handleScroll(blogsScrollRef, setActiveBlogIndex)}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-5 sm:gap-6 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {featuredBlogs.map(blog => (
            <article
              key={blog.id}
              id={`featured-blog-card-${blog.id}`}
              onClick={() => {
                setSelectedBlogSlug(blog.slug);
                setCurrentPage('blog-detail');
              }}
              className="shrink-0 snap-start w-[85vw] sm:w-[340px] md:w-[360px] lg:w-[380px] bg-[#F7F4EE] rounded-3xl border border-[#E6E0D8] overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col cursor-pointer"
            >
              {/* Thumbnail Image */}
              <div className="aspect-16/10 overflow-hidden relative border-b border-[#E6E0D8]">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#FDFBF7]/90 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-semibold text-[#5B6B54] border border-[#E6E0D8] uppercase tracking-wider">
                  {blog.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col space-y-3">
                <div className="flex items-center gap-2 text-[11px] text-[#8C827A]">
                  <Clock className="w-3.5 h-3.5 text-[#5B6B54]" />
                  <span>{blog.readTime}</span>
                  <span>•</span>
                  <span>{blog.date}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#2C221E] group-hover:text-[#5B6B54] transition-colors leading-snug line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-xs text-[#8C827A] font-light leading-relaxed line-clamp-3">
                  {blog.excerpt}
                </p>

                <div className="pt-3 mt-auto border-t border-[#E6E0D8]/60 flex items-center justify-between text-xs text-[#5B6B54] font-semibold group-hover:text-[#2C221E] transition-colors">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    Read Full Story
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {featuredBlogs.map((_, idx) => (
            <button
              key={idx}
              id={`featured-blogs-dot-${idx}`}
              onClick={() => scrollToIndex(blogsScrollRef, idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeBlogIndex === idx
                  ? 'w-6 bg-[#5B6B54]'
                  : 'w-2 bg-[#E6E0D8] hover:bg-[#8C827A]'
              }`}
              aria-label={`Go to blog slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* See More Button */}
        <div className="mt-8 text-center">
          <button
            id="featured-blogs-see-more-btn"
            onClick={() => setCurrentPage('blogs')}
            className="px-8 py-3.5 bg-[#2C221E] hover:bg-[#5B6B54] text-[#FDFBF7] text-sm font-semibold rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md group"
          >
            <span>See More Articles & Journal Posts</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* 3. CATEGORY SHOWCASE GRID */}
      <section id="categories-showcase-section" className="bg-[#F7F4EE] py-16 sm:py-20 border-y border-[#E6E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E6E0D8] gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#5B6B54] block mb-1">
                Curated Collections
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C221E] mb-2">
                Shop by Natural Category
              </h2>
              <p className="text-sm text-[#8C827A] font-light max-w-xl">
                Explore our range of organic textiles, hand-thrown ceramics, soy fragrances, and turned wood serveware.
              </p>
            </div>

            {/* Carousel Navigation Buttons for Categories */}
            <div className="flex items-center gap-1.5 bg-[#FDFBF7] p-1 rounded-xl border border-[#E6E0D8] self-start md:self-auto">
              <button
                id="categories-prev-btn"
                onClick={() => scrollContainer(categoriesScrollRef, 'left')}
                className="p-2 rounded-lg hover:bg-[#F7F4EE] text-[#2C221E] transition-all cursor-pointer shadow-xs"
                aria-label="Previous Categories"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                id="categories-next-btn"
                onClick={() => scrollContainer(categoriesScrollRef, 'right')}
                className="p-2 rounded-lg hover:bg-[#F7F4EE] text-[#2C221E] transition-all cursor-pointer shadow-xs"
                aria-label="Next Categories"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Carousel Slider for Categories */}
          <div
            ref={categoriesScrollRef}
            onScroll={() => handleScroll(categoriesScrollRef, setActiveCategoryIndex)}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-5 sm:gap-6 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {categories.map(cat => (
              <div
                key={cat.id}
                id={`category-card-${cat.id}`}
                onClick={() => {
                  setSelectedCategorySlug(cat.name);
                  setCurrentPage('shop');
                }}
                className="shrink-0 snap-start w-[78vw] sm:w-[280px] md:w-[290px] lg:w-[300px] group relative h-80 rounded-2xl overflow-hidden shadow-md cursor-pointer border border-[#E6E0D8]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C221E]/85 via-[#2C221E]/30 to-transparent group-hover:from-[#2C221E]/95 transition-colors" />

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-[#A2B899] font-medium block">
                    Collection
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#FDFBF7] group-hover:text-[#A2B899] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#E6E0D8]/80 line-clamp-2 font-light">
                    {cat.description}
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs text-[#A2B899] font-medium">
                    <span>Explore Products</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicator Dots for Categories */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {categories.map((_, idx) => (
              <button
                key={idx}
                id={`categories-dot-${idx}`}
                onClick={() => scrollToIndex(categoriesScrollRef, idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  activeCategoryIndex === idx
                    ? 'w-6 bg-[#5B6B54]'
                    : 'w-2 bg-[#E6E0D8] hover:bg-[#8C827A]'
                }`}
                aria-label={`Go to category slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. ABOUT US SNIPPET */}
      <section id="about-us-snippet-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F7F4EE] rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#E6E0D8] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#5B6B54]">
              Our Heritage & Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C221E] leading-tight">
              Honoring Slow Living, Earthy Texture, and Honest Materials
            </h2>
            <p className="text-sm text-[#8C827A] leading-relaxed font-light">
              Founded in Sintra and Paris, Terra & Linen was created out of a desire to replace fleeting, mass-manufactured household decor with pieces that age gracefully alongside your memories.
            </p>
            <p className="text-sm text-[#8C827A] leading-relaxed font-light">
              We work directly with independent multigenerational ceramic studios and flax weavers across Western Europe, ensuring fair wages, zero waste, and non-toxic natural glazes.
            </p>

            <div className="pt-2">
              <button
                id="see-more-about-us-btn"
                onClick={() => setCurrentPage('about')}
                className="px-6 py-3 bg-[#2C221E] hover:bg-[#5B6B54] text-[#FDFBF7] text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>See More (Our Full Brand Story)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80"
                alt="Clay turning"
                className="rounded-2xl shadow-md border border-[#E6E0D8] object-cover h-48 w-full"
              />
              <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#E6E0D8] text-xs">
                <span className="font-serif font-bold text-sm text-[#2C221E] block mb-1">
                  Hand-Wheeled Clay
                </span>
                <p className="text-[#8C827A]">Uncut, unrefined mineral clay fired at 1,280°C.</p>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#E6E0D8] text-xs">
                <span className="font-serif font-bold text-sm text-[#2C221E] block mb-1">
                  100% French Flax
                </span>
                <p className="text-[#8C827A]">Stone-washed with natural pumice stones for pure softness.</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=600&q=80"
                alt="Wooden bowl crafting"
                className="rounded-2xl shadow-md border border-[#E6E0D8] object-cover h-48 w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
