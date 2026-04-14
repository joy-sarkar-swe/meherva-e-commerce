'use client';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useState } from 'react';
import CheckoutModal from './CheckoutModal';

interface Props { open: boolean; onClose: () => void; }

export default function CartDrawer({ open, onClose }: Props) {
  const { cart, removeFromCart, updateQty, cartTotal } = useStore();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      <div className={`side-drawer${open ? ' open' : ''}`}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--beige)' }}>
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} style={{ color: 'var(--gold)' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text-dark)' }}>Shopping Cart</h2>
          </div>
          <button onClick={onClose}><X size={20} style={{ color: 'var(--text-mid)' }} /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
              <ShoppingBag size={40} style={{ color: 'var(--beige-mid)' }} />
              <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-light)', fontSize: 14 }}>Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-3 pb-4 border-b" style={{ borderColor: 'var(--beige)' }}>
                <div className="relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: 'var(--text-dark)', lineHeight: 1.3 }} className="line-clamp-2">{item.name}</h4>
                  {item.size && <p style={{ fontSize: 11, color: 'var(--text-light)', fontFamily: 'var(--font-body)', marginTop: 2 }}>Size: {item.size}</p>}
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--gold-dark)', marginTop: 4 }}>₹{item.price.toLocaleString()}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-6 h-6 rounded-full border flex items-center justify-center transition-colors hover:bg-[var(--cream)]" style={{ borderColor: 'var(--beige)' }}>
                      <Minus size={10} style={{ color: 'var(--text-mid)' }} />
                    </button>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--text-dark)', minWidth: 20, textAlign: 'center' }}>{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-6 h-6 rounded-full border flex items-center justify-center transition-colors hover:bg-[var(--cream)]" style={{ borderColor: 'var(--beige)' }}>
                      <Plus size={10} style={{ color: 'var(--text-mid)' }} />
                    </button>
                    <button onClick={() => removeFromCart(item.id)} className="ml-auto" style={{ color: 'var(--text-light)' }}>
                      <X size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="px-5 py-4 border-t" style={{ borderColor: 'var(--beige)', background: 'var(--cream)' }}>
            <div className="flex justify-between items-center mb-4">
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Total Amount</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--gold-dark)' }}>₹{cartTotal.toLocaleString()}</span>
            </div>
            <button
              onClick={() => { setCheckoutOpen(true); onClose(); }}
              className="w-full py-3.5 rounded-xl text-[12px] uppercase tracking-widest text-white font-semibold transition-opacity hover:opacity-90"
              style={{ background: 'var(--gold)', fontFamily: 'var(--font-body)' }}
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}
