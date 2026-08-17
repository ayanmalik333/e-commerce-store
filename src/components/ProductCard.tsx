import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Star, Zap, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, triggerBuyNow, setSelectedProductId, setCurrentPage } = useStore();

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProductId(product.id);
    setCurrentPage('product-detail');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, true);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerBuyNow(product, 1);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={handleQuickView}
      className="group bg-[#F7F4EE] rounded-2xl overflow-hidden border border-[#E6E0D8] hover:border-[#5B6B54]/50 transition-all duration-300 hover:shadow-lg flex flex-col h-full cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 bg-[#E6E0D8]/40 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} lifestyle`}
            className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            loading="lazy"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isFeatured && (
            <span className="bg-[#5B6B54] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
              Top Featured
            </span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="bg-[#2C221E] text-[#FDFBF7] text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wider">
              Save ${(product.originalPrice - product.price).toFixed(0)}
            </span>
          )}
        </div>

        {/* Quick View Floating Eye Button */}
        <button
          id={`quick-view-${product.id}`}
          onClick={handleQuickView}
          className="absolute bottom-3 right-3 bg-[#FDFBF7]/90 hover:bg-[#FDFBF7] text-[#2C221E] p-2 rounded-full shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          title="Quick View Details"
          aria-label="Quick View Details"
        >
          <Eye className="w-4 h-4 text-[#2C221E]" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-[#8C827A] mb-1.5">
            <span className="font-medium">{product.category}</span>
            <div className="flex items-center gap-1 text-[#2C221E]">
              <Star className="w-3.5 h-3.5 fill-[#5B6B54] text-[#5B6B54]" />
              <span className="font-semibold">{product.rating.toFixed(1)}</span>
              <span className="text-[#8C827A]">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="font-serif text-base sm:text-lg font-bold text-[#2C221E] group-hover:text-[#5B6B54] transition-colors leading-snug line-clamp-2 mb-2">
            {product.name}
          </h3>

          <p className="text-xs text-[#8C827A] line-clamp-2 mb-4 leading-relaxed">
            {product.shortDescription || product.description}
          </p>
        </div>

        <div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-serif text-xl font-bold text-[#2C221E]">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#8C827A] line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Action Buttons: Add to Cart & Buy Now */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E6E0D8]">
            <button
              id={`add-to-cart-${product.id}`}
              onClick={handleAddToCart}
              className="w-full py-2 px-2 bg-[#FDFBF7] border border-[#2C221E] text-[#2C221E] hover:bg-[#2C221E] hover:text-[#FDFBF7] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>

            <button
              id={`buy-now-${product.id}`}
              onClick={handleBuyNow}
              className="w-full py-2 px-2 bg-[#5B6B54] hover:bg-[#495743] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
