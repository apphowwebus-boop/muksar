import { useState } from 'react';
import { Minus, Plus, Ruler, X } from 'lucide-react';
import { Product, SIZE_CHART_ROWS } from '../data/catalog';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onOpenBulkModal: () => void;
}

export function ProductModal({
  product,
  onClose,
  onAddToCart,
  onOpenBulkModal,
}: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);

  if (!product) return null;

  const activeSize = product.sizes.includes(selectedSize)
    ? selectedSize
    : product.sizes[0];

  const handleAdd = () => {
    onAddToCart(product, activeSize, quantity);
    setQuantity(1);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-2xl border border-neutral-200 my-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product view"
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-neutral-950 hover:text-white text-neutral-900 rounded-md border border-neutral-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Model Photography */}
          <div className="bg-neutral-100 aspect-[3/4] md:aspect-auto md:h-full max-h-[640px] overflow-hidden">
            <img
              src={product.image}
              alt={product.imageAlt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Right: Contiguous Purchase Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider font-medium mb-2">
                <span>{product.audience}</span>
                <span aria-hidden="true">·</span>
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{product.sku}</span>
              </div>

              <h2 className="font-display text-3xl font-extrabold text-neutral-950 uppercase tracking-tight leading-none mb-3">
                {product.name}
              </h2>

              <div className="flex items-center gap-3 mb-5 text-xs font-semibold">
                <span className="text-[#E10600] uppercase tracking-wider tabular-nums">
                  Factory MOQ: {product.moq} units
                </span>
                <span className="text-neutral-300" aria-hidden="true">·</span>
                <span className="text-neutral-700">Custom Logo &amp; Private Label Ready</span>
              </div>

              <p className="text-sm text-neutral-600 leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Colorway & Fabric */}
              <div className="grid grid-cols-2 gap-4 py-3.5 border-y border-neutral-200 text-xs mb-5">
                <div>
                  <span className="block text-neutral-500 mb-0.5">Colorway</span>
                  <span className="font-semibold text-neutral-950 inline-flex items-center gap-1.5">
                    <span
                      className="w-3 h-3 rounded-xs border border-neutral-300 inline-block"
                      style={{ backgroundColor: product.swatchHex }}
                    />
                    {product.colorway}
                  </span>
                </div>
                <div>
                  <span className="block text-neutral-500 mb-0.5">Fabric Spec</span>
                  <span className="font-semibold text-neutral-950">{product.fabric}</span>
                </div>
              </div>

              {/* Size Matrix */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-neutral-900 uppercase tracking-wide">
                    Select Size · {product.fit}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowSizeChart((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-[#E10600] transition-colors cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{showSizeChart ? 'Hide Size Chart' : 'Size Chart (Inches)'}</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = activeSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[46px] h-10 px-3 text-xs font-bold rounded-md border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#0A0A0B] border-[#0A0A0B] text-white'
                            : 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-950'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                {showSizeChart && (
                  <div className="mt-3 overflow-x-auto border border-neutral-200 rounded-md">
                    <table className="w-full text-left text-xs tabular-nums">
                      <thead className="bg-neutral-100 text-neutral-700 font-semibold">
                        <tr>
                          <th className="px-2.5 py-2">Size</th>
                          <th className="px-2.5 py-2">Chest</th>
                          <th className="px-2.5 py-2">Waist</th>
                          <th className="px-2.5 py-2">Hip</th>
                          <th className="px-2.5 py-2">Length</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200">
                        {SIZE_CHART_ROWS.map((row) => (
                          <tr key={row.size} className="bg-white">
                            <td className="px-2.5 py-1.5 font-semibold">{row.size}</td>
                            <td className="px-2.5 py-1.5 text-neutral-600">{row.chest}</td>
                            <td className="px-2.5 py-1.5 text-neutral-600">{row.waist}</td>
                            <td className="px-2.5 py-1.5 text-neutral-600">{row.hip}</td>
                            <td className="px-2.5 py-1.5 text-neutral-600">{row.length}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Construction Specs */}
              <ul className="space-y-1.5 text-xs text-neutral-600">
                {product.specs.map((spec) => (
                  <li key={spec} className="flex items-start gap-2">
                    <span className="text-[#E10600] font-bold">·</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-neutral-200 space-y-3">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center border border-neutral-300 rounded-md h-11">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 h-full text-neutral-700 hover:text-neutral-950 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-sm font-semibold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 h-full text-neutral-700 hover:text-neutral-950 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex-1 h-11 px-6 text-sm font-semibold text-white bg-[#E10600] hover:bg-[#C40500] rounded-md transition-colors cursor-pointer"
                >
                  Add to Bag · {quantity} {quantity === 1 ? 'Item' : 'Items'}
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenBulkModal();
                }}
                className="w-full py-2 text-xs font-semibold text-neutral-700 hover:text-neutral-950 underline underline-offset-4 cursor-pointer"
              >
                Need {product.moq}+ custom-branded units? Request OEM Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
