'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Order } from '@/types';
import { Search, Eye, X } from 'lucide-react';

const statuses: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const statusColors: Record<string, { bg: string; color: string }> = {
  pending: { bg: '#FEF3C7', color: '#D97706' },
  processing: { bg: '#DBEAFE', color: '#2563EB' },
  shipped: { bg: '#E0E7FF', color: '#4F46E5' },
  delivered: { bg: '#D1FAE5', color: '#059669' },
  cancelled: { bg: '#FEF2F2', color: '#DC2626' },
};

export default function AdminOrdersPage() {
  const { orders, setProducts, showToast } = useStore();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [localOrders, setLocalOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('meherva_orders');
      return stored ? JSON.parse(stored) : [];
    }
    return orders;
  });

  const filtered = localOrders.filter(o => {
    const matchStatus = filterStatus === 'all' || o.status === filterStatus;
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.name.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const updateStatus = (id: string, status: Order['status']) => {
    const updated = localOrders.map(o => o.id === id ? { ...o, status } : o);
    setLocalOrders(updated);
    if (typeof window !== 'undefined') localStorage.setItem('meherva_orders', JSON.stringify(updated));
    if (selectedOrder?.id === id) setSelectedOrder(prev => prev ? { ...prev, status } : null);
    showToast(`✓ Order status updated to ${status}`);
  };

  const statusCounts = statuses.reduce((acc, s) => ({ ...acc, [s]: localOrders.filter(o => o.status === s).length }), {} as Record<string, number>);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--text-dark)' }}>Orders</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-light)' }}>{localOrders.length} total orders</p>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 flex-wrap">
        {[{ key: 'all', label: 'All', count: localOrders.length }, ...statuses.map(s => ({ key: s, label: s.charAt(0).toUpperCase() + s.slice(1), count: statusCounts[s] || 0 }))].map(tab => {
          const sc = statusColors[tab.key];
          return (
            <button key={tab.key} onClick={() => setFilterStatus(tab.key)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] border transition-all"
              style={{
                fontFamily: 'var(--font-body)',
                background: filterStatus === tab.key ? (sc?.bg || 'var(--gold)') : 'var(--white)',
                color: filterStatus === tab.key ? (sc?.color || 'var(--gold)') : 'var(--text-mid)',
                borderColor: filterStatus === tab.key ? (sc?.color || 'var(--gold)') : 'var(--beige)',
                fontWeight: filterStatus === tab.key ? 600 : 400,
              }}>
              {tab.label}
              <span className="rounded-full px-1.5 py-0.5 text-[10px]" style={{ background: 'rgba(0,0,0,0.08)' }}>{tab.count}</span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-light)' }} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by order ID or customer name..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none text-[13px]" style={{ fontFamily: 'var(--font-body)', borderColor: 'var(--beige)', background: 'var(--white)', color: 'var(--text-dark)' }} />
      </div>

      {/* Orders table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--white)', border: '1px solid var(--beige)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--beige)', background: 'var(--cream)' }}>
                {['Order ID', 'Customer', 'Items', 'Total', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left" style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-light)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => {
                const sc = statusColors[order.status];
                return (
                  <tr key={order.id} className="border-b transition-colors hover:bg-[var(--cream)]" style={{ borderColor: 'var(--beige)' }}>
                    <td className="px-4 py-3"><span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'var(--gold-dark)' }}>#{order.id}</span></td>
                    <td className="px-4 py-3">
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, color: 'var(--text-dark)' }}>{order.name}</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)' }}>{order.phone}</div>
                    </td>
                    <td className="px-4 py-3"><span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-mid)' }}>{order.items.length} item{order.items.length > 1 ? 's' : ''}</span></td>
                    <td className="px-4 py-3"><span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--gold-dark)' }}>₹{order.total.toLocaleString()}</span></td>
                    <td className="px-4 py-3">
                      <select value={order.status} onChange={e => updateStatus(order.id, e.target.value as Order['status'])}
                        className="px-2 py-1 rounded-full text-[10px] uppercase tracking-wide border-0 outline-none cursor-pointer"
                        style={{ fontFamily: 'var(--font-body)', fontWeight: 600, background: sc.bg, color: sc.color }}>
                        {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3"><span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)' }}>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span></td>
                    <td className="px-4 py-3">
                      <button onClick={() => setSelectedOrder(order)} className="w-8 h-8 rounded-lg flex items-center justify-center border transition-colors hover:bg-[var(--cream)]" style={{ borderColor: 'var(--beige)', color: 'var(--text-mid)' }}>
                        <Eye size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center flex flex-col items-center gap-3">
              <div style={{ fontSize: 32 }}>📋</div>
              <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-light)', fontSize: 13 }}>
                {localOrders.length === 0 ? 'No orders placed yet. Orders from the storefront will appear here.' : 'No orders match your filter.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Order detail modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(44,31,20,0.5)' }} onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg" style={{ maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--beige)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text-dark)' }}>Order #{selectedOrder.id}</h2>
              <button onClick={() => setSelectedOrder(null)}><X size={20} style={{ color: 'var(--text-mid)' }} /></button>
            </div>
            <div className="p-6 flex flex-col gap-5">
              {/* Customer */}
              <div className="rounded-xl p-4" style={{ background: 'var(--cream)', border: '1px solid var(--beige)' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 10 }}>Customer Details</div>
                {[['Name', selectedOrder.name], ['Phone', selectedOrder.phone], ['Pincode', selectedOrder.pincode], ['Address', selectedOrder.address]].map(([k, v]) => (
                  <div key={k} className="flex gap-3 mb-2">
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)', width: 64, flexShrink: 0 }}>{k}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-dark)' }}>{v}</span>
                  </div>
                ))}
              </div>
              {/* Items */}
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 10 }}>Order Items</div>
                {selectedOrder.items.map(item => (
                  <div key={item.id} className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--beige)' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-dark)' }}>{item.name}</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)' }}>Qty: {item.quantity}{item.size ? ` · Size: ${item.size}` : ''}</div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--gold-dark)' }}>₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-3">
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--text-dark)' }}>Total</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--gold-dark)' }}>₹{selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>
              {/* Update status */}
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 8 }}>Update Status</div>
                <div className="flex gap-2 flex-wrap">
                  {statuses.map(s => {
                    const sc = statusColors[s];
                    return (
                      <button key={s} onClick={() => updateStatus(selectedOrder.id, s)}
                        className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wide border transition-all"
                        style={{ fontFamily: 'var(--font-body)', fontWeight: 600, background: selectedOrder.status === s ? sc.bg : 'transparent', color: selectedOrder.status === s ? sc.color : 'var(--text-light)', borderColor: selectedOrder.status === s ? sc.color : 'var(--beige)' }}>
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
