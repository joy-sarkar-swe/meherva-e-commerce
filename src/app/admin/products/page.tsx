'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, X, Search, Check } from 'lucide-react';
import { useStore } from '@/lib/store';
import { Product } from '@/types';
import Badge from '@/components/ui/Badge';

const emptyForm: Omit<Product, 'id'> = { name: '', price: 0, category: 'Kurtas & Kurtis', image: '', badge: '', inStock: true };
const categories = ['Kurtas & Kurtis', 'Dresses', 'Ethnic Sets', 'Co-ords'];
const badges = ['', 'New', 'Trending', 'Hot', 'Premium', 'Exclusive', 'Festive'];

export default function AdminProductsPage() {
  const { products, setProducts, showToast } = useStore();
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Product, 'id'>>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const filtered = products.filter(p => {
    const matchCat = filterCat === 'All' || p.category === filterCat;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const openAdd = () => { setForm(emptyForm); setEditingId(null); setModalOpen(true); };
  const openEdit = (p: Product) => { setForm({ name: p.name, price: p.price, category: p.category, image: p.image, badge: p.badge, inStock: p.inStock }); setEditingId(p.id); setModalOpen(true); };

  const handleSave = () => {
    if (!form.name || !form.price || !form.image) { showToast('⚠ Please fill all required fields'); return; }
    if (editingId !== null) {
      setProducts(products.map(p => p.id === editingId ? { ...p, ...form } : p));
      showToast('✓ Product updated');
    } else {
      const newId = Math.max(...products.map(p => p.id), 0) + 1;
      setProducts([...products, { id: newId, ...form }]);
      showToast('✓ Product added');
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    setDeleteConfirm(null);
    showToast('✓ Product deleted');
  };

  const toggleStock = (id: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p));
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--text-dark)' }}>Products</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-light)' }}>{products.length} total products</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[12px] uppercase tracking-wider text-white transition-opacity hover:opacity-90" style={{ background: 'var(--gold)', fontFamily: 'var(--font-body)' }}>
          <Plus size={15} /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-light)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none text-[13px]" style={{ fontFamily: 'var(--font-body)', borderColor: 'var(--beige)', background: 'var(--white)', color: 'var(--text-dark)' }} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', ...categories].map(c => (
            <button key={c} onClick={() => setFilterCat(c)}
              className="px-3 py-2 rounded-xl text-[11px] uppercase tracking-wide border transition-all"
              style={{ fontFamily: 'var(--font-body)', background: filterCat === c ? 'var(--gold)' : 'var(--white)', color: filterCat === c ? 'white' : 'var(--text-mid)', borderColor: filterCat === c ? 'var(--gold)' : 'var(--beige)' }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--white)', border: '1px solid var(--beige)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--beige)', background: 'var(--cream)' }}>
                {['Product', 'Category', 'Price', 'Badge', 'Stock', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left" style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-light)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b transition-colors hover:bg-[var(--cream)]" style={{ borderColor: 'var(--beige)' }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={p.image} alt={p.name} fill className="object-cover" sizes="40px" />
                      </div>
                      <div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, color: 'var(--text-dark)', maxWidth: 180 }} className="line-clamp-1">{p.name}</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--text-light)' }}>ID: {p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-mid)', background: 'var(--cream)', padding: '3px 8px', borderRadius: 6 }}>{p.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--gold-dark)' }}>₹{p.price.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge label={p.badge} />
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleStock(p.id)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-wide transition-all"
                      style={{ background: p.inStock ? '#D1FAE5' : '#FEF2F2', color: p.inStock ? '#059669' : '#DC2626', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                      {p.inStock ? <><Check size={10} /> In Stock</> : <><X size={10} /> Out</>}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="w-8 h-8 rounded-lg flex items-center justify-center border transition-colors hover:bg-[var(--cream)]" style={{ borderColor: 'var(--beige)', color: 'var(--text-mid)' }}>
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => setDeleteConfirm(p.id)} className="w-8 h-8 rounded-lg flex items-center justify-center border transition-colors hover:bg-red-50" style={{ borderColor: 'var(--beige)', color: '#DC2626' }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-light)', fontSize: 13 }}>No products found</div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(44,31,20,0.5)' }} onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg" style={{ maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--beige)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text-dark)' }}>{editingId ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={() => setModalOpen(false)}><X size={20} style={{ color: 'var(--text-mid)' }} /></button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.5px' }}>Product Name *</label>
                <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Elegant Kurti" className="px-4 py-2.5 rounded-xl border outline-none text-[13px]" style={{ fontFamily: 'var(--font-body)', borderColor: 'var(--beige)', color: 'var(--text-dark)' }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.5px' }}>Price (₹) *</label>
                  <input type="number" value={form.price || ''} onChange={e => setForm(p => ({ ...p, price: parseInt(e.target.value) || 0 }))} placeholder="1599" className="px-4 py-2.5 rounded-xl border outline-none text-[13px]" style={{ fontFamily: 'var(--font-body)', borderColor: 'var(--beige)', color: 'var(--text-dark)' }} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.5px' }}>Category *</label>
                  <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="px-4 py-2.5 rounded-xl border outline-none text-[13px]" style={{ fontFamily: 'var(--font-body)', borderColor: 'var(--beige)', background: 'white', color: 'var(--text-dark)' }}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.5px' }}>Image URL *</label>
                <input value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} placeholder="https://images.unsplash.com/..." className="px-4 py-2.5 rounded-xl border outline-none text-[13px]" style={{ fontFamily: 'var(--font-body)', borderColor: 'var(--beige)', color: 'var(--text-dark)' }} />
                {form.image && <div className="relative w-20 h-24 rounded-lg overflow-hidden mt-1"><Image src={form.image} alt="preview" fill className="object-cover" sizes="80px" /></div>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.5px' }}>Badge</label>
                  <select value={form.badge} onChange={e => setForm(p => ({ ...p, badge: e.target.value }))} className="px-4 py-2.5 rounded-xl border outline-none text-[13px]" style={{ fontFamily: 'var(--font-body)', borderColor: 'var(--beige)', background: 'white', color: 'var(--text-dark)' }}>
                    {badges.map(b => <option key={b} value={b}>{b || 'None'}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.5px' }}>Stock Status</label>
                  <button onClick={() => setForm(p => ({ ...p, inStock: !p.inStock }))}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[12px] transition-colors"
                    style={{ fontFamily: 'var(--font-body)', background: form.inStock ? '#D1FAE5' : '#FEF2F2', color: form.inStock ? '#059669' : '#DC2626', borderColor: form.inStock ? '#A7F3D0' : '#FCA5A5' }}>
                    {form.inStock ? '✓ In Stock' : '✕ Out of Stock'}
                  </button>
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <button onClick={() => setModalOpen(false)} className="flex-1 py-3 rounded-xl text-[12px] uppercase tracking-wider border transition-colors" style={{ fontFamily: 'var(--font-body)', borderColor: 'var(--beige)', color: 'var(--text-mid)' }}>Cancel</button>
                <button onClick={handleSave} className="flex-1 py-3 rounded-xl text-[12px] uppercase tracking-wider text-white transition-opacity hover:opacity-90" style={{ background: 'var(--gold)', fontFamily: 'var(--font-body)' }}>
                  {editingId ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(44,31,20,0.5)' }}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center">
            <div className="text-3xl mb-3">🗑</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text-dark)', marginBottom: 8 }}>Delete Product?</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-mid)', marginBottom: 20 }}>This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 rounded-xl border text-[12px] uppercase tracking-wider" style={{ fontFamily: 'var(--font-body)', borderColor: 'var(--beige)', color: 'var(--text-mid)' }}>Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-3 rounded-xl text-[12px] uppercase tracking-wider text-white" style={{ background: '#DC2626', fontFamily: 'var(--font-body)' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
