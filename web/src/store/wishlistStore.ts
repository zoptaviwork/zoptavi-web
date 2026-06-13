import { create } from 'zustand';
import type { Product } from '../data/products';

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
}

const load = (): Product[] => {
  try { return JSON.parse(localStorage.getItem('zoptavi_wishlist') || '[]'); } catch { return []; }
};
const save = (items: Product[]) => localStorage.setItem('zoptavi_wishlist', JSON.stringify(items));

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: load(),
  addItem: (product) => {
    if (get().isWishlisted(product.id)) return;
    const items = [...get().items, product];
    save(items); set({ items });
  },
  removeItem: (productId) => {
    const items = get().items.filter(p => p.id !== productId);
    save(items); set({ items });
  },
  toggleItem: (product) => {
    get().isWishlisted(product.id) ? get().removeItem(product.id) : get().addItem(product);
  },
  isWishlisted: (productId) => get().items.some(p => p.id === productId),
}));
