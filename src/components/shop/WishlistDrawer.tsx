'use client';
import Image from 'next/image';
import { X, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '@/lib/store';

interface Props { open: boolean; onClose: () => void; }

export default function WishlistDrawer({ open, onClose }: Props) {
  const { products, wishlist, toggleWishlist, addToCart, showToast } = useStore();
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className={`side-drawer${open ? ' open' : ''}`}>
      <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--beige)' }}>
        <div className="flex items-center gap-2">
          <Heart size={18} style={{ color: 'var(--gold)' }} fill="var(--gold)" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text-dark)' }}>My Wishlist</h2>
        </div>
        <button onClick={onClose}><X size={20} style={{ color: 'var(--text-mid)' }} /></button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
        {wishlistProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
            <Heart size={40} style={{ color: 'var(--beige-mid)' }} />
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-light)', fontSize: 14 }}>Your wishlist is empty</p>
          </div>
        ) : (
          wishlistProducts.map(product => (
            <div key={product.id} className="flex gap-3 pb-4 border-b" style={{ borderColor: 'var(--beige)' }}>
              <div className="relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={product.image} alt={product.name} fill className="object-cover" sizes="64px" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: 'var(--text-dark)', lineHeight: 1.3 }} className="line-clamp-2">{product.name}</h4>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--gold-dark)', marginTop: 4 }}>₹{product.price.toLocaleString()}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => { addToCart(product); showToast('✓ Added to cart'); }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider text-white"
                    style={{ background: 'var(--gold)', fontFamily: 'var(--font-body)' }}
                  >
                    <ShoppingBag size={11} /> Add
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="w-7 h-7 rounded-lg border flex items-center justify-center"
                    style={{ borderColor: 'var(--beige)', color: '#C94040' }}
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
