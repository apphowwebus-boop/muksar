import { useRef, useState } from 'react';
import { MotionConfig, motion, useScroll, useSpring } from 'motion/react';
import { Audience, PRODUCTS, Product, ProductCategory } from './data/catalog';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { ShopByDiscipline } from './components/ShopByDiscipline';
import { ProductCatalog } from './components/ProductCatalog';
import { ManufacturingSection } from './components/ManufacturingSection';
import { CustomProcessAndReviews } from './components/CustomProcessAndReviews';
import { ProductModal } from './components/ProductModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { PrivacyShield } from './components/PrivacyShield';

export default function App() {
  const [selectedAudience, setSelectedAudience] = useState<Audience>('All');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [bulkModalOpen, setBulkModalOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: Product, size: string, quantity = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (entry) => entry.product.id === product.id && entry.size === size
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { product, size, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  const handleHeroAudienceSelect = (audience: Audience) => {
    setSelectedAudience(audience);
    setSelectedCategory('All');
  };

  const handleFocusSearch = () => {
    window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 250);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-white text-neutral-950">
        {/* Top Crimson Scroll Progress Line */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX }}
          className="fixed top-0 left-0 right-0 h-[2px] bg-[#E10600] origin-left z-50 pointer-events-none"
        />

        <Header
          cartCount={cartCount}
          onOpenCart={() => setCartOpen(true)}
          onSelectAudience={(aud) => {
            setSelectedAudience(aud);
            setSelectedCategory('All');
          }}
          onFocusSearch={handleFocusSearch}
          onOpenBulkModal={() => setBulkModalOpen(true)}
        />

        <main className="flex-1">
          <HeroCarousel
            onSelectSlideAction={handleHeroAudienceSelect}
            onOpenBulkModal={() => setBulkModalOpen(true)}
          />

          <ShopByDiscipline
            onSelectDiscipline={(audience, category) => {
              setSelectedAudience(audience);
              setSelectedCategory(category);
            }}
          />

          <ProductCatalog
            products={PRODUCTS}
            selectedAudience={selectedAudience}
            onAudienceChange={setSelectedAudience}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchInputRef={searchInputRef}
            onSelectProduct={(product) => setActiveProduct(product)}
            onQuickAdd={(product, size) => handleAddToCart(product, size, 1)}
          />

          <ManufacturingSection
            bulkModalOpen={bulkModalOpen}
            onOpenBulkModal={() => setBulkModalOpen(true)}
            onCloseBulkModal={() => setBulkModalOpen(false)}
          />

          <CustomProcessAndReviews onOpenBulkModal={() => setBulkModalOpen(true)} />
        </main>

        <Footer
          onFilterSelect={(audience, category) => {
            setSelectedAudience(audience);
            setSelectedCategory(category);
          }}
          onOpenBulkModal={() => setBulkModalOpen(true)}
        />

        <ProductModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
          onAddToCart={handleAddToCart}
          onOpenBulkModal={() => setBulkModalOpen(true)}
        />

        <CartDrawer
          isOpen={cartOpen}
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={() => setCartItems([])}
        />

        <PrivacyShield />
      </div>
    </MotionConfig>
  );
}
