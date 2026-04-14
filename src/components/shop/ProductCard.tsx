'use client';
import Image from 'next/image';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/lib/store';
import Badge from '@/components/ui/Badge';
import { useState } from 'react';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  product: Product;
  view?: 'grid' | 'list';
}

export default function ProductCard({ product, view = 'grid' }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, showToast } = useStore();
  const [quickView, setQuickView] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    showToast(`✓ ${product.name.split(' ').slice(0, 3).join(' ')} added to cart`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
    showToast(inWishlist ? '♡ Removed from wishlist' : '♥ Added to wishlist');
  };

  if (view === 'list') {
    return (
      <div
        className="flex gap-4 p-4 rounded-xl border transition-all hover:shadow-md"
        style={{ background: 'var(--white)', borderColor: 'var(--beige)', boxShadow: 'var(--shadow-sm)' }}
      >
        <div className="relative w-24 h-28 flex-shrink-0 rounded-lg overflow-hidden">
          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="96px" />
          {product.badge && (
            <div className="absolute top-1.5 left-1.5"><Badge label={product.badge} /></div>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <p style={{ fontSize: 11, color: 'var(--text-light)', fontFamily: 'var(--font-body)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 4 }}>{product.category}</p>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 500, color: 'var(--text-dark)', lineHeight: 1.3 }}>{product.name}</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: 'var(--gold-dark)', marginTop: 6 }}>₹{product.price.toLocaleString()}</p>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={handleAddToCart} className="flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] uppercase tracking-wider text-white transition-colors" style={{ background: 'var(--gold)', fontFamily: 'var(--font-body)' }}>
              <ShoppingBag size={13} /> Add to Cart
            </button>
            <button onClick={handleWishlist} className="w-9 h-9 rounded-lg flex items-center justify-center border transition-colors" style={{ borderColor: 'var(--beige)', color: inWishlist ? '#C94040' : 'var(--text-light)' }}>
              <Heart size={15} fill={inWishlist ? '#C94040' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="group relative rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1"
        style={{ background: 'var(--white)', borderColor: 'var(--beige)', boxShadow: 'var(--shadow-sm)' }}
      >
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[var(--cream-dark)]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-2.5 left-2.5 z-10">
              <Badge label={product.badge} />
            </div>
          )}
          {/* Hover actions */}
          <div className="absolute inset-0 flex flex-col items-end justify-between p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleWishlist}
              className="w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110"
              style={{ background: 'var(--white)', color: inWishlist ? '#C94040' : 'var(--text-mid)' }}
            >
              <Heart size={14} fill={inWishlist ? '#C94040' : 'none'} />
            </button>
            <div className="flex flex-col gap-1.5 items-end w-full">
              <button
                onClick={() => setQuickView(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider shadow-md transition-all hover:-translate-y-0.5"
                style={{ background: 'rgba(255,255,255,0.95)', color: 'var(--text-mid)', fontFamily: 'var(--font-body)' }}
              >
                <Eye size={11} /> Quick View
              </button>
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-[10px] uppercase tracking-wider text-white rounded-full shadow-md transition-all hover:opacity-90"
                style={{ background: 'var(--gold)', fontFamily: 'var(--font-body)' }}
              >
                <ShoppingBag size={11} /> Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <p style={{ fontSize: 10, color: 'var(--text-light)', fontFamily: 'var(--font-body)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 3 }}>{product.category}</p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 500, color: 'var(--text-dark)', lineHeight: 1.3, marginBottom: 6 }} className="line-clamp-2">{product.name}</h3>
          <div className="flex items-center justify-between">
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--gold-dark)' }}>₹{product.price.toLocaleString()}</span>
            {!product.inStock && (
              <span style={{ fontSize: 10, color: '#C94040', fontFamily: 'var(--font-body)', letterSpacing: '0.5px' }}>Out of stock</span>
            )}
          </div>
        </div>
      </div>

      <QuickViewModal product={product} open={quickView} onClose={() => setQuickView(false)} />
    </>
  );
}
