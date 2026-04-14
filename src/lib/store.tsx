'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartItem, Product, Order } from '@/types';
import { products as defaultProducts } from '@/lib/products';

interface StoreContextType {
  products: Product[];
  setProducts: (p: Product[]) => void;
  cart: CartItem[];
  wishlist: number[];
  orders: Order[];
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  cartTotal: number;
  cartCount: number;
  addOrder: (order: Order) => void;
  toast: string;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProductsState] = useState<Product[]>(defaultProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const storedProducts = localStorage.getItem('meherva_admin_products');
    if (storedProducts) setProductsState(JSON.parse(storedProducts));
    const storedCart = localStorage.getItem('meherva_cart');
    if (storedCart) setCart(JSON.parse(storedCart));
    const storedWishlist = localStorage.getItem('meherva_wishlist');
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
    const storedOrders = localStorage.getItem('meherva_orders');
    if (storedOrders) setOrders(JSON.parse(storedOrders));
  }, []);

  const setProducts = useCallback((p: Product[]) => {
    setProductsState(p);
    localStorage.setItem('meherva_admin_products', JSON.stringify(p));
  }, []);

  const persistCart = (c: CartItem[]) => {
    setCart(c);
    localStorage.setItem('meherva_cart', JSON.stringify(c));
  };

  const persistWishlist = (w: number[]) => {
    setWishlist(w);
    localStorage.setItem('meherva_wishlist', JSON.stringify(w));
  };

  const addToCart = useCallback((product: Product, size?: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      const updated = existing
        ? prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { ...product, quantity: 1, size }];
      localStorage.setItem('meherva_cart', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => {
      const updated = prev.filter(i => i.id !== id);
      localStorage.setItem('meherva_cart', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateQty = useCallback((id: number, qty: number) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(prev => {
      const updated = prev.map(i => i.id === id ? { ...i, quantity: qty } : i);
      localStorage.setItem('meherva_cart', JSON.stringify(updated));
      return updated;
    });
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem('meherva_cart');
  }, []);

  const toggleWishlist = useCallback((id: number) => {
    setWishlist(prev => {
      const updated = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem('meherva_wishlist', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isInWishlist = useCallback((id: number) => wishlist.includes(id), [wishlist]);

  const addOrder = useCallback((order: Order) => {
    setOrders(prev => {
      const updated = [order, ...prev];
      localStorage.setItem('meherva_orders', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2800);
  }, []);

  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <StoreContext.Provider value={{
      products, setProducts,
      cart, wishlist, orders,
      addToCart, removeFromCart, updateQty, clearCart,
      toggleWishlist, isInWishlist,
      cartTotal, cartCount,
      addOrder, toast, showToast,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
