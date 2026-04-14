'use client';
import PublicLayout from '@/components/layout/PublicLayout';
import ProductCard from '@/components/shop/ProductCard';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const categories = [
  { label: 'Kurtas & Kurtis', href: '/shop?cat=Kurtas+%26+Kurtis', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80', count: '48 styles' },
  { label: 'Dresses', href: '/shop?cat=Dresses', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=400&q=80', count: '32 styles' },
  { label: 'Ethnic Sets', href: '/shop?cat=Ethnic+Sets', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80', count: '24 styles' },
  { label: "Co-ords", href: '/shop?cat=Co-ords', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80', count: '18 styles' },
];

export default function HomePage() {
  const { products } = useStore();
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'New', 'Trending', 'Premium'];
  const displayed = products.filter(p => activeTab === 'All' || p.badge === activeTab).slice(0, 8);

  return (
    <PublicLayout>
      {/* HERO */}
      <section style={{ background: 'var(--cream-dark)', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'radial-gradient(circle at 70% 50%, var(--gold) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px' }}>
          <div className="flex flex-col md:flex-row items-center gap-8 py-12 md:py-16">
            <div className="flex-1 flex flex-col gap-5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 self-center md:self-start px-3 py-1.5 rounded-full" style={{ background: 'rgba(160,120,69,0.1)', border: '1px solid rgba(160,120,69,0.2)' }}>
                <Sparkles size={12} style={{ color: 'var(--gold)' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--gold-dark)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>New Collection 2025</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 400, color: 'var(--text-dark)', lineHeight: 1.1 }}>
                Trendy, Premium<br />
                <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Ethnic Wear</em>
              </h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.7, maxWidth: 400 }}>
                Premium Kurtis, Dresses & Ethnic Sets for Effortless Everyday Glam. Crafted for the modern Indian woman.
              </p>
              <div className="flex gap-3 justify-center md:justify-start flex-wrap">
                <Link href="/shop" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[12px] uppercase tracking-widest text-white font-medium transition-all hover:opacity-90" style={{ background: 'var(--gold)', fontFamily: 'var(--font-body)', textDecoration: 'none', boxShadow: '0 4px 16px rgba(160,120,69,0.35)' }}>
                  Shop Now <ArrowRight size={14} />
                </Link>
                <Link href="/about" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[12px] uppercase tracking-widest font-medium border transition-all hover:bg-[var(--gold)] hover:text-white hover:border-[var(--gold)]" style={{ fontFamily: 'var(--font-body)', textDecoration: 'none', color: 'var(--gold-dark)', borderColor: 'var(--gold)' }}>
                  Our Story
                </Link>
              </div>
              <div className="flex gap-6 justify-center md:justify-start pt-2">
                {[['500+', 'Products'], ['10K+', 'Happy Customers'], ['100%', 'Authentic']].map(([num, label]) => (
                  <div key={label} className="flex flex-col items-center md:items-start">
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--gold-dark)' }}>{num}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--text-light)', letterSpacing: '1px', textTransform: 'uppercase' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex-shrink-0 w-full max-w-sm md:w-96">
              <div className="relative h-[420px]">
                <div className="absolute top-0 left-4 w-44 h-64 rounded-2xl overflow-hidden shadow-xl">
                  <Image src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80" alt="Ethnic wear" fill className="object-cover" sizes="176px" />
                </div>
                <div className="absolute top-12 right-0 w-44 h-72 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <Image src="https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=400&q=80" alt="Ethnic wear" fill className="object-cover" sizes="176px" />
                </div>
                <div className="absolute bottom-0 left-16 w-36 h-44 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <Image src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80" alt="Ethnic wear" fill className="object-cover" sizes="144px" />
                </div>
                <div className="absolute top-4 right-4 bg-white rounded-xl px-3 py-2 shadow-lg" style={{ border: '1px solid var(--beige)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--gold-dark)', fontStyle: 'italic' }}>New Arrivals ✦</div>
                </div>
                <div className="absolute bottom-12 right-2 bg-white rounded-xl px-3 py-2 shadow-lg" style={{ border: '1px solid var(--beige)' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Starting from</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--gold-dark)' }}>₹1,299</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: '60px 0', background: 'var(--white)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div className="text-center mb-10">
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Explore</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400, color: 'var(--text-dark)' }}>Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map(cat => (
              <Link key={cat.label} href={cat.href} className="group relative rounded-2xl overflow-hidden block" style={{ aspectRatio: '3/4', textDecoration: 'none' }}>
                <Image src={cat.image} alt={cat.label} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:768px) 50vw, 25vw" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(44,31,20,0.75) 0%, transparent 55%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'rgba(255,255,255,0.7)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>{cat.count}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500, color: 'white' }}>{cat.label}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section style={{ padding: '60px 0', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Curated For You</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400, color: 'var(--text-dark)' }}>Featured Collection</h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              {tabs.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className="px-4 py-2 rounded-full text-[11px] uppercase tracking-wider border transition-all"
                  style={{ fontFamily: 'var(--font-body)', background: activeTab === tab ? 'var(--gold)' : 'transparent', color: activeTab === tab ? 'white' : 'var(--text-mid)', borderColor: activeTab === tab ? 'var(--gold)' : 'var(--beige)' }}>
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayed.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-center mt-10">
            <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-[12px] uppercase tracking-widest border transition-all hover:bg-[var(--gold)] hover:text-white hover:border-[var(--gold)]" style={{ fontFamily: 'var(--font-body)', color: 'var(--gold-dark)', borderColor: 'var(--gold)', textDecoration: 'none' }}>
              View All Products <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER BANNER */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--gold-dark)', padding: '60px 24px' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: 'radial-gradient(circle at 30% 50%, white 0%, transparent 60%)' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>Limited Time</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 5vw, 54px)', fontWeight: 400, color: 'white', lineHeight: 1.2, marginBottom: 16 }}>
            Get <em>10% OFF</em> on Your First Order
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 28, lineHeight: 1.7 }}>
            Subscribe to our newsletter and unlock exclusive deals, new arrivals & style tips.
          </p>
          <div className="flex max-w-md mx-auto rounded-xl overflow-hidden" style={{ border: '1.5px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.1)' }}>
            <input type="email" placeholder="Enter your email address" className="flex-1 px-4 py-3.5 bg-transparent outline-none text-[13px] text-white placeholder:text-white/50" style={{ fontFamily: 'var(--font-body)' }} />
            <button className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-widest transition-opacity hover:opacity-90" style={{ background: 'white', color: 'var(--gold-dark)', fontFamily: 'var(--font-body)', flexShrink: 0 }}>
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
