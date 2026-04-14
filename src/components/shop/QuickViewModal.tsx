'use client';
import Image from 'next/image';
import { X, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/lib/store';
import Badge from '@/components/ui/Badge';
import { useState } from 'react';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

interface Props {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, open, onClose }: Props) {
  const { addToCart, toggleWishlist, isInWishlist, showToast } = useStore();
  const [selectedSize, setSelectedSize] = useState('M');
  const inWishlist = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, selectedSize);
    showToast(`✓ Added to cart — Size ${selectedSize}`);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div
        className="bg-white rounded-2xl overflow-hidden w-full max-w-2xl"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--beige)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text-dark)' }}>Quick View</h2>
          <button onClick={onClose}><X size={20} style={{ color: 'var(--text-mid)' }} /></button>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-64 h-64 md:h-auto flex-shrink-0" style={{ minHeight: 280 }}>
            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="256px" />
            {product.badge && <div className="absolute top-3 left-3"><Badge label={product.badge} /></div>}
          </div>
          <div className="flex-1 p-6 flex flex-col gap-4">
            <div>
              <p style={{ fontSize: 11, color: 'var(--text-light)', fontFamily: 'var(--font-body)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>{product.category}</p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, color: 'var(--text-dark)', lineHeight: 1.3 }}>{product.name}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 20, fontWeight: 600, color: 'var(--gold-dark)', marginTop: 8 }}>₹{product.price.toLocaleString()}</p>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 8 }}>Select Size</p>
              <div className="flex flex-wrap gap-2">
                {sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className="w-10 h-10 rounded-lg text-[12px] font-medium border transition-all"
                    style={{
                      fontFamily: 'var(--font-body)',
                      background: selectedSize === s ? 'var(--gold)' : 'transparent',
                      color: selectedSize === s ? 'white' : 'var(--text-mid)',
                      borderColor: selectedSize === s ? 'var(--gold)' : 'var(--beige)',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 mt-2">
              <button
                onClick={handleAdd}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[12px] uppercase tracking-wider text-white transition-all hover:opacity-90"
                style={{ background: 'var(--gold)', fontFamily: 'var(--font-body)' }}
              >
                <ShoppingBag size={15} /> Add to Cart
              </button>
              <button
                onClick={() => { toggleWishlist(product.id); showToast(inWishlist ? '♡ Removed from wishlist' : '♥ Added to wishlist'); }}
                className="w-12 rounded-xl border flex items-center justify-center transition-colors"
                style={{ borderColor: 'var(--beige)', color: inWishlist ? '#C94040' : 'var(--text-light)' }}
              >
                <Heart size={18} fill={inWishlist ? '#C94040' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
