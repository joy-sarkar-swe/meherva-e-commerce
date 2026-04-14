'use client';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import PublicLayout from '@/components/layout/PublicLayout';
import ProductCard from '@/components/shop/ProductCard';
import { useStore } from '@/lib/store';
import { Category, SortOption } from '@/types';
import { SlidersHorizontal, LayoutGrid, List, ChevronRight } from 'lucide-react';

const cats: Category[] = ['All', 'Kurtas & Kurtis', 'Dresses', 'Ethnic Sets', 'Co-ords'];

const priceRanges = [
  { label: 'Under ₹1,500', min: 0, max: 1500 },
  { label: '₹1,500 – ₹2,000', min: 1500, max: 2000 },
  { label: '₹2,000 – ₹2,500', min: 2000, max: 2500 },
  { label: 'Above ₹2,500', min: 2500, max: Infinity },
];

export default function ShopContent() {
  const searchParams = useSearchParams();
  const urlCat = searchParams.get('cat') as Category | null;
  const { products } = useStore();

  const [category, setCategory] = useState<Category>(urlCat || 'All');
  const [sort, setSort] = useState<SortOption>('');
  const [priceRange, setPriceRange] = useState<number | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== 'All') list = list.filter(p => p.category === category);
    if (priceRange !== null) {
      const range = priceRanges[priceRange];
      list = list.filter(p => p.price >= range.min && p.price < range.max);
    }
    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'newest') list.sort((a, b) => b.id - a.id);
    return list;
  }, [products, category, sort, priceRange]);

  const Sidebar = () => (
    <aside style={{ width: 220, flexShrink: 0 }}>
      {/* Featured image */}
      <div className="rounded-xl overflow-hidden mb-4 hidden md:block" style={{ aspectRatio: '3/4' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=300&q=80" alt="Featured" className="w-full h-full object-cover" />
      </div>

      {/* Categories */}
      <div className="rounded-xl p-4 mb-3" style={{ background: 'var(--white)', border: '1px solid var(--beige)' }}>
        <div className="flex items-center gap-2 mb-3">
          <LayoutGrid size={13} style={{ color: 'var(--gold)' }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-dark)' }}>Categories</span>
        </div>
        <ul className="flex flex-col gap-1">
          {cats.map(c => (
            <li key={c}>
              <button
                onClick={() => setCategory(c)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-[12px] transition-all text-left"
                style={{ fontFamily: 'var(--font-body)', background: category === c ? 'var(--cream-dark)' : 'transparent', color: category === c ? 'var(--gold-dark)' : 'var(--text-mid)', fontWeight: category === c ? 600 : 400 }}
              >
                {c}
                {category === c && <ChevronRight size={12} />}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className="rounded-xl p-4 mb-3" style={{ background: 'var(--white)', border: '1px solid var(--beige)' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-dark)', marginBottom: 12 }}>Price Range</div>
        <ul className="flex flex-col gap-1">
          {priceRanges.map((r, i) => (
            <li key={i}>
              <button
                onClick={() => setPriceRange(priceRange === i ? null : i)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] transition-all text-left"
                style={{ fontFamily: 'var(--font-body)', background: priceRange === i ? 'var(--cream-dark)' : 'transparent', color: priceRange === i ? 'var(--gold-dark)' : 'var(--text-mid)', fontWeight: priceRange === i ? 600 : 400 }}
              >
                <span className="w-3.5 h-3.5 rounded border flex-shrink-0 flex items-center justify-center" style={{ borderColor: priceRange === i ? 'var(--gold)' : 'var(--beige-mid)', background: priceRange === i ? 'var(--gold)' : 'transparent' }}>
                  {priceRange === i && <span className="text-white" style={{ fontSize: 8, lineHeight: 1 }}>✓</span>}
                </span>
                {r.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Results count */}
      <div className="rounded-xl p-4" style={{ background: 'var(--white)', border: '1px solid var(--beige)' }}>
        <div className="flex items-center justify-between">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--text-dark)' }}>{filtered.length} Results</span>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden" style={{ color: 'var(--text-light)', fontSize: 12 }}>Done</button>
        </div>
        <div className="mt-3">
          <label style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Sort By</label>
          <select value={sort} onChange={e => setSort(e.target.value as SortOption)} className="w-full mt-1.5 px-3 py-2 rounded-lg text-[12px] border outline-none" style={{ fontFamily: 'var(--font-body)', borderColor: 'var(--beige)', background: 'var(--cream)', color: 'var(--text-dark)' }}>
            <option value="">Bestselling</option>
            <option value="price_asc">Price: Low–High</option>
            <option value="price_desc">Price: High–Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>
    </aside>
  );

  return (
    <PublicLayout>
      {/* Page header */}
      <div style={{ background: 'var(--cream-dark)', borderBottom: '1px solid var(--beige)', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>Our Collection</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, color: 'var(--text-dark)' }}>
            {category === 'All' ? 'All Products' : category}
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '32px 24px' }}>
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 flex md:hidden">
              <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
              <div className="relative bg-white p-5 w-72 overflow-y-auto ml-auto h-full">
                <Sidebar />
              </div>
            </div>
          )}

          {/* Products area */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-light)' }}>
                Total <strong style={{ color: 'var(--text-dark)' }}>{filtered.length}</strong> Results
              </div>
              <div className="flex items-center gap-3">
                {/* Mobile filter btn */}
                <button onClick={() => setSidebarOpen(true)} className="flex items-center gap-2 md:hidden px-4 py-2 rounded-lg border text-[12px]" style={{ fontFamily: 'var(--font-body)', borderColor: 'var(--beige)', color: 'var(--text-mid)' }}>
                  <SlidersHorizontal size={14} /> Filter
                </button>
                {/* Desktop sort */}
                <select value={sort} onChange={e => setSort(e.target.value as SortOption)} className="hidden md:block px-3 py-2 rounded-lg text-[12px] border outline-none" style={{ fontFamily: 'var(--font-body)', borderColor: 'var(--beige)', background: 'var(--cream)', color: 'var(--text-dark)' }}>
                  <option value="">Bestselling</option>
                  <option value="price_asc">Price: Low–High</option>
                  <option value="price_desc">Price: High–Low</option>
                  <option value="newest">Newest First</option>
                </select>
                {/* View toggle */}
                <div className="flex rounded-lg border overflow-hidden" style={{ borderColor: 'var(--beige)' }}>
                  {(['grid', 'list'] as const).map(v => (
                    <button key={v} onClick={() => setView(v)}
                      className="w-9 h-9 flex items-center justify-center transition-colors"
                      style={{ background: view === v ? 'var(--gold)' : 'var(--white)', color: view === v ? 'white' : 'var(--text-mid)' }}>
                      {v === 'grid' ? <LayoutGrid size={14} /> : <List size={14} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Category chips */}
            <div className="flex gap-2 flex-wrap mb-5">
              {cats.map(c => (
                <button key={c} onClick={() => setCategory(c)}
                  className="px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wide border transition-all"
                  style={{ fontFamily: 'var(--font-body)', background: category === c ? 'var(--gold)' : 'transparent', color: category === c ? 'white' : 'var(--text-mid)', borderColor: category === c ? 'var(--gold)' : 'var(--beige)' }}>
                  {c}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div style={{ fontSize: 40 }}>✦</div>
                <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-light)' }}>No products found. Try a different filter.</p>
              </div>
            ) : view === 'grid' ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filtered.map(p => <ProductCard key={p.id} product={p} view="list" />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
