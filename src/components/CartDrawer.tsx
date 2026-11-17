import { useState } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { Product } from '../data/catalog';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [orderType, setOrderType] = useState<'sample' | 'bulk'>('sample');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim() || !postalCode.trim()) return;
    setOrderNumber(`MS-${Math.floor(1000 + Math.random() * 9000)}`);
    setCheckoutStep('confirmed');
    onClearCart();
  };

  const handleCloseDrawer = () => {
    if (checkoutStep === 'confirmed') {
      setCheckoutStep('bag');
      setCustomerName('');
      setPhone('');
      setAddress('');
      setPostalCode('');
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Order & Quote Bag"
      className="fixed inset-0 z-50 flex justify-end bg-black/65 backdrop-blur-xs"
    >
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl border-l border-neutral-200">
        {/* Drawer Header */}
        <div className="px-6 py-4 bg-[#0A0A0B] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 text-[#E10600]" />
            <h2 className="font-display text-xl font-bold uppercase tracking-tight">
              {checkoutStep === 'bag'
                ? 'Selected Apparel Bag'
                : checkoutStep === 'checkout'
                ? 'Order & Dispatch Details'
                : 'Inquiry Confirmed'}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleCloseDrawer}
            aria-label="Close bag"
            className="p-1.5 text-neutral-400 hover:text-white rounded cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Factory Supply Info Strip */}
        {checkoutStep !== 'confirmed' && (
          <div className="px-6 py-3 bg-neutral-50 border-b border-neutral-200">
            <p className="text-xs font-medium text-neutral-700">
              Direct Manufacturer Dispatch · Custom Pricing Issued Per Quantity Tier
            </p>
          </div>
        )}

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {checkoutStep === 'confirmed' ? (
            <div className="py-10 text-center space-y-4">
              <CheckCircle2 className="w-14 h-14 text-[#E10600] mx-auto" />
              <h3 className="font-display text-2xl font-extrabold uppercase text-neutral-950">
                Request #{orderNumber} Confirmed — Preparing Quote &amp; Dispatch
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Thank you, <span className="font-semibold text-neutral-950">{customerName}</span>. Our export desk has received your {orderType === 'sample' ? 'Sample Order' : 'Bulk Manufacturing'} request for {address}, {postalCode} and will reach out at {phone}.
              </p>
              <button
                type="button"
                onClick={handleCloseDrawer}
                className="mt-4 px-6 py-3 text-xs font-semibold text-white bg-[#0A0A0B] hover:bg-neutral-800 rounded-md cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center">
              <ShoppingBag className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-neutral-900 mb-1">
                Your Muksar Sports bag is empty
              </p>
              <p className="text-xs text-neutral-500 mb-6">
                Select any category item to request samples or bulk production.
              </p>
              <button
                type="button"
                onClick={handleCloseDrawer}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0A0A0B] hover:bg-neutral-800 rounded-md cursor-pointer"
              >
                Browse Apparel
              </button>
            </div>
          ) : checkoutStep === 'bag' ? (
            <div className="divide-y divide-neutral-200">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="py-4 flex gap-4"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-20 h-26 object-cover object-top rounded bg-neutral-100 border border-neutral-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-neutral-950 leading-snug truncate">
                          {item.product.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id, item.size)}
                          aria-label={`Remove ${item.product.name}`}
                          className="text-neutral-400 hover:text-[#E10600] p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Size {item.size} · {item.product.colorway}
                      </p>
                      <p className="text-[11px] text-neutral-400 mt-0.5 tabular-nums">
                        {item.product.sku} · MOQ {item.product.moq}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="inline-flex items-center border border-neutral-200 rounded">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                          aria-label="Decrease quantity"
                          className="p-1.5 text-neutral-600 hover:text-neutral-950 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                          aria-label="Increase quantity"
                          className="p-1.5 text-neutral-600 hover:text-neutral-950 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-neutral-700 tabular-nums">
                        {item.quantity} {item.quantity === 1 ? 'pc' : 'pcs'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <form id="checkout-form" onSubmit={handleConfirmOrder} className="space-y-4">
              <div>
                <span className="block text-xs font-semibold text-neutral-700 mb-2">
                  Order Type
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('sample')}
                    className={`py-2.5 px-3 text-xs font-semibold rounded-md border cursor-pointer ${
                      orderType === 'sample'
                        ? 'bg-[#0A0A0B] border-[#0A0A0B] text-white'
                        : 'bg-white border-neutral-300 text-neutral-800'
                    }`}
                  >
                    Sample Order
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('bulk')}
                    className={`py-2.5 px-3 text-xs font-semibold rounded-md border cursor-pointer ${
                      orderType === 'bulk'
                        ? 'bg-[#0A0A0B] border-[#0A0A0B] text-white'
                        : 'bg-white border-neutral-300 text-neutral-800'
                    }`}
                  >
                    Bulk / OEM Quote
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Full Name / Company *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Buyer or club name"
                  className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-md focus:outline-none focus:border-neutral-950"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-md focus:outline-none focus:border-neutral-950"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Delivery Address *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, city, country"
                  className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-md focus:outline-none focus:border-neutral-950"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Postal Code *
                </label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Postal / ZIP code"
                  className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-md focus:outline-none focus:border-neutral-950"
                />
              </div>
            </form>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && checkoutStep !== 'confirmed' && (
          <div className="px-6 py-5 border-t border-neutral-200 bg-neutral-50 space-y-3">
            <div className="flex justify-between text-sm font-semibold text-neutral-950">
              <span>Selected Items</span>
              <span className="tabular-nums">
                {totalUnits} {totalUnits === 1 ? 'Unit' : 'Units'}
              </span>
            </div>

            {checkoutStep === 'bag' ? (
              <button
                type="button"
                onClick={() => setCheckoutStep('checkout')}
                className="w-full py-3 text-sm font-semibold text-white bg-[#E10600] hover:bg-[#C40500] rounded-md transition-colors cursor-pointer"
              >
                Request Order / Quote
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('bag')}
                  className="px-4 py-3 text-xs font-semibold text-neutral-700 border border-neutral-300 rounded-md hover:bg-white cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 py-3 text-sm font-semibold text-white bg-[#E10600] hover:bg-[#C40500] rounded-md transition-colors cursor-pointer"
                >
                  Submit Request ({totalUnits} {totalUnits === 1 ? 'Unit' : 'Units'})
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
