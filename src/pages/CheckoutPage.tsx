import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, ShieldCheck, ArrowRight, Truck, ShoppingBag, ArrowLeft, Building, Phone, User, FileText, Check } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    getCheckedCartItems,
    getCheckedTotal,
    directBuyItem,
    placeOrder,
    setCurrentPage,
    auth
  } = useStore();

  // Form Fields
  const [customerName, setCustomerName] = useState(auth.user?.name || '');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(auth.user?.email || '');
  const [shippingAddress, setShippingAddress] = useState('');
  const [city, setCity] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Credit/Debit Card (Demo)' | 'Bank Transfer (Demo)'>('Cash on Delivery');

  // Confirmation state
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);

  // Determine items being purchased
  const checkoutItems = directBuyItem
    ? [{
        productId: directBuyItem.product.id,
        productName: directBuyItem.product.name,
        price: directBuyItem.product.price,
        quantity: directBuyItem.quantity,
        image: directBuyItem.product.images[0]
      }]
    : getCheckedCartItems().map(ci => ({
        productId: ci.product.id,
        productName: ci.product.name,
        price: ci.product.price,
        quantity: ci.quantity,
        image: ci.product.images[0]
      }));

  const subtotal = directBuyItem
    ? directBuyItem.product.price * directBuyItem.quantity
    : getCheckedTotal();

  const shippingCost = subtotal >= 100 || subtotal === 0 ? 0 : 12;
  const grandTotal = subtotal + shippingCost;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkoutItems.length === 0) return;

    const newOrder = placeOrder({
      customerName,
      phone,
      email,
      shippingAddress,
      city,
      orderNotes,
      paymentMethod,
      items: checkoutItems,
      totalAmount: grandTotal
    });

    setCompletedOrder(newOrder);
  };

  // Receipt / Order Confirmation View
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8">
        <div className="bg-[#F7F4EE] rounded-3xl p-8 sm:p-12 border border-[#E6E0D8] shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#5B6B54]/20 text-[#5B6B54] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B6B54]">
              Order Confirmed & Scheduled
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C221E]">
              Thank You for Your Order!
            </h1>
            <p className="text-xs text-[#8C827A]">
              Order Receipt Reference: <strong className="font-mono text-[#2C221E]">{completedOrder.id}</strong>
            </p>
          </div>

          <div className="p-6 bg-[#FDFBF7] rounded-2xl border border-[#E6E0D8] text-left text-xs space-y-3">
            <div className="flex justify-between border-b border-[#E6E0D8] pb-3">
              <span className="text-[#8C827A]">Recipient:</span>
              <span className="font-semibold text-[#2C221E]">{completedOrder.customerName} ({completedOrder.phone})</span>
            </div>
            <div className="flex justify-between border-b border-[#E6E0D8] pb-3">
              <span className="text-[#8C827A]">Delivery Address:</span>
              <span className="font-semibold text-[#2C221E]">{completedOrder.shippingAddress}, {completedOrder.city}</span>
            </div>
            <div className="flex justify-between border-b border-[#E6E0D8] pb-3">
              <span className="text-[#8C827A]">Payment Terms:</span>
              <span className="font-semibold text-[#5B6B54]">{completedOrder.paymentMethod}</span>
            </div>

            <div className="pt-2">
              <span className="text-[#8C827A] block font-semibold mb-2">Purchased Items:</span>
              <div className="space-y-2">
                {completedOrder.items.map((it: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-[#2C221E]">{it.quantity}x {it.productName}</span>
                    <span className="font-mono font-semibold">${(it.price * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E6E0D8] flex justify-between font-serif text-base font-bold text-[#2C221E]">
              <span>Total Amount Due:</span>
              <span>${completedOrder.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="receipt-return-shop-btn"
              onClick={() => setCurrentPage('shop')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#2C221E] text-[#FDFBF7] text-xs font-semibold rounded-xl hover:bg-[#5B6B54] transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
            <button
              id="receipt-view-admin-orders-btn"
              onClick={() => setCurrentPage('admin')}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#FDFBF7] text-[#2C221E] border border-[#E6E0D8] text-xs font-semibold rounded-xl hover:bg-[#E6E0D8]/40 transition-colors cursor-pointer"
            >
              View Order in Admin Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If no items selected
  if (checkoutItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#F7F4EE] border border-[#E6E0D8] flex items-center justify-center mx-auto text-[#8C827A]">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#2C221E]">No Items Selected for Checkout</h2>
        <p className="text-xs text-[#8C827A] max-w-sm mx-auto">
          Please select at least one item using the smart checkboxes in your saved cart drawer or click "Buy Now" on a product.
        </p>
        <button
          id="checkout-no-items-btn"
          onClick={() => setCurrentPage('shop')}
          className="px-6 py-3 bg-[#2C221E] text-[#FDFBF7] text-xs font-semibold rounded-xl hover:bg-[#5B6B54] transition-colors cursor-pointer"
        >
          Return to Product Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E6E0D8] pb-4">
        <div>
          <button
            id="checkout-back-btn"
            onClick={() => setCurrentPage('shop')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C827A] hover:text-[#2C221E] transition-colors cursor-pointer mb-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shopping</span>
          </button>
          <h1 className="font-serif text-3xl font-bold text-[#2C221E]">Direct Checkout</h1>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#5B6B54]">
          <ShieldCheck className="w-4 h-4" />
          <span className="font-medium">Encrypted & Direct Fulfillment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Delivery Form */}
        <form onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-6">
          <div className="bg-[#F7F4EE] p-6 sm:p-8 rounded-3xl border border-[#E6E0D8] space-y-5">
            <h3 className="font-serif text-xl font-bold text-[#2C221E] pb-3 border-b border-[#E6E0D8]">
              1. Delivery Details
            </h3>

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                Full Customer Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8C827A] absolute left-3 top-3" />
                <input
                  id="checkout-name-input"
                  type="text"
                  required
                  placeholder="e.g. Sophia Montgomery"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FDFBF7] border border-[#E6E0D8] rounded-xl focus:outline-none focus:border-[#5B6B54]"
                />
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                  Phone Number (for Courier Dispatch) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8C827A] absolute left-3 top-3" />
                  <input
                    id="checkout-phone-input"
                    type="tel"
                    required
                    placeholder="+1 (555) 019-2834"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FDFBF7] border border-[#E6E0D8] rounded-xl focus:outline-none focus:border-[#5B6B54]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                  Email Address (Receipt & Tracking)
                </label>
                <input
                  id="checkout-email-input"
                  type="email"
                  placeholder="sophia@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-[#FDFBF7] border border-[#E6E0D8] rounded-xl focus:outline-none focus:border-[#5B6B54]"
                />
              </div>
            </div>

            {/* Address & City */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                  Shipping Address *
                </label>
                <input
                  id="checkout-address-input"
                  type="text"
                  required
                  placeholder="Street name, house/apartment number..."
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-[#FDFBF7] border border-[#E6E0D8] rounded-xl focus:outline-none focus:border-[#5B6B54]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                  City / Region *
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-[#8C827A] absolute left-3 top-3" />
                  <input
                    id="checkout-city-input"
                    type="text"
                    required
                    placeholder="e.g. Portland"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FDFBF7] border border-[#E6E0D8] rounded-xl focus:outline-none focus:border-[#5B6B54]"
                  />
                </div>
              </div>
            </div>

            {/* Order Notes */}
            <div>
              <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                Special Delivery Notes (Optional)
              </label>
              <textarea
                id="checkout-notes-textarea"
                rows={2}
                placeholder="Gate code, specific delivery hour, gift note..."
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FDFBF7] border border-[#E6E0D8] rounded-xl focus:outline-none focus:border-[#5B6B54]"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-[#F7F4EE] p-6 sm:p-8 rounded-3xl border border-[#E6E0D8] space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#2C221E] pb-3 border-b border-[#E6E0D8]">
              2. Payment Options
            </h3>

            <div className="space-y-3">
              <label
                id="payment-method-cod"
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'bg-[#FDFBF7] border-[#5B6B54] ring-1 ring-[#5B6B54]'
                    : 'bg-[#FDFBF7]/60 border-[#E6E0D8]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Cash on Delivery'}
                    onChange={() => setPaymentMethod('Cash on Delivery')}
                    className="accent-[#5B6B54]"
                  />
                  <div>
                    <span className="font-semibold text-xs text-[#2C221E] block">
                      Cash on Delivery (Default Recommended)
                    </span>
                    <span className="text-[11px] text-[#8C827A]">
                      Pay in cash or mobile transfer directly to courier upon arrival.
                    </span>
                  </div>
                </div>
                <Truck className="w-5 h-5 text-[#5B6B54]" />
              </label>

              <label
                id="payment-method-card"
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'Credit/Debit Card (Demo)'
                    ? 'bg-[#FDFBF7] border-[#5B6B54] ring-1 ring-[#5B6B54]'
                    : 'bg-[#FDFBF7]/60 border-[#E6E0D8]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Credit/Debit Card (Demo)'}
                    onChange={() => setPaymentMethod('Credit/Debit Card (Demo)')}
                    className="accent-[#5B6B54]"
                  />
                  <div>
                    <span className="font-semibold text-xs text-[#2C221E] block">
                      Credit / Debit Card (Demo Sandbox)
                    </span>
                    <span className="text-[11px] text-[#8C827A]">
                      Simulates instant online payment gateway.
                    </span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <button
            id="checkout-place-order-btn"
            type="submit"
            className="w-full py-4 bg-[#2C221E] hover:bg-[#5B6B54] text-[#FDFBF7] font-semibold text-sm rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <span>Place Order Now (${grandTotal.toFixed(2)})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Order Summary Column */}
        <div className="lg:col-span-5 bg-[#F7F4EE] p-6 sm:p-8 rounded-3xl border border-[#E6E0D8] space-y-6">
          <h3 className="font-serif text-xl font-bold text-[#2C221E] pb-3 border-b border-[#E6E0D8]">
            Order Summary ({checkoutItems.reduce((acc, i) => acc + i.quantity, 0)} items)
          </h3>

          <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
            {checkoutItems.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-center bg-[#FDFBF7] p-3 rounded-xl border border-[#E6E0D8]">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-14 h-14 object-cover rounded-lg border border-[#E6E0D8] flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-xs font-semibold text-[#2C221E] truncate">
                    {item.productName}
                  </h4>
                  <span className="text-[11px] text-[#8C827A]">Qty: {item.quantity}</span>
                </div>
                <span className="font-semibold text-xs text-[#2C221E]">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E6E0D8] space-y-2 text-xs text-[#8C827A]">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="text-[#2C221E] font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Carbon-Neutral Delivery</span>
              <span className="text-[#2C221E] font-semibold">
                {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="pt-3 border-t border-[#E6E0D8] flex justify-between font-serif text-xl font-bold text-[#2C221E]">
              <span>Total Amount</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
