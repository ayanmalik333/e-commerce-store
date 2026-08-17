import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, X, Trash2, Plus, Minus, Check, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    toggleCartItemCheck,
    toggleAllCartItemsCheck,
    getCheckedTotal,
    getCheckedItemCount,
    getTotalCartItemsCount,
    setCurrentPage,
    setDirectBuyItem
  } = useStore();

  const checkedTotal = getCheckedTotal();
  const checkedCount = getCheckedItemCount();
  const totalCount = getTotalCartItemsCount();
  const allChecked = cart.length > 0 && cart.every(item => item.isChecked);
  const freeShippingThreshold = 100;
  const progressToFreeShipping = Math.min(100, (checkedTotal / freeShippingThreshold) * 100);

  const handleProceedToCheckout = () => {
    if (checkedCount === 0) return;
    setDirectBuyItem(null); // Clear direct buy mode so checkout uses checked cart items
    setIsCartOpen(false);
    setCurrentPage('checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div id="cart-drawer-overlay" className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-[#2C221E]/50 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md bg-[#FDFBF7] text-[#2C221E] shadow-2xl h-full flex flex-col z-10 border-l border-[#E6E0D8]"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#E6E0D8] bg-[#F7F4EE] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#5B6B54]/10 rounded-lg text-[#5B6B54]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-semibold tracking-tight text-[#2C221E]">
                    Saved Cart & Wishlist
                  </h2>
                  <p className="text-xs text-[#8C827A]">
                    {totalCount} {totalCount === 1 ? 'item' : 'items'} saved ({checkedCount} selected for checkout)
                  </p>
                </div>
              </div>
              <button
                id="close-cart-btn"
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-[#8C827A] hover:text-[#2C221E] hover:bg-[#E6E0D8]/50 rounded-full transition-colors"
                aria-label="Close Cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Smart Checkbox Notice */}
            <div className="bg-[#5B6B54]/10 px-5 py-2.5 border-b border-[#5B6B54]/20 flex items-center justify-between text-xs text-[#2C221E]">
              <span className="flex items-center gap-1.5 font-medium">
                <Tag className="w-3.5 h-3.5 text-[#5B6B54]" />
                Select checkboxes to choose items for checkout
              </span>
              {cart.length > 0 && (
                <button
                  id="select-all-cart-btn"
                  onClick={() => toggleAllCartItemsCheck(!allChecked)}
                  className="font-semibold text-[#5B6B54] hover:underline cursor-pointer"
                >
                  {allChecked ? 'Deselect All' : 'Select All'}
                </button>
              )}
            </div>

            {/* Free Shipping Progress */}
            {checkedTotal > 0 && (
              <div className="px-5 py-3 bg-[#F7F4EE]/60 border-b border-[#E6E0D8]">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-[#8C827A]">
                    {checkedTotal >= freeShippingThreshold ? (
                      <span className="text-[#5B6B54] font-medium flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Free Express Shipping Unlocked!
                      </span>
                    ) : (
                      `Add $${(freeShippingThreshold - checkedTotal).toFixed(2)} more for Free Shipping`
                    )}
                  </span>
                  <span className="font-semibold">{Math.round(progressToFreeShipping)}%</span>
                </div>
                <div className="w-full bg-[#E6E0D8] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#5B6B54] h-full transition-all duration-300"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>
            )}

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#8C827A]">
                  <div className="w-16 h-16 rounded-full bg-[#F7F4EE] flex items-center justify-center mb-4 border border-[#E6E0D8]">
                    <ShoppingBag className="w-8 h-8 text-[#8C827A]" />
                  </div>
                  <p className="font-serif text-lg font-medium text-[#2C221E] mb-1">Your cart is empty</p>
                  <p className="text-sm max-w-xs mb-6">
                    Discover our collection of artisanal European flax linens, terra ceramics, and soy scents.
                  </p>
                  <button
                    id="cart-empty-explore-btn"
                    onClick={() => {
                      setIsCartOpen(false);
                      setCurrentPage('shop');
                    }}
                    className="px-6 py-2.5 bg-[#2C221E] text-[#FDFBF7] rounded-lg text-sm font-medium hover:bg-[#5B6B54] transition-colors cursor-pointer"
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div
                    key={item.product.id}
                    className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                      item.isChecked
                        ? 'bg-[#F7F4EE] border-[#5B6B54]/40 shadow-xs'
                        : 'bg-[#FDFBF7] border-[#E6E0D8] opacity-80'
                    }`}
                  >
                    {/* Checkbox Trigger */}
                    <button
                      id={`cart-checkbox-${item.product.id}`}
                      onClick={() => toggleCartItemCheck(item.product.id)}
                      className={`mt-1 flex-shrink-0 w-5 h-5 rounded border transition-colors flex items-center justify-center cursor-pointer ${
                        item.isChecked
                          ? 'bg-[#5B6B54] border-[#5B6B54] text-white'
                          : 'border-[#8C827A] bg-white hover:border-[#5B6B54]'
                      }`}
                      aria-label={item.isChecked ? 'Deselect item' : 'Select item'}
                    >
                      {item.isChecked && <Check className="w-3.5 h-3.5" />}
                    </button>

                    {/* Product Image */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-18 h-18 object-cover rounded-lg border border-[#E6E0D8] flex-shrink-0"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-serif text-sm font-semibold text-[#2C221E] truncate leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          id={`remove-cart-${item.product.id}`}
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#8C827A] hover:text-red-700 p-1 rounded transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-xs text-[#8C827A] mb-2">{item.product.category}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-[#E6E0D8] bg-[#FDFBF7] rounded-lg">
                          <button
                            id={`qty-minus-${item.product.id}`}
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 px-2 text-[#2C221E] hover:bg-[#E6E0D8]/40 rounded-l-lg transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                          <button
                            id={`qty-plus-${item.product.id}`}
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 px-2 text-[#2C221E] hover:bg-[#E6E0D8]/40 rounded-r-lg transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-semibold text-sm text-[#2C221E]">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Dynamic Checkout */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-[#E6E0D8] bg-[#F7F4EE] space-y-3">
                <div className="space-y-1.5 text-xs text-[#8C827A]">
                  <div className="flex justify-between">
                    <span>Selected Items ({checkedCount})</span>
                    <span className="text-[#2C221E] font-medium">${checkedTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className="text-[#2C221E] font-medium">
                      {checkedTotal >= freeShippingThreshold ? 'FREE' : checkedTotal > 0 ? '$12.00' : '$0.00'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E6E0D8] flex justify-between items-baseline">
                  <div>
                    <span className="text-xs text-[#8C827A] block">Total for Selected</span>
                    <span className="font-serif text-2xl font-bold text-[#2C221E]">
                      ${(checkedTotal + (checkedTotal > 0 && checkedTotal < freeShippingThreshold ? 12 : 0)).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#5B6B54]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay on Delivery</span>
                  </div>
                </div>

                <button
                  id="proceed-to-checkout-btn"
                  disabled={checkedCount === 0}
                  onClick={handleProceedToCheckout}
                  className={`w-full py-3.5 px-4 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                    checkedCount > 0
                      ? 'bg-[#2C221E] text-[#FDFBF7] hover:bg-[#5B6B54] shadow-md cursor-pointer'
                      : 'bg-[#E6E0D8] text-[#8C827A] cursor-not-allowed opacity-70'
                  }`}
                >
                  <span>
                    {checkedCount > 0
                      ? `Proceed to Checkout (${checkedCount} ${checkedCount === 1 ? 'item' : 'items'})`
                      : 'Check at least 1 item to proceed'}
                  </span>
                  {checkedCount > 0 && <ArrowRight className="w-4 h-4" />}
                </button>

                <p className="text-[11px] text-center text-[#8C827A]">
                  Unchecked items will remain saved in your wishlist for later.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
