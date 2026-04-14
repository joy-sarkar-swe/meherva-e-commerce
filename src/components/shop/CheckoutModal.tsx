'use client';
import { X } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useState } from 'react';
import { Order } from '@/types';

interface Props { open: boolean; onClose: () => void; }

export default function CheckoutModal({ open, onClose }: Props) {
  const { cart, cartTotal, clearCart, addOrder, showToast } = useStore();
  const [form, setForm] = useState({ name: '', phone: '', pincode: '', address: '' });
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = 'MHV' + Date.now().toString().slice(-6);
    const order: Order = {
      id,
      items: [...cart],
      total: cartTotal,
      ...form,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    addOrder(order);
    clearCart();
    setOrderId(id);
    setSuccess(true);
  };

  const handleClose = () => {
    setSuccess(false);
    setForm({ name: '', phone: '', pincode: '', address: '' });
    onClose();
  };

  return (
    <div className="modal-overlay active" onClick={handleClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-lg"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--beige)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text-dark)' }}>
            {success ? 'Order Placed! 🎉' : 'Checkout'}
          </h2>
          <button onClick={handleClose}><X size={20} style={{ color: 'var(--text-mid)' }} /></button>
        </div>
        <div className="p-6">
          {success ? (
            <div className="text-center py-8 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ background: 'var(--cream-dark)' }}>🎉</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--text-dark)' }}>Thank you, {form.name}!</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-mid)' }}>Your order <strong>{orderId}</strong> has been placed.</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-light)' }}>We&apos;ll send a confirmation to your contact shortly.</p>
              <button onClick={handleClose} className="mt-4 px-8 py-3 rounded-xl text-[12px] uppercase tracking-wider text-white" style={{ background: 'var(--gold)', fontFamily: 'var(--font-body)' }}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Order summary */}
              <div className="mb-5 p-4 rounded-xl" style={{ background: 'var(--cream)', border: '1px solid var(--beige)' }}>
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between py-1.5">
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-mid)' }}>{item.name.split(' ').slice(0, 3).join(' ')} × {item.quantity}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'var(--text-dark)' }}>₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t mt-2 pt-2" style={{ borderColor: 'var(--beige)' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--text-dark)' }}>Total</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--gold-dark)' }}>₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-light)' }}>Delivery Details</p>
                {[
                  { id: 'name', label: 'Full Name *', placeholder: 'Your full name', type: 'text' },
                  { id: 'phone', label: 'Phone *', placeholder: '+91 XXXXX XXXXX', type: 'tel' },
                  { id: 'pincode', label: 'Pincode *', placeholder: '110001', type: 'text' },
                ].map(f => (
                  <div key={f.id} className="flex flex-col gap-1.5">
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.5px' }}>{f.label}</label>
                    <input
                      type={f.type}
                      required
                      placeholder={f.placeholder}
                      value={form[f.id as keyof typeof form]}
                      onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                      className="px-4 py-2.5 rounded-lg border outline-none text-[13px] transition-colors"
                      style={{ fontFamily: 'var(--font-body)', borderColor: 'var(--beige)', background: 'var(--cream)', color: 'var(--text-dark)' }}
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-1.5">
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.5px' }}>Full Address *</label>
                  <textarea
                    required
                    placeholder="House/Flat no., Street, City, State"
                    rows={3}
                    value={form.address}
                    onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
                    className="px-4 py-2.5 rounded-lg border outline-none text-[13px] resize-none"
                    style={{ fontFamily: 'var(--font-body)', borderColor: 'var(--beige)', background: 'var(--cream)', color: 'var(--text-dark)' }}
                  />
                </div>
                <button type="submit" className="w-full py-3.5 rounded-xl text-[12px] uppercase tracking-widest text-white font-semibold mt-2 transition-opacity hover:opacity-90" style={{ background: 'var(--gold)', fontFamily: 'var(--font-body)' }}>
                  Place Order 🎉
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
