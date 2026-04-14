'use client';
import { useStore } from '@/lib/store';
import { Package, ShoppingCart, Heart, TrendingUp, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function DashboardPage() {
  const { products, orders, cart, wishlist } = useStore();

  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const pending = orders.filter(o => o.status === 'pending').length;
  const processing = orders.filter(o => o.status === 'processing').length;

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, color: '#A07845', bg: 'rgba(160,120,69,0.08)', change: '+3 this month' },
    { label: 'Total Orders', value: orders.length, icon: ShoppingCart, color: '#4A90A4', bg: 'rgba(74,144,164,0.08)', change: `${pending} pending` },
    { label: 'Revenue', value: `₹${revenue.toLocaleString()}`, icon: TrendingUp, color: '#5C8B3F', bg: 'rgba(92,139,63,0.08)', change: 'All time' },
    { label: 'Wishlist Items', value: wishlist.length, icon: Heart, color: '#C94040', bg: 'rgba(201,64,64,0.08)', change: 'Active users' },
  ];

  const recentOrders = orders.slice(0, 5);
  const topProducts = [...products].sort((a, b) => b.price - a.price).slice(0, 5);

  const statusColors: Record<string, { bg: string; color: string }> = {
    pending: { bg: '#FEF3C7', color: '#D97706' },
    processing: { bg: '#DBEAFE', color: '#2563EB' },
    shipped: { bg: '#D1FAE5', color: '#059669' },
    delivered: { bg: '#F0FDF4', color: '#16A34A' },
    cancelled: { bg: '#FEF2F2', color: '#DC2626' },
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome */}
      <div className="rounded-2xl p-6" style={{ background: 'var(--gold-dark)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.07, backgroundImage: 'radial-gradient(circle at 80% 50%, white 0%, transparent 55%)' }} />
        <div className="relative">
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.6)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 400, color: 'white', marginBottom: 8 }}>Welcome to Meherva Admin ✦</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
            You have <strong style={{ color: 'white' }}>{pending}</strong> pending order{pending !== 1 ? 's' : ''} and <strong style={{ color: 'white' }}>{products.length}</strong> products in your catalog.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl p-5" style={{ background: 'var(--white)', border: '1px solid var(--beige)' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: stat.bg }}>
                  <Icon size={18} style={{ color: stat.color }} />
                </div>
                <ArrowUpRight size={14} style={{ color: 'var(--text-light)' }} />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 500, color: 'var(--text-dark)', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.5px', textTransform: 'uppercase', marginTop: 4 }}>{stat.label}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: stat.color, marginTop: 6 }}>{stat.change}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--white)', border: '1px solid var(--beige)' }}>
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--beige)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--text-dark)' }}>Recent Orders</h3>
            <Link href="/admin/orders" style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.5px', textDecoration: 'none', textTransform: 'uppercase' }}>View All</Link>
          </div>
          {recentOrders.length === 0 ? (
            <div className="p-8 text-center" style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-light)' }}>No orders yet</div>
          ) : (
            <div className="divide-y" style={{ borderColor: 'var(--beige)' }}>
              {recentOrders.map(order => {
                const sc = statusColors[order.status] || statusColors.pending;
                return (
                  <div key={order.id} className="flex items-center justify-between px-5 py-3">
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: 'var(--text-dark)' }}>#{order.id}</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)' }}>{order.name} · {order.items.length} item{order.items.length > 1 ? 's' : ''}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--gold-dark)' }}>₹{order.total.toLocaleString()}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide" style={{ background: sc.bg, color: sc.color, fontFamily: 'var(--font-body)', fontWeight: 600 }}>{order.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Top Products */}
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--white)', border: '1px solid var(--beige)' }}>
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--beige)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--text-dark)' }}>Top Products</h3>
            <Link href="/admin/products" style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.5px', textDecoration: 'none', textTransform: 'uppercase' }}>Manage</Link>
          </div>
          <div className="divide-y" style={{ borderColor: 'var(--beige)' }}>
            {topProducts.map(p => (
              <div key={p.id} className="flex items-center gap-3 px-5 py-3">
                <div className="relative w-10 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={p.image} alt={p.name} fill className="object-cover" sizes="40px" />
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, color: 'var(--text-dark)' }} className="truncate">{p.name}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)' }}>{p.category}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--gold-dark)', flexShrink: 0 }}>₹{p.price.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Add Product', href: '/admin/products', desc: 'Add new items to catalog', icon: '＋', color: 'var(--gold)' },
          { label: 'View Orders', href: '/admin/orders', desc: 'Manage all orders', icon: '📋', color: '#4A90A4' },
          { label: 'Visit Store', href: '/', desc: 'See your live store', icon: '🏪', color: '#5C8B3F' },
          { label: 'Settings', href: '/admin/settings', desc: 'Configure your store', icon: '⚙', color: '#8B6A3E' },
        ].map(action => (
          <Link key={action.label} href={action.href} className="rounded-2xl p-5 flex flex-col gap-2 transition-all hover:-translate-y-0.5 hover:shadow-md" style={{ background: 'var(--white)', border: '1px solid var(--beige)', textDecoration: 'none' }}>
            <div style={{ fontSize: 22 }}>{action.icon}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--text-dark)' }}>{action.label}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)' }}>{action.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
