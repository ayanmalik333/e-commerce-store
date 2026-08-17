import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ShoppingBag, Star, Zap, ArrowLeft, ShieldCheck, Truck, RefreshCw, Check, Plus, Minus, Tag } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { selectedProductId, products, addToCart, triggerBuyNow, setCurrentPage, setSelectedProductId } = useStore();

  const product = products.find(p => p.id === selectedProductId) || products[0];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity, true);
  };

  const handleBuyNow = () => {
    triggerBuyNow(product, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back Button */}
      <div>
        <button
          id="product-detail-back-btn"
          onClick={() => setCurrentPage('shop')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C827A] hover:text-[#2C221E] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Images Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/3 bg-[#F7F4EE] rounded-3xl overflow-hidden border border-[#E6E0D8] shadow-lg">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {product.isFeatured && (
              <span className="absolute top-4 left-4 bg-[#5B6B54] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Top Featured
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  id={`product-thumb-${idx}`}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImageIndex === idx ? 'border-[#5B6B54] scale-105 shadow-md' : 'border-[#E6E0D8] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Purchase Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-[#8C827A] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[#5B6B54]">{product.category}</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-[#5B6B54] text-[#5B6B54]" />
                <span className="font-bold text-[#2C221E]">{product.rating.toFixed(1)}</span>
                <span>({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C221E] leading-tight mb-3">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-serif text-3xl font-bold text-[#2C221E]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-[#8C827A] line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs font-semibold text-[#5B6B54] bg-[#5B6B54]/10 px-2.5 py-1 rounded-full">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-sm text-[#8C827A] leading-relaxed font-light mb-6">
              {product.description}
            </p>
          </div>

          {/* Stock & Quantity Control */}
          <div className="p-5 bg-[#F7F4EE] rounded-2xl border border-[#E6E0D8] space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-[#8C827A]">Availability:</span>
              <span className="font-semibold text-[#5B6B54] flex items-center gap-1">
                <Check className="w-4 h-4" /> In Stock ({product.stock} units ready in atelier)
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E6E0D8]">
              <span className="text-xs font-semibold text-[#2C221E]">Quantity:</span>
              <div className="flex items-center border border-[#E6E0D8] bg-[#FDFBF7] rounded-xl">
                <button
                  id="pdp-qty-minus"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-[#2C221E] hover:bg-[#E6E0D8]/50 rounded-l-xl cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-bold text-sm text-[#2C221E]">{quantity}</span>
                <button
                  id="pdp-qty-plus"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-[#2C221E] hover:bg-[#E6E0D8]/50 rounded-r-xl cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                id="pdp-add-to-cart-btn"
                onClick={handleAddToCart}
                className="py-3.5 px-4 bg-[#FDFBF7] border-2 border-[#2C221E] text-[#2C221E] hover:bg-[#2C221E] hover:text-[#FDFBF7] font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Save to Cart ({quantity})</span>
              </button>

              <button
                id="pdp-buy-now-btn"
                onClick={handleBuyNow}
                className="py-3.5 px-4 bg-[#5B6B54] hover:bg-[#475442] text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Buy Now Direct</span>
              </button>
            </div>
          </div>

          {/* Specifications Accordion */}
          <div className="border border-[#E6E0D8] rounded-2xl overflow-hidden bg-[#FDFBF7]">
            <div className="p-4 bg-[#F7F4EE] border-b border-[#E6E0D8] font-serif font-bold text-sm text-[#2C221E]">
              Artisanal Product Specifications
            </div>
            <div className="p-4 divide-y divide-[#E6E0D8]/60 text-xs">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="py-2 flex justify-between">
                  <span className="text-[#8C827A] font-medium">{key}:</span>
                  <span className="text-[#2C221E] font-semibold">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-3 text-center text-[11px] text-[#8C827A] pt-2">
            <div className="p-3 bg-[#F7F4EE] rounded-xl border border-[#E6E0D8]">
              <Truck className="w-4 h-4 mx-auto text-[#5B6B54] mb-1" />
              <span>Free Express &gt; $100</span>
            </div>
            <div className="p-3 bg-[#F7F4EE] rounded-xl border border-[#E6E0D8]">
              <ShieldCheck className="w-4 h-4 mx-auto text-[#5B6B54] mb-1" />
              <span>Handmade Guarantee</span>
            </div>
            <div className="p-3 bg-[#F7F4EE] rounded-xl border border-[#E6E0D8]">
              <RefreshCw className="w-4 h-4 mx-auto text-[#5B6B54] mb-1" />
              <span>30-Day Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-10 border-t border-[#E6E0D8]">
          <h3 className="font-serif text-2xl font-bold text-[#2C221E] mb-6">
            You May Also Enjoy ({product.category})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
