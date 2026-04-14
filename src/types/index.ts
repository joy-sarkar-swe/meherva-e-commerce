export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  badge: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  size?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  name: string;
  phone: string;
  address: string;
  pincode: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export type Category = 'All' | 'Kurtas & Kurtis' | 'Dresses' | 'Ethnic Sets' | 'Co-ords';
export type SortOption = '' | 'price_asc' | 'price_desc' | 'newest';
